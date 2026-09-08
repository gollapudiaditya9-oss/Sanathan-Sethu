<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteNav from '../components/ui/SiteNav.vue'
import SiteFooter from '../components/ui/SiteFooter.vue'

const route = useRoute()
const showSiteNav = computed(() => route.path !== '/')
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg text-ink relative font-inter selection:bg-ink selection:text-paper">
    <SiteNav v-if="showSiteNav" />
    <main id="main-content" tabindex="-1" class="flex-grow w-full flex flex-col relative z-10">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
