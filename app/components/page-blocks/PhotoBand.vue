<script setup lang="ts">
defineProps<{
  imageSrc: string
  imageAlt?: string
}>()
</script>

<template>
  <div class="w-full h-[300px] md:h-[400px] relative overflow-hidden bg-ink/5">
    <img :src="imageSrc" :alt="imageAlt ?? ''" class="w-full h-full object-cover" />
    <!-- Parallax can be hooked up here later using GSAP via template refs -->
  </div>
</template>
