import { c as defineEventHandler, r as readBody, e as setCookie, f as createError } from '../../../_/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  if (username === "admin" && password === "admin") {
    setCookie(event, "auth-token", "authenticated", {
      path: "/",
      httpOnly: true
    });
    return {
      success: true,
      user: { id: 1, username: "admin", isAdmin: true }
    };
  }
  throw createError({
    statusCode: 401,
    message: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0443\u0447\u0435\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435"
  });
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
