# Relevancy

Meilisearch ranks results with a multi-criteria **bucket sort**: it applies ranking rules in order, using each rule to break ties left by the previous one.

## Ranking rules

Default order (set via the `rankingRules` setting):

1. `words` — documents matching more query terms rank higher.
2. `typo` — fewer typos rank higher.
3. `proximity` — query terms closer together rank higher.
4. `attribute` — matches in higher-priority `searchableAttributes` rank higher.
5. `sort` — applies user `sort` parameter at this position.
6. `exactness` — exact term matches rank higher than prefix/typo matches.

```javascript
await client.index('movies').updateRankingRules([
  'words', 'typo', 'proximity', 'attribute', 'sort', 'exactness',
])
```

Removing or reordering rules changes behavior globally. Place `sort` earlier to make user sort dominate relevancy, later to use it only as a tie-breaker.

## Custom ranking rules

Append `attribute:asc` or `attribute:desc` to `rankingRules` to always bias toward higher/lower values of a field (e.g. popularity). The attribute must be in `sortableAttributes`.

```javascript
await client.index('movies').updateRankingRules([
  'words', 'typo', 'proximity', 'attribute', 'sort', 'exactness',
  'popularity:desc',
])
```

## Searchable attributes & attribute order

`searchableAttributes` controls which fields are searched **and** their priority — earlier attributes rank higher under the `attribute` rule. Default is all fields (`["*"]`).

```javascript
await client.index('movies').updateSearchableAttributes(['title', 'overview'])
```

## Typo tolerance

Configured via the `typoTolerance` setting:

- `enabled`: toggle typo tolerance.
- `minWordSizeForTypos.oneTypo` (default 5) / `twoTypos` (default 9): word length thresholds.
- `disableOnWords`: words that must match exactly.
- `disableOnAttributes`: attributes with no typo tolerance.

## Synonyms

Map equivalent terms (one-directional per key) via the `synonyms` setting:

```json
{ "synonyms": { "sw": ["star wars"], "phone": ["mobile", "cellphone"] } }
```

## Stop words

`stopWords` ignores common terms (e.g. `the`, `a`, `of`) during search, improving speed and relevance:

```json
{ "stopWords": ["the", "a", "an", "of"] }
```

## Other relevancy controls

- `distinctAttribute` — deduplicate results by a field (e.g. one variant per product).
- `dictionary` — treat multi-word phrases as a single term.
- `separatorTokens` / `nonSeparatorTokens` — tune tokenization boundaries.
- `prefixSearch` / `searchCutoffMs` — control prefix matching and max search time.
- `_rankingScore` (`showRankingScore: true`) — exposes a `[0,1]` relevancy score per hit; pair with `rankingScoreThreshold` to drop weak matches.
