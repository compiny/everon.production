import { db } from '~/db'
import { eq, desc } from 'drizzle-orm'
import { news } from '~/db/schema'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  
  try {
    // GET /api/news - получить все новости
    if (method === 'GET') {
      const query = getQuery(event)
      const limit = parseInt(query.limit as string) || 10
      const offset = parseInt(query.offset as string) || 0
      
      const newsItems = await db.select()
        .from(news)
        .orderBy(desc(news.createdAt))
        .limit(limit)
        .offset(offset)
      
      return { news: newsItems }
    }
    
    // POST /api/news - создать новость
    if (method === 'POST') {
      const body = await readBody(event)
      
      const requiredFields = ['title', 'date']
      for (const field of requiredFields) {
        if (!body[field]) {
          throw createError({
            statusCode: 400,
            statusMessage: `Поле ${field} обязательно`
          })
        }
      }
      
      const newNews = await db.insert(news).values({
        title: body.title,
        description: body.description,
        date: body.date, 
        createdAt: new Date(),
      })
      
      return { 
        success: true, 
        news: newNews,
        message: 'Новость успешно создана'
      }
    }
    
  } catch (error) {
    throw createError({
      statusCode: 500,
    })
  }
})