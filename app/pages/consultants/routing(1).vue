<script setup lang="ts">
import { useRoute } from '#imports'
import { usePurohits } from '~/composables/usePurohits'
import SectionBand from '~/components/ui/SectionBand.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'

const route = useRoute()
const { getPurohits } = usePurohits()
const question = computed(() => String(route.query.question || 'Your consultation question'))
const consultants = getPurohits().filter((item) => item.engagement_formats.includes('phone-consultation')).slice(0, 4)
</script>

<template>
  <div class="min-h-screen bg-bg text-ink">
    <h1 class="sr-only">Choose a consultant</h1>
    <SectionBand padTop="lg" padBottom="lg" theme="bg">
      <div class="flex flex-wrap items-center gap-3 font-inter text-h-12 text-ink-3"><span>Your question</span><span>·</span><strong class="text-ink">Pick consultant</strong><span>·</span><span>Pick a time</span><span>·</span><span>Confirm</span></div>
      <div class="mt-8  rounded-xl bg-solemn-soft p-7"><span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">YOUR QUESTION</span><p class="mt-3 font-bricolage text-h-26 italic leading-relaxed text-ink">{{ question }}</p></div>
    </SectionBand>

    <SectionBand padTop="lg" padBottom="xl" theme="paper" number="01" label="AVAILABLE CONSULTANTS" position="01 / 01">
      <div class="grid grid-cols-1 gap-6 pt-10 md:grid-cols-2">
        <article v-for="consultant in consultants" :key="consultant.slug" class="flex min-h-[300px] flex-col rounded-xl border border-ink/10 bg-bg p-7">
          <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">CONSULTATION PROFILE</span>
          <h2 class="mt-6 font-bricolage text-h-32 font-bold text-ink">{{ consultant.name }}</h2>
          <p class="mt-2 font-inter text-h-14 text-ink-3">{{ consultant.lineage }} · {{ consultant.years_of_service }} years</p>
          <div class="mt-5 flex flex-wrap gap-2"><span v-for="language in consultant.languages" :key="language" class="rounded-full border border-ink/15 px-3 py-1 font-inter text-h-10 text-ink-3">{{ language }}</span></div>
          <div class="mt-auto flex flex-wrap gap-3 pt-8"><ButtonSmall label="View profile" variant="outline" :to="`/consultants/${consultant.slug}?question=${encodeURIComponent(question)}`" /><ButtonSmall label="Choose consultant" :to="`/consultants/${consultant.slug}?question=${encodeURIComponent(question)}`" /></div>
        </article>
      </div>
    </SectionBand>
  </div>
</template>
