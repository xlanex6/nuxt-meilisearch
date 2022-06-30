import body from '../../data/movies.json'

export default defineEventHandler(async () => {
  const { meilisearch: { hostUrl, apiKey } } = useRuntimeConfig().public
  const Authorization = `Bearer ${apiKey}`
  const baseUrl = `${hostUrl}/indexes/movies`
  await $fetch(`${baseUrl}/documents`, {
    method: 'POST',
    headers: {
      Authorization
    },
    body
  })

  await $fetch(`${baseUrl}/settings/filterable-attributes`, {
    method: 'POST',
    headers: {
      Authorization
    },
    body: ['release_date']
  })

  return {
    status: 200
  }
})
