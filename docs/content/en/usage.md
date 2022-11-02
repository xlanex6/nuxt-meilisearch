---
title: Usage
position: 3
---


## Search 

On your client side ( Front-end ), you can load Meilisearch client with composables.

```vue
<script setup>
import {
  AisInstantSearch,
  AisHits,
  AisSearchBox,
} from 'vue-instantsearch/vue3/es'
const client = useMeilisearchClient()
</script>

```

Then is your template

```vue
<template>
    <ais-instant-search
      :search-client="client"
      index-name="movies"
    >
      <ais-search-box
        placeholder="Search here…"
        class="searchbox"
      ></ais-search-box>
      <ais-hits>
        <template v-slot="{ items }">
          <ul>
            <li
              v-for="{ id,title,poster } in items"
              :key="id"
            >
              <h1>{{ title }}</h1>
              <img :src="poster" :alt="`Poster from ${title}`">
            </li>
          </ul>
        </template>
      </ais-hits>

    </ais-instant-search>
</template>
```


## Manage

On Nuxt server side, you can have access to Meilisearch SERVER instance liek so.

```ts{}[server/api/myRoute]
export default defineEventHandler(async (event) => {
  // Meilisearch is binded into Nitro Context
  const { serverMeilisearchClient } = event.context
  ...
  // Add you logic
}
```

Meilisearch Server Client is attach to the context, bt that way , you can access it in all your server context.

You can interact with all Meilisearch [API REFERENCE](https://docs.meilisearch.com/reference/api/overview.html).




### Server full exemple

From your API server route, you can add a document to specific index.

```ts{}[server/api/myRoute]
export default defineEventHandler(async (event) => {
  // Meilisearch is binded into Nitro Context
  const { serverMeilisearchClient } = event.context

   const addRecordRes = await serverMeilisearchClient.index('movies').addDocuments(
     {
       id: 999999994234,
       title: 'Batman Unmasked: The Psychology of the Dark Knight',
       poster: 'https://image.tmdb.org/t/p/w1280/jjHu128XLARc2k4cJrblAvZe0HE.jpg',
       overview: 'Delve into the world of Batman and the vigilante justice tha',
       release_date: '2008-07-15'
     }
   )

   return { myCustomResponse: "Document is on the way...." }
}
```
