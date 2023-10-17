import { useRuntimeConfig, useNuxtApp } from '#app'
import { MeiliSearch } from 'meilisearch'

export const useMeiliSearchRef  = () => {
  const nuxtApp = useNuxtApp()

  const { meilisearchClient: { hostUrl, searchApiKey } } = useRuntimeConfig().public

  if (!nuxtApp._meilisearchClient) {
    nuxtApp._meilisearchClient = new MeiliSearch({
      host: hostUrl,
      apiKey: searchApiKey
    })
  }

  return nuxtApp._meilisearchClient as MeiliSearch
}
