<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import AuthField from '~/components/auth/AuthField.vue'
import AuthShell from '~/components/auth/AuthShell.vue'

const email = shallowRef('')
const password = shallowRef('')
const submitted = shallowRef(false)
const statusMessage = shallowRef('')

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))

const signIn = () => {
  submitted.value = true
  statusMessage.value = ''
  if (!emailValid.value || !password.value) return
  statusMessage.value = 'Sign in is ready to connect. Choose an authentication service to activate accounts.'
}

const socialSignIn = (provider: string) => {
  statusMessage.value = `${provider} sign in is ready to connect to its authentication provider.`
}
</script>

<template>
  <AuthShell
    eyebrow="Welcome back"
    title="Sign in"
    description="Return to your bookings and continue where you left off."
  >
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        class="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-ink/25 bg-paper px-4 py-3 font-inter text-[14px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        @click="socialSignIn('Google')"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
          <path fill="currentColor" d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.98-4.33 2.98-7.39Z" />
          <path fill="currentColor" opacity=".8" d="M12 22c2.7 0 4.98-.9 6.63-2.38l-3.24-2.53c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.61A10 10 0 0 0 12 22Z" />
          <path fill="currentColor" opacity=".6" d="M6.39 13.92A6 6 0 0 1 6.07 12c0-.67.11-1.32.32-1.92V7.47H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.53l3.35-2.61Z" />
          <path fill="currentColor" opacity=".4" d="M12 5.95c1.47 0 2.79.5 3.82 1.49l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.47l3.35 2.61C7.18 7.71 9.39 5.95 12 5.95Z" />
        </svg>
        Continue with Google
      </button>
      <button
        type="button"
        class="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-ink/25 bg-paper px-4 py-3 font-inter text-[14px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        @click="socialSignIn('Apple')"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M17.05 12.54c-.02-2.2 1.8-3.27 1.88-3.32a4.04 4.04 0 0 0-3.18-1.72c-1.34-.14-2.64.8-3.32.8-.7 0-1.75-.78-2.88-.75a4.22 4.22 0 0 0-3.56 2.17c-1.54 2.66-.39 6.57 1.08 8.72.74 1.05 1.6 2.23 2.73 2.19 1.1-.05 1.51-.7 2.84-.7 1.32 0 1.7.7 2.85.68 1.18-.02 1.92-1.06 2.63-2.12a8.7 8.7 0 0 0 1.2-2.45 3.8 3.8 0 0 1-2.27-3.5ZM14.88 6.08a3.87 3.87 0 0 0 .89-2.78 3.94 3.94 0 0 0-2.56 1.32 3.7 3.7 0 0 0-.91 2.68 3.27 3.27 0 0 0 2.58-1.22Z" />
        </svg>
        Continue with Apple
      </button>
    </div>

    <div class="my-8 flex items-center gap-4" aria-hidden="true">
      <span class="h-px flex-1 bg-ink/15" />
      <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">or use email</span>
      <span class="h-px flex-1 bg-ink/15" />
    </div>

    <form class="flex flex-col gap-6" novalidate @submit.prevent="signIn">
      <AuthField
        v-model="email"
        label="Email address"
        type="email"
        autocomplete="email"
        inputmode="email"
        placeholder="you@example.com"
        :error="submitted && !emailValid ? 'Enter a valid email address.' : ''"
      />
      <div>
        <AuthField
          v-model="password"
          label="Password"
          type="password"
          autocomplete="current-password"
          placeholder="Enter your password"
          :error="submitted && !password ? 'Enter your password.' : ''"
        />
        <div class="mt-3 flex justify-end">
          <button type="button" class="font-inter text-[13px] font-semibold text-ink-3 underline decoration-ink/30 underline-offset-4 hover:text-ink">
            Forgot password?
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-ink px-6 py-3.5 font-inter text-h-16 font-semibold text-paper transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        Sign in
      </button>
    </form>

    <p v-if="statusMessage" class="mt-5 rounded-lg border border-solemn/25 bg-solemn-soft/25 px-4 py-3 font-inter text-[13px] text-ink" role="status">
      {{ statusMessage }}
    </p>

    <p class="mt-8 text-center font-inter text-[14px] text-ink-3">
      Don’t have an account?
      <NuxtLink to="/signup" class="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-accent">Create one</NuxtLink>
    </p>
  </AuthShell>
</template>
