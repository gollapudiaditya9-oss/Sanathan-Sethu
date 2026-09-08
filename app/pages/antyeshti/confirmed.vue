<script setup lang="ts">
import { definePageMeta } from '#imports'
import SectionBand from '~/components/ui/SectionBand.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

definePageMeta({ layout: 'solemn' })
</script>

<template>
  <div class="min-h-screen bg-ink text-paper">
    <SectionBand pad-top="xl" pad-bottom="xl" theme="ink" tone="solemn">
      <div class="flex max-w-[760px] flex-col gap-8">
        <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-paper/40">REQUEST RECEIVED</span>
        <h1 class="font-bricolage text-h-68 leading-[0.95] text-paper">We will call you within four hours.</h1>
        <p class="font-inter text-h-16 leading-relaxed text-paper/60">Your request has been recorded. Stay with your family; the coordinator will use the phone number you provided.</p>
        <ButtonLarge label="Return home" variant="solemn" to="/" />
      </div>
    </SectionBand>
  </div>
</template>
