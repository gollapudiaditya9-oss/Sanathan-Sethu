<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useColumnWipe } from '~/composables/useColumnWipe'

const route = useRoute()
const columnWipe = useColumnWipe()
</script>

<template>
  <NuxtLayout>
    <NuxtPage :transition="columnWipe" :page-key="route.fullPath" />
  </NuxtLayout>
</template>
