<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage :page-key="route.fullPath" />
  </NuxtLayout>
</template>
