import {
  defineNuxtModule, addServerHandler, addImportsSources, createResolver
} from '@nuxt/kit'

import type { ModuleOptions } from '../src/runtime/types/meilisearch.d'
enum InstantSearchThemes {
  'reset',
  'algolia',
  'satellite',
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

  },
  setup (options, nuxt) {
    if (!options.hostUrl) {
      console.warn('`[nuxt-meilisearch]` Missing hostUrl`')
    }

    if (!options.searchApiKey) {
      console.warn('`[nuxt-meilisearch]` Missing `searchApiKey`')
    }

    const { adminApiKey, ...publicSafeModuleOptions } = options // eslint-disable-line
    nuxt.options.runtimeConfig.public.meilisearchClient = publicSafeModuleOptions

    nuxt.options.runtimeConfig.serverMeilisearchClient = options

    const resolver = createResolver(import.meta.url)

    if (options.instantSearch) {
      nuxt.options.build.transpile.push('vue-instantsearch/vue3/es')

      if (typeof options.instantSearch === 'object') {
        const { theme } = options.instantSearch
        if (theme) {
          if (theme in InstantSearchThemes) {
            nuxt.options.css.push(`instantsearch.css/themes/${theme}.css`)
          }
        }
      }
    }

    addImportsSources({
      from: resolver.resolve('./runtime/composables/index'),
      imports: ['useMeilisearchClient']
    })

    if (options.serverSideUsage) {
      if (!options.adminApiKey) {
        console.warn('`[nuxt-meilisearch]` Missing `adminApiKey`')
      }
      addServerHandler({
        middleware: true,
        handler: resolver.resolve('./runtime/server/index.ts')
      })

      nuxt.hook('prepare:types', ({ references }) => {
        references.push({
          path: resolver.resolve('./runtime/meilisearch.d.ts')
        }, {
          path: resolver.resolve('./runtime/instantsearch.d.ts')
        })
      })
    }

    // @ts-expect-error - private API
    nuxt.hook('devtools:customTabs', (tabs) => {
      tabs.push({
        name: 'meilisearch',
        title: 'Meilisearch',
        icon: 'https://raw.githubusercontent.com/meilisearch/meilisearch/main/assets/logo.svg',
        view: {
          type: 'iframe',
          src: `${options.hostUrl}`
        }
      })
    })
  }

})
