import { i as db, w as users, c as defineEventHandler, r as readBody, f as createError } from '../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
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

class UserModel {
  // Создание пользователя
  async create(userData) {
    const { username, password } = userData;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [user] = await db.insert(users).values({
      username,
      password: hashedPassword
    }).execute();
    return this.findById(user.insertId);
  }
  // Поиск пользователя по ID
  async findById(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id)).execute();
    return user || null;
  }
  // Поиск пользователя по email
  async findByEmail(email) {
    const [user] = await db.select().from(users).execute();
    return user || null;
  }
  // Поиск пользователя по username
  async findByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username)).execute();
    return user || null;
  }
  // Проверка пароля
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
  // Получение всех пользователей
  async findAll() {
    return await db.select({
      id: users.id,
      username: users.username,
      createdAt: users.createdAt
    }).from(users).orderBy(users.createdAt).execute();
  }
  // Обновление пользователя
  async update(id, userData) {
    await db.update(users).set(userData).where(eq(users.id, id)).execute();
    return this.findById(id);
  }
  // Удаление пользователя
  async delete(id) {
    await db.delete(users).where(eq(users.id, id)).execute();
    return true;
  }
}
const User = new UserModel();

const index_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.username || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Username, email and password are required"
      });
    }
    const existingUser = await User.findByEmail(body.email);
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: "User with this email already exists"
      });
    }
    const user = await User.create(body);
    return {
      success: true,
      data: user
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Internal Server Error"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post4.mjs.map
