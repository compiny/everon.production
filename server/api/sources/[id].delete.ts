import { db } from '~/db'
import { leadSources } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({
            statusCode: 400,
            message: 'ID источника обязателен'
        })
    }
    // Удаляем источник
    await db.delete(leadSources)
        .where(eq(leadSources.id, parseInt(id)))
        .execute()

})