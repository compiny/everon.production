import { db } from '~/db'
import { leadSources } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event).catch(() => null)
    const name = body.name

    // Валидация
    if (typeof name !== 'string' || name.trim() === '') {
      throw createError({
        statusCode: 400,
        message: 'Название источника обязательно и должно быть строкой'
      })
    }

    const trimmedName = name.trim()

    // Проверка на дубликат
    const existing = await db.select()
      .from(leadSources)
      .where(eq(leadSources.name, trimmedName))
      .execute()

    if (existing.length > 0) {
      throw createError({
        statusCode: 400,
        message: 'Источник с таким названием уже существует'
      })
    }

    // Создание источника
    const insertResult = await db.insert(leadSources)
      .values({ name: trimmedName })
      .execute()

    // Получение созданного источника
    const [newSource] = await db.select()
      .from(leadSources)
      .where(eq(leadSources.name, trimmedName))
      .execute()

    return {
      success: true,
      data: newSource
    }

  } catch (error: any) {
    console.error('Source creation error:', error)

    // Уже обработанные ошибки
    if (error.statusCode) {
      throw error
    }

    // Ошибки базы данных
    if (error.message?.includes('Duplicate')) {
      throw createError({
        statusCode: 400,
        message: 'Источник с таким названием уже существует'
      })
    }

    // Неизвестные ошибки
    throw createError({
      statusCode: 500,
      message: 'Внутренняя ошибка сервера'
    })
  }
})