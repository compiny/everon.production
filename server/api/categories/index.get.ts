import { db } from '~/db'
import { productGroups } from '~/db/schema'
import { defineEventHandler } from 'h3'
import { asc, isNull, desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  try {
    // Сортируем по дате создания (новые в конце)
    const categories = await db.select()
      .from(productGroups)
      .where(isNull(productGroups.parentId))
      .orderBy(asc(productGroups.createdAt)) 
      .execute()

    return { categories }
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при загрузке категорий'
    })
  }
})