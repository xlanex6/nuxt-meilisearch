import { describe, expect, it } from 'vitest'

describe('$meilisearch server util', async () => {
  // Import the util - it uses Nuxt's real useRuntimeConfig in the nuxt environment.
  // The fixture sets serverMeilisearchClient via the module, so the client is constructed
  // with the fixture's config values.
  const { $meilisearch } = await import('../../src/runtime/server/utils/meilisearch')

  it('returns a MeiliSearch client with an index() method', async () => {
    const mockEvent = {} as import('h3').H3Event

    const client = $meilisearch(mockEvent)

    expect(client).toBeDefined()
    expect(typeof client.index).toBe('function')
  })

  it('returns the same client instance on subsequent calls (module-level singleton)', async () => {
    const mockEvent = {} as import('h3').H3Event

    const clientA = $meilisearch(mockEvent)
    const clientB = $meilisearch(mockEvent)

    expect(clientA).toBe(clientB)
  })

  it('the returned client exposes a search() method via index()', async () => {
    const mockEvent = {} as import('h3').H3Event

    const client = $meilisearch(mockEvent)
    const index = client.index('test-index')

    expect(typeof index.search).toBe('function')
  })
})
