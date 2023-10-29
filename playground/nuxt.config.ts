import { defineNuxtConfig } from 'nuxt/config'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch, '@nuxt/ui'
  ],
  meilisearch: {
    hostUrl: 'http://localhost:7700',
    searchApiKey: '2c746b4e6e56e6376588f4952d35c3348487346e3380fd9e12b725bb5c259707',
    instantSearch: {
      theme: 'satellite'
    },
    serverSideUsage: true,
    adminApiKey: 'bfcb4330385d222886e29fed1721b8107acdba8043a4bf0738eb6d10ccbb5dfb'
  }
})
