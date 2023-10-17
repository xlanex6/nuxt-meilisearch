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
    serverSideUsage: true,
    adminApiKey: 'bfcb4330385d222886e29fed1721b8107acdba8043a4bf0738eb6d10ccbb5dfb'
  }
})
