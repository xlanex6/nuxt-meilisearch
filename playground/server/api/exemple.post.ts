import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // read from body
  const body = await readBody(event)

  // Meiliseach is available with $meilisearch

  const recordAddRes = $meilisearch(event).index('products').addDocuments(body)

  return { recordAddRes }
})
