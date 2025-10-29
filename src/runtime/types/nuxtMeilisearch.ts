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

