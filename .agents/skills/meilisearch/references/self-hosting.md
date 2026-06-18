# Self-hosting

## Configuration

Configure at launch via CLI flags, environment variables, or a config file. Each option has a `--flag` and a `MEILI_*` env var.

| Option | Env var | Purpose |
|--------|---------|---------|
| `--master-key` | `MEILI_MASTER_KEY` | Protect the instance |
| `--env` | `MEILI_ENV` | `development` or `production` (disables search preview, requires master key) |
| `--http-addr` | `MEILI_HTTP_ADDR` | Bind address (default `localhost:7700`) |
| `--db-path` | `MEILI_DB_PATH` | Database location (default `./data.ms`) |
| `--dump-dir` | `MEILI_DUMP_DIR` | Where dumps are written |
| `--snapshot-dir` | `MEILI_SNAPSHOT_DIR` | Where snapshots are written |
| `--max-indexing-memory` | `MEILI_MAX_INDEXING_MEMORY` | Cap RAM used during indexing |

In `production` env the built-in search preview UI is disabled and a master key is mandatory.

## Deployment

- **Docker**: official `getmeili/meilisearch` image; mount a volume for `/meili_data`.
- **Cloud VMs**: guides for AWS EC2, Azure VM, Google Cloud Compute, DigitalOcean droplets — install, configure as a service, and secure with a firewall + HTTPS.
- For production: set `MEILI_ENV=production`, a strong master key, HTTPS (HTTP/2 + SSL), and run Meilisearch as a managed service (e.g. systemd).

## Backups

| Type | Purpose | How |
|------|---------|-----|
| **Snapshot** | Exact DB copy for fast periodic backups/restore | `POST /snapshots`; start with `--import-snapshot` |
| **Dump** | Portable export for version migration | `POST /dumps`; start with `--import-dump` |

Use snapshots for routine safeguards and dumps when upgrading across versions. The `/export` route pushes documents and settings directly to another running instance without files.

## Scaling: replication & sharding

- **Sharding** distributes documents across multiple instances for horizontal scale.
- **Replication** copies shards across instances for high availability and search-load distribution.
- Manage cluster membership with the `/network` route (add/remove remotes, assign shards). Set up a sharded cluster with replication for production at scale.

## Editions

- **Community Edition**: free, MIT license.
- **Enterprise Edition**: advanced features under a BUSL license.

## Performance

- Indexing is multi-threaded and memory-intensive; more RAM = faster indexing.
- Use batch sizing, payload compression, and `progressTrace` (via batches) to find bottlenecks.
- Tune `proximityPrecision`, `searchCutoffMs`, and granular filterable attributes to reduce latency.
