export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  nitro: {
    storage: {
      fs: {
        driver: 'fs',
        base: './storage'
      }
    }
  }
});
