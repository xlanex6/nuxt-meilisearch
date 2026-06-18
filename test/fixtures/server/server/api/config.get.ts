export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  return {
    public: config.public.meilisearchClient,
    server: {
      hostUrl: (config.serverMeilisearchClient as Record<string, unknown>).hostUrl,
      serverSideUsage: (config.serverMeilisearchClient as Record<string, unknown>).serverSideUsage,
    },
  }
})
