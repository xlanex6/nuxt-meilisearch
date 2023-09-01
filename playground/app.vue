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
          <div v-for="{ id, title , price, genre } in items" :key="id" class="card">
            <!-- <img :src="poster" alt="" height="300"> -->
            <div>
              <h1>{{ title }}</h1>
              <p>{{ overview }}</p>
            </div>
          </div>
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
<style>
.card {
  display: flex;
  margin-bottom: 20px;
}

.card img {
  margin-right: 10px;
}
</style>
