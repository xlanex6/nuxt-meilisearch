import { defineNuxtConfig } from 'nuxt'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch
  ],
  meilisearch: {
    hostUrl: 'http://0.0.0.0:7700',
    readApiKey: '<your_public_key>',
    writeApiKey: '<your_secret_key>',
    serverSideUsage: true,
    instantSearch: {
      theme: 'algolia'
    }
  }
})
