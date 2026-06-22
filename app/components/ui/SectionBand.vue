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
  const p = props.padTop ?? 'none'
  return padMap[p].split(' ')[0]
})

const padBottomClass = computed(() => {
  const p = props.padBottom ?? 'none'
  return padMap[p].split(' ')[1]
})
</script>

<template>
  <section :class="[themeClass, padTopClass, padBottomClass]" class="w-full">
    <div class="mx-auto w-full max-w-[1440px] px-6 lg:px-14">
      <div v-if="number || label" class="flex flex-col sm:flex-row items-center justify-between py-4 border-y font-inter text-h-10 uppercase tracking-[0.14em] font-semibold" :class="(theme === 'ink' || theme === 'solemn') ? 'border-paper/20 text-paper/70' : 'border-ink/10 text-ink-3'">
        <div class="w-16 shrink-0 text-left" :class="tone === 'accent' ? 'text-accent' : tone === 'solemn' ? 'text-solemn' : (theme === 'ink' || theme === 'solemn' ? 'text-paper' : 'text-ink')">{{ number }}</div>
        <div class="flex-grow text-center text-ink-3" :class="(theme === 'ink' || theme === 'solemn') ? 'text-paper/70' : 'text-ink-3'">
          <span v-if="label">{{ label }}</span>
          <span v-if="subtitle">· {{ subtitle }}</span>
        </div>
        <div class="w-16 shrink-0 text-right">
          {{ position }}
        </div>
      </div>
      <slot />
    </div>
  </section>
</template>
