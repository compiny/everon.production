#!/bin/sh
set -e

# Исправляем права доступа к директории uploads
# Это нужно делать от root, так как пользователь nuxt не может менять права
if [ -d "/app/public/uploads" ]; then
    # Пытаемся исправить права доступа
    # Если директория монтируется как volume, права могут быть неправильными
    chown -R nuxt:nodejs /app/public/uploads 2>/dev/null || true
    chmod -R 755 /app/public/uploads 2>/dev/null || true
fi

# Создаем поддиректории, если их нет
mkdir -p /app/public/uploads/categories /app/public/uploads/products /app/public/uploads/gallery 2>/dev/null || true
chown -R nuxt:nodejs /app/public/uploads 2>/dev/null || true
chmod -R 755 /app/public/uploads 2>/dev/null || true

# Переключаемся на пользователя nuxt и запускаем команду
exec su-exec nuxt "$@"

