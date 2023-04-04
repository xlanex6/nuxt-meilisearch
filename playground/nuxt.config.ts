import { defineNuxtConfig } from 'nuxt/config'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch
  ],
  meilisearch: {
    hostUrl: 'http://0.0.0.0:7700',
    searchApiKey: '<your_public_key>',
    instantSearch: {
      theme: 'satellite'
    },
    serverSideUsage: true,
    adminApiKey: '<your_secret_key>'
  }
})
