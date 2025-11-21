import { c as defineEventHandler, h as getRouterParam, r as readBody, f as createError, i as db, v as leadSources } from '../../../_/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const { name } = await readBody(event);
    if (!id || !name?.trim()) {
      throw createError({
        statusCode: 400,
        message: "ID \u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B"
      });
    }
    await db.update(leadSources).set({ name: name.trim() }).where(eq(leadSources.id, parseInt(id))).execute();
    const [updatedSource] = await db.select().from(leadSources).where(eq(leadSources.id, parseInt(id))).execute();
    if (!updatedSource) {
      throw createError({
        statusCode: 404,
        message: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    return updatedSource;
  } catch (error) {
    console.error("Error updating source:", error);
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
