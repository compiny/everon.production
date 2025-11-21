import { db } from '~/db'
import { leads, productLeads } from '~/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const paramId = event.context.params?.id
  if (!paramId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID заявки не указан'
    })
  }

  const id = parseInt(paramId)
  
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Неверный ID заявки'
    })
  }

  // Проверяем существование заявки
  const existingLead = await db.select()
    .from(leads)
    .where(eq(leads.id, id))
    .limit(1)

  if (existingLead.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Заявка не найдена'
    })
  }

  // удаляем связанные записи в product_leads
  try {
    await db.delete(productLeads).where(eq(productLeads.leadId, id))
  } catch (error) {
    console.log('No product_leads to delete or table doesnt exist')
  }

  // удаляем заявку
  await db.delete(leads).where(eq(leads.id, id))

})