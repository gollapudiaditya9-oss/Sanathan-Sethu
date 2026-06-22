<script setup lang="ts">
defineProps<{
  stats: [
    { label: string; value: string },
    { label: string; value: string },
    { label: string; value: string }
  ]
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink/10 border-y border-ink/10 w-full">
    <div v-for="(stat, idx) in stats" :key="idx" class="flex flex-col gap-2 py-8 px-6 lg:px-12">
      <span class="font-bricolage text-h-42 text-ink">{{ stat.value }}</span>
      <span class="font-inter text-h-16 text-ink-3 uppercase tracking-[0.14em] font-semibold">{{ stat.label }}</span>
    </div>
  </div>
</template>
