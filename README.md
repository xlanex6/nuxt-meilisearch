[![xlanex6/nuxt-meilisearch](./docs/static/preview.png)](https://nuxt-meilisearch-docs.netlify.app/)


<h1 align='center'>
nuxt-meilisearch
</h1>
<p align='center'>

[![Latest Stable Version](https://img.shields.io/npm/v/nuxt-meilisearch.svg?style=for-the-badge)](https://www.npmjs.com/package/nuxt-meilisearch) [![License](https://img.shields.io/npm/l/nuxt-meilisearch.svg?style=for-the-badge)](https://www.npmjs.com/package/nuxt-meilisearch) [![Twitter Follow](https://img.shields.io/twitter/follow/xlanex6?color=1DA1F2&logo=twitter&style=for-the-badge)](https://twitter.com/xlanex6)

</p>

---

[Meilisearch](https://www.meilisearch.com) module for [Nuxt](https://v3.nuxtjs.org)

## Features

 - [Nuxt 3](https://v3.nuxtjs.org)
 - Easy integration with [MeilisearchJS lib](https://github.com/meilisearch/instant-meilisearch)
 - Support for Vue [Algolia Vue 3 InstantSearch](https://github.com/algolia/vue-instantsearch) components (optional) 

 ## Setup 

 Install nuxt-meilisearch !

 ```bash
npm install --save-dev nuxt-meilisearch  // yarn add --dev nuxt-meilisearch
 ```

Add it to the modules section of nuxt.config.ts

 ```ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    'nuxt-meilisearch'
  ],
  meilisearch: {
    hostUrl: '<YOUR_MEILISEARCH_HOST_URL>',
    apiKey: '<YOUR_MEILISEARCH_API_KEY>',
    instantSearch: {
      theme: 'algolia'
    }
})
```

## Usage

You can load Meilisearch client with composables 

```vue
<script setup>
const client = useMeilisearchClient()
</script>

```

Then is your template you can use all [Algolia Vue 3 Instantsearch](https://github.com/algolia/vue-instantsearch) components. 

Exemple: 

```vue
<template>
  <div>
    Nuxt module playground for nuxt-meilisearch !

    <ais-instant-search
      :search-client="client"
      index-name="movies"
    >
      <ais-configure :hits-per-page.camel="10" />
      <ais-search-box
        placeholder="Search here…"
        class="searchbox"
      ></ais-search-box>
      <ais-hits>
        <template v-slot="{ items }">
          <ul>
            <li
              v-for="{id,title,poster} in items"
              :key="id"
            >
              <h1>{{ title }}</h1>
              <img :src="poster" :alt="`Poster from ${title}`">
            </li>
          </ul>
        </template>
      </ais-hits>

    </ais-instant-search>
  </div>
</template>
```


## Roadmap


- [ ] 🚧 Use Meilisearch client on Server side to manipulate index and documents.
- [ ] 🚧 Inject Theme for Algolia components
- [ ] 🚧 Use tree shacking to optimize Algolia components size
- [ ] 🚧 WIP -  Nice demo site
  - [ ] meilisearch instance from cloud
  - [ ] publish on netlify
- [ ] Demo on StackBlitz for quick hack

## Development

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
