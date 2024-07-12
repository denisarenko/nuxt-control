export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    storage: {
      fs: {
        driver: 'fs',
        base: './storage'
      }
    }
  }
});
