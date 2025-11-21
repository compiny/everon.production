import { db } from '~/db'
import { productGroups } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { defineEventHandler, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  console.log('API: Fetching category by slug:', slug)
  
  if (!slug) {
    throw createError({ 
      statusCode: 400, 
      message: 'Slug обязателен' 
    })
  }

  try {
    const [category] = await db.select()
      .from(productGroups)
      .where(eq(productGroups.slug, slug))

    console.log('API: Found category:', category)

    if (!category) {
      throw createError({ 
        statusCode: 404, 
        message: 'Категория не найдена' 
      })
    }

    return category
  } catch (error) {
    console.error('API: Error fetching category:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при загрузке категории'
    })
  }
})

