<script setup lang="ts">
import { definePageMeta, useRouter } from '#imports'
import { useBookingState } from '~/composables/useBookingState'
import StepperBand from '~/components/page-blocks/StepperBand.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

definePageMeta({
  layout: 'booking'
})

const router = useRouter()
const { bookingState } = useBookingState()

const goBack = () => {
  router.push('/book/family-details')
}

const onContinue = () => {
  router.push('/book/confirm')
}

// Mock matched purohits
const matches = [
  { name: 'Sri Anand Sastry', lineage: 'Kanchi', fee: '₹21,000' },
  { name: 'Sri Venkata Ramana', lineage: 'Ahobila', fee: '₹18,500' }
]
</script>

<template>
  <div class="flex flex-col h-full">
    <StepperBand :currentStep="4" />
    
    <div class="flex-grow flex justify-center w-full px-6 md:px-14 py-12 md:py-24">
      <div class="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        
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
            <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">STEP 04 · MATCH PUROHIT</span>
            <h1 class="font-bricolage text-h-68 text-ink tracking-[-0.03em] leading-[0.95]">
              Available Purohits
            </h1>
          </div>

          <div class="flex flex-col gap-6 max-w-[600px]">
            <div 
              v-for="(match, i) in matches" :key="i"
              class="flex flex-col sm:flex-row justify-between sm:items-center p-6 border border-ink/10 rounded-lg hover:border-ink cursor-pointer transition-colors"
              @click="onContinue"
            >
              <div class="flex flex-col">
                <span class="font-inter font-semibold text-h-16 text-ink">{{ match.name }}</span>
                <span class="font-inter text-h-16 text-ink-3">{{ match.lineage }} Lineage</span>
              </div>
              <div class="mt-4 sm:mt-0 font-inter font-semibold text-h-16 text-accent">
                {{ match.fee }}
              </div>
            </div>

            <!-- Continue Row -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-4 border-t border-ink/10">
              <ButtonSmall variant="outline" label="Back" @click="goBack" />
              <ButtonSmall variant="ghost" label="Skip for now" @click="onContinue" />
            </div>
          </div>

        </div>
        
      </div>
    </div>
  </div>
</template>
