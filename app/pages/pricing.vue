<script setup lang="ts">
import { definePageMeta } from '#imports'
import SectionBand from '~/components/ui/SectionBand.vue'
import DarkBand from '~/components/page-blocks/DarkBand.vue'
import ThreeScriptEyebrow from '~/components/page-blocks/ThreeScriptEyebrow.vue'

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div>
    <!-- Hero -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg">
      <div class="flex flex-col gap-6 md:gap-12">
        <ThreeScriptEyebrow english="PRICING" telugu="మూల్యం" sanskrit="मूल्यम्" />
        <h1 class="font-bricolage text-h-92 md:text-h-110 text-ink leading-[0.9] tracking-[-0.04em] whitespace-pre-line">
          Three numbers.
          No hidden fees.
        </h1>
      </div>
    </SectionBand>

    <!-- Mechanisms -->
    <SectionBand padTop="xl" padBottom="xl" theme="paper" number="01" label="HOW THE MONEY MOVES · THREE MECHANISMS" position="01 / 03">
      <div class="flex flex-col pt-12 md:pt-16">
        
        <!-- Row 1 -->
        <div class="flex flex-col md:flex-row items-start md:items-center py-8 border-b border-ink/10 gap-6">
          <div class="font-bricolage text-h-42 text-ink opacity-40 w-full md:w-[80px]">01</div>
          <div class="font-bricolage text-h-42 text-ink w-full md:w-[300px]">Booking deposit</div>
          <div class="font-inter text-h-16 text-ink-3 w-full flex-grow ">
            A small refundable hold on the date. Reserves the Purohit's time. Returned to you when the rites are complete.
          </div>
          <div class="font-bricolage text-h-42 text-accent w-full md:w-[200px] md:text-right mt-4 md:mt-0">
            ₹1,100
          </div>
        </div>

        <!-- Row 2 -->
        <div class="flex flex-col md:flex-row items-start md:items-center py-8 border-b border-ink/10 gap-6">
          <div class="font-bricolage text-h-42 text-ink opacity-40 w-full md:w-[80px]">02</div>
          <div class="font-bricolage text-h-42 text-ink w-full md:w-[300px]">Platform commission</div>
          <div class="font-inter text-h-16 text-ink-3 w-full flex-grow ">
            Taken from the ritual fee — the amount you and the Purohit agreed upon. Covers verification, coordination, and platform costs.
          </div>
          <div class="font-bricolage text-h-42 text-accent w-full md:w-[200px] md:text-right mt-4 md:mt-0">
            12%
          </div>
        </div>

        <!-- Row 3 -->
        <div class="flex flex-col md:flex-row items-start md:items-center py-8 border-b border-ink/10 gap-6">
          <div class="font-bricolage text-h-42 text-ink opacity-40 w-full md:w-[80px]">03</div>
          <div class="font-bricolage text-h-42 text-ink w-full md:w-[300px]">Minimum top-up</div>
          <div class="font-inter text-h-16 text-ink-3 w-full flex-grow ">
            Applies when a ritual's total fee falls below our floor. Ensures the Purohit travels for a fair amount.
          </div>
          <div class="font-bricolage text-h-42 text-accent w-full md:w-[200px] md:text-right mt-4 md:mt-0">
            ₹300
          </div>
        </div>

      </div>
    </SectionBand>

    <!-- Dark Band: What we will not take -->
    <div class="bg-ink py-24 px-6 md:px-14">
      <div class="mx-auto flex flex-col gap-6">
        <span class="font-inter font-semibold text-h-10 text-accent uppercase tracking-[0.14em]">WHAT WE WILL NOT TAKE</span>
        <h2 class="font-bricolage text-h-68 text-paper  leading-[0.95] tracking-[-0.03em] whitespace-pre-line">
          A share of dakshina.
          A cut of samagri costs.
          Referral fees from caterers.
        </h2>
      </div>
    </div>

    <!-- Worked Example -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg" number="02" label="WORKED EXAMPLE · A WEDDING IN HYDERABAD" position="02 / 03">
      <div class="flex flex-col pt-12 md:pt-16">
        <h2 class="font-bricolage text-h-68 text-ink tracking-[-0.03em] mb-12">
          A real example.
        </h2>
        
        <div class="flex flex-col border-t border-ink/10">
          <div class="flex justify-between items-center py-7 border-b border-ink/10">
            <span class="font-inter text-h-16 text-ink">Ritual fee (Purohit's charge)</span>
            <span class="font-inter font-semibold text-h-16 text-ink">₹21,000</span>
          </div>
          <div class="flex justify-between items-center py-7 border-b border-ink/10">
            <span class="font-inter text-h-16 text-ink">Booking deposit (refundable)</span>
            <span class="font-inter font-semibold text-h-16 text-ink">₹1,100</span>
          </div>
          <div class="flex justify-between items-center py-7 border-b border-ink/10">
            <span class="font-inter text-h-16 text-ink">Platform commission (12%)</span>
            <span class="font-inter font-semibold text-h-16 text-ink">₹2,520</span>
          </div>
          <div class="flex justify-between items-center py-7 border-b border-ink/10 bg-paper px-4 -mx-4 rounded-md">
            <span class="font-inter font-semibold text-h-16 text-ink">Dakshina (paid directly to Purohit)</span>
            <span class="font-inter font-semibold text-h-16 text-ink">Between you and the Purohit</span>
          </div>
        </div>
      </div>
    </SectionBand>

    <!-- FAQ -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg" number="03" label="FREQUENTLY ASKED" position="03 / 03">
      <div class="flex flex-col pt-12 md:pt-16">
        
        <div class="flex flex-col md:flex-row py-8 border-b border-ink/10 gap-6 md:gap-12">
          <div class="font-bricolage text-h-26 text-ink w-full md:w-[500px] shrink-0">
            What if I want to cancel?
          </div>
          <div class="font-inter text-h-16 text-ink-3">
            Booking deposit returned in full if cancelled 7+ days before. After that it goes to the Purohit's time block.
          </div>
        </div>
        
        <div class="flex flex-col md:flex-row py-8 border-b border-ink/10 gap-6 md:gap-12">
          <div class="font-bricolage text-h-26 text-ink w-full md:w-[500px] shrink-0">
            Can I tip the Purohit?
          </div>
          <div class="font-inter text-h-16 text-ink-3">
            Dakshina, yes. Always between you and the Purohit. We do not see it or invoice for it.
          </div>
        </div>
        
        <div class="flex flex-col md:flex-row py-8 border-b border-ink/10 gap-6 md:gap-12">
          <div class="font-bricolage text-h-26 text-ink w-full md:w-[500px] shrink-0">
            Are samagri costs included?
          </div>
          <div class="font-inter text-h-16 text-ink-3">
            Listed separately when you confirm. You pay the supplier directly. We do not take a cut.
          </div>
        </div>
        
        <div class="flex flex-col md:flex-row py-8 border-b border-ink/10 gap-6 md:gap-12">
          <div class="font-bricolage text-h-26 text-ink w-full md:w-[500px] shrink-0">
            What if the Purohit cancels?
          </div>
          <div class="font-inter text-h-16 text-ink-3">
            We send a replacement of equal standing. Your booking deposit holds. If no replacement available, full refund.
          </div>
        </div>

      </div>
    </SectionBand>

  </div>
</template>
