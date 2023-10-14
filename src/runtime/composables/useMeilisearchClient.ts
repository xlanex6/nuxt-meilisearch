import { instantMeiliSearch, MeilisearchConfig } from '@meilisearch/instant-meilisearch'
import { useRuntimeConfig, useNuxtApp } from '#app'

export const useMeilisearchClient  = () => {
  const nuxtApp = useNuxtApp()

  const { meilisearchClient: { hostUrl, searchApiKey } } = useRuntimeConfig().public

  if (!nuxtApp._meilisearchClient) {
    nuxtApp._meilisearchClient = instantMeiliSearch(hostUrl, searchApiKey)
  }

  return nuxtApp._meilisearchClient as MeilisearchConfig
}
