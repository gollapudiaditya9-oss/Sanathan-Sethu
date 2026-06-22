<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import AuthField from '~/components/auth/AuthField.vue'
import AuthShell from '~/components/auth/AuthShell.vue'
import PhoneInput from '~/components/ui/PhoneInput.vue'

const firstName = shallowRef('')
const lastName = shallowRef('')
const email = shallowRef('')
const phone = shallowRef('')
const phoneValid = shallowRef(false)
const password = shallowRef('')
const confirmPassword = shallowRef('')
const submitted = shallowRef(false)
const statusMessage = shallowRef('')

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const passwordStarted = computed(() => password.value.length > 0)

const passwordRules = computed(() => [
  { label: 'At least 8 characters', passed: password.value.length >= 8 },
  { label: 'One uppercase letter', passed: /[A-Z]/.test(password.value) },
  { label: 'One number', passed: /\d/.test(password.value) },
  { label: 'One special character', passed: /[^A-Za-z0-9]/.test(password.value) }
])

const passwordValid = computed(() => passwordRules.value.every(rule => rule.passed))
const passwordsMatch = computed(() => confirmPassword.value.length > 0 && confirmPassword.value === password.value)
const formValid = computed(() =>
  firstName.value.trim().length > 0 &&
  lastName.value.trim().length > 0 &&
  emailValid.value &&
  phoneValid.value &&
  passwordValid.value &&
  passwordsMatch.value
)

const createAccount = () => {
  submitted.value = true
  statusMessage.value = ''
  if (!formValid.value) return
  statusMessage.value = 'Your details are valid. Connect an authentication service to activate account creation.'
}
</script>

<template>
  <AuthShell
    eyebrow="Begin your account"
    title="Create an account"
    description="Save your details once, then return to bookings and ceremony updates whenever you need them."
  >
    <form class="flex flex-col gap-6" novalidate @submit.prevent="createAccount">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <AuthField
          v-model="firstName"
          label="First name"
          autocomplete="given-name"
          placeholder="First name"
          :error="submitted && !firstName.trim() ? 'Enter your first name.' : ''"
        />
        <AuthField
          v-model="lastName"
          label="Last name"
          autocomplete="family-name"
          placeholder="Last name"
          :error="submitted && !lastName.trim() ? 'Enter your last name.' : ''"
        />
      </div>

      <AuthField
        v-model="email"
        label="Email address"
        type="email"
        autocomplete="email"
        inputmode="email"
        placeholder="you@example.com"
        :error="submitted && !emailValid ? 'Enter a valid email address.' : ''"
      />

      <PhoneInput
        v-model="phone"
        v-model:valid="phoneValid"
        label="Phone number"
        :error="submitted && !phoneValid ? 'Enter a valid phone number.' : ''"
      />

      <div>
        <AuthField
          v-model="password"
          label="Create password"
          type="password"
          autocomplete="new-password"
          placeholder="Create a strong password"
        />

        <div class="mt-4 grid grid-cols-1 gap-2 rounded-lg border border-ink/10 bg-paper/70 p-4 sm:grid-cols-2" aria-live="polite">
          <div
            v-for="rule in passwordRules"
            :key="rule.label"
            class="flex items-center gap-2 font-inter text-[13px] font-medium"
            :class="rule.passed ? 'text-success' : passwordStarted ? 'text-accent' : 'text-ink-3'"
          >
            <span
              class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold"
              :class="rule.passed
                ? 'border-success bg-success text-paper'
                : passwordStarted
                  ? 'border-accent text-accent'
                  : 'border-ink/20 text-ink-3'"
              aria-hidden="true"
            >
              {{ rule.passed ? '✓' : passwordStarted ? '×' : '·' }}
            </span>
            {{ rule.label }}
          </div>
        </div>
      </div>

      <AuthField
        v-model="confirmPassword"
        label="Confirm password"
        type="password"
        autocomplete="new-password"
        placeholder="Type your password again"
        :error="confirmPassword && !passwordsMatch ? 'The passwords do not match yet.' : ''"
      />

      <button
        type="submit"
        class="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-ink px-6 py-3.5 font-inter text-h-16 font-semibold text-paper transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        Create account
      </button>

      <p class="text-center font-inter text-[12px] leading-relaxed text-ink-3">
        By creating an account, you agree to the Terms of Service and acknowledge the Privacy Policy.
      </p>
    </form>

    <p v-if="statusMessage" class="mt-5 rounded-lg border border-solemn/25 bg-solemn-soft/25 px-4 py-3 font-inter text-[13px] text-ink" role="status">
      {{ statusMessage }}
    </p>

    <p class="mt-8 text-center font-inter text-[14px] text-ink-3">
      Already have an account?
      <NuxtLink to="/signin" class="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-accent">Sign in</NuxtLink>
    </p>
  </AuthShell>
</template>
