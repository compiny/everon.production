import { c as defineEventHandler, j as readMultipartFormData, f as createError, i as db, p as productGroups } from '../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';
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
    const parts = await readMultipartFormData(event);
    if (!parts) throw createError({ statusCode: 400, message: "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445" });
    const formData = {};
    let imageFile = null;
    for (const part of parts) {
      if (part.name === "image" && part.filename) {
        imageFile = part;
      } else if (part.name) {
        formData[part.name] = part.data.toString("utf-8");
      }
    }
    const { name, slug, parentId, id } = formData;
    if (!name || !slug) throw createError({ statusCode: 400, message: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 slug \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B" });
    let imageUrl = formData.imageUrl || "";
    if (imageFile) {
      const uploadsDir = join(process.cwd(), "public", "uploads", "categories");
      await mkdir(uploadsDir, { recursive: true });
      const fileExtension = imageFile.filename.split(".").pop();
      const fileName = `${nanoid()}.${fileExtension}`;
      const filePath = join(uploadsDir, fileName);
      await writeFile(filePath, imageFile.data);
      imageUrl = `/uploads/categories/${fileName}`;
    }
    const dbData = {
      name,
      slug,
      imageUrl: imageUrl || null,
      seoTitle: formData.seoTitle || null,
      seoDescription: formData.seoDescription || null,
      description: formData.description || null,
      parentId: parentId ? parseInt(parentId) : null,
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (id) {
      await db.update(productGroups).set(dbData).where(eq(productGroups.id, parseInt(id)));
    } else {
      await db.insert(productGroups).values(dbData);
    }
    return { success: true, imageUrl };
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
