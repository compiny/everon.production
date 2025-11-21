import { db } from '~/db'
import { productGroups } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    console.log('ID from router:', id)

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID обязателен'
      })
    }

    const body = await readBody(event)
    console.log('Request body:', body)

    // Проверяем обязательные поля
    if (!body.name?.trim()) {
      throw createError({
        statusCode: 400,
        message: 'Название категории обязательно'
      })
    }

    // Подготавливаем данные для обновления
    const updateData = {
      name: body.name.trim(),
      slug: body.slug?.trim(),
      imageUrl: body.imageUrl?.trim() || null,
      seoTitle: body.seoTitle?.trim() || null,
      seoDescription: body.seoDescription?.trim() || null,
      description: body.description?.trim() || null,
      parentId: body.parentId ? parseInt(body.parentId) : null,
      updatedAt: new Date()
    }

    // Обновляем по ID
    await db.update(productGroups)
      .set(updateData)
      .where(eq(productGroups.id, parseInt(id)))

    // Получаем обновленную группу
    const [updatedGroup] = await db.select()
      .from(productGroups)
      .where(eq(productGroups.id, parseInt(id)))

    if (!updatedGroup) {
      throw createError({
        statusCode: 404,
        message: 'Группа не найдена'
      })
    }

    return updatedGroup

  } catch (error: any) {
    console.error('Error updating category:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Ошибка при обновлении категории'
    })
  }
})