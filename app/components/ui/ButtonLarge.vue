<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  label: string
  variant?: 'primary' | 'ink' | 'solemn' | 'outline'
  iconRight?: boolean
  to?: RouteLocationRaw
  type?: 'button' | 'submit'
  tag?: string
}>()

const NuxtLink = resolveComponent('NuxtLink')
const variant = computed(() => props.variant ?? 'primary')
const iconRight = computed(() => props.iconRight !== false)

const styles = computed(() => {
  if (variant.value === 'solemn') return 'bg-[#6f3f28] text-[#fff4e6] hover:bg-[#7a472e]'
  if (variant.value === 'outline') return 'border border-ink/40 text-ink hover:border-accent hover:bg-accent hover:text-[#fff7ec]'
  if (variant.value === 'ink') return 'bg-[#e6c89f] text-[#201611] hover:bg-[#efd7b5]'
  return 'bg-accent text-[#fff7ec] hover:bg-[#c86432]'
})
</script>

<template>
  <component
    :is="to ? NuxtLink : (tag || 'button')"
    :to="to"
    :type="!to && tag !== 'div' && tag !== 'span' ? (type ?? 'button') : undefined"
    class="inline-flex max-w-[320px] items-center justify-center gap-3 rounded-lg py-3.5 px-6 font-inter font-semibold text-h-16 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    :class="styles"
  >
    <span>{{ label }}</span>
    <span v-if="iconRight" aria-hidden="true">→</span>
  </component>
</template>
