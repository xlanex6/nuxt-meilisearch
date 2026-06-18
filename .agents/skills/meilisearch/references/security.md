# Security

## Master key vs API keys

- The **master key** is set at launch (`--master-key` / `MEILI_MASTER_KEY`). It is never used directly for queries; it only manages API keys. Keep it secret.
- On first run with a master key, Meilisearch auto-generates a **Default Admin** key and a **Default Search** key.
- A project with no master key is **unprotected** (all routes open) — only acceptable for local development.

## API keys

Manage via `/keys` (requires master key or admin key). A key has `actions` (e.g. `search`, `documents.add`, `settings.update`, `*`), `indexes` (scopes, `*` for all), an optional `expiresAt`, and a `uid`.

```bash
curl -X POST 'MEILISEARCH_URL/keys' \
  -H 'Authorization: Bearer MASTER_KEY' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "description": "Search-only key for the web client",
    "actions": ["search"],
    "indexes": ["movies"],
    "expiresAt": null
  }'
```

The full key value is returned **only at creation**; store it securely. In browsers/clients, use a search-only key — never the admin or master key.

## Tenant tokens (multitenancy)

Tenant tokens are JWTs derived from an API key that embed **search rules** to enforce per-user data isolation at search time. The token payload has three parts: search rules (filters per index), the API key `uid`, and an optional expiration.

```javascript
const token = client.generateTenantToken(apiKeyUid, {
  movies: { filter: 'user_id = 42' },
}, { apiKey, expiresAt: new Date(Date.now() + 3600_000) })
```

Use the token as the client `apiKey`; every search is transparently constrained by the embedded filter, so a user can only see their own documents. Tokens can be generated with an official SDK or any JWT library. Combine with `_foreign()` joins for role-based access control (RBAC).

## Best practices

- Always run production instances with a master key.
- Issue narrowly scoped, expiring keys per use case.
- Generate tenant tokens **server-side**; never ship the signing API key to the client.
- Front the instance with HTTPS (HTTP/2 + SSL) in production.
