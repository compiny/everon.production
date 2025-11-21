import { migrate } from 'drizzle-orm/mysql2/migrator'
import { db } from '../db/index'

async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: './server/db/migrations' })
    console.log('Migrations completed successfully')
  } catch (error) {
    console.error('Migration error:', error)
    process.exit(1)
  }
}

runMigrations()