import { c as defineEventHandler, r as readBody, f as createError, i as db, v as leadSources } from '../../_/nitro.mjs';
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

const index_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event).catch(() => null);
    const name = body.name;
    if (typeof name !== "string" || name.trim() === "") {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0438 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u043E\u0439"
      });
    }
    const trimmedName = name.trim();
    const existing = await db.select().from(leadSources).where(eq(leadSources.name, trimmedName)).execute();
    if (existing.length > 0) {
      throw createError({
        statusCode: 400,
        message: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0441 \u0442\u0430\u043A\u0438\u043C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
      });
    }
    const insertResult = await db.insert(leadSources).values({ name: trimmedName }).execute();
    const [newSource] = await db.select().from(leadSources).where(eq(leadSources.name, trimmedName)).execute();
    return {
      success: true,
      data: newSource
    };
  } catch (error) {
    console.error("Source creation error:", error);
    if (error.statusCode) {
      throw error;
    }
    if (error.message?.includes("Duplicate")) {
      throw createError({
        statusCode: 400,
        message: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0441 \u0442\u0430\u043A\u0438\u043C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
