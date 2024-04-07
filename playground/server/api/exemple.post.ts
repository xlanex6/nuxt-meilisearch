import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // read from body
  const body = await readBody(event)

  // Meiliseach is available with $meilisearch

  const recordAddRes = $meilisearch.index('books').addDocuments(body)

  return recordAddRes
})
