<script setup lang="ts">
defineProps<{
  number: string | number
  title: string
  rightText?: string
}>()
</script>

<template>
  <div class="w-full border-y border-ink/10 py-4 flex items-center justify-between font-inter text-[12px] font-semibold tracking-[0.14em] uppercase text-ink">
    <div class="w-12">{{ number }}</div>
    <div class="flex-grow text-center text-ink-3">
      {{ title }}
    </div>
    <div class="w-16 text-right">{{ rightText }}</div>
  </div>
</template>
