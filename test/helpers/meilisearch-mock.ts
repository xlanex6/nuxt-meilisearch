import type { SearchResponse } from 'meilisearch'
import { vi } from 'vitest'

export function makeMockSearchResponse(hits: Record<string, unknown>[] = []): SearchResponse {
  return {
    hits,
    estimatedTotalHits: hits.length,
    query: 'test',
    processingTimeMs: 1,
    limit: 20,
    offset: 0,
  } as SearchResponse
}

export function getMeiliSearchMock() {
  const { MeiliSearch } = vi.mocked(await import('meilisearch'))
  return MeiliSearch
}
