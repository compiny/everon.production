import { c as defineEventHandler, r as readBody, i as db, l as leads, f as createError } from '../../_/nitro.mjs';
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

const leads_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const newLead = await db.transaction(async (tx) => {
      const insertResult = await tx.insert(leads).values({
        message: body.message || null,
        sourceId: body.sourceId,
        name: body.name || null,
        phone: body.phone,
        email: body.email || null
      }).execute();
      const insertId = insertResult[0].insertId;
      const [lead] = await tx.select().from(leads).where(eq(leads.id, insertId));
      return lead;
    });
    return { success: true, lead: newLead };
  } catch (error) {
    console.error("Error creating lead:", error);
    if (error.code === "ER_DUP_ENTRY") {
      throw createError({
        statusCode: 409,
        message: "Lead with this phone or email already exists"
      });
    }
    throw createError({
      statusCode: 500,
      message: "Internal server error"
    });
  }
});

export { leads_post as default };
//# sourceMappingURL=leads.post.mjs.map
