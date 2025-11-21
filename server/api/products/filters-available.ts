import { db } from '~/db'
import { products } from '~/db/schema'
import { eq } from 'drizzle-orm'
import { defineEventHandler, getQuery, createError } from 'h3'

interface Attribute {
  name: string;
  value: string;
}

interface FilterValue {
  value: string;
  count: number;
}

interface Filter {
  name: string;
  type: string;
  min?: number;
  max?: number;
  step?: number;
  values: FilterValue[];
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const categoryId = query.categoryId ? parseInt(query.categoryId as string) : null
    const search = query.search as string || ''

    // Получаем товары с учетом категории и поиска
    let allProducts = []
    
    if (categoryId) {
      allProducts = await db.select()
        .from(products)
        .where(eq(products.categoryId, categoryId))
        .execute()
    } else {
      allProducts = await db.select().from(products).execute()
    }

    // Фильтруем по поиску если есть
    if (search) {
      allProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    const allAttributes = new Map<string, Map<string, number>>()

    // Собираем характеристики только из отфильтрованных товаров
    allProducts.forEach(product => {
      try {
        let attributes: Attribute[] = []

        if (typeof product.attributes === 'string') {
          attributes = JSON.parse(product.attributes)
        } else if (Array.isArray(product.attributes)) {
          attributes = product.attributes
        }

        attributes.forEach((attr: Attribute) => {
          if (attr.name && attr.value) {
            if (!allAttributes.has(attr.name)) {
              allAttributes.set(attr.name, new Map<string, number>())
            }

            const valueMap = allAttributes.get(attr.name)!
            const currentCount = valueMap.get(attr.value) || 0
            valueMap.set(attr.value, currentCount + 1)
          }
        })
      } catch (error) {
        console.error('Error parsing attributes:', error)
      }
    })

    // Преобразуем в массив фильтров
    const filters: Filter[] = []

    allAttributes.forEach((valueMap, name) => {
      const values: FilterValue[] = []
      let type = 'checkbox'
      let min = 0
      let max = 0
      let step = 1

      valueMap.forEach((count, value) => {
        values.push({ value, count })
      })

      // Определяем тип фильтра
      const numericValues: number[] = []
      let allNumeric = true

      values.forEach(item => {
        const numValue = parseFloat(item.value)
        if (!isNaN(numValue)) {
          numericValues.push(numValue)
        } else {
          allNumeric = false
        }
      })

      if (allNumeric && values.length > 2) {
        type = 'range'
        min = Math.min(...numericValues)
        max = Math.max(...numericValues)
        step = (max - min) > 100 ? 1 : 0.1
      }

      // Сортируем значения
      const sortedValues = values.sort((a, b) => {
        if (type === 'range') {
          return parseFloat(a.value) - parseFloat(b.value)
        }
        return String(a.value).localeCompare(String(b.value))
      })

      filters.push({
        name,
        type,
        min: type === 'range' ? min : undefined,
        max: type === 'range' ? max : undefined,
        step: type === 'range' ? step : undefined,
        values: sortedValues
      })
    })

    return { filters }
  } catch (error) {
    console.error('Error getting available filters:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})