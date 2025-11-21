# Используем официальный Node.js образ
FROM node:20-alpine AS build

# Рабочая директория
WORKDIR /app

# Копируем только манифесты сначала (лучше кеширование)
COPY package*.json ./

# Устанавливаем все зависимости (dev + prod)
RUN npm ci && npm cache clean --force

# Копируем исходный код
COPY . .

# Сборка приложения (включает nuxt prepare)
RUN npm run build

# Production этап (только runtime зависимости)
FROM node:20-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxt -u 1001

# Устанавливаем su-exec для переключения пользователя в entrypoint
RUN apk add --no-cache su-exec

# Копируем манифесты
COPY package*.json ./

# Устанавливаем только production зависимости и отключаем postinstall-скрипты
ENV npm_config_loglevel=warn \
    NPM_CONFIG_UPDATE_NOTIFIER=false
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Копируем собранное приложение и статические файлы
COPY --from=build --chown=nuxt:nodejs /app/.output ./.output
COPY --from=build --chown=nuxt:nodejs /app/public ./public

# Создаем директорию uploads с правильными правами
RUN mkdir -p /app/public/uploads && chown -R nuxt:nodejs /app/public/uploads

# Копируем скрипты для миграций
COPY --chown=nuxt:nodejs server/migrate.ts ./
COPY --chown=nuxt:nodejs db ./db
COPY --chown=nuxt:nodejs migrations ./migrations
COPY --chown=nuxt:nodejs drizzle.config.ts ./

# Копируем entrypoint скрипт и делаем его исполняемым
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Открываем порт
EXPOSE 3000

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Устанавливаем entrypoint (будет запускаться от root для исправления прав)
ENTRYPOINT ["docker-entrypoint.sh"]

# Запускаем приложение (будет переключение на пользователя nuxt в entrypoint)
CMD ["node", ".output/server/index.mjs"]
