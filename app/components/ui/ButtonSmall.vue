<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

const props = defineProps<{
  label: string
  variant?: 'primary' | 'outline'
  iconRight?: boolean
  to?: string
  tag?: string
}>()

const NuxtLink = resolveComponent('NuxtLink')
const variant = computed(() => props.variant ?? 'primary')
const iconRight = computed(() => props.iconRight !== false)

const styles = computed(() => {
  if (variant.value === 'primary') return 'bg-ink text-paper hover:bg-ink-2 transition-colors duration-150 ease-out'
  return 'border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-150 ease-out'
})
</script>

<template>
  <component
    :is="to ? NuxtLink : (tag || 'button')"
    :to="to"
    class="inline-flex items-center gap-3 rounded-lg py-2.5 px-5 font-inter font-semibold text-h-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    :class="styles"
  >
    <span>{{ label }}</span>
    <span v-if="iconRight" aria-hidden="true">→</span>
  </component>
</template>
