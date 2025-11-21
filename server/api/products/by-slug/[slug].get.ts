import { db } from '~/db'
import { products } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { defineEventHandler, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  console.log('API: Fetching product by slug:', slug)

  if (!slug) {
    throw createError({ 
      statusCode: 400, 
      message: 'Slug обязателен' 
    })
  }

  try {
    const [product] = await db.select()
      .from(products)
      .where(eq(products.slug, slug))

    console.log('API: Found product:', product)

    if (!product) {
      throw createError({ 
        statusCode: 404, 
        message: 'Продукт не найден' 
      })
    }

    // Парсим атрибуты из JSON строки
    if (product.attributes && typeof product.attributes === 'string') {
      try {
        product.attributes = JSON.parse(product.attributes)
      } catch (e) {
        console.error('Error parsing attributes:', e)
        product.attributes = []
      }
    }

    return product
  } catch (error) {
    console.error('API: Error fetching product:', error)
    throw createError({
      statusCode: 500,
      message: 'Ошибка при загрузке продукта'
    })
  }
})