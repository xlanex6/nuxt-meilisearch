import { instantMeiliSearch, MeilisearchConfig } from '@meilisearch/instant-meilisearch'
import { useRuntimeConfig, useNuxtApp } from '#app'

export const useInstantSearch  = () => {
  const nuxtApp = useNuxtApp()

  const { meilisearchClient: { hostUrl, searchApiKey } } = useRuntimeConfig().public

  if (!nuxtApp._instantSearchClient) {
    nuxtApp._instantSearchClient = instantMeiliSearch(hostUrl, searchApiKey)
  }

  return nuxtApp._instantSearchClient as MeilisearchConfig
}
