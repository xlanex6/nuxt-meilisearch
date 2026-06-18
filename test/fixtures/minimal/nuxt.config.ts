import { defineNuxtConfig } from 'nuxt/config'
import NuxtMeilisearch from '../../../src/module'

export default defineNuxtConfig({
  modules: [NuxtMeilisearch],
  compatibilityDate: '2024-07-06',
  // intentionally empty meilisearch config to test warnings
  meilisearch: {
    hostUrl: '',
    searchApiKey: '',
  },
})
