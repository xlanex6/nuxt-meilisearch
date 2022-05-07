import { defineNuxtPlugin, useRuntimeConfig, useNuxtApp } from '#app'


export default defineNuxtPlugin(async (nuxtApp) => {

  const { meilisearch: { instantSearch }} = useRuntimeConfig().public

  if (instantSearch) {
    const { plugin } = await import('vue-instantsearch/vue3/es/src/plugin')

    nuxtApp.vueApp.use(plugin)
  }
})
