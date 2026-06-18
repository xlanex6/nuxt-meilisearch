import { defineNuxtConfig } from 'nuxt/config'
import NuxtMeilisearch from '../../../src/module'

export default defineNuxtConfig({
  modules: [NuxtMeilisearch],
  compatibilityDate: '2024-07-06',
  meilisearch: {
    hostUrl: 'http://meilisearch.test',
    searchApiKey: 'test-search-key',
    serverSideUsage: false,
  },
})
