<script setup>
import {
  AisConfigure,
  AisHits,
  AisInstantSearch,
  AisSearchBox,
} from 'vue-instantsearch/vue3/es'

const client = useInstantSearch()
</script>

<template>
  <UContainer class="p-4">
    <h1 class="text-center text-xl text-gray-600 mb-4">
      Perfom by `useInstantSearch` with Algolia
    </h1>

    <AisInstantSearch
      :search-client="client"
      index-name="books"
    >
      <AisConfigure :hits-per-page.camel="10" />
      <AisSearchBox placeholder="Search here…" class="searchbox" />
      <AisHits>
        <template #default="{ items }">
          <div v-for="{ id, title, price, genre } in items" :key="id" class="card">
            <div>
              <h1>{{ title }}</h1>
              <p>{{ genre }} - {{ price }}</p>
            </div>
          </div>
        </template>
      </AisHits>
    </AisInstantSearch>
  </UContainer>
</template>
