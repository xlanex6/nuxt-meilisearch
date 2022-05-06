import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'

export interface ModuleOptions {
  meilisearchUrl: string,
  apiKey: string,
  instantSearch: boolean,
  placeholderSearch: boolean,
  paginationTotalHits: number,
  finitePagination: boolean,
  primaryKey: string,
  keepZeroFacets: boolean
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
    meilisearchUrl: '',
    apiKey: '',
    instantSearch: true,
    placeholderSearch: true,
    paginationTotalHits: 50,
    finitePagination: true,
    primaryKey: undefined,
    keepZeroFacets: false

  },
  setup(options, nuxt) {
    

  }
})
