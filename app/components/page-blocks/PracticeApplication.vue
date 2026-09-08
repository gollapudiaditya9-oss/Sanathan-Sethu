<script setup lang="ts">
import { ref } from 'vue'
import EditorialHero from '~/components/page-blocks/EditorialHero.vue'
import SectionBand from '~/components/ui/SectionBand.vue'
import FormInput from '~/components/ui/FormInput.vue'
import FieldTextarea from '~/components/ui/FieldTextarea.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

const props = defineProps<{ eyebrow: string; title: string; description: string; role: string; requirements: string[] }>()
const submitted = ref(false)
const submitting = ref(false)
const submissionError = ref('')
const fullName = ref('')
const city = ref('')
const email = ref('')
const phone = ref('')
const experience = ref('')
const notes = ref('')

const submitApplication = async () => {
  submissionError.value = ''
  submitting.value = true
  try {
    await $fetch('/api/interest', {
      method: 'POST',
      body: {
        kind: 'partner-application',
        role: props.role,
        fullName: fullName.value,
        city: city.value,
        email: email.value,
        phone: phone.value,
        experience: experience.value,
        notes: notes.value
      }
    })
    submitted.value = true
  } catch {
    submissionError.value = 'We could not record your application. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="bg-bg text-ink">
    <EditorialHero :eyebrow="eyebrow" :title="title" :description="description" />
    <SectionBand number="01" label="What we review" subtitle="आवश्यकता" />
    <section class="mx-auto grid max-w-[1440px] border-l border-t border-ink sm:grid-cols-2 lg:grid-cols-4"><article v-for="(item, index) in requirements" :key="item" class="min-h-52 border-b border-r border-ink p-7"><p class="font-inter text-h-10 font-semibold tracking-[.14em] text-accent">0{{ index + 1 }}</p><p class="mt-8 font-bricolage text-h-26 font-bold leading-snug">{{ item }}</p></article></section>
    <SectionBand number="02" label="Expression of interest" subtitle="पंजीकरण" />
    <section class="mx-auto grid max-w-[1440px] gap-12 px-6 pb-24 md:grid-cols-[.75fr_1.25fr] lg:px-14"><div><h2 class="font-bricolage text-h-52 font-bold leading-none">Start with what can be verified.</h2><p class="mt-6 font-inter text-h-16 leading-relaxed text-ink-2">Submitting this form begins a review; it does not guarantee listing or work.</p></div><form class="grid gap-5" @submit.prevent="submitApplication"><FormInput v-model="fullName" label="Full name" name="name" autocomplete="name" required /><FormInput v-model="city" label="City" name="city" autocomplete="address-level2" required /><FormInput v-model="email" label="Email" name="email" type="email" autocomplete="email" required /><FormInput v-model="phone" label="Phone" name="phone" type="tel" autocomplete="tel" required /><FormInput v-model="experience" :label="`${role} experience or training`" name="experience" required /><FieldTextarea v-model="notes" label="Tell us about your practice" required /><ButtonLarge :label="submitting ? 'Submitting…' : 'Submit for review'" type="submit" /><p v-if="submitted" role="status" class="border border-ink bg-paper p-4 font-inter text-h-14">Your expression of interest has been recorded.</p><p v-if="submissionError" role="alert" class="border border-accent bg-paper p-4 font-inter text-h-14 text-accent">{{ submissionError }}</p></form></section>
  </div>
</template>
