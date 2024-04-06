import type { MeilisearchConfig } from '@meilisearch/instant-meilisearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { useNuxtApp, useRuntimeConfig } from '#app'

export function useInstantSearch() {
  const nuxtApp = useNuxtApp()

  const { meilisearchClient: { hostUrl, searchApiKey } } = useRuntimeConfig().public

  if (!nuxtApp._instantSearchClient) {
    const instantClient = instantMeiliSearch(hostUrl, searchApiKey)
    nuxtApp._instantSearchClient = instantClient.searchClient
  }

  return nuxtApp._instantSearchClient as MeilisearchConfig
}
