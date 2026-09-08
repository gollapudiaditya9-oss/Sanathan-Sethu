<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from '#imports'
import { useBookingState } from '~/composables/useBookingState'

defineProps<{
  minimal?: boolean
}>()

const route = useRoute()
const { startOpenBooking } = useBookingState()
const menuOpen = ref(false)
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const menuOverlay = useTemplateRef<HTMLElement>('menuOverlay')

const setMenuOpen = (open: boolean, returnFocus = false) => {
  menuOpen.value = open
  document.body.style.overflow = open ? 'hidden' : ''
  nextTick(() => {
    if (open) window.setTimeout(() => menuOverlay.value?.querySelector<HTMLElement>('a')?.focus(), 450)
    else if (returnFocus) menuButton.value?.focus()
  })
}

const toggleMenu = () => {
  setMenuOpen(!menuOpen.value)
}

const handleMenuKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    setMenuOpen(false, true)
    return
  }
  if (event.key !== 'Tab') return

  const focusable = Array.from(menuOverlay.value?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
  if (!focusable.length) return
  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(() => route.fullPath, () => setMenuOpen(false))

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-nav" :class="{ 'is-open': menuOpen }">
    <nav class="site-nav__row" aria-label="Primary navigation">
      <button ref="menuButton" type="button" class="site-nav__menu" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" :aria-expanded="menuOpen" aria-controls="site-menu" @click="toggleMenu">
        <i />
        <i />
      </button>

      <NuxtLink to="/" class="site-nav__brand" @click="setMenuOpen(false)">SanatanaSetu.</NuxtLink>
      <NuxtLink to="/book/choose-ritual" class="site-nav__login" @click="startOpenBooking(); setMenuOpen(false)">Book a Purohit</NuxtLink>
    </nav>

    <div id="site-menu" ref="menuOverlay" class="site-nav__overlay" :class="{ 'is-open': menuOpen }" :aria-hidden="!menuOpen" role="dialog" aria-modal="true" aria-label="Site menu" @keydown="handleMenuKeydown">
      <nav class="site-nav__links" aria-label="Site menu">
        <NuxtLink to="/purohits">Purohits</NuxtLink>
        <NuxtLink to="/consultants">Consultants</NuxtLink>
        <NuxtLink to="/calendar">Calendar</NuxtLink>
        <NuxtLink to="/partners">For Partners</NuxtLink>
        <NuxtLink to="/pricing">Pricing</NuxtLink>
        <NuxtLink :to="{ path: '/signin', query: { redirect: route.fullPath } }">Login</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 80;
  width: 100%;
}

.site-nav__row {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: 86px;
  align-items: center;
  justify-content: space-between;
  padding: 26px 44px;
  background: var(--bg);
  transition: background-color 0.4s;
}

.site-nav.is-open .site-nav__row { background: transparent; }

.site-nav__brand {
  position: absolute;
  top: 50%;
  left: 50%;
  color: var(--ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 21px;
  font-weight: 700;
  text-decoration: none;
  transform: translate(-50%, -50%);
  transition: color 0.25s;
}

.site-nav__menu {
  position: relative;
  width: 36px;
  height: 34px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.site-nav__menu i {
  position: absolute;
  right: 6px;
  left: 6px;
  height: 2px;
  border-radius: 2px;
  background: var(--ink);
  transition: top 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s;
}

.site-nav__menu i:nth-child(1) { top: 12px; }
.site-nav__menu i:nth-child(2) { top: 20px; }
.site-nav__menu[aria-expanded="true"] i:nth-child(1) { top: 16px; transform: rotate(45deg); }
.site-nav__menu[aria-expanded="true"] i:nth-child(2) { top: 16px; transform: rotate(-45deg); }
.site-nav.is-open .site-nav__menu i { background: #fff2dd; }
.site-nav.is-open .site-nav__brand { color: #fff2dd; }

.site-nav__login {
  display: inline-flex;
  min-width: 157px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 14px 26px;
  background: var(--accent);
  color: #fff7ec;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  transition: transform 0.15s, background-color 0.2s;
}

.site-nav__login:hover { background: #b5532c; transform: translateY(-1px); }

.site-nav__menu:focus-visible,
.site-nav__brand:focus-visible,
.site-nav__login:focus-visible,
.site-nav__links a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}

.site-nav__overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 18, 17, 0.97);
  backdrop-filter: blur(8px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s, visibility 0.4s;
}

.site-nav__overlay.is-open { opacity: 1; visibility: visible; }

.site-nav__links {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}

.site-nav__links a {
  color: #fff2dd;
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: clamp(34px, 6vw, 64px);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.18;
  opacity: 0;
  text-decoration: none;
  transform: translateY(20px);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s, color 0.2s;
}

.site-nav__overlay.is-open .site-nav__links a { opacity: 0.92; transform: translateY(0); }
.site-nav__overlay.is-open .site-nav__links a:nth-child(2) { transition-delay: 0.05s; }
.site-nav__overlay.is-open .site-nav__links a:nth-child(3) { transition-delay: 0.1s; }
.site-nav__overlay.is-open .site-nav__links a:nth-child(4) { transition-delay: 0.15s; }
.site-nav__overlay.is-open .site-nav__links a:nth-child(5) { transition-delay: 0.2s; }
.site-nav__overlay.is-open .site-nav__links a:nth-child(6) { transition-delay: 0.25s; }
.site-nav__links a:hover { color: var(--accent); opacity: 1; }

@media (max-width: 900px) {
  .site-nav__row { min-height: 72px; padding: 18px 20px; }
}

@media (max-width: 640px) {
  .site-nav__brand { font-size: 13px; }
  .site-nav__login { min-width: 100px; padding: 11px 12px; font-size: 11px; }
}

@media (prefers-reduced-motion: reduce) {
  .site-nav__row,
  .site-nav__menu i,
  .site-nav__brand,
  .site-nav__login,
  .site-nav__overlay,
  .site-nav__links a { transition: none; }
}
</style>
