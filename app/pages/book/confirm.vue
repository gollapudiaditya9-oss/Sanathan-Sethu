<script setup lang="ts">
import { definePageMeta, useRouter } from '#imports'
import StepperBand from '~/components/page-blocks/StepperBand.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'

definePageMeta({
  layout: 'booking'
})

const router = useRouter()

const goBack = () => {
  router.push('/book/match-purohit')
}

const onConfirm = () => {
  // In real app, submit everything to backend.
  // For now, redirect to success / home
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col h-full">
    <StepperBand :currentStep="5" />
    
    <div class="flex-grow flex justify-center w-full px-6 md:px-14 py-12 md:py-24">
      <div class="max-w-[800px] w-full flex flex-col items-center text-center gap-8">
        
        <h1 class="font-bricolage text-h-68 text-ink tracking-[-0.03em] leading-[0.95]">
          Your booking is ready.
        </h1>
        
        <p class="font-inter text-h-16 text-ink-3 max-w-[500px]">
          We require a refundable deposit of ₹1,100 to hold the date on the Purohit's calendar.
        </p>

        <div class="bg-paper border border-ink/10 p-8 rounded-xl w-full max-w-[500px] flex flex-col gap-4 mt-8 text-left">
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
        
      </div>
    </div>
  </div>
</template>
