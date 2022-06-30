<script setup>
const client = useMeilisearchClient()

async function seed () {
  await $fetch('/api/seed', {
    method: 'POST'
  })
}

</script>

<template>
  <div>
    <h1>
      Nuxt module playground for nuxt-meilisearch !
    </h1>
    <button @click="seed">
      Seed!
    </button>
    <ais-instant-search :search-client="client" index-name="movies">
      <ais-stats />
      <ais-configure :hits-per-page.camel="12" />
      <h2>Input</h2>
      <ais-search-box placeholder="Search here…" class="searchbox" />
      <h2>Timestamp</h2>
      <ais-range-input attribute="release_date" :max="100000000" />
      <ais-hits>
        <template #default="{ items }">
          <h2>Results</h2>
          <div class="results">
            <div v-for="{ id, title, poster } in items" :key="id" class="poster">
              <h3>{{ title }}</h3>
              <img :src="poster" :alt="`Poster from ${title}`">
            </div>
          </div>
        </template>
      </ais-hits>
      <ais-pagination />
    </ais-instant-search>
  </div>
</template>
<style>
html {

  font-family: sans-serif;
}
.results {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 16px;
  row-gap: 4px;
}

.poster {
  margin: 4px;
  padding: 4px;
}

.poster > img {
  width: 100%;
}

</style>
