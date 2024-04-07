import { MeiliSearch } from 'meilisearch'
import { useNuxtApp, useRuntimeConfig } from '#app'

export function useMeiliSearchRef() {
  const nuxtApp = useNuxtApp()

  const { meilisearchClient: { hostUrl, searchApiKey } } = useRuntimeConfig().public

  if (!nuxtApp._meilisearchClient) {
    nuxtApp._meilisearchClient = new MeiliSearch({
      host: hostUrl,
      apiKey: searchApiKey,
    })
  }

  return nuxtApp._meilisearchClient as MeiliSearch
}
