import { c as defineEventHandler, r as readBody, i as db, q as products, f as createError } from '../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
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

const filter = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { filters = {}, search = "", page = 1, limit = 20, countOnly = false } = body;
    const categoryId = filters.categoryId;
    const { categoryId: _, ...attributeFilters } = filters;
    let allProducts = [];
    if (categoryId) {
      allProducts = await db.select().from(products).where(eq(products.categoryId, categoryId));
    } else {
      allProducts = await db.select().from(products);
    }
    const filteredProducts = allProducts.filter((product) => {
      if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (Object.keys(attributeFilters).length) {
        try {
          const attributes = typeof product.attributes === "string" ? JSON.parse(product.attributes) : product.attributes || [];
          return Object.entries(attributeFilters).every(([filterName, filterValue]) => {
            const attr = attributes.find((a) => a.name === filterName);
            if (!attr) return false;
            if (Array.isArray(filterValue)) {
              if (filterValue.length === 2 && typeof filterValue[0] === "number") {
                const valNum = parseFloat(attr.value);
                return !isNaN(valNum) && valNum >= filterValue[0] && valNum <= filterValue[1];
              } else {
                return filterValue.includes(attr.value);
              }
            } else {
              return attr.value === filterValue;
            }
          });
        } catch {
          return false;
        }
      }
      return true;
    });
    if (countOnly) {
      return { count: filteredProducts.length };
    }
    const total = filteredProducts.length;
    const start = (page - 1) * limit;
    const paginated = filteredProducts.slice(start, start + limit);
    return {
      products: paginated,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  } catch (error) {
    console.error("Error filtering products:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});

export { filter as default };
//# sourceMappingURL=filter.mjs.map
