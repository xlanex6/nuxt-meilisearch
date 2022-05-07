import { resolve } from 'path'
import { fileURLToPath } from 'url'
import defu from 'defu'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'

export interface ModuleOptions {
  hostUrl: string,
  apiKey: string,
  instantSearch?: boolean,
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
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    hostUrl: '',
    apiKey: '',
    instantSearch: true,
    clientOptions: {
      placeholderSearch: true,
      paginationTotalHits: 50,
      finitePagination: true,
      primaryKey: undefined,
      keepZeroFacets: false
    }

  },
  setup(options, nuxt) {

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
        keepZeroFacets: options.clientOptions.keepZeroFacets,
      }
    })


    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))

    // console.log('`[nuxt-meilisearch]` module is load 🚀')
  }
})
