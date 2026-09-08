<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import SectionBand from '~/components/ui/SectionBand.vue'
import FormInput from '~/components/ui/FormInput.vue'
import PhoneInput from '~/components/ui/PhoneInput.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

const phone = shallowRef('')
const phoneValid = shallowRef(false)
const services = shallowRef<string[]>([])
const submitted = shallowRef(false)
const needsMealDetails = computed(() => services.value.some((item) => ['Ceremony meals', 'Prasadam preparation'].includes(item)))
const serviceOptions = ['Ceremony meals', 'Prasadam preparation', 'Packed ritual meals', 'On-site service']
</script>

<template>
  <div class="min-h-screen bg-bg text-ink">
    <SectionBand padTop="xl" padBottom="lg" theme="bg">
      <div class="flex  flex-col gap-6"><span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">FOR CATERERS · आहारसेवकेभ्यः</span><h1 class="font-bricolage text-h-68 leading-[0.95] tracking-[-0.03em] md:text-h-92">Register your catering service.</h1><p class="font-inter text-h-26 leading-relaxed text-ink-3">Choose what you offer first. The form will show only the additional details relevant to those services.</p></div>
    </SectionBand>
    <SectionBand padTop="lg" padBottom="xl" theme="paper" number="01" label="SERVICE DETAILS" position="01 / 01">
      <form class="mx-auto flex  flex-col gap-8 rounded-xl border border-ink/10 bg-bg p-8 md:p-12" @submit.prevent="submitted = true">
        <fieldset class="flex flex-col gap-3"><legend class="mb-2 font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">SERVICES OFFERED</legend><label v-for="option in serviceOptions" :key="option" class="flex min-h-[52px] items-center gap-3 rounded-lg border border-ink/15 bg-paper px-4 font-inter text-h-16"><input v-model="services" type="checkbox" :value="option" class="h-4 w-4 accent-ink">{{ option }}</label></fieldset>
        <div class="h-px bg-ink/10" />
        <FormInput label="FIRM NAME" placeholder="Registered or trading name" />
        <FormInput label="SERVICE AREA" placeholder="Cities or districts served" />
        <PhoneInput v-model="phone" v-model:valid="phoneValid" label="PHONE NUMBER" />
        <template v-if="needsMealDetails">
          <div class="h-px bg-ink/10" />
          <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">MEAL AND KITCHEN DETAILS</span>
          <FormInput label="GUEST CAPACITY" placeholder="Typical minimum and maximum" />
          <FormInput label="KITCHEN PRACTICE" placeholder="On-site kitchen, central kitchen, or both" />
          <FormInput label="DIETARY HANDLING" placeholder="Sāttvic, no onion/garlic, allergy handling" />
        </template>
        <div class="flex flex-col gap-2"><label for="caterer-notes" class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">REFERENCES OR NOTES</label><textarea id="caterer-notes" rows="5" class="w-full resize-y rounded-lg border border-ink-3 bg-paper px-4 py-4 font-inter text-h-16 focus:border-ink focus:outline-none" /></div>
        <ButtonLarge label="Send registration for review" type="submit" />
        <p v-if="submitted" class="rounded-lg border border-ink/15 bg-paper p-4 font-inter text-h-14" role="status">Your registration has been recorded for review.</p>
      </form>
    </SectionBand>
  </div>
</template>
