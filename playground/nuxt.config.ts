import { defineNuxtConfig } from 'nuxt'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch
  ],
  meilisearch: {
    meilisearchUrl: '',
    apiKey: '',
  }
})
