import { c as defineEventHandler, j as readMultipartFormData, f as createError, i as db, q as products } from '../../_/nitro.mjs';
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
    let mainImageFile = null;
    const galleryFiles = [];
    for (const part of parts) {
      if (part.name === "mainImage" && part.filename) {
        mainImageFile = part;
      } else if (part.name === "galleryFiles" && part.filename) {
        galleryFiles.push(part);
      } else if (part.name) {
        formData[part.name] = part.data.toString("utf-8");
      }
    }
    const {
      id,
      name,
      slug,
      price,
      seoTitle,
      seoDescription,
      description,
      categoryId
    } = formData;
    if (!name || !slug || !price) {
      throw createError({ statusCode: 400, message: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435, slug \u0438 \u0446\u0435\u043D\u0430 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B" });
    }
    let attributes = [];
    if (formData.attributes) {
      attributes = JSON.parse(formData.attributes);
    }
    let mainImageUrl = formData.mainImage || null;
    if (mainImageFile) {
      const uploadsDir = join(process.cwd(), "public", "uploads", "products");
      await mkdir(uploadsDir, { recursive: true });
      const ext = mainImageFile.filename.split(".").pop();
      const filename = `${nanoid()}.${ext}`;
      const filepath = join(uploadsDir, filename);
      await writeFile(filepath, mainImageFile.data);
      mainImageUrl = `/uploads/products/${filename}`;
    }
    const galleryUrls = [];
    if (galleryFiles.length > 0) {
      const uploadsDir = join(process.cwd(), "public", "uploads", "gallery");
      await mkdir(uploadsDir, { recursive: true });
      for (const file of galleryFiles) {
        const ext = file.filename.split(".").pop();
        const filename = `${nanoid()}.${ext}`;
        const filepath = join(uploadsDir, filename);
        await writeFile(filepath, file.data);
        galleryUrls.push(`/uploads/gallery/${filename}`);
      }
    }
    let galleryList = [];
    if (formData.existingGallery) {
      galleryList = JSON.parse(formData.existingGallery);
    }
    galleryList = galleryList.concat(galleryUrls);
    const dbData = {
      name,
      slug,
      price: parseInt(price),
      mainImage: mainImageUrl,
      gallery: galleryList.length > 0 ? JSON.stringify(galleryList) : null,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      description: description || null,
      categoryId: categoryId ? parseInt(categoryId) : null,
      updatedAt: /* @__PURE__ */ new Date(),
      attributes: attributes.length > 0 ? JSON.stringify(attributes) : null
    };
    let productId;
    if (id) {
      productId = parseInt(id);
      await db.update(products).set(dbData).where(eq(products.id, productId));
    } else {
      const result = await db.insert(products).values({
        ...dbData,
        createdAt: /* @__PURE__ */ new Date()
      });
      productId = result[0].insertId;
    }
    return {
      success: true,
      product: { id: productId, ...dbData }
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
