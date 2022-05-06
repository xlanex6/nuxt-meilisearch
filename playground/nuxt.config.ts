import { defineNuxtConfig } from 'nuxt'
import NuxtMeilisearch from '..'

export default defineNuxtConfig({
  modules: [
    NuxtMeilisearch
  ],
  meilisearch: {
    hostUrl: 'https://search.capital-patrimoine.fr',
    apiKey: 'ZGNhMjk3NzEzNjkwYTE5NjBlZGVjZDVm',
  }
})
