import { defineNuxtConfig } from 'nuxt/config'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch, '@nuxt/ui'
  ],
  meilisearch: {
    hostUrl: 'http://localhost:7700',
    searchApiKey: 'c0fe8e1b418fe186343ba29b6d6c0c2602a03ba6327668e4e5fb64a1c8b4031b',
    instantSearch: {
      theme: 'satellite'
    },
    serverSideUsage: false,
    adminApiKey: '60aa0d273dce7d47e83c574dfea5559eadcc9e989f7226d8edddd58faf2ab59d'
  }
})
