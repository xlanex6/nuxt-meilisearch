import { defineNuxtPlugin, useRuntimeConfig, useNuxtApp } from '#app'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

export default defineNuxtPlugin((nuxtApp) => {

  const { meilisearch: {hostUrl, apiKey}} = useRuntimeConfig().public

  if (!nuxtApp._meilisearchClient) {
    // options should be types
    nuxtApp._meilisearchClient = instantMeiliSearch(hostUrl,apiKey, {})
  }
  // const searchClient = instantMeiliSearch(
  //   'https://integration-demos.meilisearch.com',
  //   'q7QHwGiX841a509c8b05ef29e55f2d94c02c00635f729ccf097a734cbdf7961530f47c47',
  //   {
  //     paginationTotalHits: 30, // default: 200.
  //     placeholderSearch: false, // default: true.
  //     primaryKey: 'id', // default: undefined
  //     // ...
  //   }
  // )
  console.log('Plugin is loaded...')
  return nuxtApp._meilisearchClient
})
