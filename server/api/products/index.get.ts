// ~/server/api/products.ts
import { db } from '~/db'
import { products, productGroups } from '~/db/schema'
import { defineEventHandler, getQuery } from 'h3'
import { and, eq, or, like, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const search = query.search as string
    const limit = parseInt(query.limit as string) || 20
    const categorySlug = query.category as string

    try {
        let whereConditions = []

        // Фильтр по поисковому запросу
        if (search) {
            const searchPattern = `%${search.toLowerCase()}%`
            whereConditions.push(
                or(
                    sql`LOWER(${products.name}) LIKE ${searchPattern}`,
                    sql`LOWER(${products.description}) LIKE ${searchPattern}`
                )
            )
        }

        // Фильтр по категории
        if (categorySlug) {
            // Находим ID категории по slug
            const category = await db.select({ id: productGroups.id })
                .from(productGroups)
                .where(eq(productGroups.slug, categorySlug))
                .limit(1)
                .execute()

            if (category.length > 0) {
                whereConditions.push(eq(products.categoryId, category[0].id))
            }
        }

        const productsData = await db.select()
            .from(products)
            .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
            .limit(limit)
            .execute()

        return {
            products: productsData,
            hasMore: productsData.length === limit
        }

    } catch (error) {
        console.error('Error fetching products:', error)
        return {
            products: [],
            hasMore: false
        }
    }
})

