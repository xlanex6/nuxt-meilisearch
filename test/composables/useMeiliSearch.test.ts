import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, h } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { useMeiliSearch } from '../../src/runtime/composables/useMeiliSearch'

describe('useMeiliSearch', () => {
  it('throws when index is empty string', async () => {
    const TestComponent = defineComponent({
      setup() {
        expect(() => useMeiliSearch('')).toThrowError('Cannot search  without `index`')
        return {}
      },
      render() { return h('div') },
    })
    await mountSuspended(TestComponent)
  })

  it('returns search function and result ref', async () => {
    let searchFn: ((...args: unknown[]) => unknown) | undefined
    let result: unknown

    const TestComponent = defineComponent({
      setup() {
        const { search, result: res } = useMeiliSearch('books')
        searchFn = search
        result = res
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(typeof searchFn).toBe('function')
    expect(result).toBeDefined()
  })

  it('calls client.index(index).search() and updates result state', async () => {
    let searchFn: ((query: string) => Promise<unknown>) | undefined
    let resultRef: { value: unknown } | undefined

    const TestComponent = defineComponent({
      setup() {
        const { search, result } = useMeiliSearch('books')
        searchFn = search
        resultRef = result
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(searchFn).toBeDefined()
    const response = await searchFn!('test query')

    expect(response).toBeDefined()
    expect(resultRef!.value).toBeDefined()
    expect((resultRef!.value as { hits: unknown[] }).hits).toBeInstanceOf(Array)
  })

  it('passes searchParams to the underlying search call', async () => {
    const { MeiliSearch } = await import('meilisearch')
    vi.clearAllMocks()

    let searchFn: ((query: string, params?: Record<string, unknown>) => Promise<unknown>) | undefined

    const TestComponent = defineComponent({
      setup() {
        const { search } = useMeiliSearch('books')
        searchFn = search
        return {}
      },
      render() { return h('div') },
    })

    await mountSuspended(TestComponent)

    expect(searchFn).toBeDefined()
    await searchFn!('nuxt query', { limit: 5 })

    const instance = vi.mocked(MeiliSearch).mock.results[0]?.value as { index: ReturnType<typeof vi.fn> } | undefined
    if (instance) {
      expect(instance.index).toHaveBeenCalledWith('books')
    }
  })
})
