import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['nuxt-meilisearch'],
  meilisearch: {
    hostUrl: 'http://localhost:7700',
    apiKey: process.env.MEILI_MASTER_KEY,
    instantSearch: {
      theme: 'satellite'
    } // default true
  }
})
