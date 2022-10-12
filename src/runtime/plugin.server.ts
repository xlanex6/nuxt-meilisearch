import { defineNuxtPlugin, useRuntimeConfig, useNuxtApp } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { meilisearch: { instantSearch } } = useRuntimeConfig().public

  
})
