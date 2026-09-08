<script setup lang="ts">
import { definePageMeta, useRouter } from '#imports'
import { useBookingState } from '~/composables/useBookingState'
import StepperBand from '~/components/page-blocks/StepperBand.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import { usePurohits } from '~/composables/usePurohits'

definePageMeta({
  layout: 'booking'
})

const router = useRouter()
const { bookingState, setSelectedPurohit } = useBookingState()
const { getPurohits } = usePurohits()

const goBack = () => {
  router.push('/book/configure')
}

const onContinue = () => {
  router.push('/book/family-details')
}

const matches = getPurohits().filter((purohit) => {
  const ritualName = bookingState.value.ritual?.name?.toLowerCase() ?? ''
  const customName = bookingState.value.config?.customRitualName?.toLowerCase() ?? ''
  if (!ritualName && !customName) return true
  return purohit.specialties.some((specialty) => {
    const value = specialty.toLowerCase()
    return ritualName.includes(value) || value.includes(ritualName) || customName.includes(value)
  })
}).slice(0, 4)

const visibleMatches = matches.length ? matches : getPurohits().slice(0, 4)

const selectMatch = (match: (typeof visibleMatches)[number]) => {
  setSelectedPurohit({
    slug: match.slug,
    name: match.name,
    lineage: match.lineage,
    city: match.city,
    yearsOfService: match.years_of_service
  })
}
</script>

<template>
  <div class="flex flex-col h-full">
    <StepperBand :currentStep="3" />
    
    <div class="flex-grow flex justify-center w-full px-6 md:px-14 py-12 md:py-24">
      <div class="w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        
        <!-- Left Recap -->
        <div class="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">DETAILS SAVED</span>
            <h2 class="font-bricolage text-h-42 text-ink leading-none mt-2">
              <em class="font-bricolage italic font-normal">
                {{ bookingState.ritual?.id === 'others' && bookingState.config?.customRitualName ? bookingState.config.customRitualName : bookingState.ritual?.name }}
              </em>
            </h2>
          </div>
          <div class="mt-4">
            <ButtonSmall variant="outline" label="Edit details" @click="goBack" />
          </div>
        </div>

        <!-- Right Active Form -->
        <div class="md:col-span-7 lg:col-span-8 flex flex-col">
          <div class="flex flex-col gap-4 mb-12">
            <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">STEP 03 · MATCH PUROHIT</span>
            <h1 class="font-bricolage text-h-68 text-ink tracking-[-0.03em] leading-[0.95]">
              Available Purohits
            </h1>
          </div>

          <div class="flex flex-col gap-6 ">
            <article
              v-for="match in visibleMatches" :key="match.slug"
              class="flex flex-col gap-6 rounded-lg border p-6 transition-colors"
              :class="bookingState.selectedPurohit?.slug === match.slug ? 'border-ink bg-paper' : 'border-ink/10 hover:border-ink'"
            >
              <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div class="flex flex-col gap-1">
                  <span class="font-inter font-semibold text-h-16 text-ink">{{ match.name }}</span>
                  <span class="font-inter text-h-14 text-ink-3">{{ match.lineage }}</span>
                  <span class="font-inter text-h-14 text-ink-3">{{ match.city }} · {{ match.years_of_service }} years</span>
                </div>
                <div class="font-inter font-semibold text-h-16 text-accent">₹ {{ match.indicative_fee_range.single_ritual }}</div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="specialty in match.specialties" :key="specialty" class="rounded-full border border-ink/15 px-3 py-1 font-inter text-h-10 font-semibold uppercase tracking-[0.08em] text-ink-3">{{ specialty }}</span>
              </div>
              <p class="font-inter text-h-10 uppercase tracking-[0.12em] text-ink-3">Availability is confirmed after your request is reviewed.</p>
              <div class="flex flex-wrap items-center gap-3 border-t border-ink/10 pt-5">
                <ButtonSmall variant="outline" label="View profile" :to="`/purohits/${match.slug}?from=booking`" />
                <ButtonSmall
                  :label="bookingState.selectedPurohit?.slug === match.slug ? 'Selected' : 'Select Purohit'"
                  @click="selectMatch(match)"
                />
              </div>
            </article>

            <!-- Continue Row -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-4 border-t border-ink/10">
              <ButtonSmall variant="outline" label="Back" @click="goBack" />
              <ButtonLarge v-if="bookingState.selectedPurohit" label="Continue to family details" @click="onContinue" />
              <ButtonSmall v-else variant="outline" label="Skip for now" @click="onContinue" />
            </div>
          </div>

        </div>
        
      </div>
    </div>
  </div>
</template>
