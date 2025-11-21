import { db } from '~/db'
import { productGroups } from '~/db/schema'
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
    let imageFile: any = null

    for (const part of parts) {
      if (part.name === 'image' && part.filename) {
        imageFile = part
      } else if (part.name) {
        formData[part.name] = part.data.toString('utf-8')
      }
    }

    const { name, slug, parentId, id } = formData
    if (!name || !slug) throw createError({ statusCode: 400, message: 'Название и slug обязательны' })

    // // Проверка дубликата slug
    // if (!id) {
    //   const existing = await db.select()
    //     .from(productGroups)
    //     .where(eq(productGroups.slug, slug))
    //   if (existing.length > 0) throw createError({ statusCode: 400, message: 'Slug уже существует' })
    // }

    // Сохранение изображения
    let imageUrl = formData.imageUrl || ''
    if (imageFile) {
      const uploadsDir = join(process.cwd(), 'public', 'uploads', 'categories')
      await mkdir(uploadsDir, { recursive: true })
      
      const fileExtension = imageFile.filename.split('.').pop()
      const fileName = `${nanoid()}.${fileExtension}`
      const filePath = join(uploadsDir, fileName)
      
      await writeFile(filePath, imageFile.data)
      imageUrl = `/uploads/categories/${fileName}`
    }

    const dbData = {
      name,
      slug,
      imageUrl: imageUrl || null,
      seoTitle: formData.seoTitle || null,
      seoDescription: formData.seoDescription || null,
      description: formData.description || null,
      parentId: parentId ? parseInt(parentId) : null,
      updatedAt: new Date()
    }

    if (id) {
      await db.update(productGroups)
        .set(dbData)
        .where(eq(productGroups.id, parseInt(id)))
    } else {
      await db.insert(productGroups).values(dbData)
    }

    return { success: true, imageUrl }
  } catch (error: any) {
    console.error('Ошибка:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Ошибка сервера'
    })
  }
})
