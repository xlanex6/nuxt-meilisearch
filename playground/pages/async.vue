<script setup lang="ts">
const { data: result, refresh } = await useAsyncMeiliSearch({
  index: 'books',
  query: '',
  params: {
    limit: 2,
  },
})

const query = ref('')
</script>

<template>
  <UContainer class="p-4">
    <h1 class="text-center text-xl text-gray-600 mb-4">
      Perfom by `useAsyncMeiliSearch`
    </h1>
    <UInput
      v-model="query"
      type="text"
      placeholder="Disable due about Async Demo"
      disabled
      size="xl"
      class="mb-4 max-w-lg m-auto"
    />

    <UButton
      label="Refesh"
      @click="refresh"
    /> Use `refresh` from async hook

    <div class="grid grid-cols-3 gap-2 pt-4">
      <UCard
        v-for="book in result?.hits"
        :key="book.id"
      >
        <h3>{{ book.title }}</h3>
        <p class=" capitalize text-sm text-gray-500">
          {{ book.genre }}
        </p>
      </UCard>
    </div>
    <p
      v-show="result"
      class=" text-xs my-2"
    >
      Results: {{ result?.estimatedTotalHits }} books in {{ result?.processingTimeMs }} ms
    </p>

    <p>DEMO</p>
    <pre>
        const {data: result , refresh } = await useAsyncMeiliSearch({
            index: 'books',
            query: '',
            params: {
              limit:2
            }
        })
      </pre>
  </UContainer>
</template>
