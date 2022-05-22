---
title: Setup
position: 1
---

Check the [Nuxt.js documentation](https://nuxtjs.org/api/configuration-modules#the-modules-property) for more information about installing and using modules in Nuxt.js.

## Installation

Add `nuxt-meilisearch` dependency to your project:

<code-group>
  <code-block label="NPM" active>

  ```bash
  npm i --save-dev nuxt-meilisearch
  ```

  </code-block>
  <code-block label="Yarn">

  ```bash
  yarn add --dev nuxt-meilisearch
  ```

  </code-block>
</code-group>

Edit your `nuxt.config.js` file to add twa module:

```ts{}[nuxt.config.js]
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  ...
  modules: [
    'nuxt-meilisearch'
  ],
  meilisearch: {
    hostUrl: '<YOUR_MEILISEARCH_HOST_URL>', //required
    apiKey: '<YOUR_MEILISEARCH_API_KEY>', //required
    instantSearch: true, // default true
    // optional
    clientOptions: {
      placeholderSearch: true, // default
      paginationTotalHits: 50, // default
      finitePagination: true, // default
      primaryKey: undefined, // default
      keepZeroFacets: false // default
    }
  }
  ...
})
```

