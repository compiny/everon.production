import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { users, type User, type NewUser } from '../../db/schema'
import bcrypt from 'bcryptjs'

class UserModel {
  // Создание пользователя
  async create(userData: Omit<NewUser, 'id' | 'createdAt' | 'updatedAt'>) {
    const { username, password } = userData

    // Хеширование пароля
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const [user] = await db.insert(users).values({
      username,
      password: hashedPassword,
    }).execute()

    return this.findById(user.insertId)
  }

  // Поиск пользователя по ID
  async findById(id: number) {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.id, id))
      .execute()

    return user || null
  }

  // Поиск пользователя по email
  async findByEmail(email: string) {
    const [user] = await db.select()
      .from(users)
      .execute()

    return user || null
  }

  // Поиск пользователя по username
  async findByUsername(username: string) {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.username, username))
      .execute()

    return user || null
  }

  // Проверка пароля
  async verifyPassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }

  // Получение всех пользователей
  async findAll() {
    return await db.select({
      id: users.id,
      username: users.username,
      createdAt: users.createdAt
    })
      .from(users)
      .orderBy(users.createdAt)
      .execute()
  }

  // Обновление пользователя
  async update(id: number, userData: Partial<Omit<User, 'id' | 'password' | 'createdAt'>>) {
    await db.update(users)
      .set(userData)
      .where(eq(users.id, id))
      .execute()

    return this.findById(id)
  }

  // Удаление пользователя
  async delete(id: number) {
    await db.delete(users)
      .where(eq(users.id, id))
      .execute()

    return true
  }
}

export default new UserModel()