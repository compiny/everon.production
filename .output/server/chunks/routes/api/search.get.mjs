import { c as defineEventHandler, o as getQuery, i as db, p as productGroups, q as products } from '../../_/nitro.mjs';
import { and, isNull, or, sql, eq } from 'drizzle-orm';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'drizzle-orm/mysql2';
import 'mysql2/promise';
import 'drizzle-orm/mysql-core';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';

const search_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const searchTerm = query.q;
  const limit = parseInt(query.limit) || 20;
  const searchType = query.type || "both";
  if (!searchTerm || searchTerm.length < 2) {
    return { categories: [], products: [] };
  }
  const searchPatternLower = `%${searchTerm.toLowerCase()}%`;
  let categoriesResult = [];
  let productsResult = [];
  if (searchType === "both" || searchType === "categories") {
    const categoriesData = await db.select({
      id: productGroups.id,
      name: productGroups.name,
      slug: productGroups.slug
    }).from(productGroups).where(
      and(
        isNull(productGroups.parentId),
        or(
          sql`LOWER(${productGroups.name}) LIKE ${searchPatternLower}`,
          sql`LOWER(${productGroups.slug}) LIKE ${searchPatternLower}`
        )
      )
    ).limit(limit).execute();
    categoriesResult = categoriesData;
  }
  if (searchType === "both" || searchType === "products") {
    const productsData = await db.select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      price: products.price,
      mainImage: products.mainImage,
      categoryId: products.categoryId,
      categorySlug: productGroups.slug
    }).from(products).leftJoin(productGroups, eq(products.categoryId, productGroups.id)).where(
      or(
        sql`LOWER(${products.name}) LIKE ${searchPatternLower}`,
        sql`LOWER(${products.slug}) LIKE ${searchPatternLower}`,
        sql`LOWER(${products.description}) LIKE ${searchPatternLower}`
      )
    ).limit(limit).execute();
    productsResult = productsData.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mainImage: product.mainImage,
      categoryId: product.categoryId,
      categorySlug: product.categorySlug
    }));
  }
  return {
    categories: categoriesResult,
    products: productsResult
  };
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
