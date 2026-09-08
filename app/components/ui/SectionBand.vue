<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  theme?: 'bg' | 'paper' | 'ink' | 'solemn'
  padTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  padBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  number?: string
  label?: string
  subtitle?: string
  position?: string
  tone?: 'accent' | 'solemn'
}>()

const themeClass = computed(() => {
  switch (props.theme) {
    case 'paper': return 'bg-paper text-ink'
    case 'ink': return 'bg-ink text-paper'
    case 'solemn': return 'bg-solemn text-paper'
    default: return 'bg-bg text-ink'
  }
})

const padMap = {
  none: 'pt-0 pb-0',
  sm: 'pt-8 pb-8',
  md: 'pt-16 pb-16',
  lg: 'pt-24 pb-24',
  xl: 'pt-32 pb-32'
}

const padTopClass = computed(() => {
  const padding = props.padTop ?? 'none'
  return padMap[padding].split(' ')[0]
})

const padBottomClass = computed(() => {
  const padding = props.padBottom ?? 'none'
  return padMap[padding].split(' ')[1]
})
</script>

<template>
  <section :class="[themeClass, padTopClass, padBottomClass]" class="w-full">
    <div class="w-full px-6 lg:px-14">
      <slot />
    </div>
  </section>
</template>
