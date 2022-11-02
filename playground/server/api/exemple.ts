import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // Meilisearch is binded into Nitro Context
  const { serverMeilisearchClient } = event.context

  // search document in index
  const result = await serverMeilisearchClient.index('movies').search('botman')

  // add document into index
  // Full documentation on https://docs.meilisearch.com/learn/getting_started/quick_start.html#add-documents
  // const addRecordRes = await serverMeilisearchClient.index('movies').addDocuments(
  //   {
  //     id: 999999994234,
  //     title: 'Batman Unmasked: The Psychology of the Dark Knight',
  //     poster: 'https://image.tmdb.org/t/p/w1280/jjHu128XLARc2k4cJrblAvZe0HE.jpg',
  //     overview: 'Delve into the world of Batman and the vigilante justice tha',
  //     release_date: '2008-07-15'
  //   }
  // )

  return { result }
})
