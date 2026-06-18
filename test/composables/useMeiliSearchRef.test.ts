import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import { useMeiliSearchRef } from '../../src/runtime/composables/useMeiliSearchRef'

describe('useMeiliSearchRef', () => {
  it('creates a MeiliSearch client using public runtimeConfig', async () => {
    let client: ReturnType<typeof useMeiliSearchRef> | undefined

    const TestComponent = defineComponent({
      setup() {
        client = useMeiliSearchRef()
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(client).toBeDefined()
    expect(typeof client!.index).toBe('function')
  })

  it('returns the same instance on multiple calls (singleton per nuxtApp)', async () => {
    let clientA: ReturnType<typeof useMeiliSearchRef> | undefined
    let clientB: ReturnType<typeof useMeiliSearchRef> | undefined

    const TestComponent = defineComponent({
      setup() {
        clientA = useMeiliSearchRef()
        clientB = useMeiliSearchRef()
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(clientA).toBe(clientB)
  })

  it('constructs client with hostUrl and searchApiKey from runtimeConfig', async () => {
    const { MeiliSearch } = await import('meilisearch')

    const TestComponent = defineComponent({
      setup() {
        useMeiliSearchRef()
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(MeiliSearch).toHaveBeenCalledWith(
      expect.objectContaining({
        host: expect.any(String),
        apiKey: expect.any(String),
      }),
    )
  })
})
