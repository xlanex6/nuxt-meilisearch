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
      />
      <ais-hits>
        <template #default="{ items }">
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

<script setup>

const client = useMeilisearchClient()

</script>
