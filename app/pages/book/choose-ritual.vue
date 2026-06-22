<script setup lang="ts">
import { definePageMeta, useRouter } from '#imports'
import { useBookingState } from '~/composables/useBookingState'
import StepperBand from '~/components/page-blocks/StepperBand.vue'

definePageMeta({
  layout: 'booking'
})

const router = useRouter()
const { setRitual } = useBookingState()

const rituals = [
  {
    id: 'muhurtham',
    english: 'Muhurtham',
    sanskrit: 'Muhurtham', // In Baskerville italic
    desc: 'Custom timing calculations for weddings and major life events based on individual Jatakams.',
    feeRange: '₹2,100 — ₹3,100'
  },
  {
    id: 'vivaha',
    english: 'Wedding',
    sanskrit: 'Vivaha',
    desc: 'Complete Vedic wedding rites performed by verified lineage Purohits.',
    feeRange: '₹15,000 — ₹25,000'
  },
  {
    id: 'grihapravesh',
    english: 'Housewarming',
    sanskrit: 'Griha Pravesh',
    desc: 'Vastu Shanti and Homam to sanctify your new home before entering.',
    feeRange: '₹11,000 — ₹18,000'
  },
  {
    id: 'upanayanam',
    english: 'Thread Ceremony',
    sanskrit: 'Upanayanam',
    desc: 'The sacred thread ceremony initiating a young boy into Vedic studies.',
    feeRange: '₹21,000 — ₹31,000'
  },
  {
    id: 'naming',
    english: 'Naming',
    sanskrit: 'Namakaranam',
    desc: 'Traditional naming ceremony based on Nakshatra syllables.',
    feeRange: '₹5,100 — ₹8,100'
  },
  {
    id: 'homam',
    english: 'Fire Ritual',
    sanskrit: 'Homam',
    desc: 'Specific homams (Ganapati, Sudarshana, Chandi) for peace and prosperity.',
    feeRange: '₹11,000 — ₹21,000'
  },
  {
    id: 'others',
    english: 'Other Ritual',
    sanskrit: 'Anya',
    desc: 'Any other specific ritual, ceremony, or custom request.',
    feeRange: 'Custom Quote'
  }
]

const selectRitual = (ritual: any) => {
  setRitual({
    id: ritual.id,
    name: ritual.sanskrit, // or english, we can use sanskrit for the display
    description: ritual.desc
  })
  router.push('/book/configure')
}
</script>

<template>
  <div class="flex flex-col h-full">
    <StepperBand :currentStep="1" />
    
    <div class="flex-grow flex justify-center w-full px-6 md:px-14 py-12 md:py-24">
      <div class="max-w-[1200px] w-full flex flex-col gap-12">
        
        <div class="flex flex-col gap-4">
          <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">STEP 01 · CHOOSE RITUAL</span>
          <h1 class="font-bricolage text-h-68 text-ink tracking-[-0.03em] leading-[0.95]">
            Which ritual?
          </h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button 
            v-for="ritual in rituals" 
            :key="ritual.id"
            @click="selectRitual(ritual)"
            class="text-left flex flex-col gap-6 p-8 rounded-xl border border-ink/10 bg-paper hover:border-ink hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bg group"
          >
            <div class="flex flex-col gap-2">
              <h2 class="font-inter font-semibold text-h-26 text-ink group-hover:text-accent transition-colors">
                {{ ritual.english }} <em class="font-bricolage italic font-normal text-ink-3">— {{ ritual.sanskrit }}</em>
              </h2>
              <p class="font-inter text-h-16 text-ink-3">
                {{ ritual.desc }}
              </p>
            </div>
            <div class="mt-auto pt-6 font-inter font-semibold text-h-16 text-ink">
              Indicative fee: {{ ritual.feeRange }}
            </div>
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>
