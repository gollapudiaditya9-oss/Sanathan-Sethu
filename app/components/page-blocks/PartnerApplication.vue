<script setup lang="ts">
import { shallowRef } from 'vue'
import SectionBand from '~/components/ui/SectionBand.vue'
import FormInput from '~/components/ui/FormInput.vue'
import PhoneInput from '~/components/ui/PhoneInput.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

defineProps<{
  eyebrow: string
  title: string
  description: string
  role: string
  steps: Array<{ title: string; description: string }>
}>()

const phone = shallowRef('')
const phoneValid = shallowRef(false)
const submitted = shallowRef(false)
</script>

<template>
  <div class="min-h-screen bg-bg text-ink">
    <SectionBand padTop="xl" padBottom="lg" theme="bg">
      <div class="flex  flex-col gap-6">
        <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">{{ eyebrow }}</span>
        <h1 class="font-bricolage text-h-68 leading-[0.95] tracking-[-0.03em] text-ink md:text-h-92">{{ title }}</h1>
        <p class="font-inter text-h-26 leading-relaxed text-ink-3">{{ description }}</p>
      </div>
    </SectionBand>

    <SectionBand padTop="lg" padBottom="xl" theme="paper" number="01" label="HOW IT WORKS" position="01 / 02">
      <div class="grid grid-cols-1 gap-6 pt-10 md:grid-cols-2 lg:grid-cols-4">
        <article v-for="(step, index) in steps" :key="step.title" class="flex min-h-[280px] flex-col rounded-xl border border-ink/10 bg-bg p-7">
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-bricolage text-h-16 font-bold text-paper">{{ index + 1 }}</span>
          <h2 class="mt-7 font-bricolage text-h-26 font-bold leading-tight text-ink">{{ step.title }}</h2>
          <p class="mt-4 font-inter text-h-14 leading-relaxed text-ink-3">{{ step.description }}</p>
        </article>
      </div>
    </SectionBand>

    <SectionBand padTop="xl" padBottom="xl" theme="bg" number="02" label="EXPRESS INTEREST" position="02 / 02">
      <div class="grid grid-cols-1 gap-12 pt-10 md:grid-cols-12 lg:gap-24">
        <div class="md:col-span-5"><h2 class="font-bricolage text-h-52 leading-none text-ink">Begin with the details we can review.</h2><p class="mt-5 font-inter text-h-16 leading-relaxed text-ink-3">Submitting this form starts a review. It does not guarantee a listing or booking.</p></div>
        <form class="flex flex-col gap-6 rounded-xl border border-ink/10 bg-paper p-8 md:col-span-7" @submit.prevent="submitted = true">
          <FormInput label="FULL NAME" placeholder="Your name" />
          <FormInput label="CITY" placeholder="City and state" />
          <FormInput label="EMAIL" type="email" placeholder="you@example.com" />
          <PhoneInput v-model="phone" v-model:valid="phoneValid" label="PHONE NUMBER" />
          <FormInput :label="`${role.toUpperCase()} EXPERIENCE OR TRAINING`" placeholder="Brief summary" />
          <div class="flex flex-col gap-2"><label for="application-notes" class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">TELL US ABOUT YOUR PRACTICE</label><textarea id="application-notes" rows="5" required class="w-full resize-y rounded-lg border border-ink-3 bg-paper px-4 py-4 font-inter text-h-16 text-ink focus:border-ink focus:outline-none" /></div>
          <ButtonLarge label="Send expression of interest" type="submit" />
          <p v-if="submitted" role="status" class="rounded-lg border border-ink/15 bg-bg p-4 font-inter text-h-14">Your details have been recorded for review.</p>
        </form>
      </div>
    </SectionBand>
  </div>
</template>
