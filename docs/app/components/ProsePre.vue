<script setup lang="ts">
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useAppConfig } from '#imports'

const props = withDefaults(defineProps<{
  code?: string
  filename?: string
  hideHeader?: boolean
  copy?: boolean | Record<string, unknown>
  class?: unknown
}>(), {
  copy: true,
})

const appConfig = useAppConfig()
const { copy: copyToClipboard, copied } = useClipboard()
const baseRef = ref<HTMLElement | null>(null)
const showHeader = computed(() => Boolean(props.filename) && !props.hideHeader)

function copyCode() {
  copyToClipboard(props.code ?? baseRef.value?.textContent ?? '')
}
</script>

<template>
  <div class="relative my-5 overflow-hidden rounded-md border border-default">
    <div
      v-if="showHeader"
      class="border-b border-default px-4 py-2 text-sm text-muted"
    >
      {{ filename }}
    </div>

    <UButton
      v-if="copy"
      :icon="copied ? appConfig.ui.icons.copyCheck : appConfig.ui.icons.copy"
      color="neutral"
      variant="outline"
      size="sm"
      aria-label="Copy code"
      class="absolute top-2 right-2"
      @click="copyCode"
    />

    <pre
      ref="baseRef"
      class="overflow-x-auto p-4 text-sm"
      :class="props.class"
    ><slot /></pre>
  </div>
</template>
