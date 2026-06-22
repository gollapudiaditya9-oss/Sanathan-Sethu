<script setup lang="ts">
import SiteNav from '../components/ui/SiteNav.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-paper text-ink relative font-inter selection:bg-solemn selection:text-paper">
    <SiteNav />
    
    <main class="flex-grow w-full flex flex-col relative z-10 items-center justify-center">
      <slot />
    </main>
    
    <!-- Minimal footer -->
    <footer class="w-full py-8 text-center text-ink-3 font-inter text-h-10 tracking-[0.14em] uppercase border-t border-solemn/10">
      Om Shanti
    </footer>
  </div>
</template>
