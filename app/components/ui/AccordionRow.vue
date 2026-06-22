<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  number: string
  title: string
  description: string
}>()

const isOpen = ref(false)
</script>

<template>
  <button 
    @click="isOpen = !isOpen"
    class="w-full text-left flex flex-col group border-t border-ink/10 transition-colors hover:bg-ink/5"
    :aria-expanded="isOpen"
  >
    <div class="w-full min-h-[120px] px-8 md:px-14 flex items-center gap-6 py-6">
      <span class="font-bricolage text-h-16 text-ink-3 w-[60px] flex-shrink-0">
        {{ number }}
      </span>
      <span class="font-bricolage text-h-26 text-ink font-medium w-full max-w-[300px]">
        {{ title }}
      </span>
      <span v-if="!isOpen" class="hidden md:block font-inter text-h-16 text-ink-2 max-w-[400px] line-clamp-2">
        {{ description }}
      </span>
      <div class="ml-auto flex items-center justify-center w-10 h-10 rounded-full border border-ink/20 group-hover:border-ink/50 transition-colors">
        <span 
          class="text-ink text-h-16 font-semibold transition-transform duration-300 transform"
          :class="isOpen ? 'rotate-90' : ''"
          aria-hidden="true"
        >→</span>
      </div>
    </div>
    
    <div 
      class="overflow-hidden transition-all duration-300 ease-in-out px-8 md:px-14"
      :class="isOpen ? 'max-h-[500px] pb-10 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="pl-[84px] md:pl-[408px]">
        <p class="font-inter text-h-16 text-ink-2 max-w-[500px]">
          {{ description }}
        </p>
      </div>
    </div>
  </button>
</template>
