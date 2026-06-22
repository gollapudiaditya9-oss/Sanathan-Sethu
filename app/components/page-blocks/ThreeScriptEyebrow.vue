<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  english: string
  sanskrit: string
  telugu: string
  tone?: 'accent' | 'solemn' | 'ink' | 'soft'
}>()

const textClass = computed(() => {
  if (props.tone === 'solemn') return 'text-solemn'
  if (props.tone === 'ink') return 'text-ink'
  if (props.tone === 'soft') return 'text-solemn-soft'
  return 'text-accent'
})
</script>

<template>
  <p
    class="font-inter font-semibold text-h-10 tracking-[0.14em] uppercase"
    :class="textClass"
  >
    <span>{{ english }}</span>
    <span class="mx-3" aria-hidden="true">·</span>
    <span class="font-telugu" lang="sa">{{ sanskrit }}</span>
    <span class="mx-3" aria-hidden="true">·</span>
    <span class="font-telugu" lang="te">{{ telugu }}</span>
  </p>
</template>
