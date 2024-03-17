import { MeiliSearch } from 'meilisearch'
import { useRuntimeConfig } from '#imports'

const { serverMeilisearchClient: { hostUrl, adminApiKey } } = useRuntimeConfig()

export const $meilisearch = new MeiliSearch({
  host: hostUrl,
  apiKey: adminApiKey
})
