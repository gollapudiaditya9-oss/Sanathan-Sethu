<script setup lang="ts">
import { definePageMeta, useRouter } from '#imports'
import StepperBand from '~/components/page-blocks/StepperBand.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import { useBookingState } from '~/composables/useBookingState'
import { shallowRef } from 'vue'

definePageMeta({
  layout: 'booking'
})

const router = useRouter()
const { bookingState } = useBookingState()
const submitted = shallowRef(false)

const goBack = () => {
  router.push('/book/family-details')
}

const onConfirm = () => {
  submitted.value = true
}
</script>

<template>
  <div class="flex flex-col h-full">
    <StepperBand :currentStep="bookingState.origin === 'profile' && bookingState.selectedPurohit ? 4 : 5" />
    
    <div class="flex-grow flex justify-center w-full px-6 md:px-14 py-12 md:py-24">
      <div class="w-full flex flex-col items-center text-center gap-8">
        
        <h1 class="font-bricolage text-h-68 text-ink tracking-[-0.03em] leading-[0.95]">
          Your booking is ready.
        </h1>
        
        <p class="font-inter text-h-16 text-ink-3 ">
          We require a refundable deposit of ₹1,100 to hold the date on the Purohit's calendar.
        </p>

        <div class="w-full  rounded-xl border border-ink/10 bg-paper p-8 text-left">
          <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">BOOKING SUMMARY</span>
          <dl class="mt-6 flex flex-col">
            <div class="flex justify-between gap-6 border-t border-ink/10 py-4"><dt class="font-inter text-h-14 text-ink-3">Ritual</dt><dd class="text-right font-inter text-h-14 font-semibold text-ink">{{ bookingState.ritual?.id === 'others' ? bookingState.config.customRitualName : bookingState.ritual?.name }}</dd></div>
            <div class="flex justify-between gap-6 border-t border-ink/10 py-4"><dt class="font-inter text-h-14 text-ink-3">Date and time</dt><dd class="text-right font-inter text-h-14 font-semibold text-ink">{{ bookingState.config.date }} · {{ bookingState.config.timeWindow }}</dd></div>
            <div class="flex justify-between gap-6 border-t border-ink/10 py-4"><dt class="font-inter text-h-14 text-ink-3">Location</dt><dd class="text-right font-inter text-h-14 font-semibold text-ink">{{ bookingState.config.location }}</dd></div>
            <div class="flex justify-between gap-6 border-y border-ink/10 py-4"><dt class="font-inter text-h-14 text-ink-3">Purohit</dt><dd class="text-right font-inter text-h-14 font-semibold text-ink">{{ bookingState.selectedPurohit?.name || 'Coordinator will match one' }}</dd></div>
          </dl>
        </div>

        <div class="bg-paper border border-ink/10 p-8 rounded-xl w-full  flex flex-col gap-4 mt-8 text-left">
          <div class="flex justify-between border-b border-ink/10 pb-4">
            <span class="font-inter text-h-16 text-ink">Deposit</span>
            <span class="font-inter font-semibold text-h-16 text-ink">₹1,100</span>
          </div>
          <div class="flex justify-between">
            <span class="font-inter text-h-16 text-ink">Total Due Now</span>
            <span class="font-inter font-semibold text-h-16 text-accent">₹1,100</span>
          </div>
        </div>

        <div class="mt-8 flex flex-col-reverse sm:flex-row items-center justify-center gap-4">
          <ButtonSmall variant="outline" label="Back" :icon-right="false" @click="goBack" />
          <ButtonLarge label="Pay deposit and confirm" @click="onConfirm" />
        </div>

        <p v-if="submitted" class="w-full  rounded-lg border border-ink/15 bg-paper p-4 font-inter text-h-14 text-ink" role="status">Your booking request is ready for backend submission. No payment has been taken in this prototype.</p>
        
      </div>
    </div>
  </div>
</template>
