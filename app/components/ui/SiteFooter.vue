<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { useBookingState } from '~/composables/useBookingState'

const { startOpenBooking } = useBookingState()

const footer = shallowRef<HTMLElement | null>(null)
const footerInner = shallowRef<HTMLElement | null>(null)

let animationFrame = 0
let reduceMotion = false

const renderParallax = () => {
  animationFrame = 0

  if (!footer.value || !footerInner.value) return

  if (reduceMotion) {
    footerInner.value.style.transform = 'none'
    return
  }

  const rect = footer.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight || 800
  const revealDistance = Math.min(rect.height, viewportHeight)
  const progress = Math.min(Math.max((viewportHeight - rect.top) / revealDistance, 0), 1)
  const offset = -(1 - progress) * 64

  footerInner.value.style.transform = `translate3d(0, ${offset}px, 0)`
}

const requestParallax = () => {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(renderParallax)
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  requestParallax()

  if (!reduceMotion) {
    window.addEventListener('scroll', requestParallax, { passive: true })
    window.addEventListener('resize', requestParallax)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', requestParallax)
  window.removeEventListener('resize', requestParallax)
  window.cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <footer ref="footer" class="site-footer w-full bg-paper text-ink border-t border-ink/10 pt-24 pb-12">
    <div ref="footerInner" class="site-footer__inner w-full px-6 md:px-14 flex flex-col gap-16">
      
      <!-- Massive Wordmark -->
      <div>
        <h2 class="font-bricolage font-bold text-h-68 md:text-[110px] tracking-[-0.03em] leading-none text-ink">
          SanatanaSetu.
        </h2>
      </div>
      
      <!-- 3 Columns -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-12 ">
        <!-- Devotees -->
        <div class="flex flex-col gap-4">
          <h3 class="font-inter font-semibold text-h-10 text-accent uppercase tracking-[0.14em]">DEVOTEES</h3>
          <NuxtLink to="/book/choose-ritual" class="font-inter text-h-16 hover:text-accent transition-colors" @click="startOpenBooking">Book a Purohit</NuxtLink>
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
<style scoped>
.site-footer {
  overflow: hidden;
}

.site-footer__inner {
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .site-footer__inner {
    transform: none !important;
    will-change: auto;
  }
}
</style>
