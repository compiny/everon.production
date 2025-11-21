import { c as defineEventHandler, f as createError, i as db, l as leads, k as productLeads } from '../../../_/nitro.mjs';
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
  const paramId = event.context.params?.id;
  if (!paramId) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
    });
  }
  const id = parseInt(paramId);
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ID \u0437\u0430\u044F\u0432\u043A\u0438"
    });
  }
  const existingLead = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  if (existingLead.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
    });
  }
  try {
    await db.delete(productLeads).where(eq(productLeads.leadId, id));
  } catch (error) {
    console.log("No product_leads to delete or table doesnt exist");
  }
  await db.delete(leads).where(eq(leads.id, id));
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
