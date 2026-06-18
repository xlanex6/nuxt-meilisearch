# Getting started

## Run an instance

**Cloud** (recommended): create a project at cloud.meilisearch.com to get a `host` URL and API keys.

**Docker**:

```bash
docker run -it --rm -p 7700:7700 \
  -e MEILI_MASTER_KEY='aSampleMasterKey' \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:latest
```

**cURL (local install)**:

```bash
curl -L https://install.meilisearch.com | sh
./meilisearch --master-key="aSampleMasterKey"
```

Other install paths: Homebrew (`brew install meilisearch`), APT, or build from source.

## Connect

The server listens on `http://localhost:7700` by default. Authenticate with the `Authorization: Bearer <API_KEY>` header. Check it is up with `GET /health`.

```bash
curl 'http://localhost:7700/health'
# {"status":"available"}
```

## Official SDKs

Meilisearch maintains first-party clients. Install the one matching your stack:

| Language | Package |
|----------|---------|
| JavaScript / TypeScript | `meilisearch` |
| Python | `meilisearch` |
| PHP | `meilisearch/meilisearch-php` |
| Ruby | `meilisearch` (gem) |
| Go | `github.com/meilisearch/meilisearch-go` |
| Rust | `meilisearch-sdk` |
| Java | `com.meilisearch.sdk:meilisearch-java` |
| .NET | `Meilisearch` (NuGet) |
| Dart, Swift | official SDKs available |

## Framework & front-end integrations

- **InstantSearch / instant-meilisearch**: search-as-you-type UIs for React, Vue, Angular. Use the `instant-meilisearch` adapter with InstantSearch widgets.
- **Laravel Scout**, **Ruby on Rails**, **Symfony** (official bundle), **Strapi v4**: model/ORM-level sync.
- **LangChain**: use Meilisearch as a vector store.
- **Firebase**: sync Firestore documents via the official extension.
- **MCP server**: manage a project with natural language through the Meilisearch MCP server.
- **Meilisearch Importer**: CLI tool to import large CSV / NDJSON / JSON datasets.

## Recommended first steps

1. Create or pick an index `uid`.
2. Add documents and `waitForTask`.
3. Configure `searchableAttributes`, `filterableAttributes`, `sortableAttributes` for your data.
4. Search and iterate on relevancy settings.
