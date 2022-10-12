import { useRuntimeConfig } from "#imports"
import { CompatibilityEvent, useCookie } from 'h3'
import { MeiliSearch } from 'meilisearch'


export const serverMeilisearchClient = (event: CompatibilityEvent): MeiliSearch => {
  event.context._ms = "MS"
}
