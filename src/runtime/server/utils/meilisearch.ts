import { Meilisearch } from 'meilisearch'
import { useRuntimeConfig } from '#imports'
import type { H3Event } from 'h3'

let _meilisearchClient: Meilisearch

export function $meilisearch(event: H3Event) {
  const { serverMeilisearchClient: { hostUrl, adminApiKey } } = useRuntimeConfig(event)

  if (!_meilisearchClient) {
    _meilisearchClient = new Meilisearch({
      host: hostUrl,
      apiKey: adminApiKey,
    })
  }

  return _meilisearchClient
}
