<template>
    <UContainer class="p-4">

      <h1 class="text-center text-xl text-gray-600 mb-4">Perfom by `useAsyncMeiliSearch`</h1>
      <UInput type="text" v-model="query" placeholder="Disable due about Async Demo" disabled size="xl" class="mb-4 max-w-lg m-auto" />

      <UButton label="Refesh" @click="refresh"/> Use `refresh` from async hook 


      <div class="grid grid-cols-3 gap-2 pt-4">
        <UCard v-for="book in result?.hits"  >
          <h3 >{{ book.title }}</h3>
          <p class=" capitalize text-sm text-gray-500">{{ book.genre }}</p>
        </UCard>
      </div>
      <p v-show="result" class=" text-xs my-2">Results: {{ result?.estimatedTotalHits }} books in {{ result?.processingTimeMs }} ms</p>

      <p>DEMO</p>
      <pre>const {data: result , refresh } = await useAsyncMeiliSearch({
  index: 'books',
  query: '',
  params: {
    limit:2
  }
})</pre>

    </UContainer>
</template>

<script setup lang="ts">
import { SearchParams } from 'meilisearch'

const {data: result , refresh } = await useAsyncMeiliSearch({
  index: 'books',
  query: '',
  params: {
    limit:2
  }
})

const pp = useState('books-search-result')

const query = ref('')
const options = reactive<SearchParams>({
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
  search(query.value, { showRankingScore: true, ...options })
}


watch([query, options], async (query) => {
  // meiliSearch()
})


onMounted(() => {
  // meiliSearch()
})
</script>
