<script setup lang="ts">
import { useRouter } from '#imports'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex flex-col chat-shell">
    <header class="chat-nav">
      <button type="button" class="chat-nav__back" @click="goBack">
        <span aria-hidden="true">&larr;</span>
        <span>Back</span>
      </button>
      <NuxtLink to="/" class="chat-nav__brand">SanatanaSetu.</NuxtLink>
      <span class="chat-nav__spacer" aria-hidden="true" />
    </header>
    <main id="main-content" tabindex="-1" class="flex-grow w-full flex flex-col">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.chat-shell {
  /* Soft radial glow (diya-warm, not Google-blue) on the site's own cream
     base — the whole page reads as light now, so text stays dark
     everywhere instead of depending on which part of a black-to-cream
     sweep happens to sit behind it. */
  background:
    radial-gradient(60% 46% at 50% 36%, rgba(191, 64, 40, 0.16) 0%, rgba(191, 64, 40, 0.06) 42%, rgba(246, 241, 232, 0) 72%),
    #f6f1e8;
}

.chat-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: transparent;
}

.chat-nav__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
  padding: 4px 2px;
  margin: -4px -2px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: rgba(26, 22, 20, 0.75);
  transition: opacity 150ms ease-out;
}

.chat-nav__back:hover {
  opacity: 0.65;
}

.chat-nav__brand {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
}

.chat-nav__spacer {
  width: 52px;
}

@media (prefers-reduced-motion: reduce) {
  .chat-nav__back {
    transition: none;
  }
}
</style>
