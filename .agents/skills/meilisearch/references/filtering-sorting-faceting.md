# Filtering, sorting & faceting

## Prerequisites

- To `filter` or facet on a field, add it to `filterableAttributes`.
- To `sort` on a field, add it to `sortableAttributes`.

```javascript
await client.index('movies').updateFilterableAttributes(['genres', 'rating', 'release_date'])
await client.index('movies').updateSortableAttributes(['release_date', 'rating'])
```

## Filter expression syntax

A filter is one or more conditions in `attribute OPERATOR value` form, written as a string, an array, or a mix. Quote string values containing whitespace: `director = 'Jordan Peele'`.

### Operators

| Operator | Meaning |
|----------|---------|
| `=` / `!=` | Equality / inequality (case-insensitive on strings) |
| `>` `>=` `<` `<=` | Comparison (numeric and lexicographic strings) |
| `TO` | Inclusive range, equals `>= AND <=` |
| `IN [a, b]` / `NOT IN [...]` | Match any value in the list |
| `EXISTS` / `NOT EXISTS` | Field is present (empty/null count as existing) |
| `IS EMPTY` / `IS NOT EMPTY` | Field is `""`, `[]`, or `{}` |
| `IS NULL` / `IS NOT NULL` | Field is `null` |
| `CONTAINS` / `STARTS WITH` | Substring / prefix match (experimental; enable `containsFilter`) |
| `NOT` | Negation; higher precedence than `AND`/`OR` |
| `AND` / `OR` | Combine conditions; `AND` binds tighter than `OR` |
| `_foreign(field, condition)` | Filter by related docs in another index (joins) |

For arrays, `=` matches if any element equals the value. The same applies to `!=`, `IN`, etc.

### Examples

```text
genres = horror AND director = 'Jordan Peele'
rating.users 80 TO 89
genres IN [horror, comedy]
release_date > 2004-01-01
(genres = horror OR genres = comedy) AND release_date > 795484800
```

Array form (outer = AND, inner = OR):

```json
[["genres = horror", "genres = comedy"], "director = 'Jordan Peele'"]
```

Use parentheses to control precedence. Wrap operator-like field names/values in quotes: `title = "AND"`.

## Sorting

Pass `sort` as an array of `attribute:asc` or `attribute:desc`:

```json
{ "q": "", "sort": ["rating:desc", "release_date:asc"] }
```

`sort` ranking-rule position determines whether sort overrides relevancy or only breaks ties (see relevancy reference).

## Faceting

Request facet counts with `facets`:

```json
{ "q": "", "facets": ["genres", "rating"] }
```

The response includes `facetDistribution` (value → count) and `facetStats` (min/max for numeric facets). Configure value ordering and `maxValuesPerFacet` via the `faceting` setting. For interactive UIs, build disjunctive facets so selecting one value does not collapse the counts of its sibling values.

## Geosearch

Add a `_geo` field (`{ "lat": ..., "lng": ... }`) and add `_geo` to `filterableAttributes`/`sortableAttributes`.

- Filter: `_geoRadius(lat, lng, distance_m)`, `_geoBoundingBox([lat,lng],[lat,lng])`, `_geoPolygon([...])`.
- Sort: `_geoPoint(lat, lng):asc` for nearest-first.
- Complex geometries can be indexed with GeoJSON.
