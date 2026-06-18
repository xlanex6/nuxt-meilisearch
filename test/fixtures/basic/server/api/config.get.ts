export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  return config.public.meilisearchClient
})
