import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // Meilisearch is binded into Nitro Context
  const serverMeilisearchClient = event.context.serverMeilisearchClient

  // read from body 
  const body = await readBody(event)

  const addRecordRes = await serverMeilisearchClient.index('movies').addDocuments(body)

  return { addRecordRes }
})
