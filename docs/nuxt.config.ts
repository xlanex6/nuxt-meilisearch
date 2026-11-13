import { fileURLToPath } from 'node:url'

const vuePackages = fileURLToPath(new URL('./node_modules/.pnpm/node_modules/', import.meta.url))

export default defineNuxtConfig({
  extends: ['docus'],
  site: {
    url: 'https://nuxt-meilisearch.vercel.app',
    name: 'Nuxt Meilisearch',
  },
  // Parent install also ships Vue. A second copy makes useTemplateRef throw after the first SSR render.
  alias: {
    'vue': vuePackages + 'vue',
    '@vue/reactivity': vuePackages + '@vue/reactivity',
    '@vue/runtime-core': vuePackages + '@vue/runtime-core',
    '@vue/runtime-dom': vuePackages + '@vue/runtime-dom',
    '@vue/server-renderer': vuePackages + '@vue/server-renderer',
    '@vue/shared': vuePackages + '@vue/shared',
  },
  nitro: {
    preset: 'vercel',
  },
  llms: {
    domain: 'https://nuxt-meilisearch.vercel.app',
  },
})
