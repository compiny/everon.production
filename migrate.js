#!/usr/bin/env node

const { drizzle } = require('drizzle-orm/mysql2');
const mysql = require('mysql2/promise');
const { migrate } = require('drizzle-orm/mysql2/migrator');
const path = require('path');

async function runMigrations() {
  console.log('🔄 Starting database migrations...');
  
  try {
    // Создаем соединение с базой данных
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'mysql',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'everon_user',
      password: process.env.DB_PASSWORD || 'everon_password',
      database: process.env.DB_NAME || 'everon_db',
    });

    // Создаем Drizzle клиент
    const db = drizzle(connection, { mode: 'default' });

    // Выполняем миграции
    await migrate(db, {
      migrationsFolder: path.join(__dirname, 'migrations'),
    });

    console.log('✅ Database migrations completed successfully!');
    
    // Закрываем соединение
    await connection.end();
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Запускаем миграции
runMigrations();

