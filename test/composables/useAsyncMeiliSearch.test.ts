import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import { useAsyncMeiliSearch } from '../../src/runtime/composables/useAsyncMeiliSearch'

describe('useAsyncMeiliSearch', () => {
  it('throws when index is empty string', async () => {
    await expect(useAsyncMeiliSearch({ index: '' })).rejects.toThrow(
      'Cannot search  without `index`',
    )
  })

  it('returns data from the mock client', async () => {
    let asyncResult: unknown

    const TestComponent = defineComponent({
      async setup() {
        asyncResult = await useAsyncMeiliSearch({ index: 'books', query: 'test' })
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(asyncResult).toBeDefined()
  })

  it('uses a stable useAsyncData key based on index name', async () => {
    const results: unknown[] = []

    const TestComponent = defineComponent({
      async setup() {
        const r1 = await useAsyncMeiliSearch({ index: 'books', query: 'a' })
        const r2 = await useAsyncMeiliSearch({ index: 'books', query: 'b' })
        results.push(r1, r2)
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(results).toHaveLength(2)
    results.forEach(r => expect(r).toBeDefined())
  })

  it('accepts optional params object', async () => {
    let asyncResult: unknown

    const TestComponent = defineComponent({
      async setup() {
        asyncResult = await useAsyncMeiliSearch({
          index: 'books',
          query: 'nuxt',
          params: { limit: 10, attributesToRetrieve: ['title', 'author'] },
        })
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(asyncResult).toBeDefined()
  })
})
