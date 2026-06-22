<script setup lang="ts">
import { resolveComponent } from 'vue'

const props = defineProps<{
  currentStep: number
}>()

const NuxtLink = resolveComponent('NuxtLink')

const steps = [
  { num: '01', label: 'RITUAL', to: '/book/choose-ritual' },
  { num: '02', label: 'CONFIGURE', to: '/book/configure' },
  { num: '03', label: 'FAMILY DETAILS', to: '/book/family-details' },
  { num: '04', label: 'MATCH PUROHIT', to: '/book/match-purohit' },
  { num: '05', label: 'CONFIRM', to: '/book/confirm' }
]
</script>

<template>
  <div class="w-full flex border-b border-ink/10 bg-bg">
    <component
      v-for="(step, index) in steps" 
      :key="step.num"
      :is="currentStep > index + 1 ? NuxtLink : 'div'"
      :to="currentStep > index + 1 ? step.to : undefined"
      :aria-label="currentStep > index + 1 ? `Return to step ${step.num}: ${step.label}` : undefined"
      :aria-current="currentStep === index + 1 ? 'step' : undefined"
      class="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 py-4 md:py-6 px-4 md:px-14 border-r border-ink/10 last:border-r-0"
      :class="{
        'bg-ink text-paper': currentStep === index + 1,
        'bg-paper': currentStep !== index + 1,
        'hover:bg-ink/5 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink': currentStep > index + 1
      }"
    >
      <span 
        class="font-inter font-bold text-h-16"
        :class="{
          'text-paper': currentStep === index + 1,
          'text-ink': currentStep !== index + 1,
          'opacity-40': currentStep < index + 1
        }"
      >
        <template v-if="currentStep > index + 1">
          ✓
        </template>
        <template v-else>
          {{ step.num }}
        </template>
      </span>
      <span 
        class="hidden md:inline font-inter font-semibold text-h-10 tracking-[0.14em] uppercase"
        :class="{
          'text-paper/80': currentStep === index + 1,
          'text-ink-3': currentStep !== index + 1,
          'opacity-40': currentStep < index + 1
        }"
      >
        {{ step.label }}
      </span>
    </component>
  </div>
</template>
