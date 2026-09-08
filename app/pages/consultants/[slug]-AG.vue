<script setup lang="ts">
import { useRoute } from '#imports'
import { usePurohits } from '~/composables/usePurohits'
import SectionBand from '~/components/ui/SectionBand.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'

const route = useRoute()
const { getPurohitBySlug } = usePurohits()
const consultant = getPurohitBySlug(String(route.params.slug))
if (!consultant) throw createError({ statusCode: 404, statusMessage: 'Consultant Not Found' })
const question = computed(() => String(route.query.question || ''))
</script>

<template>
  <div class="min-h-screen bg-bg text-ink">
    <SectionBand padTop="lg" padBottom="xl" theme="bg">
      <ButtonSmall label="Back to consultants" variant="outline" to="/consultants/routing" />
      <div class="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div class="flex min-h-[420px] items-center justify-center rounded-xl bg-line/50 md:col-span-5"><span class="text-center font-inter text-h-10 uppercase leading-relaxed tracking-[0.14em] text-ink-3">Profile photo added after consent</span></div>
        <div class="flex flex-col md:col-span-7"><span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">CONSULTANT PROFILE</span><h1 class="mt-5 font-bricolage text-h-68 leading-[0.95] tracking-[-0.03em]">{{ consultant.name }}</h1><p class="mt-5 font-inter text-h-16 text-ink-3">{{ consultant.lineage }} · {{ consultant.years_of_service }} years · {{ consultant.city }}</p><div class="mt-7 flex flex-wrap gap-2"><span v-for="item in consultant.specialties" :key="item" class="rounded-full border border-ink/15 px-3 py-2 font-inter text-h-12">{{ item }}</span><span v-for="language in consultant.languages" :key="language" class="rounded-full bg-solemn-soft px-3 py-2 font-inter text-h-12">{{ language }}</span></div><p class="mt-8  font-inter text-h-16 leading-relaxed text-ink-3">Consultation scope, availability, and fee are confirmed before booking.</p></div>
      </div>
    </SectionBand>
    <SectionBand padTop="lg" padBottom="xl" theme="paper" number="01" label="CONSULTATION FORMATS" position="01 / 01">
      <div v-if="question" class="mb-8 rounded-xl bg-solemn-soft p-6"><span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">YOUR QUESTION</span><p class="mt-3 font-inter text-h-16 text-ink">{{ question }}</p></div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2"><article class="rounded-xl border border-ink/10 bg-bg p-8"><h2 class="font-bricolage text-h-32 font-bold">Phone call</h2><p class="mt-4 font-inter text-h-16 text-ink-3">A scheduled conversation. Duration and preparation are confirmed first.</p><p class="mt-8 font-inter font-semibold">₹ [fee]</p><ButtonLarge class="mt-6" label="Request a phone call" to="/book/consultation?type=phone" /></article><article class="rounded-xl border border-ink/10 bg-bg p-8"><h2 class="font-bricolage text-h-32 font-bold">Written response</h2><p class="mt-4 font-inter text-h-16 text-ink-3">A written answer where the question is suitable for that format.</p><p class="mt-8 font-inter font-semibold">₹ [fee]</p><ButtonLarge class="mt-6" label="Request a written response" to="/book/consultation?type=written" /></article></div>
    </SectionBand>
  </div>
</template>
