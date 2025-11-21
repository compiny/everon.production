import { c as defineEventHandler, h as getRouterParam, f as createError, i as db, q as products } from '../../../../_/nitro.mjs';
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

const _slug__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  console.log("API: Fetching product by slug:", slug);
  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Slug \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D"
    });
  }
  try {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    console.log("API: Found product:", product);
    if (!product) {
      throw createError({
        statusCode: 404,
        message: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    if (product.attributes && typeof product.attributes === "string") {
      try {
        product.attributes = JSON.parse(product.attributes);
      } catch (e) {
        console.error("Error parsing attributes:", e);
        product.attributes = [];
      }
    }
    return product;
  } catch (error) {
    console.error("API: Error fetching product:", error);
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430"
    });
  }
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
