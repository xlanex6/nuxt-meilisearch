# Search

Two routes: `POST /indexes/{uid}/search` (preferred) and `GET /indexes/{uid}/search`. POST allows preflight caching and better performance.

```bash
curl -X POST 'MEILISEARCH_URL/indexes/movies/search' \
  -H 'Content-Type: application/json' \
  --data-binary '{ "q": "matrix", "limit": 20 }'
```

## Search parameters

| Parameter | Purpose | Default |
|-----------|---------|---------|
| `q` | Query string. Omit or `null` for placeholder search (returns all) | `""` |
| `offset` / `limit` | Offset-based pagination | `0` / `20` |
| `page` / `hitsPerPage` | Page-based pagination (returns `totalHits`, `totalPages`) | — |
| `filter` | Filter expression (see filtering reference) | `null` |
| `facets` | Array of attributes to return `facetDistribution` and `facetStats` | `null` |
| `attributesToRetrieve` | Fields returned in each hit | `["*"]` |
| `attributesToSearchOn` | Restrict the search to specific attributes | all searchable |
| `attributesToCrop` / `cropLength` | Crop matched fields to N words | `null` / `10` |
| `cropMarker` | Marker around cropped text | `"…"` |
| `attributesToHighlight` | Wrap matched terms | `null` |
| `highlightPreTag` / `highlightPostTag` | Highlight wrappers | `<em>` / `</em>` |
| `showMatchesPosition` | Add `_matchesPosition` to hits | `false` |
| `sort` | Array of `attr:asc` / `attr:desc` (and `_geoPoint`) | `null` |
| `matchingStrategy` | `last`, `all`, or `frequency` | `last` |
| `distinct` | Dedupe results by a field at search time | `null` |
| `showRankingScore` / `showRankingScoreDetails` | Add `_rankingScore` to hits | `false` |
| `rankingScoreThreshold` | Drop hits below score `[0,1]` | `null` |
| `hybrid` / `vector` / `retrieveVectors` | AI-powered search (see ai-search reference) | `null` |
| `locales` | Force locale(s) for the query | auto |

`matchingStrategy`: `last` progressively drops query words from the end until results are found; `all` requires every word; `frequency` drops the most frequent words first.

## Response shape

```json
{
  "hits": [ /* documents, with _formatted / _rankingScore when requested */ ],
  "query": "matrix",
  "processingTimeMs": 1,
  "limit": 20,
  "offset": 0,
  "estimatedTotalHits": 976
}
```

Page-based requests return `totalHits` and `totalPages` instead of `estimatedTotalHits`.

## Highlighting & cropping

```json
{
  "q": "shifu",
  "attributesToHighlight": ["title", "overview"],
  "attributesToCrop": ["overview"],
  "cropLength": 20,
  "highlightPreTag": "<mark>",
  "highlightPostTag": "</mark>"
}
```

Formatted values appear under `_formatted` in each hit.

## Multi-search & federation

`POST /multi-search` runs several queries in one request. By default each query returns its own result list. Add a top-level `federation` object to merge all queries into a single ranked `hits` list (federated search), with optional per-query `federationOptions.weight` to boost an index.

```json
{
  "federation": {},
  "queries": [
    { "indexUid": "movies", "q": "batman" },
    { "indexUid": "comics", "q": "batman" }
  ]
}
```

## Facet search

`POST /indexes/{uid}/facet-search` type-aheads through values of one facet (supports prefix + typo tolerance). The facet must be in `filterableAttributes` with facet search enabled.
