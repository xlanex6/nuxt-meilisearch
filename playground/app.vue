<template>
  <div>
    <ais-instant-search
      :search-client="client"
      index-name="books"
    >
      <ais-configure :hits-per-page.camel="10" />
      <ais-search-box placeholder="Search here…" class="searchbox" />
      <ais-hits>
        <template #default="{ items }">
          <ul>
            <li v-for="{ id, title , price} in items" :key="id">
              <h1>{{ title }}</h1>
              <p>price: {{ price }} $</p>
            </li>
          </ul>
        </template>
      </ais-hits>
    </ais-instant-search>
  </div>
</template>

<script setup>

import {
  AisInstantSearch,
  AisConfigure,
  AisHits,
  AisSearchBox
} from 'vue-instantsearch/vue3/es'

const client = useMeilisearchClient()

</script>
