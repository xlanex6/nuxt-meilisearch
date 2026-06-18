export default defineEventHandler(async (event) => {
  const client = $meilisearch(event)
  const result = await client.index('books').search('test')
  return result
})
