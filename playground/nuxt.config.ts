import { defineNuxtConfig } from 'nuxt/config'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch
  ],
  meilisearch: {
    hostUrl: 'http://localhost:7700',
    searchApiKey: 'g1DP1Sd0YdvLIW8Qli9e4iV5taFxglg0CmnZckhhOR0',
    instantSearch: {
      theme: 'satellite'
    },
    serverSideUsage: true,
    adminApiKey: 'g1DP1Sd0YdvLIW8Qli9e4iV5taFxglg0CmnZckhhOR0'
  }
})
