import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { defineNuxtPlugin, useRuntimeConfig, useNuxtApp } from '#app'


export const useMeilisearchClient = () => {
  const nuxtApp = useNuxtApp()

  const { meilisearch: { hostUrl, apiKey, options } } = useRuntimeConfig().public

  if (!nuxtApp._meilisearchClient) {
    nuxtApp._meilisearchClient = instantMeiliSearch(hostUrl, apiKey, options)
  }

  return nuxtApp._meilisearchClient
}
