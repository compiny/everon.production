import User from '../../models/User'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Валидация
    if (!body.username || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username, email and password are required'
      })
    }

    // Проверка на существующего пользователя
    const existingUser = await User.findByEmail(body.email)
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User with this email already exists'
      })
    }

    // Создание пользователя
    const user = await User.create(body)
    
    return {
      success: true,
      data: user
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Internal Server Error'
    })
  }
})