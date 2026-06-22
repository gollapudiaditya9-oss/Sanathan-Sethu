<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status?: string
  label?: string
  tone?: 'live' | 'opens-q3-2026' | 'verified' | 'neutral'
}>()

// Derive display label: prefer explicit label, otherwise derive from status
const displayLabel = computed(() => {
  if (props.label) return props.label
  if (!props.status) return ''
  return props.status
})

// Derive tone: prefer explicit tone, otherwise derive from status
const derivedTone = computed(() => {
  if (props.tone) return props.tone
  if (!props.status) return 'neutral'
  const s = props.status.toUpperCase()
  if (s === 'LIVE') return 'live'
  if (s === 'OPEN') return 'verified'
  if (s.includes('Q3') || s.includes('Q4') || s.includes('202')) return 'opens-q3-2026'
  return 'neutral'
})

const styles = computed(() => {
  switch (derivedTone.value) {
    case 'live': return 'border-accent text-accent before:bg-accent'
    case 'opens-q3-2026': return 'border-ink-3 text-ink-3'
    case 'verified': return 'border-ink text-ink'
    default: return 'border-ink text-ink'
  }
})
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-inter font-semibold tracking-[0.14em] text-h-10 uppercase whitespace-nowrap"
    :class="styles"
  >
    <span v-if="derivedTone === 'live'" class="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
    {{ displayLabel }}
  </span>
</template>
