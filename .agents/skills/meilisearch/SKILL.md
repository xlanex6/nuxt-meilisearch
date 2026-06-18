---
name: meilisearch
description: Meilisearch open-source search engine with full-text, semantic, and hybrid search, filtering, faceting, and typo tolerance. Use when integrating Meilisearch, building search UIs, configuring indexes, embedders, ranking, filters, tenant tokens, or self-hosting.
metadata:
  source: Generated from https://www.meilisearch.com/docs/llms.txt
---

Meilisearch is an open-source, RESTful search engine optimized for fast, relevant, typo-tolerant search. It supports full-text, semantic, and hybrid (AI-powered) search, plus filtering, sorting, faceting, geosearch, and multi-tenancy. Available as Meilisearch Cloud or self-hosted; default port is `7700`.

## Core concepts

- **Instance**: a running Meilisearch server, secured by a master key (self-hosted) and scoped API keys.
- **Index**: a collection of documents with its own settings, identified by a `uid` (e.g. `movies`). Similar to a SQL table.
- **Document**: a JSON object with fields. Each document must have a unique **primary key** (e.g. `id`).
- **Task**: writes (add documents, update settings) are **asynchronous** and return a `taskUid`. Poll the task or use `waitForTask` to confirm completion.
- **Settings**: per-index configuration controlling searchable/filterable/sortable attributes, ranking rules, synonyms, typo tolerance, embedders, etc.

## Quick start (JavaScript SDK)

Install the official client and search in a few lines. Writes are async, so wait for the task before searching.

```bash
npm install meilisearch
```

```javascript
import { Meilisearch } from 'meilisearch'

const client = new Meilisearch({
  host: process.env.MEILISEARCH_URL, // e.g. http://localhost:7700
  apiKey: process.env.MEILISEARCH_KEY,
})

const task = await client.index('movies').addDocuments([
  { id: 1, title: 'The Matrix', genres: ['Action', 'Sci-Fi'], year: 1999 },
  { id: 2, title: 'Inception', genres: ['Action', 'Thriller'], year: 2010 },
])
await client.waitForTask(task.taskUid)

const results = await client.index('movies').search('matrix')
```

To filter, first declare filterable attributes, then pass a `filter`:

```javascript
await client.index('movies').updateFilterableAttributes(['genres', 'year'])
const { hits } = await client.index('movies').search('', {
  filter: 'genres = "Sci-Fi" AND year > 2000',
})
```

## When to use which reference

| Topic | Description | Reference |
|-------|-------------|-----------|
| Getting started | Install (Docker/cURL/Cloud), connect, official SDKs, framework guides | [getting-started](references/getting-started.md) |
| Search | `/search` parameters, pagination, highlighting/cropping, multi-search, federation | [search](references/search.md) |
| Filtering, sorting, faceting | Filter expression syntax, operators, facets, geosearch | [filtering-sorting-faceting](references/filtering-sorting-faceting.md) |
| Indexing | Documents, primary key, async tasks, batches, large imports | [indexing](references/indexing.md) |
| Relevancy | Ranking rules, custom ranking, typo tolerance, synonyms, stop words | [relevancy](references/relevancy.md) |
| AI-powered search | Embedders, hybrid/semantic search, similar documents, conversational search | [ai-search](references/ai-search.md) |
| Index settings & API | Full REST endpoint map and settings reference | [api-reference](references/api-reference.md) |
| Security | API keys, tenant tokens, multitenancy | [security](references/security.md) |
| Self-hosting | Configuration, deployment, backups (dumps/snapshots), sharding | [self-hosting](references/self-hosting.md) |

## Key rules to remember

- All write operations are **asynchronous**. Always confirm via task status before relying on the result.
- An attribute must be in `filterableAttributes` before you can `filter`/facet on it, and in `sortableAttributes` before you can `sort` on it.
- `PATCH /indexes/{uid}/settings` (and `updateSettings`) merges only the fields you send; sending `null` resets a setting to default.
- Updating an index that does not exist via document or settings routes **creates it automatically**.
- Prefer the `POST /search` route over `GET` for auth caching and performance.
- Never expose the master key or admin API key to clients; use a search-only key or tenant token in the browser.
