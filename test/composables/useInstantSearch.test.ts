import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import { useInstantSearch } from '../../src/runtime/composables/useInstantSearch'

describe('useInstantSearch', () => {
  it('returns an object with a search method (instant search client shape)', async () => {
    let client: unknown

    const TestComponent = defineComponent({
      setup() {
        client = useInstantSearch()
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    // instantMeiliSearch mock returns { searchClient: { search, searchForFacetValues } }
    // useInstantSearch returns nuxtApp._instantSearchClient = instantClient.searchClient
    expect(client).toBeDefined()
    expect(typeof (client as { search?: unknown }).search).toBe('function')
  })

  it('returns the same client instance on multiple calls (singleton)', async () => {
    let clientA: unknown
    let clientB: unknown

    const TestComponent = defineComponent({
      setup() {
        clientA = useInstantSearch()
        clientB = useInstantSearch()
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(clientA).toBe(clientB)
  })

  it('client has a searchForFacetValues method (instant-meilisearch API)', async () => {
    let client: unknown

    const TestComponent = defineComponent({
      setup() {
        client = useInstantSearch()
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(typeof (client as { searchForFacetValues?: unknown }).searchForFacetValues).toBe('function')
  })
})
