# AI-powered search

Meilisearch supports semantic and hybrid search using embedding models, plus recommendations and conversational search.

## Embedders

Configure embedders via the `embedders` index setting. Meilisearch converts documents and queries into vectors, generating and caching embeddings automatically (only new/changed documents are re-embedded).

```bash
curl -X PATCH 'MEILISEARCH_URL/indexes/kitchenware/settings/embedders' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "products-openai": {
      "source": "openAi",
      "model": "text-embedding-3-small",
      "apiKey": "OPEN_AI_API_KEY",
      "documentTemplate": "An object used in a kitchen named '\''{{doc.name}}'\''"
    }
  }'
```

Key embedder fields:

- `source` — provider: `openAi`, `huggingFace`, `cohere`, `ollama`, `rest`, or `userProvided`.
- `model` — provider model name (e.g. `text-embedding-3-small`).
- `apiKey` — provider key (omit for local HuggingFace / userProvided).
- `documentTemplate` — Liquid template selecting the fields to embed. Keep it short and information-dense; this drives quality.
- `dimensions`, `distribution`, `binaryQuantized` — advanced tuning.

Supported providers include OpenAI, Cohere, Mistral, Gemini, Cloudflare, Voyage AI, Jina, AWS Bedrock, HuggingFace, and any REST API via the `rest` source. Use a `userProvided` source to supply your own vectors.

## Hybrid & semantic search

Pass a `hybrid` object referencing the embedder. Meilisearch runs keyword + semantic search and merges results.

```json
{
  "q": "kitchen utensils made of wood",
  "hybrid": { "embedder": "products-openai", "semanticRatio": 0.5 }
}
```

- `semanticRatio` (0–1): 0 = pure keyword, 1 = pure semantic, 0.5 = balanced.
- For pure semantic search with a precomputed query vector, pass `vector` instead of relying on `q`.
- `retrieveVectors: true` returns each hit's stored embeddings under `_vectors`.

Filter on vector presence with `_vectors EXISTS` (and `_vectors.{embedder} EXISTS`).

## Advanced

- **Composite embedders**: use different providers for indexing vs search.
- **Multiple embedders**: combine text, image, and semantic search on one index.
- **Multimodal / image search**: text-to-image search with multimodal embeddings or user-provided embeddings.
- **Binary quantization**: compress vectors to cut storage and speed up indexing.
- **Custom hybrid ranking**: tune `semanticRatio` and embedder weights; tune `distribution` to correct semantic `_rankingScore` values.

## Recommendations (similar documents)

`POST /indexes/{uid}/similar` returns documents semantically close to a reference document `id`, powering "More like this". Requires a configured embedder.

```json
{ "id": "movie-123", "embedder": "products-openai", "limit": 5 }
```

## Conversational search (chat)

The `/chats` routes provide a chat-completions API grounded in your indexed data:

1. Enable the chat completions feature and configure an index's `chat` setting.
2. Create a chat workspace (system prompt, tools, connected indexes).
3. Call `POST /chats/{workspace}/chat/completions` (OpenAI-compatible). Supports streaming, one-shot summarized answers, source-document display, and guardrails to reduce hallucination.
