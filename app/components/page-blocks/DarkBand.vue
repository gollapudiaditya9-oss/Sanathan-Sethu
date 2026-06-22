<script setup lang="ts">
import SectionBand from '../ui/SectionBand.vue'

defineProps<{
  padTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  padBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}>()
</script>

<template>
  <SectionBand theme="ink" :padTop="padTop" :padBottom="padBottom">
    <div class="flex flex-col gap-12">
      <slot />
    </div>
  </SectionBand>
</template>
