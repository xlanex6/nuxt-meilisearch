enum InstantSearchThemes {
  reset,
  algolia,
  satellite,
}

export interface ModuleOptions {
  hostUrl: string
  searchApiKey: string
  adminApiKey?: string
  serverSideUsage?: boolean
  instantSearch?: boolean | { theme: keyof typeof InstantSearchThemes }
}

// https://github.com/meilisearch/instant-meilisearch/blob/main/packages/instant-meilisearch/src/types/types.ts
