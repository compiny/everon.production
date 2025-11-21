import { c as defineEventHandler, h as getRouterParam, f as createError, r as readBody, i as db, p as productGroups } from '../../../_/nitro.mjs';
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
    console.log("ID from router:", id);
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D"
      });
    }
    const body = await readBody(event);
    console.log("Request body:", body);
    if (!body.name?.trim()) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"
      });
    }
    const updateData = {
      name: body.name.trim(),
      slug: body.slug?.trim(),
      imageUrl: body.imageUrl?.trim() || null,
      seoTitle: body.seoTitle?.trim() || null,
      seoDescription: body.seoDescription?.trim() || null,
      description: body.description?.trim() || null,
      parentId: body.parentId ? parseInt(body.parentId) : null,
      updatedAt: /* @__PURE__ */ new Date()
    };
    await db.update(productGroups).set(updateData).where(eq(productGroups.id, parseInt(id)));
    const [updatedGroup] = await db.select().from(productGroups).where(eq(productGroups.id, parseInt(id)));
    if (!updatedGroup) {
      throw createError({
        statusCode: 404,
        message: "\u0413\u0440\u0443\u043F\u043F\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
      });
    }
    return updatedGroup;
  } catch (error) {
    console.error("Error updating category:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
