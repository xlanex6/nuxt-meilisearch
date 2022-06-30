import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['nuxt-meilisearch'],
  meilisearch: {
    hostUrl: process.env.MEILI_HOST,
    apiKey: process.env.MEILI_MASTER_KEY,
    instantSearch: {
      theme: 'satellite'
    } // default true
  }
})
