<script setup lang="ts">
import { definePageMeta } from '#imports'
import SectionBand from '~/components/ui/SectionBand.vue'

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div>
    <SectionBand padTop="xl" padBottom="xl" theme="bg">
      <div class="flex flex-col gap-8 max-w-[800px] min-h-[400px]">
        <h1 class="font-bricolage text-h-68 md:text-h-92 text-ink leading-[0.95] tracking-[-0.03em]">
          Verification Charter
        </h1>
        <p class="font-inter text-h-26 text-ink-3 max-w-[600px]">
          Placeholder page: Full details of our 5-step verification process will be published here.
        </p>
      </div>
    </SectionBand>
  </div>
</template>
