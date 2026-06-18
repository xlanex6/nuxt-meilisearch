import { vi, describe, it, expect, beforeEach } from 'vitest'
import { defu } from 'defu'

// Mock @nuxt/kit functions used by the module
vi.mock('@nuxt/kit', () => ({
  createResolver: vi.fn(() => ({ resolve: (p: string) => p })),
  addImportsDir: vi.fn(),
  defineNuxtModule: vi.fn((opts: { setup: (options: unknown, nuxt: unknown) => void }) => opts),
}))

vi.mock('@nuxt/devtools-kit', () => ({
  addCustomTab: vi.fn(),
}))

type MockNuxt = {
  options: {
    runtimeConfig: {
      public: Record<string, unknown>
      serverMeilisearchClient: Record<string, unknown>
    }
    build: { transpile: string[] }
    css: string[]
  }
  hook: ReturnType<typeof vi.fn>
}

function makeMockNuxt(): MockNuxt {
  return {
    options: {
      runtimeConfig: {
        public: {},
        serverMeilisearchClient: {},
      },
      build: { transpile: [] },
      css: [],
    },
    hook: vi.fn(),
  }
}

describe('module setup: runtimeConfig', async () => {
  // Import the module setup after mocks are in place
  const { default: NuxtMeilisearch } = await import('../src/module')
  const setup = (NuxtMeilisearch as unknown as { setup: (opts: unknown, nuxt: unknown) => void }).setup

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('populates public.meilisearchClient from module options', () => {
    const nuxt = makeMockNuxt()
    setup(
      { hostUrl: 'http://meilisearch.test', searchApiKey: 'test-key', serverSideUsage: false, instantSearch: false },
      nuxt,
    )

    const pub = nuxt.options.runtimeConfig.public.meilisearchClient as Record<string, unknown>
    expect(pub.hostUrl).toBe('http://meilisearch.test')
    expect(pub.searchApiKey).toBe('test-key')
    expect(pub.serverSideUsage).toBe(false)
    expect(pub.instantSearch).toBe(false)
  })

  it('populates serverMeilisearchClient from module options', () => {
    const nuxt = makeMockNuxt()
    setup(
      { hostUrl: 'http://meilisearch.test', searchApiKey: 'test-key', adminApiKey: 'admin-key', serverSideUsage: true },
      nuxt,
    )

    const srv = nuxt.options.runtimeConfig.serverMeilisearchClient
    expect(srv.hostUrl).toBe('http://meilisearch.test')
    expect(srv.adminApiKey).toBe('admin-key')
    expect(srv.serverSideUsage).toBe(true)
  })

  it('does not overwrite pre-existing runtimeConfig values (defu behavior)', () => {
    const nuxt = makeMockNuxt()
    // Pre-set a value that should NOT be overwritten
    nuxt.options.runtimeConfig.public = {
      meilisearchClient: { hostUrl: 'http://pre-existing.host', searchApiKey: 'existing-key' },
    }

    setup(
      { hostUrl: 'http://module.host', searchApiKey: 'module-key' },
      nuxt,
    )

    const pub = nuxt.options.runtimeConfig.public.meilisearchClient as Record<string, unknown>
    expect(pub.hostUrl).toBe('http://pre-existing.host')
    expect(pub.searchApiKey).toBe('existing-key')
  })

  it('warns when hostUrl is missing', () => {
    const nuxt = makeMockNuxt()
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    setup({ hostUrl: '', searchApiKey: 'test-key' }, nuxt)

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Missing hostUrl'))
    consoleSpy.mockRestore()
  })

  it('warns when searchApiKey is missing', () => {
    const nuxt = makeMockNuxt()
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    setup({ hostUrl: 'http://meilisearch.test', searchApiKey: '' }, nuxt)

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Missing `searchApiKey`'))
    consoleSpy.mockRestore()
  })
})

