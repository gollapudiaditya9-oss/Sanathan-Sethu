<script setup lang="ts">
import StatusPill from '../ui/StatusPill.vue'
import ButtonSmall from '../ui/ButtonSmall.vue'

defineProps<{
  title: string
  subtitle?: string
  imageSrc?: string
  imageAlt?: string
  statusLabel?: string
  statusTone?: 'live' | 'opens-q3-2026' | 'verified' | 'neutral'
  actionLabel?: string
  actionTo?: string
}>()
</script>

<template>
  <div class="group flex flex-col sm:flex-row sm:items-center justify-between min-h-[100px] sm:h-[140px] px-6 sm:px-12 py-6 border-b border-ink/10 bg-paper hover:bg-bg transition-colors duration-300 ease-out">
    <div class="flex items-center gap-8 mb-6 sm:mb-0">
      <div v-if="imageSrc" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-ink/5 shrink-0">
        <img :src="imageSrc" :alt="imageAlt ?? ''" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="font-bricolage text-h-26 text-ink">{{ title }}</h3>
        <p v-if="subtitle" class="font-inter text-h-16 text-ink-3">{{ subtitle }}</p>
      </div>
    </div>
    
    <div class="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
      <StatusPill v-if="statusLabel" :label="statusLabel" :tone="statusTone" />
      <ButtonSmall v-if="actionLabel" :label="actionLabel" :to="actionTo" variant="outline" />
    </div>
  </div>
</template>
