export default defineEventHandler(async (event) => {
  try {
    // Проверяем подключение к базе данных
    const { db } = await import('~/db')
    
    // Простой запрос для проверки соединения
    await db.execute('SELECT 1')
    
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime()
    }
  } catch (error) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Unavailable',
      data: {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error.message
      }
    })
  }
})

