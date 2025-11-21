import { db } from '~/db'
import { products } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
  try {
    const parts = await readMultipartFormData(event)
    if (!parts) throw createError({ statusCode: 400, message: 'Нет данных' })

    const formData: Record<string, string> = {}
    let mainImageFile: any = null
    const galleryFiles: any[] = []

    for (const part of parts) {
      if (part.name === 'mainImage' && part.filename) {
        mainImageFile = part
      } else if (part.name === 'galleryFiles' && part.filename) {
        galleryFiles.push(part)
      } else if (part.name) {
        formData[part.name] = part.data.toString('utf-8')
      }
    }

    const {
      id,
      name,
      slug,
      price,
      seoTitle,
      seoDescription,
      description,
      categoryId
    } = formData

    if (!name || !slug || !price) {
      throw createError({ statusCode: 400, message: 'Название, slug и цена обязательны' })
    }

    let attributes: Array<{name: string, value: string}> = []
    if (formData.attributes) {
      attributes = JSON.parse(formData.attributes)
    }

    let mainImageUrl = formData.mainImage || null
    if (mainImageFile) {
      const uploadsDir = join(process.cwd(), 'public', 'uploads', 'products')
      await mkdir(uploadsDir, { recursive: true })

      const ext = mainImageFile.filename.split('.').pop()
      const filename = `${nanoid()}.${ext}`
      const filepath = join(uploadsDir, filename)

      await writeFile(filepath, mainImageFile.data)
      mainImageUrl = `/uploads/products/${filename}`
    }

    const galleryUrls: string[] = []
    if (galleryFiles.length > 0) {
      const uploadsDir = join(process.cwd(), 'public', 'uploads', 'gallery')
      await mkdir(uploadsDir, { recursive: true })

      for (const file of galleryFiles) {
        const ext = file.filename.split('.').pop()
        const filename = `${nanoid()}.${ext}`
        const filepath = join(uploadsDir, filename)

        await writeFile(filepath, file.data)
        galleryUrls.push(`/uploads/gallery/${filename}`)
      }
    }

    let galleryList: string[] = []
    if (formData.existingGallery) {
      galleryList = JSON.parse(formData.existingGallery)
    }

    galleryList = galleryList.concat(galleryUrls)

    const dbData: any = {
      name,
      slug,
      price: parseInt(price),
      mainImage: mainImageUrl,
      gallery: galleryList.length > 0 ? JSON.stringify(galleryList) : null,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      description: description || null,
      categoryId: categoryId ? parseInt(categoryId) : null,
      updatedAt: new Date(),
      attributes: attributes.length > 0 ? JSON.stringify(attributes) : null
    }

    let productId: number

    if (id) {
      productId = parseInt(id)
      await db.update(products)
        .set(dbData)
        .where(eq(products.id, productId))
    } else {
      const result = await db.insert(products).values({
        ...dbData,
        createdAt: new Date()
      })
      productId = result[0].insertId 
    }

    return { 
      success: true, 
      product: { id: productId, ...dbData }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: 'Ошибка сервера'
    })
  }
})