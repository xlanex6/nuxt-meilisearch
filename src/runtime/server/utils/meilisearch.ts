import { useRuntimeConfig } from '#imports'
import { MeiliSearch } from 'meilisearch'

const { serverMeilisearchClient: { hostUrl, adminApiKey } } = useRuntimeConfig()

export const $meilisearch = new MeiliSearch({
  host: hostUrl,
  apiKey: adminApiKey
})
