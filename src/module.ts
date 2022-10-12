import { resolve } from 'path'
import { fileURLToPath } from 'url'
import defu from 'defu'
import { defineNuxtModule, addPlugin, addImportsDir } from '@nuxt/kit'

enum InstantSearchThemes {
  'reset',
  'algolia',
  'satellite',
}

export interface ModuleOptions {
  hostUrl: string,
  apiKey: string,
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
      nuxt: '3.0.0-rc.11'
    }
  },
  defaults: {
    hostUrl: '',
    apiKey: '',
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
  async setup (options, nuxt) {
    if (!options.hostUrl) {
      throw new Error('`[nuxt-meilisearch]` Missing `hostUrl`')
    }

    if (!options.apiKey) {
      throw new Error('`[nuxt-meilisearch]` Missing `apiKey`')
    }

    // Default runtimeConfig
    nuxt.options.runtimeConfig.public.meilisearch = defu(nuxt.options.runtimeConfig.public.meilisearch, {
      hostUrl: options.hostUrl,
      apiKey: options.apiKey,
      instantSearch: options.instantSearch,
      options: {
        placeholderSearch: options.clientOptions.placeholderSearch,
        paginationTotalHits: options.clientOptions.paginationTotalHits,
        finitePagination: options.clientOptions.finitePagination,
        primaryKey: options.clientOptions.primaryKey,
        keepZeroFacets: options.clientOptions.keepZeroFacets
      }
    })

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

      if (options.instantSearch) {
        nuxt.options.build.transpile.push('vue-instantsearch/vue3/es')

      if (typeof options.instantSearch === 'object') {
        const { theme } = options.instantSearch
        if (theme) {
          if (theme in InstantSearchThemes) {
            nuxt.options.css.push(`instantsearch.css/themes/${theme}.css`)
          } else {
            console.error('`[nuxt-meilisearch]` Invalid theme:', theme)
          }
        }
      }
    }


    addImportsDir(resolve(runtimeDir, 'composables'))


    nuxt.hook('ready', async nuxt => {
      console.log('`[nuxt-meilisearch]` module is load 🚀')
    })
  }
})
