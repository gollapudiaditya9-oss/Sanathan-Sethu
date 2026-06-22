<script setup lang="ts">
import { defineComponent } from 'vue'
</script>

<template>
  <footer class="w-full bg-paper text-ink border-t border-ink/10 pt-24 pb-12">
    <div class="mx-auto w-full max-w-[1440px] px-6 md:px-14 flex flex-col gap-16">
      
      <!-- Massive Wordmark -->
      <div>
        <h2 class="font-bricolage font-bold text-h-68 md:text-[110px] tracking-[-0.03em] leading-none text-ink">
          SanatanaSetu.
        </h2>
      </div>
      
      <!-- 3 Columns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-[800px]">
        <!-- Devotees -->
        <div class="flex flex-col gap-4">
          <h3 class="font-inter font-semibold text-h-10 text-accent uppercase tracking-[0.14em]">DEVOTEES</h3>
          <NuxtLink to="/book/choose-ritual" class="font-inter text-h-16 hover:text-accent transition-colors">Book a Purohit</NuxtLink>
          <NuxtLink to="/purohits" class="font-inter text-h-16 hover:text-accent transition-colors">Browse Purohits</NuxtLink>
          <NuxtLink to="/calendar" class="font-inter text-h-16 hover:text-accent transition-colors">Calendar</NuxtLink>
        </div>

        <!-- Platform -->
        <div class="flex flex-col gap-4">
          <h3 class="font-inter font-semibold text-h-10 text-accent uppercase tracking-[0.14em]">PLATFORM</h3>
          <NuxtLink to="/pricing" class="font-inter text-h-16 hover:text-accent transition-colors">Pricing</NuxtLink>
        </div>
      </div>

      <!-- Muted Note -->
      <div class="pt-8 border-t border-ink/10">
        <p class="font-inter text-h-10 text-ink-3 uppercase tracking-[0.14em]">
          BUILT BY SR CONSULTING. TESTING IN HYDERABAD BEFORE LAUNCH. © {{ new Date().getFullYear() }} SANATANA SETU TRUST.
        </p>
      </div>

    </div>
  </footer>
</template>
