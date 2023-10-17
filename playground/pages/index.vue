<template>
  <UContainer class="p-4">

    <h1 class="text-center text-xl text-gray-600 mb-4">Perfom by `useMeiliSearch`</h1>
    <UInput type="text" v-model="query" placeholder="Search for a book Ex: Harry" size="xl" class="mb-4 max-w-lg m-auto" />

    <!-- <UInput type="text" v-model="params.filter" placeholder="Filter" class=" max-w-sm" /> -->


    <div class="grid grid-cols-3 gap-2 pt-4">
      <UCard v-for="book in result?.hits"  >
        <h3 >{{ book.title }}</h3>
        <p class=" capitalize text-sm text-gray-500">{{book.genre}}</p>
      </UCard>
    </div>
    <p class=" text-xs my-2">Results: {{ result?.estimatedTotalHits }} books in {{ result?.processingTimeMs }} ms</p>

  </UContainer>
</template>

<script setup lang="ts">
import { SearchParams } from 'meilisearch'

const { search, result } = useMeiliSearch('books')

const query = ref('')
const params = reactive<SearchParams>({
  limit: 10,
  facets: ["*"],
  filter: "",
  sort: ["price:desc"],
  attributesToHighlight: ["*"]
})

const genre = computed(() => {
  const p = result.value?.facetDistribution?.genre || {}
  return Object.keys(p).map((key) => {
    return {
      name: key,
      count: p[key]
    }
  })
})

function meiliSearch() {
  search(query.value, { showRankingScore: true, ...params })
}


watch([query, params], async (query) => {
  meiliSearch()
})


onMounted(() => {
  meiliSearch()
})

</script>
