import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { useRuntimeConfig, useNuxtApp } from '#app'

export const useMeilisearchClient = () => {
  const nuxtApp = useNuxtApp()

  const { meilisearchClient: { hostUrl, searchApiKey, options } } = useRuntimeConfig().public

  if (!nuxtApp._meilisearchClient) {
    nuxtApp._meilisearchClient = instantMeiliSearch(hostUrl, searchApiKey, options)
  }

  return nuxtApp._meilisearchClient as ReturnType<typeof instantMeiliSearch>
}
