import { c as defineEventHandler, i as db, v as leadSources, f as createError } from '../../_/nitro.mjs';
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
    const allSources = await db.select().from(leadSources).orderBy(desc(leadSources.createdAt)).execute();
    return {
      sources: allSources,
      count: allSources.length
    };
  } catch (error) {
    console.error("Error fetching lead sources:", error);
    throw createError({
      statusCode: 500,
      message: "Internal server error"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
