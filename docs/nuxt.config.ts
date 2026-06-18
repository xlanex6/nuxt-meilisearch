export default defineNuxtConfig({
  extends: ['docus'],
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://nuxt-meilisearch.vercel.app',
    name: 'Nuxt Meilisearch',
  },
  llms: {
    domain: 'https://nuxt-meilisearch.vercel.app',
  },
  nitro: {
    preset: 'vercel',
  },
})
