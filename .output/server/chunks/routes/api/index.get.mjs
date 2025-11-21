import { c as defineEventHandler, i as db, p as productGroups, f as createError } from '../../_/nitro.mjs';
import { isNull, asc } from 'drizzle-orm';
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

const index_get = defineEventHandler(async () => {
  try {
    const categories = await db.select().from(productGroups).where(isNull(productGroups.parentId)).orderBy(asc(productGroups.createdAt)).execute();
    return { categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
