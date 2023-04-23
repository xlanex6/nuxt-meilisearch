import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addServerHandler, addImportsDir, useLogger } from '@nuxt/kit'

enum InstantSearchThemes {
  'reset',
  'algolia',
  'satellite',
}

export interface ModuleOptions {
  hostUrl: string,
  searchApiKey: string,
  adminApiKey?: string,
  serverSideUsage: boolean,
  instantSearch?: boolean | { theme: keyof typeof InstantSearchThemes },
  clientOptions?: {
    placeholderSearch?: boolean,
    paginationTotalHits?: number,
    finitePagination?: boolean,
    primaryKey?: string,
    keepZeroFacets?: boolean
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-meilisearch',
    configKey: 'meilisearch',
    compatibility: {
      nuxt: '^3.0.0-rc.9'
    }
  },
  defaults: {
    hostUrl: '',
    searchApiKey: '',
    adminApiKey: '',
    serverSideUsage: false,
    instantSearch: {
      theme: 'algolia'
    },
    clientOptions: {
      placeholderSearch: true,
      paginationTotalHits: 50,
      finitePagination: true,
      primaryKey: undefined,
      keepZeroFacets: false
    }

  },
  setup (moduleOptions, nuxt) {
    const logger = useLogger('Nuxt-Meilisearch')
    logger.success('Module init...')

    if (!moduleOptions.hostUrl) {
      throw new Error('`[nuxt-meilisearch]` Missing `hostUrl`')
    }

    if (!moduleOptions.searchApiKey) {
      throw new Error('`[nuxt-meilisearch]` Missing `searchApiKey`')
    }

    const { adminApiKey, ...publicSafeModuleOptions } = moduleOptions
    nuxt.options.runtimeConfig.public.meilisearchClient = publicSafeModuleOptions

    nuxt.options.runtimeConfig.serverMeilisearchClient = moduleOptions

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    nuxt.options.build.transpile.push(runtimeDir)

    if (moduleOptions.instantSearch) {
      nuxt.options.build.transpile.push('vue-instantsearch/vue3/es')

      if (typeof moduleOptions.instantSearch === 'object') {
        const { theme } = moduleOptions.instantSearch
        if (theme) {
          if (theme in InstantSearchThemes) {
            nuxt.options.css.push(`instantsearch.css/themes/${theme}.css`)
          } else {
            logger.error('`[nuxt-meilisearch]` Invalid theme:', theme)
          }
        }
      }
    }

    addImportsDir(resolve(runtimeDir, 'composables'))

    if (moduleOptions.serverSideUsage) {
      if (!moduleOptions.adminApiKey) {
        throw new Error('`[nuxt-meilisearch]` Missing `adminApiKey`')
      }
      const handler = resolve(runtimeDir, 'serverMeilisearchClient')
      const serverHandler = {
        middelware: true,
        handler
      }
      addServerHandler(serverHandler)
    }

    nuxt.hook('devtools:customTabs', (tabs) => {
      tabs.push({
        name: 'meilisearch',
        // title to display in the tab
        title: 'Meilisearch',
        // any icon from Iconify, or a URL to an image
        icon: 'https://raw.githubusercontent.com/meilisearch/meilisearch/main/assets/logo.svg',
        // iframe view
        view: {
          type: 'iframe',
          src: `${moduleOptions.hostUrl}`
        }
      })
    })
  }

})
