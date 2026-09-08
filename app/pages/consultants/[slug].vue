<script setup lang="ts">
import SectionBand from '~/components/ui/SectionBand.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

const route = useRoute()
const { getPurohitBySlug } = usePurohits()
const practitioner = computed(() => getPurohitBySlug(String(route.params.slug)))
if (!practitioner.value) throw createError({ statusCode: 404, statusMessage: 'Consultant not found' })
useSeoMeta({ title: () => `${practitioner.value?.name ?? 'Consultant'} — Consultation` })
</script>

<template>
  <div v-if="practitioner" class="bg-bg text-ink">
    <section class="mx-auto grid min-h-[620px] max-w-[1440px] border-b border-ink md:grid-cols-[1.25fr_.75fr]">
      <div class="flex flex-col justify-between p-7 lg:p-14"><p class="font-inter text-h-10 font-semibold uppercase tracking-[.16em]">परामर्शदाता · Consultant · ஆலோசகர்</p><div class="py-20"><p class="font-inter text-h-12 uppercase tracking-[.14em] text-ink-3">{{ practitioner.lineage }}</p><h1 class="mt-5 font-bricolage text-h-68 font-bold leading-[.92] md:text-h-92">{{ practitioner.name }}</h1><p class="mt-7 max-w-xl font-inter text-h-16 leading-relaxed text-ink-2">Profile narrative pending the practitioner’s own reviewed words.</p></div><p class="font-inter text-h-10 uppercase tracking-[.14em]">{{ practitioner.years_of_service }} years · {{ practitioner.languages.join(' · ') }}</p></div>
      <div class="flex items-center justify-center border-t border-ink bg-paper p-8 text-center md:border-l md:border-t-0"><p class="max-w-52 font-inter text-h-10 uppercase leading-relaxed tracking-[.16em] text-ink-3">Portrait published only after explicit consent</p></div>
    </section>
    <SectionBand number="01" label="Advisory practice" subtitle="परामर्श" />
    <section class="mx-auto grid max-w-[1440px] border-l border-t border-ink sm:grid-cols-2"><article v-for="area in practitioner.specialties" :key="area" class="min-h-52 border-b border-r border-ink p-8"><p class="font-bricolage text-h-32 font-bold">{{ area }}</p><p class="mt-5 font-inter text-h-14 leading-relaxed text-ink-2">Scope is confirmed in the introductory conversation.</p></article></section>
    <section class="mx-auto grid max-w-[1440px] gap-8 px-6 py-20 md:grid-cols-2 lg:px-14"><div><p class="font-inter text-h-10 font-semibold uppercase tracking-[.14em] text-accent">Request time</p><h2 class="mt-5 font-bricolage text-h-52 font-bold leading-none">A conversation with context.</h2></div><div class="flex flex-col items-start gap-6"><p class="font-inter text-h-16 leading-relaxed text-ink-2">Format, availability, and consultation fee are confirmed before you commit.</p><p class="font-bricolage text-h-26">₹ [fee]</p><ButtonLarge label="Route my question" to="/consultants/routing" /></div></section>
  </div>
</template>
