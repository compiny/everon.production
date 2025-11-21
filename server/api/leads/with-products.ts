import { db } from '~/db'
import { leads, productLeads } from '~/db/schema'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    const { name, phone, email, productIds, message, sourceId = 4 } = body
    
    // Валидация
    if (!phone) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Телефон обязателен'
      })
    }
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Не указаны товары'
      })
    }

    // Создаем заявку
    const [lead] = await db.insert(leads).values({
      name,
      phone,
      email,
      message,
      sourceId
    }).$returningId()

    // Связываем товары с заявкой
    const productLeadValues = productIds.map(productId => ({
      leadId: lead.id,
      productId
    }))

    await db.insert(productLeads).values(productLeadValues)

    return {
      success: true,
      leadId: lead.id,
      message: 'Заявка успешно создана'
    }

  } catch (error) {
    console.error('Error creating lead with products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка при создании заявки'
    })
  }
})