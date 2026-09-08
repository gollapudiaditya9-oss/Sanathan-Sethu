<script setup lang="ts">
import SiteNav from '~/components/ui/SiteNav.vue'
import SiteFooter from '~/components/ui/SiteFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg text-ink">
    <SiteNav minimal />
    <main id="main-content" tabindex="-1" class="flex-grow w-full">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
