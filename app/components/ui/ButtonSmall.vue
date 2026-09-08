<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  label: string
  variant?: 'primary' | 'outline'
  iconRight?: boolean
  to?: RouteLocationRaw
  tag?: string
  type?: 'button' | 'submit'
}>()

const NuxtLink = resolveComponent('NuxtLink')
const variant = computed(() => props.variant ?? 'primary')
const iconRight = computed(() => props.iconRight !== false)

const styles = computed(() => {
  if (variant.value === 'primary') return 'bg-accent text-[#fff7ec] hover:bg-[#c86432] transition-colors duration-150 ease-out'
  return 'border-2 border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-150 ease-out'
})
</script>

<template>
  <component
    :is="to ? NuxtLink : (tag || 'button')"
    :to="to"
    :type="!to && tag !== 'div' && tag !== 'span' ? (type ?? 'button') : undefined"
    class="inline-flex max-w-[260px] items-center justify-center gap-3 rounded-full py-2.5 px-5 font-inter font-semibold text-h-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    :class="styles"
  >
    <span>{{ label }}</span>
    <span v-if="iconRight" aria-hidden="true">→</span>
  </component>
</template>
