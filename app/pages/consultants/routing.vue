<script setup lang="ts">
import EditorialHero from '~/components/page-blocks/EditorialHero.vue'
import FormInput from '~/components/ui/FormInput.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

const route = useRoute()
const initialQuestion = typeof route.query.question === 'string'
  ? route.query.question
  : typeof route.query.date === 'string'
    ? `Question about ${route.query.date}`
    : ''
const answers = reactive({ topic: initialQuestion, tradition: '', format: '' })
const submitted = ref(false)
const submissionError = ref('')
useSeoMeta({ title: 'Route a question — Śrīraṅgam' })

const submitRoutingRequest = async () => {
  submissionError.value = ''
  try {
    await $fetch('/api/interest', {
      method: 'POST',
      body: { kind: 'consultant-routing', ...answers, date: route.query.date }
    })
    submitted.value = true
  } catch {
    submissionError.value = 'We could not record your request. Please try again.'
  }
}
</script>

<template>
  <div class="bg-bg text-ink">
    <EditorialHero compact eyebrow="प्रश्न मार्ग · Question routing · கேள்வி வழி" title="A few details help us route with care." description="This is not an automated judgement. Your answers give the coordination team enough context to identify a relevant practitioner." />
    <section class="mx-auto grid max-w-[1440px] border-t border-ink md:grid-cols-[.65fr_1.35fr]">
      <aside class="border-b border-ink bg-ink p-7 text-paper md:border-b-0 md:border-r lg:p-12">
        <p class="font-inter text-h-10 font-semibold uppercase tracking-[.14em] text-paper/60">Before you continue</p>
        <p class="mt-8 font-bricolage text-h-32 leading-snug">Consultations offer tradition-informed orientation. They do not replace licensed medical, legal, financial, or mental-health care.</p>
      </aside>
      <form class="grid gap-7 p-7 lg:p-14" @submit.prevent="submitRoutingRequest">
        <FormInput v-model="answers.topic" label="Subject or question" required />
        <FormInput v-model="answers.tradition" label="Family tradition, if known" help-text="It is fine to write ‘not sure’." />
        <fieldset class="grid gap-3"><legend class="font-inter text-h-10 font-semibold uppercase tracking-[.14em] text-ink-3">Preferred format</legend><label v-for="format in ['Phone', 'Video', 'Written reply']" :key="format" class="flex min-h-12 items-center gap-3 border border-ink px-4 font-inter"><input v-model="answers.format" type="radio" name="format" :value="format" required>{{ format }}</label></fieldset>
        <ButtonLarge label="Request a match" type="submit" />
        <p v-if="submitted" role="status" class="border border-ink bg-paper p-4 font-inter text-h-14">Request recorded. A coordinator will review it before suggesting a practitioner.</p>
        <p v-if="submissionError" role="alert" class="border border-accent bg-paper p-4 font-inter text-h-14 text-accent">{{ submissionError }}</p>
      </form>
    </section>
  </div>
</template>
