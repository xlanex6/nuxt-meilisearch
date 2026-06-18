# Indexing

## Documents & primary key

Documents are JSON objects. Every document needs a unique **primary key** field (e.g. `id`). Meilisearch infers it from the first document if a field ends in `id`, or set it explicitly when creating the index or adding documents (`primaryKey` param). Primary key values may contain `a-z A-Z 0-9 - _`.

```javascript
await client.createIndex('movies', { primaryKey: 'id' })
```

## Add or update documents

| Operation | Route | SDK | Behavior |
|-----------|-------|-----|----------|
| Add or replace | `POST /indexes/{uid}/documents` | `addDocuments` | Replaces whole document if PK exists |
| Add or update | `PUT /indexes/{uid}/documents` | `updateDocuments` | Merges fields into existing document |
| Edit by function | `POST .../documents/edit` | — | Transform docs in place with a Rhai function |

```javascript
const task = await client.index('movies').addDocuments(movies)
await client.waitForTask(task.taskUid)
```

## Delete documents

- Single: `DELETE /indexes/{uid}/documents/{id}`
- Batch by id: `POST .../documents/delete-batch` with an array of primary keys
- By filter: `POST .../documents/delete` with `{ "filter": "..." }`
- All: `DELETE /indexes/{uid}/documents`

## Async tasks & batches

Every write returns a summarized task with a `taskUid`. Tasks move through `enqueued` → `processing` → `succeeded` / `failed` / `canceled`. Meilisearch groups compatible tasks into **batches** for efficient processing.

- `GET /tasks` — list/filter tasks (`uids`, `indexUids`, `statuses`, `types`, date ranges).
- `GET /tasks/{uid}` — inspect one task (including `error` on failure).
- `POST /tasks/cancel` — cancel enqueued/processing tasks (requires a filter).
- `POST /tasks/delete` — permanently delete finished tasks (requires a filter).
- `GET /batches`, `GET /batches/{uid}` — monitor batch progress and `progressTrace`.

SDK helpers: `waitForTask(taskUid)` and `getTask(taskUid)`.

## Index management

```bash
# create / list / get / update primaryKey / delete
POST   /indexes            { "uid": "movies", "primaryKey": "id" }
GET    /indexes
GET    /indexes/movies
PATCH  /indexes/movies     { "primaryKey": "id" }
DELETE /indexes/movies
```

- **Swap indexes** (`POST /swap-indexes`): atomically swap documents/settings/task history of two indexes — ideal for zero-downtime reindexing into a staging index.
- **Stats** (`GET /indexes/{uid}/stats`): document count, field distribution, indexing status.
- **Compact** an index to reclaim disk after heavy deletes/updates.

## Importing large datasets

- Batch documents (sized to your RAM); send NDJSON or CSV with the right `Content-Type` for big payloads.
- Use payload compression (`Content-Encoding`) and monitor `progressTrace` to find bottlenecks.
- The official **Meilisearch Importer** CLI handles large CSV/NDJSON/JSON imports.
- Indexing is multi-threaded and memory-intensive; more RAM speeds it up.
