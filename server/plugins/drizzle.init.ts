import { db } from '../../db'

export default defineNitroPlugin(async (nitroApp) => {
    console.log('Drizzle ORM initialized successfully')

    // Проверка соединения
    try {
        const result = await db.execute('SELECT 1 as test')
        console.log('Database connection test:', result[0])
    } catch (error) {
        console.error('Database connection error:', error)
    }
})