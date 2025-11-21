import { c as defineEventHandler, o as getQuery, q as products, i as db, p as productGroups } from '../../_/nitro.mjs';
import { or, sql, eq, and } from 'drizzle-orm';
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

const index_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.search;
  const limit = parseInt(query.limit) || 20;
  const categorySlug = query.category;
  try {
    let whereConditions = [];
    if (search) {
      const searchPattern = `%${search.toLowerCase()}%`;
      whereConditions.push(
        or(
          sql`LOWER(${products.name}) LIKE ${searchPattern}`,
          sql`LOWER(${products.description}) LIKE ${searchPattern}`
        )
      );
    }
    if (categorySlug) {
      const category = await db.select({ id: productGroups.id }).from(productGroups).where(eq(productGroups.slug, categorySlug)).limit(1).execute();
      if (category.length > 0) {
        whereConditions.push(eq(products.categoryId, category[0].id));
      }
    }
    const productsData = await db.select().from(products).where(whereConditions.length > 0 ? and(...whereConditions) : void 0).limit(limit).execute();
    return {
      products: productsData,
      hasMore: productsData.length === limit
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      hasMore: false
    };
  }
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
