import { defineNuxtConfig } from 'nuxt/config'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch
  ],
  meilisearch: {
    hostUrl: 'http://localhost:7700',
    searchApiKey: 'f6e199036b79a555e58feba859ee5fd9be6c8f9a78b8be9a41aa9d8822fc4091',
    instantSearch: {
      theme: 'satellite'
    },
    serverSideUsage: true,
    adminApiKey: '9bf1e67b96d3a9aba9eceb89902cc5f81fcc065a13833052db7b5551b3b181b4'
  }
})
