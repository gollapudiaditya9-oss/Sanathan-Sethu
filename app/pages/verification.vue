<script setup lang="ts">
import { definePageMeta } from '#imports'
import SectionBand from '~/components/ui/SectionBand.vue'

definePageMeta({
  layout: 'default'
})

const sections = [
  { number: '01', title: 'Purohits', description: 'We review identity, lineage, training, areas of practice, and independent references before publishing a verified profile.' },
  { number: '02', title: 'Partners', description: 'We review business identity, service area, relevant registrations, references, and the claims displayed on the listing.' },
  { number: '03', title: 'Knowledge content', description: 'Authorship, sources, citations, and tradition-specific differences remain visible so readers can understand where a claim comes from.' },
  { number: '04', title: 'What we do not claim', description: 'Verification is not a guarantee of conduct, outcome, availability, or agreement with every family tradition.' },
  { number: '05', title: 'Ongoing review', description: 'Material profile changes, credible concerns, and expired evidence can pause a listing and reopen verification.' }
]
</script>

<template>
  <div>
    <SectionBand padTop="xl" padBottom="lg" theme="bg">
      <div class="flex flex-col gap-8 ">
        <h1 class="font-bricolage text-h-68 md:text-h-92 text-ink leading-[0.95] tracking-[-0.03em]">
          Verification Charter
        </h1>
        <p class="font-inter text-h-26 text-ink-3 ">
          What “verified” means, what we check, and what verification does not claim.
        </p>
      </div>
    </SectionBand>

    <SectionBand padTop="lg" padBottom="xl" theme="paper" number="01" label="THE CHARTER" position="01 / 02">
      <div class="grid grid-cols-1 gap-6 pt-10 lg:grid-cols-[240px_1fr] lg:gap-16">
        <nav aria-label="Verification charter sections" class="flex flex-col border-t border-ink/10">
          <a v-for="item in sections" :key="item.number" :href="`#verification-${item.number}`" class="flex gap-4 border-b border-ink/10 py-4 font-inter text-h-14 text-ink"><span class="font-semibold text-ink-3">{{ item.number }}</span>{{ item.title }}</a>
        </nav>
        <div class="flex flex-col">
          <article v-for="item in sections" :id="`verification-${item.number}`" :key="item.number" class="grid grid-cols-1 gap-5 border-t border-ink/10 py-10 md:grid-cols-[72px_240px_1fr]">
            <span class="font-inter text-h-14 font-semibold text-accent">{{ item.number }}</span>
            <h2 class="font-bricolage text-h-32 font-bold leading-tight text-ink">{{ item.title }}</h2>
            <p class="font-inter text-h-16 leading-relaxed text-ink-3">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </SectionBand>

    <SectionBand padTop="xl" padBottom="xl" theme="ink" number="02" label="A PLAIN BOUNDARY" position="02 / 02">
      <div class="grid grid-cols-1 gap-8 pt-10 md:grid-cols-2">
        <h2 class="font-bricolage text-h-52 leading-none text-paper">Evidence before a badge.</h2>
        <p class="font-inter text-h-16 leading-relaxed text-paper/70">A verified label means the claims shown on the profile were reviewed against available evidence. Families should still speak with the practitioner, discuss their tradition, and confirm scope and fees before booking.</p>
      </div>
    </SectionBand>
  </div>
</template>
