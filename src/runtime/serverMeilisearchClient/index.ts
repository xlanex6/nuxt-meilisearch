import { H3Event, defineEventHandler } from 'h3'
import { MeiliSearch } from 'meilisearch'
import useConfig from './config'

export default defineEventHandler(async (event: H3Event) => {
  const { hostUrl, writeApiKey } = useConfig()
  if (!event.context.serverMeilisearchClient) {
    event.context.serverMeilisearchClient = new MeiliSearch({
      host: hostUrl,
      apiKey: writeApiKey
    })
  }

  event.context.serverMeilisearchClient
})
