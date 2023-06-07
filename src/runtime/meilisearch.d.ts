import { MeiliSearch } from 'meilisearch'

declare module 'h3' {
  interface H3EventContext {
    serverMeilisearchClient?: MeiliSearch
  }
}
