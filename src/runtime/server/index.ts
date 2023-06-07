import { H3Event, defineEventHandler } from 'h3'
import { MeiliSearch } from 'meilisearch'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event: H3Event) => {
  const { hostUrl, adminApiKey } = useRuntimeConfig().serverMeilisearchClient
  if (!event.context.serverMeilisearchClient) {
    event.context.serverMeilisearchClient = new MeiliSearch({
      host: hostUrl,
      apiKey: adminApiKey
    })
  }

  event.context.serverMeilisearchClient
})
