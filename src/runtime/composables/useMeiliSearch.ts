import type { SearchParams, SearchResponse } from 'meilisearch'
import { useMeiliSearchRef } from './useMeiliSearchRef'
import { useState } from '#imports'

export function useMeiliSearch(index: string) {
  if (!index)
    throw new Error('`[nuxt-meilisearch]` Cannot search  without `index`')

  const client = useMeiliSearchRef()
  const result = useState(`${index}-search-result`, () => null as SearchResponse | null)

  const search = async (query: string, searchParams?: SearchParams) => {
    const resp = await client.index(index).search(query, searchParams)
    result.value = resp as SearchResponse

    return resp
  }

  return {
    search,
    result,
  }
}
