import { useState } from '#imports'
import { useMeiliSearchRef } from './useMeiliSearchRef'
import { SearchResponse, SearchParams } from 'meilisearch'

export const useMeiliSearch = (index: string) => {
  
  if (!index) throw new Error('`[nuxt-meilisearch]` Cannot search  without `index`')
  
  const client = useMeiliSearchRef()
  const result = useState(`${index}-search-result`,() => null as SearchResponse | null,)

  const search = async (query: string, options?: SearchParams) => { 
    
    const resp = await client.index(index).search(query, options)
    result.value = resp as SearchResponse
  }
  
  return {
    search,
    result
  }
}
