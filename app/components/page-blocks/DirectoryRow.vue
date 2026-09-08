<script setup lang="ts">
import ButtonSmall from '~/components/ui/ButtonSmall.vue'

defineProps<{
  number: string
  name: string
  lineage: string
  specialty: string
  location: string
  years: number
  to: string
}>()
</script>

<template>
  <NuxtLink :to="to" class="group flex flex-col md:flex-row md:items-center min-h-[120px] px-6 sm:px-14 py-6 border-b border-ink/10 bg-paper hover:bg-bg transition-colors duration-300 ease-out gap-4 md:gap-0">
    <div class="w-[56px] shrink-0 font-bricolage text-h-16 text-ink-3">
      {{ number }}
    </div>
    
    <div class="w-full md:w-[360px] shrink-0 flex flex-col gap-1">
      <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3 md:hidden">Purohit &amp; lineage</span>
      <h3 class="font-bricolage text-h-26 text-ink group-hover:text-accent transition-colors">{{ name }}</h3>
      <p class="font-inter text-h-16 text-ink-3">{{ lineage }}</p>
    </div>

    <div class="w-full md:w-[280px] shrink-0 flex flex-col gap-1 font-inter text-h-16 text-ink-2">
      <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3 md:hidden">Specialties</span>
      <span>{{ specialty }}</span>
    </div>

    <div class="w-full md:w-[160px] shrink-0 flex flex-col gap-1 font-inter text-h-16 text-ink-2">
      <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3 md:hidden">Location</span>
      <span>{{ location }}</span>
    </div>

    <div class="w-full md:w-[120px] shrink-0 flex flex-col gap-1 font-inter text-h-16 text-ink-2">
      <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3 md:hidden">Experience</span>
      <span>{{ years }} years</span>
    </div>

    <div class="ml-auto mt-4 md:mt-0">
      <ButtonSmall label="View profile" variant="outline" tag="div" />
    </div>
  </NuxtLink>
</template>
