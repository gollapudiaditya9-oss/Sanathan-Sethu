<script setup lang="ts">
definePageMeta({ layout: 'booking' })
const { startOpenBooking } = useBookingState()
startOpenBooking()
await navigateTo('/book/choose-ritual', { replace: true })
</script>

<template><div /></template>
