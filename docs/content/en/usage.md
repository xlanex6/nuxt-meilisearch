---
title: Usage
position: 3
---


## Usage

You can load Meilisearch client with composables 

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
