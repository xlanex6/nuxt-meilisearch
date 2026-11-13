export type InstantSearchTheme = 'reset' | 'algolia' | 'satellite'

export interface ModuleOptions {
  hostUrl: string
  searchApiKey: string
  adminApiKey?: string
  serverSideUsage?: boolean
  instantSearch?: boolean | { theme: InstantSearchTheme }
}
