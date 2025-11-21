import { db } from '~/db'
import { products } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { defineEventHandler, readMultipartFormData, getRouterParam, createError } from 'h3'
import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { nanoid } from 'nanoid'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id')
        if (!id) throw createError({ statusCode: 400, message: 'ID обязателен' })

        const parts = await readMultipartFormData(event)
        if (!parts || parts.length === 0) throw createError({ statusCode: 400, message: 'Нет данных' })

        const formData: Record<string, string> = {}
        let mainImageFile: any = null
        const galleryFiles: any[] = []
        let existingGallery: string[] = []
        let removedGallery: string[] = []
        let attributes: Array<{name: string, value: string}> = []

        for (const part of parts) {
            if (part.name === 'mainImage' && part.filename) {
                mainImageFile = part
            } else if (part.name === 'galleryFiles' && part.filename) {
                galleryFiles.push(part)
            } else if (part.name === 'existingGallery') {
                try {
                    existingGallery = JSON.parse(part.data.toString('utf-8'))
                    if (!Array.isArray(existingGallery)) existingGallery = []
                } catch {
                    existingGallery = []
                }
            } else if (part.name === 'removedGallery') {
                try {
                    removedGallery = JSON.parse(part.data.toString('utf-8'))
                    if (!Array.isArray(removedGallery)) removedGallery = []
                } catch {
                    removedGallery = []
                }
            } else if (part.name === 'attributes') {
                try {
                    attributes = JSON.parse(part.data.toString('utf-8'))
                    if (!Array.isArray(attributes)) attributes = []
                } catch {
                    attributes = []
                }
            } else if (part.name) {
                formData[part.name] = part.data.toString('utf-8')
            }
        }
        // Корректная проверка цены, учитываем 0
        if (!formData.name || !formData.slug || formData.price === undefined || formData.price === '') {
            throw createError({ statusCode: 400, message: 'Обязательны поля: name, slug, price' })
        }

        const [existingProduct] = await db.select()
            .from(products)
            .where(eq(products.id, parseInt(id)))

        if (!existingProduct) throw createError({ statusCode: 404, message: 'Товар не найден' })

        // Удаляем старые изображения галереи, которые были удалены во фронтенде
        if (removedGallery.length > 0) {
            for (const imagePath of removedGallery) {
                const fullPath = join(process.cwd(), 'public', imagePath)
                if (existsSync(fullPath)) {
                    await unlink(fullPath)
                }
            }
        }

        // Работа с главным изображением
        let mainImageUrl = existingProduct.mainImage

        if (mainImageFile) {
            // Удаляем старое главное изображение
            if (existingProduct.mainImage) {
                const oldImagePath = join(process.cwd(), 'public', existingProduct.mainImage)
                if (existsSync(oldImagePath)) {
                    await unlink(oldImagePath)
                }
            }
            // Сохраняем новое
            const uploadsDir = join(process.cwd(), 'public', 'uploads', 'products')
            await mkdir(uploadsDir, { recursive: true })

            const ext = mainImageFile.filename.split('.').pop()
            const filename = `${nanoid()}.${ext}`
            const filepath = join(uploadsDir, filename)

            await writeFile(filepath, mainImageFile.data)
            mainImageUrl = `/uploads/products/${filename}`
        } else if (formData.removeMainImage === 'true') {
            // Удаляем главное изображение если запросили
            if (existingProduct.mainImage) {
                const oldImagePath = join(process.cwd(), 'public', existingProduct.mainImage)
                if (existsSync(oldImagePath)) {
                    await unlink(oldImagePath)
                }
            }
            mainImageUrl = null
        }

        // Работа с файлами галереи
        const newGalleryUrls: string[] = []
        if (galleryFiles.length > 0) {
            const uploadsDir = join(process.cwd(), 'public', 'uploads', 'gallery')
            await mkdir(uploadsDir, { recursive: true })

            for (const file of galleryFiles) {
                const ext = file.filename?.split('.').pop() || 'jpg'
                const filename = `${nanoid()}.${ext}`
                const filepath = join(uploadsDir, filename)

                await writeFile(filepath, file.data)
                newGalleryUrls.push(`/uploads/gallery/${filename}`)
            }
        }

        const galleryList = [...existingGallery, ...newGalleryUrls]

        const updateData: any = {
            name: formData.name.trim(),
            slug: formData.slug.trim(),
            price: parseInt(formData.price),
            mainImage: mainImageUrl,
            gallery: galleryList.length > 0 ? JSON.stringify(galleryList) : null,
            seoTitle: formData.seoTitle?.trim() || null,
            seoDescription: formData.seoDescription?.trim() || null,
            description: formData.description?.trim() || null,
            updatedAt: new Date(),
            attributes: attributes.length > 0 ? JSON.stringify(attributes) : null
        }

        // Категория
        if (formData.categoryId !== undefined) {
            updateData.categoryId = formData.categoryId === '' ? null : parseInt(formData.categoryId)
        }

        await db.update(products)
            .set(updateData)
            .where(eq(products.id, parseInt(id)))

        const [updatedProduct] = await db.select()
            .from(products)
            .where(eq(products.id, parseInt(id)))

        if (!updatedProduct) throw createError({ statusCode: 404, message: 'Товар не найден после обновления' })

        return {
            success: true,
            product: updatedProduct,
            message: 'Товар успешно обновлен'
        }
    } catch (error: any) {
        console.error('Ошибка обновления товара:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            message: error.message || 'Ошибка при обновлении товара'
        })
    }
})

