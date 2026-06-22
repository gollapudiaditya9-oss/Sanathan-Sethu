<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <section class="grid min-h-[760px] border-b border-ink/10 lg:grid-cols-[0.86fr_1.14fr]">
    <aside class="relative hidden overflow-hidden bg-ink px-10 py-14 text-paper lg:flex lg:flex-col lg:justify-between xl:px-16 xl:py-20">
      <div class="absolute -bottom-24 -right-20 h-80 w-80 rounded-full border border-paper/10" aria-hidden="true" />
      <div class="absolute -bottom-8 -right-4 h-52 w-52 rounded-full border border-paper/10" aria-hidden="true" />

      <div class="relative">
        <p class="font-inter text-h-10 font-semibold uppercase tracking-[0.18em] text-paper/60">A personal passage</p>
        <p class="mt-6 max-w-[480px] font-bricolage text-[48px] leading-[0.98] tracking-[-0.03em] xl:text-[60px]">
          Keep every sacred detail close.
        </p>
      </div>

      <div class="relative max-w-[430px] border-t border-paper/20 pt-6">
        <p class="font-baskerville text-[18px] italic leading-relaxed text-paper/75">
          Return to bookings, family details, receipts, and ceremony updates without beginning again.
        </p>
      </div>
    </aside>

    <div class="flex items-start justify-center bg-bg px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
      <div class="w-full max-w-[540px]">
        <p class="font-inter text-h-10 font-semibold uppercase tracking-[0.18em] text-accent">{{ eyebrow }}</p>
        <h1 class="mt-4 font-bricolage text-[52px] leading-[0.95] tracking-[-0.035em] text-ink sm:text-h-68">
          {{ title }}
        </h1>
        <p class="mt-5 max-w-[470px] font-inter text-h-16 text-ink-3">{{ description }}</p>
        <div class="mt-10">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
