<template>
  <UContainer class="p-4">

        <h1 class="text-center text-xl text-gray-600 mb-4">Perfom by `useInstantSearch` with Algolia</h1>

    
      <ais-instant-search
      :search-client="client"
      index-name="books"
    >
      <ais-configure :hits-per-page.camel="10" />
      <ais-search-box placeholder="Search here…" class="searchbox" />
      <ais-hits>
        <template #default="{ items }">
          <div v-for="{ id, title , price, genre } in items" :key="id" class="card">
            <div>
              <h1>{{ title }}</h1>
            </div>
          </div>
        </template>
      </ais-hits>
    </ais-instant-search> 

  </UContainer>
</template>

<script setup lang="ts">

import {
  AisInstantSearch,
  AisConfigure,
  AisHits,
  AisSearchBox
} from 'vue-instantsearch/vue3/es'
const client = useInstantSearch()

</script>
<style>
.card {
  display: flex;
  margin-bottom: 20px;
}

.card img {
  margin-right: 10px;
}
</style>
