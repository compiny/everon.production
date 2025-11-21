import { eq } from 'drizzle-orm'
import { news } from '~/db/schema'
import { db } from '~/db'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = parseInt(getRouterParam(event, 'id')!)
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID новости обязателен'
    })
  }
  
  try {
    // GET /api/news/[id] - получить одну новость
    if (method === 'GET') {
      const newsItem = await db.select()
        .from(news)
        .where(eq(news.id, id))
        .limit(1)
      
      if (!newsItem.length) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Новость не найдена'
        })
      }
      
      return { news: newsItem[0] }
    }
    
    // PUT /api/news/[id] - обновить новость
    if (method === 'PUT') {
      const body = await readBody(event)
      
      const existingNews = await db.select()
        .from(news)
        .where(eq(news.id, id))
        .limit(1)
      
      if (!existingNews.length) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Новость не найдена'
        })
      }
      
      const updatedNews = await db.update(news)
        .set({
          title: body.title,
          description: body.description,
          date: body.date, 
        })
        .where(eq(news.id, id))
      
      return { 
        success: true, 
        message: 'Новость успешно обновлена'
      }
    }
    
    // DELETE /api/news/[id] - удалить новость
    if (method === 'DELETE') {
      const existingNews = await db.select()
        .from(news)
        .where(eq(news.id, id))
        .limit(1)
      
      if (!existingNews.length) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Новость не найдена'
        })
      }
      
      await db.delete(news).where(eq(news.id, id))
      
      return { 
        success: true, 
        message: 'Новость успешно удалена'
      }
    }
    
  } catch (error) {
    throw createError({
      statusCode: 500
    })
  }
})