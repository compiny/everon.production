#!/bin/bash

# Database backup script
# Usage: docker-compose --profile backup up backup

set -e

# Configuration
DB_HOST="mysql"
DB_NAME="${DB_NAME:-everon_db}"
DB_USER="${DB_USER:-everon_user}"
DB_PASSWORD="${DB_PASSWORD:-everon_password}"
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/backup_${DB_NAME}_${DATE}.sql"

echo "🔄 Starting database backup..."

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
until mysql -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1" >/dev/null 2>&1; do
  echo "Waiting for MySQL..."
  sleep 2
done

echo "✅ MySQL is ready!"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create database backup
echo "📦 Creating backup: $BACKUP_FILE"
mysqldump -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASSWORD" \
  --single-transaction \
  --routines \
  --triggers \
  --events \
  --hex-blob \
  --add-drop-database \
  --databases "$DB_NAME" > "$BACKUP_FILE"

# Compress backup
echo "🗜️ Compressing backup..."
gzip "$BACKUP_FILE"
BACKUP_FILE="${BACKUP_FILE}.gz"

# Check if backup was created successfully
if [ -f "$BACKUP_FILE" ]; then
  echo "✅ Backup created successfully: $BACKUP_FILE"
  echo "📊 Backup size: $(du -h "$BACKUP_FILE" | cut -f1)"
else
  echo "❌ Backup failed!"
  exit 1
fi

# Clean up old backups (keep last 7 days)
echo "🧹 Cleaning up old backups..."
find "$BACKUP_DIR" -name "backup_${DB_NAME}_*.sql.gz" -mtime +7 -delete

echo "🎉 Backup process completed!"

