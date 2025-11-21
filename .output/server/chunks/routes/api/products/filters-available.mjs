import { c as defineEventHandler, o as getQuery, i as db, q as products, f as createError } from '../../../_/nitro.mjs';
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

const filtersAvailable = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const categoryId = query.categoryId ? parseInt(query.categoryId) : null;
    const search = query.search || "";
    let allProducts = [];
    if (categoryId) {
      allProducts = await db.select().from(products).where(eq(products.categoryId, categoryId)).execute();
    } else {
      allProducts = await db.select().from(products).execute();
    }
    if (search) {
      allProducts = allProducts.filter(
        (product) => product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    const allAttributes = /* @__PURE__ */ new Map();
    allProducts.forEach((product) => {
      try {
        let attributes = [];
        if (typeof product.attributes === "string") {
          attributes = JSON.parse(product.attributes);
        } else if (Array.isArray(product.attributes)) {
          attributes = product.attributes;
        }
        attributes.forEach((attr) => {
          if (attr.name && attr.value) {
            if (!allAttributes.has(attr.name)) {
              allAttributes.set(attr.name, /* @__PURE__ */ new Map());
            }
            const valueMap = allAttributes.get(attr.name);
            const currentCount = valueMap.get(attr.value) || 0;
            valueMap.set(attr.value, currentCount + 1);
          }
        });
      } catch (error) {
        console.error("Error parsing attributes:", error);
      }
    });
    const filters = [];
    allAttributes.forEach((valueMap, name) => {
      const values = [];
      let type = "checkbox";
      let min = 0;
      let max = 0;
      let step = 1;
      valueMap.forEach((count, value) => {
        values.push({ value, count });
      });
      const numericValues = [];
      let allNumeric = true;
      values.forEach((item) => {
        const numValue = parseFloat(item.value);
        if (!isNaN(numValue)) {
          numericValues.push(numValue);
        } else {
          allNumeric = false;
        }
      });
      if (allNumeric && values.length > 2) {
        type = "range";
        min = Math.min(...numericValues);
        max = Math.max(...numericValues);
        step = max - min > 100 ? 1 : 0.1;
      }
      const sortedValues = values.sort((a, b) => {
        if (type === "range") {
          return parseFloat(a.value) - parseFloat(b.value);
        }
        return String(a.value).localeCompare(String(b.value));
      });
      filters.push({
        name,
        type,
        min: type === "range" ? min : void 0,
        max: type === "range" ? max : void 0,
        step: type === "range" ? step : void 0,
        values: sortedValues
      });
    });
    return { filters };
  } catch (error) {
    console.error("Error getting available filters:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { filtersAvailable as default };
//# sourceMappingURL=filters-available.mjs.map
