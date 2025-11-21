import { c as defineEventHandler, j as readMultipartFormData, f as createError } from '../../_/nitro.mjs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
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

const upload_post = defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event);
    const imageFile = files?.find((file) => file.name === "image");
    if (!imageFile) {
      throw createError({
        statusCode: 400,
        message: "\u0424\u0430\u0439\u043B \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    const timestamp = Date.now();
    const extension = imageFile.filename?.split(".").pop() || "png";
    const fileName = `image-${timestamp}.${extension}`;
    const uploadPath = join(process.cwd(), "public", "uploads", fileName);
    await writeFile(uploadPath, imageFile.data);
    return {
      imageUrl: `/uploads/${fileName}`
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"
    });
  }
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
