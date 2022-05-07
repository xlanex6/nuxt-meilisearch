import { defineNuxtPlugin, useRuntimeConfig, useNuxtApp } from '#app'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

export default defineNuxtPlugin((nuxtApp) => {

  const { meilisearch: {hostUrl, apiKey, options}} = useRuntimeConfig().public

  if (!nuxtApp._meilisearchClient) {
    nuxtApp._meilisearchClient = instantMeiliSearch(hostUrl,apiKey, options)
  }

  return nuxtApp._meilisearchClient
})
