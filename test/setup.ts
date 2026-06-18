import { vi } from 'vitest'

vi.mock('meilisearch', () => {
  const mockSearch = vi.fn().mockResolvedValue({
    hits: [{ id: 1, title: 'Test Book' }],
    estimatedTotalHits: 1,
    query: 'test',
    processingTimeMs: 1,
    limit: 20,
    offset: 0,
  })

  const mockIndex = vi.fn().mockReturnValue({ search: mockSearch })

  // Regular function (not arrow) so it can be used as a constructor
  function MeiliSearch(this: Record<string, unknown>, _options: unknown) {
    this.index = mockIndex
  }

  const MeiliSearchMock = vi.fn(MeiliSearch as unknown as new (...args: unknown[]) => { index: typeof mockIndex })

  return { MeiliSearch: MeiliSearchMock, default: MeiliSearchMock }
})

vi.mock('@meilisearch/instant-meilisearch', () => {
  const searchClient = {
    search: vi.fn().mockResolvedValue({ results: [] }),
    searchForFacetValues: vi.fn().mockResolvedValue({ facetHits: [] }),
  }

  const instantMeiliSearch = vi.fn().mockReturnValue({ searchClient })

  return { instantMeiliSearch, default: instantMeiliSearch }
})
