<script setup lang="ts">
import ButtonSmall from './ButtonSmall.vue'
import { useRouter } from '#imports'
import { useBookingState } from '~/composables/useBookingState'

defineProps<{
  minimal?: boolean
}>()

const router = useRouter()
const { resetBooking } = useBookingState()

const exitWithoutSaving = () => {
  const shouldExit = window.confirm('Exit without saving? Your booking details will be cleared.')
  if (!shouldExit) return

  resetBooking()
  router.push('/')
}
</script>

<template>
  <nav class="w-full border-b border-ink/10 bg-bg sticky top-0 z-50">
    <div class="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
      <div class="flex-1 flex items-center">
        <NuxtLink to="/" class="font-bricolage text-h-26 font-bold flex items-center text-ink hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bg rounded-sm">
          <div class="w-4 h-4 bg-ink mr-2"></div>SanatanaSetu.
        </NuxtLink>
      </div>

      <div v-if="!minimal" class="hidden lg:flex items-center justify-center gap-8 font-inter text-[14px] font-medium">
        <NuxtLink to="/purohits" class="text-ink hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bg rounded-sm">Purohits</NuxtLink>
        <NuxtLink to="/consultants" class="text-ink hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bg rounded-sm">Consultants</NuxtLink>
        <NuxtLink to="/calendar" class="text-ink hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bg rounded-sm">Calendar</NuxtLink>
        <NuxtLink to="/partners" class="text-ink hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bg rounded-sm">For Partners</NuxtLink>
        <NuxtLink to="/pricing" class="text-ink hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bg rounded-sm">Pricing</NuxtLink>
      </div>

      <div v-if="!minimal" class="flex-1 hidden md:flex items-center justify-end gap-6 font-inter text-[14px] font-medium">
        <NuxtLink to="/signin" class="text-ink hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bg rounded-sm">Sign in</NuxtLink>
        <ButtonSmall label="Book a Purohit →" to="/book/choose-ritual" variant="primary" />
      </div>

      <div v-if="minimal" class="flex flex-1 items-center justify-end gap-3 sm:gap-5">
        <button
          type="button"
          class="rounded-sm px-2 py-2 font-inter text-[14px] font-semibold text-ink-3 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
          @click="exitWithoutSaving"
        >
          Exit
        </button>
        <ButtonSmall label="Save & exit" variant="outline" to="/" />
      </div>
    </div>
  </nav>
</template>
