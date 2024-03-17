import { instantMeiliSearch, MeilisearchConfig } from '@meilisearch/instant-meilisearch'
import { useRuntimeConfig, useNuxtApp } from '#app'

export const useInstantSearch = () => {
  const nuxtApp = useNuxtApp()

  const { meilisearchClient: { hostUrl, searchApiKey } } = useRuntimeConfig().public

  if (!nuxtApp._instantSearchClient) {
    const instantClient = instantMeiliSearch(hostUrl, searchApiKey)
    nuxtApp._instantSearchClient = instantClient.searchClient
  }

  return nuxtApp._instantSearchClient as MeilisearchConfig
}
