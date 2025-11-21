import { db } from '~/db'
import { leadSources } from '~/db/schema'
import { defineEventHandler } from 'h3'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Получаем все источники заявок с сортировкой по дате создания (новые сначала)
    const allSources = await db.select()
      .from(leadSources)
      .orderBy(desc(leadSources.createdAt))
      .execute()

    return { 
      sources: allSources,
      count: allSources.length
    }

  } catch (error: any) {
    console.error('Error fetching lead sources:', error)
    
    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    })
  }
})