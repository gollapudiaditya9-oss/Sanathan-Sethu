<script setup lang="ts">
import SectionBand from '~/components/ui/SectionBand.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import { shallowRef } from 'vue'

const question = shallowRef('')

const continueToRouting = async () => {
  await navigateTo({ path: '/consultants/routing', query: { question: question.value } })
}
</script>

<template>
  <div class="min-h-screen bg-bg">
    <SectionBand padTop="xl" padBottom="lg" theme="bg">
      <div class="flex  flex-col gap-6">
        <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">CONSULTING · परामर्शः</span>
        <h1 class="font-bricolage text-h-68 leading-[0.95] tracking-[-0.03em] text-ink md:text-h-92">Ask the question you’ve been carrying.</h1>
        <p class="font-inter text-h-26 leading-relaxed text-ink-3">For questions about Jatakam, Muhurtham, Vāstu, texts, and family practice that do not require booking a ritual.</p>
      </div>
    </SectionBand>

    <SectionBand padTop="lg" padBottom="xl" theme="paper">
      <form class="flex  flex-col gap-6 rounded-xl border border-ink/10 bg-bg p-8 md:p-12" @submit.prevent="continueToRouting">
        <label for="consulting-question" class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">WHAT IS YOUR QUESTION</label>
        <textarea id="consulting-question" v-model="question" rows="6" required class="w-full resize-y rounded-lg border border-ink-3 bg-paper px-5 py-4 font-inter text-h-16 text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none" placeholder="Describe the question and any tradition or location that may be relevant." />
        <label class="flex cursor-pointer flex-col gap-1 rounded-lg border border-dashed border-ink/25 p-4 font-inter text-h-14 text-ink"><span class="font-semibold">Attach a file (optional)</span><span class="text-h-10 text-ink-3">PDF, JPG, or PNG up to 10 MB.</span><input type="file" accept=".pdf,.jpg,.jpeg,.png" class="mt-3 text-h-14" /></label>
        <div><ButtonLarge label="Find the right consultant" type="submit" /></div>
      </form>
    </SectionBand>
  </div>
</template>
