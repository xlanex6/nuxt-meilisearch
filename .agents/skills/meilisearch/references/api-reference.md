# API reference

Base URL is your instance host (default `http://localhost:7700`). Authenticate with `Authorization: Bearer <API_KEY>`. OpenAPI specs are published at `/docs/assets/open-api/meilisearch-openapi.json`.

## Endpoint map

| Area | Endpoints |
|------|-----------|
| Health / version | `GET /health`, `GET /version`, `GET /stats` |
| Indexes | `GET/POST /indexes`, `GET/PATCH/DELETE /indexes/{uid}`, `GET /indexes/{uid}/stats`, `POST /swap-indexes`, compact index |
| Documents | `POST` (add/replace), `PUT` (add/update), `GET` list, `POST .../fetch`, delete (`one`/`batch`/`by filter`/`all`), `POST .../edit` |
| Search | `POST/GET /indexes/{uid}/search`, `POST /multi-search`, `POST /indexes/{uid}/facet-search` |
| Similar | `POST/GET /indexes/{uid}/similar` |
| Settings | `GET/PATCH/DELETE /indexes/{uid}/settings` and per-setting sub-routes |
| Tasks | `GET /tasks`, `GET /tasks/{uid}`, `POST /tasks/cancel`, `POST /tasks/delete` |
| Batches | `GET /batches`, `GET /batches/{uid}` |
| Keys | `GET/POST /keys`, `GET/PATCH/DELETE /keys/{uid}` |
| Backups | `POST /dumps`, `POST /snapshots` |
| Chats | `GET/POST/PATCH/DELETE /chats...`, `POST /chats/{workspace}/chat/completions` |
| Webhooks | `GET/POST /webhooks`, `GET/PATCH/DELETE /webhooks/{uuid}` |
| Experimental / network | `GET/PATCH /experimental-features`, `GET/PATCH /network` |
| Logs (experimental) | `POST/DELETE /logs/stream`, `POST /logs/stderr` |
| Export | `POST /export` (push documents+settings to a remote instance) |

## Settings sub-routes

`PATCH /indexes/{uid}/settings` updates all settings at once and **merges** only provided fields; `null` resets a field. Each setting also has `GET` / `PATCH` (update) / `DELETE` (reset) at `/indexes/{uid}/settings/{setting}`.

Available settings:

| Setting | Controls |
|---------|----------|
| `searchableAttributes` | Which fields are searched + their priority |
| `displayedAttributes` | Which fields appear in results |
| `filterableAttributes` | Fields usable in `filter`/facets (+ granular filter ops) |
| `sortableAttributes` | Fields usable in `sort` |
| `rankingRules` | Relevancy rule order + custom ranking |
| `distinctAttribute` | Field used to deduplicate results |
| `synonyms` | Equivalent query terms |
| `stopWords` | Ignored common words |
| `typoTolerance` | Typo behavior thresholds |
| `faceting` | `maxValuesPerFacet`, facet value sort order |
| `pagination` | `maxTotalHits` cap |
| `embedders` | AI-powered search models |
| `dictionary` | User-defined multi-word terms |
| `separatorTokens` / `nonSeparatorTokens` | Tokenization boundaries |
| `proximityPrecision` | Proximity granularity (perf vs precision) |
| `prefixSearch` | Prefix matching mode |
| `searchCutoffMs` | Max search time |
| `localizedAttributes` | Per-attribute language hints |
| `facetSearch` | Toggle facet search |
| `foreignKeys` | Join relationships across indexes |
| `chat` | Conversational search per-index config |

## Headers

- `Content-Type: application/json` (also `application/x-ndjson`, `text/csv` for documents).
- `Content-Encoding` / `Accept-Encoding`: `gzip`, `deflate`, `br` for payload compression.
- `Meili-Include-Metadata: true`: include extra metadata in responses.

## Errors

Errors return a JSON object with `message`, `code`, `type`, and a `link` to docs. See the error codes reference for the exhaustive list.

## Pagination

GET list routes use `offset` + `limit` and return `total`, `offset`, `limit`. Search supports both offset-based and page-based pagination.
