<script setup lang="ts">
import EditorialHero from '~/components/page-blocks/EditorialHero.vue'
import SectionBand from '~/components/ui/SectionBand.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

const topics = [
  { script: 'संस्कार', title: 'Saṁskāra', copy: 'A careful introduction to rites that mark transitions in family life.' },
  { script: 'पञ्चाङ्ग', title: 'Pañcāṅga', copy: 'How the five limbs of the traditional calendar shape daily and festival observance.' },
  { script: 'पूजा', title: 'Pūjā', copy: 'Vocabulary, preparation, intention, and the roles of household and practitioner.' },
]
useSeoMeta({ title: 'Knowledge — Śrīraṅgam' })
</script>

<template>
  <div class="bg-bg text-ink">
    <EditorialHero eyebrow="ज्ञान · Knowledge · அறிவு" title="Context before instruction." description="A growing reading room for the language, history, and lived practice surrounding rites. Articles are reviewed and attributed before publication." />
    <section class="bg-ink py-20 text-paper"><div class="mx-auto max-w-[1440px] px-6 lg:px-14"><p class="font-inter text-h-10 font-semibold uppercase tracking-[.14em] text-accent">Editorial promise</p><h2 class="mt-7 max-w-4xl font-bricolage text-h-52 font-bold leading-tight md:text-h-68">No anonymous certainty. Sources, authorship, and differences of tradition will remain visible.</h2></div></section>
    <SectionBand number="01" label="Opening shelves" subtitle="विषय" />
    <section class="mx-auto grid max-w-[1440px] border-l border-t border-ink md:grid-cols-3"><article v-for="topic in topics" :key="topic.title" class="flex min-h-80 flex-col border-b border-r border-ink p-7 lg:p-10"><p class="font-serif text-h-26 text-accent">{{ topic.script }}</p><h2 class="mt-8 font-bricolage text-h-32 font-bold">{{ topic.title }}</h2><p class="mt-5 font-inter text-h-16 leading-relaxed text-ink-2">{{ topic.copy }}</p><p class="mt-auto pt-10 font-inter text-h-10 font-semibold uppercase tracking-[.14em] text-ink-3">In editorial review</p></article></section>
    <section class="mx-auto grid max-w-[1440px] gap-8 px-6 py-20 md:grid-cols-2 lg:px-14"><h2 class="font-bricolage text-h-52 font-bold leading-none">Have a question this library should answer?</h2><div class="flex flex-col items-start gap-5"><p class="font-inter text-h-16 leading-relaxed text-ink-2">Send it through consultation routing. Repeated questions help shape future editorial work.</p><ButtonLarge label="Ask a question" to="/consultants" variant="outline" /></div></section>
  </div>
</template>
