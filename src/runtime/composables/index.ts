import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { useRuntimeConfig, useNuxtApp } from '#app'

export const useMeilisearchClient = () => {
  const nuxtApp = useNuxtApp()

  const { meilisearchClient: { hostUrl, searchApiKey, clientOptions } } = useRuntimeConfig().public

  if (!nuxtApp._meilisearchClient) {
    nuxtApp._meilisearchClient = instantMeiliSearch(hostUrl, searchApiKey, clientOptions)
  }

  return nuxtApp._meilisearchClient
}
