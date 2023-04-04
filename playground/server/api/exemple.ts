import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // Meilisearch is binded into Nitro Context
  const { serverMeilisearchClient } = event.context

  // search document in index
  // const result = await serverMeilisearchClient.index('movies').search('botman')

  // add document into index
  // Full documentation on https://docs.meilisearch.com/learn/getting_started/quick_start.html#add-documents

  const addRecordRes = await serverMeilisearchClient.index('books').addDocuments(
    {
      id: 999,
      title: 'Le Petit du kacker',
      author: 'Alex DUVAL',
      genre: 'training',
      price: 0
    }
  )

  return { shouldBe200: true }
})
