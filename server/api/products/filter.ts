import { db } from '~/db'
import { products } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { defineEventHandler, readBody, createError } from 'h3'

interface ProductAttribute {
  name: string;
  value: string;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { filters = {}, search = '', page = 1, limit = 20, countOnly = false } = body

    const categoryId = filters.categoryId
    const { categoryId: _, ...attributeFilters } = filters

    let allProducts = []

    if (categoryId) {
      allProducts = await db.select()
        .from(products)
        .where(eq(products.categoryId, categoryId))
    } else {
      allProducts = await db.select().from(products)
    }

    const filteredProducts = allProducts.filter(product => {
      if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
        return false
      }

      if (Object.keys(attributeFilters).length) {
        try {
          const attributes: ProductAttribute[] = typeof product.attributes === 'string'
            ? JSON.parse(product.attributes)
            : product.attributes || []

          return Object.entries(attributeFilters).every(([filterName, filterValue]) => {
            const attr = attributes.find((a: ProductAttribute) => a.name === filterName)
            if (!attr) return false

            if (Array.isArray(filterValue)) {
              if (filterValue.length === 2 && typeof filterValue[0] === 'number') {
                const valNum = parseFloat(attr.value)
                return !isNaN(valNum) && valNum >= filterValue[0] && valNum <= filterValue[1]
              } else {
                return filterValue.includes(attr.value)
              }
            } else {
              return attr.value === filterValue
            }
          })
        } catch {
          return false
        }
      }
      return true
    })

    if (countOnly) {
      return { count: filteredProducts.length }
    }

    const total = filteredProducts.length
    const start = (page - 1) * limit
    const paginated = filteredProducts.slice(start, start + limit)

    return {
      products: paginated,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    }

  } catch (error) {
    console.error('Error filtering products:', error)
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})