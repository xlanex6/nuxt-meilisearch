[![xlanex6/nuxt-meilisearch](./docus/public/cover.png)](https://nuxt-meilisearch.vercel.app/)


<h1 align='center'>
nuxt-meilisearch
</h1>
<p align='center'>

[![Latest Stable Version](https://img.shields.io/npm/v/nuxt-meilisearch.svg?style=for-the-badge)](https://www.npmjs.com/package/nuxt-meilisearch) [![License](https://img.shields.io/npm/l/nuxt-meilisearch.svg?style=for-the-badge)](https://www.npmjs.com/package/nuxt-meilisearch) 
[![Twitter Follow](https://img.shields.io/twitter/follow/xlanex6?color=1DA1F2&logo=twitter&style=for-the-badge)](https://twitter.com/xlanex6)

</p>

---

[Meilisearch](https://www.meilisearch.com) module for [Nuxt](https://v3.nuxtjs.org)

## Full documentation 

[Visit the module documentation site](https://nuxt-meilisearch.vercel.app) to see all **features** details.

## Features

 - Full [Nuxt 3](https://v3.nuxtjs.org) integration
 - Auto Import composables `useMeiliSearch` and `useAsyncMeiliSearch` for SSR usage
 - Manage Meilisearch from Nuxt server side
 - Full TypeScript support
 - Easy integration with [MeilisearchJS lib](https://github.com/meilisearch/instant-meilisearch)
 - Support for Vue [Algolia InstantSearch](https://github.com/algolia/instantsearch) components (optional) 


 ⚠️⚠️⚠️  BREAKING CHANGE ON MODULE CONFIG From previous VERSION ⚠️⚠️⚠️
 
 Version 1.0.0 of this module introduce a breaking change on the module config.

 ## Setup 

 Install nuxt-meilisearch !

 ```bash
npm install --save-dev nuxt-meilisearch  // yarn add --dev nuxt-meilisearch
 ```

Add it to the modules section of nuxt.config.ts

 ```ts{}[nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
    'nuxt-meilisearch'
  ],
  meilisearch: {
    hostUrl:  'http://my-meilisearch-server.domain.com', //required
    searchApiKey: '<your_public_key>', // required
    adminApiKey: '<your_secret_key>', // optional
    serverSideUsage: true // default false
})
```

## Usage

You can load Meilisearch client with composables 

```vue{}[pages/index.vue]
<script setup>
const { search, result } = useMeiliSearch('books') // `books` is the index name

onMounted(async () => {
  await search('harry');
})
</script>

```





## Development 

PR and ISSUES are welcome

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

## Licence

[MIT Licence](./LICENCE)


<!-- Badges -->

<!-- [npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/partytown/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/partytown
[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/partytown.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/partytown
[github-actions-ci-src]: https://github.com/nuxt-community/partytown-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/partytown-module/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/partytown-module.svg
[codecov-href]: https://codecov.io/gh/nuxt-community/partytown-module
[license-src]: https://img.shields.io/npm/l/@nuxtjs/partytown.svg
[license-href]: https://npmjs.com/package/@nuxtjs/partytown -->

<!-- 
For Meilisearch DEmo 
exemple valid MASTER_KEY
`PZKj1rFXYBnjLzEIxXRRaEz3gNDWTG3JoW6ZDzd6-mo`

```bash
docker run -it --rm \
  -p 7700:7700 \
  -e MEILI_MASTER_KEY='PZKj1rFXYBnjLzEIxXRRaEz3gNDWTG3JoW6ZDzd6-mo'\
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:v1.4
``` -->
