export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image'],
  css: [
    '~/assets/css/styles.css',
    '~/assets/css/fonts.css'
  ],
  runtimeConfig: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SECRET,
    public: {
      yandexStaticApiKey: process.env.NUXT_PUBLIC_YANDEX_STATIC_API_KEY,
    }
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        target: 'ES2022',
        module: 'ES2022',
        moduleResolution: 'bundler'
      }
    }
  },
  
  nitro: {
    esbuild: {
      options: {
        target: 'es2022'
      }
    }
  },
  
  vite: {
    esbuild: {
      target: 'es2022'
    }
  }
})