<script setup lang="ts">
import SectionBand from '~/components/ui/SectionBand.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'

const partnerTypes = [
  { number: '01', title: 'Purohit', description: 'Create a reviewed practice profile and receive relevant ritual enquiries.', to: '/become-a-purohit' },
  { number: '02', title: 'Consultant', description: 'Offer clearly scoped guidance through phone or written consultations.', to: '/become-a-consultant' },
  { number: '03', title: 'Caterer', description: 'Support ritual households with dietary-aware catering services.', to: '/partners/caterer' },
  { number: '04', title: 'Other service', description: 'Venues, samagri suppliers, transport, and other ceremony support.', to: '/waitlist' }
]
</script>

<template>
  <div class="min-h-screen bg-bg">
    <SectionBand padTop="xl" padBottom="lg" theme="bg">
      <div class="flex  flex-col gap-6"><span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">FOR PARTNERS · सहयोगः</span><h1 class="font-bricolage text-h-68 leading-[0.95] tracking-[-0.03em] text-ink md:text-h-92">Work with SanatanaSetu.</h1><p class="font-inter text-h-26 leading-relaxed text-ink-3">For practitioners and services that support Hindu ritual life with clear scope, responsible practice, and transparent information.</p></div>
    </SectionBand>
    <SectionBand padTop="lg" padBottom="xl" theme="paper" number="01" label="CHOOSE A PARTNERSHIP" position="01 / 01">
      <div class="grid grid-cols-1 gap-6 pt-10 md:grid-cols-2">
        <article v-for="partner in partnerTypes" :key="partner.number" class="flex min-h-[280px] flex-col rounded-xl border border-ink/10 bg-bg p-8"><span class="font-inter text-h-12 font-semibold text-accent">{{ partner.number }}</span><h2 class="mt-7 font-bricolage text-h-42 leading-none text-ink">{{ partner.title }}</h2><p class="mt-5  font-inter text-h-16 leading-relaxed text-ink-3">{{ partner.description }}</p><div class="mt-auto pt-8"><ButtonSmall label="View requirements" variant="outline" :to="partner.to" /></div></article>
      </div>
    </SectionBand>
  </div>
</template>