describe('module setup: instantSearch', async () => {
  const { default: NuxtMeilisearch } = await import('../src/module')
  const setup = (NuxtMeilisearch as unknown as { setup: (opts: unknown, nuxt: unknown) => void }).setup

  it('transpiles vue-instantsearch when instantSearch is enabled', () => {
    const nuxt = makeMockNuxt()
    setup({ hostUrl: 'http://h', searchApiKey: 'k', instantSearch: true }, nuxt)

    expect(nuxt.options.build.transpile).toContain('vue-instantsearch/vue3/es')
  })

  it('pushes the satellite CSS when instantSearch.theme is satellite', () => {
    const nuxt = makeMockNuxt()
    setup({ hostUrl: 'http://h', searchApiKey: 'k', instantSearch: { theme: 'satellite' } }, nuxt)

    expect(nuxt.options.css).toContain('instantsearch.css/themes/satellite.css')
  })

  it('does not push CSS when instantSearch is boolean true without theme', () => {
    const nuxt = makeMockNuxt()
    setup({ hostUrl: 'http://h', searchApiKey: 'k', instantSearch: true }, nuxt)

    expect(nuxt.options.css).toHaveLength(0)
  })
})

describe('module setup: serverSideUsage', async () => {
  const { default: NuxtMeilisearch } = await import('../src/module')
  const setup = (NuxtMeilisearch as unknown as { setup: (opts: unknown, nuxt: unknown) => void }).setup

  it('registers nitro:config hook when serverSideUsage is true', () => {
    const nuxt = makeMockNuxt()
    setup({ hostUrl: 'http://h', searchApiKey: 'k', serverSideUsage: true, adminApiKey: 'admin' }, nuxt)

    expect(nuxt.hook).toHaveBeenCalledWith('nitro:config', expect.any(Function))
  })

  it('does not register nitro:config hook when serverSideUsage is false', () => {
    const nuxt = makeMockNuxt()
    setup({ hostUrl: 'http://h', searchApiKey: 'k', serverSideUsage: false }, nuxt)

    const nitroHookCall = (nuxt.hook.mock.calls as [string, unknown][]).find(([name]) => name === 'nitro:config')
    expect(nitroHookCall).toBeUndefined()
  })

  it('warns when serverSideUsage is true but adminApiKey is missing', () => {
    const nuxt = makeMockNuxt()
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    setup({ hostUrl: 'http://h', searchApiKey: 'k', serverSideUsage: true, adminApiKey: '' }, nuxt)

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Missing `adminApiKey`'))
    consoleSpy.mockRestore()
  })

  it('registers $meilisearch preset in nitro:config', () => {
    const nuxt = makeMockNuxt()
    setup({ hostUrl: 'http://h', searchApiKey: 'k', serverSideUsage: true, adminApiKey: 'admin' }, nuxt)

    const nitroHookCall = (nuxt.hook.mock.calls as [string, (config: Record<string, unknown>) => void][]).find(
      ([name]) => name === 'nitro:config',
    )
    expect(nitroHookCall).toBeDefined()

    // Execute the hook callback to verify it registers the $meilisearch import preset
    const mockNitroConfig: { externals: Record<string, unknown>, imports: Record<string, unknown> } = { externals: {}, imports: {} }
    nitroHookCall![1](mockNitroConfig)

    const imports = mockNitroConfig.imports as { presets: Array<{ from: string, imports: string[] }> }
    expect(imports.presets).toBeInstanceOf(Array)
    const meilisearchPreset = imports.presets.find(p => p.imports.includes('$meilisearch'))
    expect(meilisearchPreset).toBeDefined()
    expect(meilisearchPreset!.imports).toContain('$meilisearch')
  })
})

// Verify the defu utility is used correctly (sanity test)
describe('defu merge behavior', () => {
  it('does not overwrite existing values', () => {
    const existing = { hostUrl: 'existing', searchApiKey: 'existing-key' }
    const incoming = { hostUrl: 'new', searchApiKey: 'new-key', serverSideUsage: true }
    const merged = defu(existing, incoming)

    expect(merged.hostUrl).toBe('existing')
    expect(merged.searchApiKey).toBe('existing-key')
    expect(merged.serverSideUsage).toBe(true)
  })
})
