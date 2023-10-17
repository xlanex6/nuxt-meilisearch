import { useAsyncData } from '#imports'
import { useMeiliSearchRef } from './useMeiliSearchRef'
import { SearchParams } from 'meilisearch'

export type AsyncSearchParams = {
  index: string,
  query?: string,
  params?: SearchParams
}

export async function useAsyncMeiliSearch({ index, query, params }: AsyncSearchParams) {


  if (!index) throw new Error('`[nuxt-meilisearch]` Cannot search  without `index`')

  const client = useMeiliSearchRef()

  const result = await useAsyncData(`${index}-async-search-result`, async () => {
    return await client.index(index).search(query, params)
  })
  
  return result
}
