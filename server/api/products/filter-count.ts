
import { db } from '~/db'
import { products } from '~/db/schema'
import { defineEventHandler, readBody } from 'h3'
import { eq } from 'drizzle-orm'

interface ProductAttribute {
  name: string;
  value: string;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { filters = {} } = body

    console.log('COUNT - Received filters:', JSON.stringify(filters, null, 2))

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

    console.log('COUNT - Total products after category filter:', allProducts.length)

    if (Object.keys(attributeFilters).length === 0) {
      console.log('COUNT - No attribute filters, returning:', allProducts.length)
      return { count: allProducts.length }
    }

    const filteredProducts = allProducts.filter((product) => {
      try {
        if (categoryId && product.categoryId !== categoryId) {
          return false
        }

        let attributes: ProductAttribute[] = []
        if (typeof product.attributes === 'string') {
          attributes = JSON.parse(product.attributes)
        } else if (Array.isArray(product.attributes)) {
          attributes = product.attributes
        }

        for (const [filterName, filterValue] of Object.entries(attributeFilters)) {
          const productAttribute = attributes.find((attr: ProductAttribute) => attr.name === filterName)
          
          if (!productAttribute) return false 
          
          if (Array.isArray(filterValue) && filterValue.length > 0) {
            if (typeof filterValue[0] === 'string') {
              if (!filterValue.includes(productAttribute.value)) {
                return false
              }
            } else if (filterValue.length === 2 && typeof filterValue[0] === 'number') {
              const [min, max] = filterValue
              const numericValue = parseFloat(productAttribute.value)
              if (isNaN(numericValue) || numericValue < min || numericValue > max) {
                return false
              }
            }
          }
        }
        
        return true 
      } catch (error) {
        console.error('Error processing product attributes:', error)
        return false
      }
    })

    console.log('COUNT - After all filtering:', filteredProducts.length)
    return { count: filteredProducts.length }

  } catch (error) {
    console.error('COUNT - Error counting products:', error)
    return { count: 0 }
  }
})