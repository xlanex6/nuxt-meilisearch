import { defineNuxtConfig } from 'nuxt/config'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch
  ],
  meilisearch: {
    hostUrl: 'http://localhost:7700',
    searchApiKey: '2c746b4e6e56e6376588f4952d35c3348487346e3380fd9e12b725bb5c259707',
    instantSearch: {
      theme: 'satellite'
    },
    serverSideUsage: true,
    adminApiKey: '9bf1e67b96d3a9aba9eceb89902cc5f81fcc065a13833052db7b5551b3b181b4'
  }
})
