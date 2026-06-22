<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

const props = defineProps<{
  label: string
  variant?: 'ink' | 'solemn' | 'outline'
  iconRight?: boolean
  to?: string
  type?: 'button' | 'submit'
  tag?: string
}>()

const NuxtLink = resolveComponent('NuxtLink')
const variant = computed(() => props.variant ?? 'ink')
const iconRight = computed(() => props.iconRight !== false)

const styles = computed(() => {
  if (variant.value === 'solemn') return 'bg-solemn text-paper hover:brightness-[0.96]'
  if (variant.value === 'outline') return 'border border-ink text-ink hover:bg-ink hover:text-paper'
  return 'bg-ink text-paper hover:brightness-[0.96]'
})
</script>

<template>
  <component
    :is="to ? NuxtLink : (tag || 'button')"
    :to="to"
    :type="!to && tag !== 'div' && tag !== 'span' ? (type ?? 'button') : undefined"
    class="inline-flex items-center gap-3 rounded-lg py-3.5 px-6 font-inter font-semibold text-h-16 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    :class="styles"
  >
    <span>{{ label }}</span>
    <span v-if="iconRight" aria-hidden="true">→</span>
  </component>
</template>
