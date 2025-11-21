import { db } from '~/db'
import { leads } from '~/db/schema'
import { defineEventHandler } from 'h3'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Получаем параметры с проверкой типа
    const params = event.context.params
    
    if (!params || typeof params !== 'object') {
      throw createError({
        statusCode: 400,
        message: 'Invalid parameters'
      })
    }

    // Проверяем наличие id
    const { id } = params as { id?: string }
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID parameter is required'
      })
    }

    // Преобразуем ID в число
    const leadId = parseInt(id)
    if (isNaN(leadId)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid ID format'
      })
    }

    const lead = await db.select()
      .from(leads)
      .where(eq(leads.id, leadId))
      .execute()

    if (lead.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Lead not found'
      })
    }

    return { 
      success: true, 
      lead: lead[0]
    }

  } catch (error: any) {
    console.error('Error fetching lead:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
})