import type { SearchParams } from 'meilisearch'
import { useMeiliSearchRef } from './useMeiliSearchRef'
import { useAsyncData } from '#imports'

export interface AsyncSearchParams {
  index: string
  query?: string
  params?: SearchParams
}

export async function useAsyncMeiliSearch<T>({ index, query, params }: AsyncSearchParams) {
  if (!index)
    throw new Error('`[nuxt-meilisearch]` Cannot search  without `index`')

  const client = useMeiliSearchRef()

  const result = await useAsyncData<T>(`${index}-async-search-result`, async () => {
    return await client.index(index).search(query, params) as T
  })

  return result as T
}
