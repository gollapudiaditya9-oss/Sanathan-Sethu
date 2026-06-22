<script setup lang="ts">
import SiteNav from '../components/ui/SiteNav.vue'
import SiteFooter from '../components/ui/SiteFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg text-ink relative font-inter selection:bg-ink selection:text-paper">
    <SiteNav />
    <main class="flex-grow w-full flex flex-col relative z-10">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
