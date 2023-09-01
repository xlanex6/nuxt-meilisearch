import { MeiliSearch } from 'meilisearch'

enum InstantSearchThemes {
  'reset',
  'algolia',
  'satellite',
}

export interface ModuleOptions {
  hostUrl: string,
  searchApiKey: string,
  adminApiKey?: string,
  serverSideUsage?: boolean,
  instantSearch?: boolean | { theme: keyof typeof InstantSearchThemes },
  clientOptions?: {
    placeholderSearch?: boolean,
    paginationTotalHits?: number,
    finitePagination?: boolean,
    primaryKey?: string,
    keepZeroFacets?: boolean
  }
}

declare module 'h3' {
  interface H3EventContext {
    serverMeilisearchClient?: MeiliSearch
  }
}


declare module '*.vue' {
  import { defineComponent } from 'vue'

  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'vue-instantsearch/vue3/es'

// https://github.com/meilisearch/instant-meilisearch/blob/main/packages/instant-meilisearch/src/types/types.ts
