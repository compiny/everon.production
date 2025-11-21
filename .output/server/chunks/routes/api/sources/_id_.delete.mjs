import { c as defineEventHandler, h as getRouterParam, f as createError, i as db, v as leadSources } from '../../../_/nitro.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "ID \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D"
    });
  }
  await db.delete(leadSources).where(eq(leadSources.id, parseInt(id))).execute();
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
