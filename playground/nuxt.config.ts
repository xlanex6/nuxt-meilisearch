import { defineNuxtConfig } from 'nuxt/config'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch
  ],
  meilisearch: {
    hostUrl: 'https://ms-15a4f248a340-186.fra.meilisearch.io',
    searchApiKey: 'e88fb878569817bdba1d0093cebd41850ce07a44ee457f11fbde9411b1d24cd5',
    instantSearch: {
      theme: 'satellite'
    },
    serverSideUsage: true,
    adminApiKey: 'masterKey'
  }
})
