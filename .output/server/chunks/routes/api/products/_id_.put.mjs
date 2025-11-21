import { c as defineEventHandler, h as getRouterParam, f as createError, j as readMultipartFormData, i as db, q as products } from '../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import { unlink, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';
import { existsSync } from 'fs';
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
    if (!id) throw createError({ statusCode: 400, message: "ID \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D" });
    const parts = await readMultipartFormData(event);
    if (!parts || parts.length === 0) throw createError({ statusCode: 400, message: "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445" });
    const formData = {};
    let mainImageFile = null;
    const galleryFiles = [];
    let existingGallery = [];
    let removedGallery = [];
    let attributes = [];
    for (const part of parts) {
      if (part.name === "mainImage" && part.filename) {
        mainImageFile = part;
      } else if (part.name === "galleryFiles" && part.filename) {
        galleryFiles.push(part);
      } else if (part.name === "existingGallery") {
        try {
          existingGallery = JSON.parse(part.data.toString("utf-8"));
          if (!Array.isArray(existingGallery)) existingGallery = [];
        } catch {
          existingGallery = [];
        }
      } else if (part.name === "removedGallery") {
        try {
          removedGallery = JSON.parse(part.data.toString("utf-8"));
          if (!Array.isArray(removedGallery)) removedGallery = [];
        } catch {
          removedGallery = [];
        }
      } else if (part.name === "attributes") {
        try {
          attributes = JSON.parse(part.data.toString("utf-8"));
          if (!Array.isArray(attributes)) attributes = [];
        } catch {
          attributes = [];
        }
      } else if (part.name) {
        formData[part.name] = part.data.toString("utf-8");
      }
    }
    if (!formData.name || !formData.slug || formData.price === void 0 || formData.price === "") {
      throw createError({ statusCode: 400, message: "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B \u043F\u043E\u043B\u044F: name, slug, price" });
    }
    const [existingProduct] = await db.select().from(products).where(eq(products.id, parseInt(id)));
    if (!existingProduct) throw createError({ statusCode: 404, message: "\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" });
    if (removedGallery.length > 0) {
      for (const imagePath of removedGallery) {
        const fullPath = join(process.cwd(), "public", imagePath);
        if (existsSync(fullPath)) {
          await unlink(fullPath);
        }
      }
    }
    let mainImageUrl = existingProduct.mainImage;
    if (mainImageFile) {
      if (existingProduct.mainImage) {
        const oldImagePath = join(process.cwd(), "public", existingProduct.mainImage);
        if (existsSync(oldImagePath)) {
          await unlink(oldImagePath);
        }
      }
      const uploadsDir = join(process.cwd(), "public", "uploads", "products");
      await mkdir(uploadsDir, { recursive: true });
      const ext = mainImageFile.filename.split(".").pop();
      const filename = `${nanoid()}.${ext}`;
      const filepath = join(uploadsDir, filename);
      await writeFile(filepath, mainImageFile.data);
      mainImageUrl = `/uploads/products/${filename}`;
    } else if (formData.removeMainImage === "true") {
      if (existingProduct.mainImage) {
        const oldImagePath = join(process.cwd(), "public", existingProduct.mainImage);
        if (existsSync(oldImagePath)) {
          await unlink(oldImagePath);
        }
      }
      mainImageUrl = null;
    }
    const newGalleryUrls = [];
    if (galleryFiles.length > 0) {
      const uploadsDir = join(process.cwd(), "public", "uploads", "gallery");
      await mkdir(uploadsDir, { recursive: true });
      for (const file of galleryFiles) {
        const ext = file.filename?.split(".").pop() || "jpg";
        const filename = `${nanoid()}.${ext}`;
        const filepath = join(uploadsDir, filename);
        await writeFile(filepath, file.data);
        newGalleryUrls.push(`/uploads/gallery/${filename}`);
      }
    }
    const galleryList = [...existingGallery, ...newGalleryUrls];
    const updateData = {
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      price: parseInt(formData.price),
      mainImage: mainImageUrl,
      gallery: galleryList.length > 0 ? JSON.stringify(galleryList) : null,
      seoTitle: formData.seoTitle?.trim() || null,
      seoDescription: formData.seoDescription?.trim() || null,
      description: formData.description?.trim() || null,
      updatedAt: /* @__PURE__ */ new Date(),
      attributes: attributes.length > 0 ? JSON.stringify(attributes) : null
    };
    if (formData.categoryId !== void 0) {
      updateData.categoryId = formData.categoryId === "" ? null : parseInt(formData.categoryId);
    }
    await db.update(products).set(updateData).where(eq(products.id, parseInt(id)));
    const [updatedProduct] = await db.select().from(products).where(eq(products.id, parseInt(id)));
    if (!updatedProduct) throw createError({ statusCode: 404, message: "\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u043F\u043E\u0441\u043B\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F" });
    return {
      success: true,
      product: updatedProduct,
      message: "\u0422\u043E\u0432\u0430\u0440 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D"
    };
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0442\u043E\u0432\u0430\u0440\u0430:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u0442\u043E\u0432\u0430\u0440\u0430"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
