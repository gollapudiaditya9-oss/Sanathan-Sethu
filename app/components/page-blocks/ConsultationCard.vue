<script setup lang="ts">
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  number: string
  title: string
  description: string
  fee: string
  buttonLabel: string
  to: RouteLocationRaw
}>()
</script>

<template>
  <div class="bg-ink p-8 md:p-12 flex flex-col justify-between min-h-[380px] border border-line/20 relative group">
    <!-- Hover effect subtle glow -->
    <div class="absolute inset-0 bg-paper/0 group-hover:bg-paper/5 transition-colors pointer-events-none"></div>

    <div class="flex flex-col gap-6 relative z-10">
      <div class="flex items-center justify-between">
        <span class="font-bricolage text-h-16 text-accent">{{ number }} / PHONE OR WRITTEN</span>
      </div>
      <h3 class="font-bricolage font-bold text-h-42 text-paper">{{ title }}</h3>
      <p class="font-inter text-h-16 text-paper/70 ">
        {{ description }}
      </p>
    </div>

    <div class="flex items-center justify-between mt-12 relative z-10">
      <span class="font-inter font-medium text-h-16 text-paper">₹ {{ fee }}</span>
      <ButtonSmall :label="buttonLabel" :to="to" variant="primary" />
    </div>
  </div>
</template>
