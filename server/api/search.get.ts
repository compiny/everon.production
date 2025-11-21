import { db } from '~/db'
import { productGroups, products } from '~/db/schema'
import { defineEventHandler, getQuery } from 'h3'
import { and, isNull, sql, or, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const searchTerm = query.q as string
    const limit = parseInt(query.limit as string) || 20
    const searchType = query.type as string || 'both'

    if (!searchTerm || searchTerm.length < 2) {
        return { categories: [], products: [] }
    }

    const searchPatternLower = `%${searchTerm.toLowerCase()}%`

    let categoriesResult: any[] = []
    let productsResult: any[] = []

    // Поиск по категориям
    if (searchType === 'both' || searchType === 'categories') {
        const categoriesData = await db.select({
            id: productGroups.id,
            name: productGroups.name,
            slug: productGroups.slug
        })
        .from(productGroups)
        .where(
            and(
                isNull(productGroups.parentId),
                or(
                    sql`LOWER(${productGroups.name}) LIKE ${searchPatternLower}`,
                    sql`LOWER(${productGroups.slug}) LIKE ${searchPatternLower}`
                )
            )
        )
        .limit(limit)
        .execute()

        categoriesResult = categoriesData
    }

    // Поиск по товарам с информацией о категории
    if (searchType === 'both' || searchType === 'products') {
        const productsData = await db.select({
            id: products.id,
            name: products.name,
            slug: products.slug,
            price: products.price,
            mainImage: products.mainImage,
            categoryId: products.categoryId,
            categorySlug: productGroups.slug
        })
        .from(products)
        .leftJoin(productGroups, eq(products.categoryId, productGroups.id))
        .where(
            or(
                sql`LOWER(${products.name}) LIKE ${searchPatternLower}`,
                sql`LOWER(${products.slug}) LIKE ${searchPatternLower}`,
                sql`LOWER(${products.description}) LIKE ${searchPatternLower}`
            )
        )
        .limit(limit)
        .execute()

        productsResult = productsData.map(product => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            mainImage: product.mainImage,
            categoryId: product.categoryId,
            categorySlug: product.categorySlug
        }))
    }

    return { 
        categories: categoriesResult, 
        products: productsResult 
    }
})