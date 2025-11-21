import { c as defineEventHandler, f as createError, i as db, l as leads } from '../../../_/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  try {
    const params = event.context.params;
    if (!params || typeof params !== "object") {
      throw createError({
        statusCode: 400,
        message: "Invalid parameters"
      });
    }
    const { id } = params;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID parameter is required"
      });
    }
    const leadId = parseInt(id);
    if (isNaN(leadId)) {
      throw createError({
        statusCode: 400,
        message: "Invalid ID format"
      });
    }
    const lead = await db.select().from(leads).where(eq(leads.id, leadId)).execute();
    if (lead.length === 0) {
      throw createError({
        statusCode: 404,
        message: "Lead not found"
      });
    }
    return {
      success: true,
      lead: lead[0]
    };
  } catch (error) {
    console.error("Error fetching lead:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
