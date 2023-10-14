import { useRuntimeConfig } from '#imports'
import { MeiliSearch } from 'meilisearch'

const { serverMeilisearchClient: { hostUrl, adminApiKey, meilisearchConfig } } = useRuntimeConfig()

export const $meilisearch = new MeiliSearch({
  host: hostUrl,
  apiKey: adminApiKey,
  meilisearchConfig
})
