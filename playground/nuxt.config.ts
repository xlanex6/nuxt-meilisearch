import { defineNuxtConfig } from 'nuxt'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch
  ],
  meilisearch: {
    hostUrl: 'http://0.0.0.0:7700',
    apiKey: 'xxx',
    instantSearch: true // default true
  }
})
