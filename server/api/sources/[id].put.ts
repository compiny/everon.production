import { db } from '~/db'
import { leadSources } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const { name } = await readBody(event)

    if (!id || !name?.trim()) {
      throw createError({
        statusCode: 400,
        message: 'ID и название обязательны'
      })
    }

    // Обновляем источник
    await db.update(leadSources)
      .set({ name: name.trim() })
      .where(eq(leadSources.id, parseInt(id)))
      .execute()

    // Получаем обновленный источник
    const [updatedSource] = await db.select()
      .from(leadSources)
      .where(eq(leadSources.id, parseInt(id)))
      .execute()

    if (!updatedSource) {
      throw createError({
        statusCode: 404,
        message: 'Источник не найден'
      })
    }

    return updatedSource

  } catch (error) {
    console.error('Error updating source:', error)
  }
})