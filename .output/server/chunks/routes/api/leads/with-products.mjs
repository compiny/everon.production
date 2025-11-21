import { c as defineEventHandler, r as readBody, f as createError, i as db, l as leads, k as productLeads } from '../../../_/nitro.mjs';
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

const withProducts = defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const { name, phone, email, productIds, message, sourceId = 4 } = body;
    if (!phone) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D"
      });
    }
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u044B \u0442\u043E\u0432\u0430\u0440\u044B"
      });
    }
    const [lead] = await db.insert(leads).values({
      name,
      phone,
      email,
      message,
      sourceId
    }).$returningId();
    const productLeadValues = productIds.map((productId) => ({
      leadId: lead.id,
      productId
    }));
    await db.insert(productLeads).values(productLeadValues);
    return {
      success: true,
      leadId: lead.id,
      message: "\u0417\u0430\u044F\u0432\u043A\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0430"
    };
  } catch (error) {
    console.error("Error creating lead with products:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0437\u0430\u044F\u0432\u043A\u0438"
    });
  }
});

export { withProducts as default };
//# sourceMappingURL=with-products.mjs.map
