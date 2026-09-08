<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
  compact?: boolean
}>()
</script>

<template>
  <header class="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-6 py-16 md:px-14 md:py-20 lg:py-24">
    <p class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">{{ eyebrow }}</p>
    <h1 class="max-w-[980px] whitespace-pre-line font-bricolage font-bold leading-[0.95] tracking-[-0.04em] text-ink" :class="compact ? 'text-h-68' : 'text-h-68 md:text-h-92'">{{ title }}</h1>
    <p v-if="description" class="max-w-[780px] font-inter text-h-16 leading-[1.65] text-ink-2 md:text-h-26">{{ description }}</p>
    <slot />
  </header>
</template>
