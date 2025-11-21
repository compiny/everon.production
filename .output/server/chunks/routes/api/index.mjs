import { c as defineEventHandler, m as getMethod, o as getQuery, i as db, n as news, r as readBody, f as createError } from '../../_/nitro.mjs';
import { desc } from 'drizzle-orm';
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

const index = defineEventHandler(async (event) => {
  const method = getMethod(event);
  try {
    if (method === "GET") {
      const query = getQuery(event);
      const limit = parseInt(query.limit) || 10;
      const offset = parseInt(query.offset) || 0;
      const newsItems = await db.select().from(news).orderBy(desc(news.createdAt)).limit(limit).offset(offset);
      return { news: newsItems };
    }
    if (method === "POST") {
      const body = await readBody(event);
      const requiredFields = ["title", "date"];
      for (const field of requiredFields) {
        if (!body[field]) {
          throw createError({
            statusCode: 400,
            statusMessage: `\u041F\u043E\u043B\u0435 ${field} \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E`
          });
        }
      }
      const newNews = await db.insert(news).values({
        title: body.title,
        description: body.description,
        date: body.date,
        createdAt: /* @__PURE__ */ new Date()
      });
      return {
        success: true,
        news: newNews,
        message: "\u041D\u043E\u0432\u043E\u0441\u0442\u044C \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0430"
      };
    }
  } catch (error) {
    throw createError({
      statusCode: 500
    });
  }
});

export { index as default };
//# sourceMappingURL=index.mjs.map
