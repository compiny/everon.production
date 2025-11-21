import { db } from '~/db'
import { leads } from '~/db/schema'
import { defineEventHandler, readBody, createError } from 'h3'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // if (!body.phone || !body.sourceId) {
  //   throw createError({
  //     statusCode: 400,
  //     message: 'Требуются phone, email и sourceId'
  //   })
  // }

  try {
    // Используем транзакцию
    const newLead = await db.transaction(async (tx) => {
      // Вставляем запись
      const insertResult = await tx.insert(leads)
        .values({
          message: body.message || null,
          sourceId: body.sourceId,
          name: body.name || null,
          phone: body.phone,
          email: body.email || null,
        })
        .execute()

      // Получаем ID из результата
      const insertId = insertResult[0].insertId

      // Получаем полную запись
      const [lead] = await tx.select()
        .from(leads)
        .where(eq(leads.id, insertId))

      return lead
    })

    return { success: true, lead: newLead }

  } catch (error: any) {
    console.error('Error creating lead:', error)
    
    if (error.code === 'ER_DUP_ENTRY') {
      throw createError({
        statusCode: 409,
        message: 'Lead with this phone or email already exists'
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    })
  }
})