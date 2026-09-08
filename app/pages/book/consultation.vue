<script setup lang="ts">
import { definePageMeta, useRoute } from '#imports'
import { computed, shallowRef } from 'vue'
import { useBookingState } from '~/composables/useBookingState'
import { formatBookingDate } from '~/utils/formatBookingDate'
import SectionBand from '~/components/ui/SectionBand.vue'
import FormInput from '~/components/ui/FormInput.vue'
import PhoneInput from '~/components/ui/PhoneInput.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

definePageMeta({ layout: 'booking' })

const route = useRoute()
const { bookingState, setConfig } = useBookingState()
const queryDate = computed(() => typeof route.query.date === 'string' ? route.query.date : '')
if (queryDate.value && queryDate.value !== bookingState.value.config.date) {
  setConfig({ ...bookingState.value.config, date: queryDate.value })
}
const format = computed(() => route.query.type === 'written' ? 'Written report' : 'Phone call')
const practitioner = computed(() => bookingState.value.selectedPurohit?.name ?? '')
const requestedDate = computed(() => formatBookingDate(bookingState.value.config.date))
const name = shallowRef('')
const phone = shallowRef('')
const phoneValid = shallowRef(false)
const question = shallowRef('')
const submitted = shallowRef(false)
const submitting = shallowRef(false)
const attempted = shallowRef(false)
const submissionError = shallowRef('')

const submitRequest = async () => {
  attempted.value = true
  submissionError.value = ''
  if (!name.value.trim() || !phoneValid.value || !question.value.trim()) return
  submitting.value = true
  try {
    await $fetch('/api/interest', {
      method: 'POST',
      body: {
        kind: 'consultation',
        format: route.query.type === 'written' ? 'written' : 'phone',
        name: name.value.trim(),
        phone: phone.value,
        question: question.value.trim(),
        purohit: bookingState.value.selectedPurohit,
        requestedDate: bookingState.value.config.date
      }
    })
    submitted.value = true
  } catch {
    submissionError.value = 'We could not record your request. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <SectionBand padTop="xl" padBottom="xl" theme="bg">
    <div class="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-24">
      <div class="flex flex-col gap-5 md:col-span-5">
        <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">CONSULTATION REQUEST</span>
        <h1 class="font-bricolage text-h-68 leading-[0.95] tracking-[-0.03em] text-ink">{{ format }}</h1>
        <p class="font-inter text-h-16 leading-relaxed text-ink-3">Share enough context for the practitioner to understand the question. Availability and the fee are confirmed before you commit.</p>
        <div class="mt-4 border-y border-ink/10 py-5 font-inter text-h-16 text-ink">
          Indicative fee: ₹ [fee]
          <span v-if="practitioner" class="block">Purohit: {{ practitioner }}</span>
          <span v-if="requestedDate" class="block">Requested date: {{ requestedDate }}</span>
        </div>
      </div>

      <form class="flex  flex-col gap-6 rounded-xl border border-ink/10 bg-paper p-8 md:col-span-7" novalidate @submit.prevent="submitRequest">
        <FormInput v-model="name" label="YOUR NAME" name="name" autocomplete="name" placeholder="Full name" :error="attempted && !name.trim() ? 'Enter your name.' : ''" />
        <PhoneInput v-model="phone" v-model:valid="phoneValid" label="PHONE NUMBER" :error="attempted && !phoneValid ? 'Enter a valid phone number.' : ''" />
        <div class="flex flex-col gap-2">
          <label for="consultation-question" class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">YOUR QUESTION</label>
          <textarea id="consultation-question" v-model="question" rows="6" :aria-invalid="attempted && !question.trim()" :aria-describedby="attempted && !question.trim() ? 'consultation-question-error' : undefined" class="w-full resize-y rounded-lg border border-ink-3 bg-paper px-4 py-4 font-inter text-h-16 text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" placeholder="What would you like guidance on?" />
          <p v-if="attempted && !question.trim()" id="consultation-question-error" class="font-inter text-h-10 font-semibold text-accent" role="alert">Enter your question.</p>
        </div>
        <ButtonLarge :label="submitting ? 'Sending request…' : 'Request consultation'" type="submit" />
        <p v-if="submitted" class="rounded-lg border border-ink/15 bg-bg p-4 font-inter text-h-14 text-ink" role="status">Your request has been recorded. No payment has been taken.</p>
        <p v-if="submissionError" class="rounded-lg border border-accent bg-bg p-4 font-inter text-h-14 text-accent" role="alert">{{ submissionError }}</p>
      </form>
    </div>
  </SectionBand>
</template>
