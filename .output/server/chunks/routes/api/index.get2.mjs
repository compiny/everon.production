import { c as defineEventHandler, i as db, l as leads, k as productLeads, f as createError } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  try {
    const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).execute();
    const productLeadsData = await db.select().from(productLeads).execute();
    const productLeadsMap = /* @__PURE__ */ new Map();
    productLeadsData.forEach((item) => {
      if (!productLeadsMap.has(item.leadId)) {
        productLeadsMap.set(item.leadId, []);
      }
      productLeadsMap.get(item.leadId).push(item.productId);
    });
    const enrichedLeads = allLeads.map((lead) => ({
      ...lead,
      productIds: productLeadsMap.get(lead.id) || []
    }));
    return {
      leads: enrichedLeads,
      count: enrichedLeads.length
    };
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw createError({
      statusCode: 500,
      message: "Internal server error"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
