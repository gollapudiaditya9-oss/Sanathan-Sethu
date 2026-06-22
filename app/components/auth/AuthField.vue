<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'

const props = defineProps<{
  label: string
  modelValue?: string
  type?: string
  autocomplete?: string
  placeholder?: string
  inputmode?: 'text' | 'email' | 'tel' | 'numeric'
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const fieldId = `auth-${useId()}`
const passwordVisible = shallowRef(false)
const isPassword = computed(() => props.type === 'password')
const inputType = computed(() => isPassword.value && passwordVisible.value ? 'text' : (props.type ?? 'text'))
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="fieldId" class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="fieldId"
        :value="modelValue"
        :type="inputType"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        :placeholder="placeholder"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${fieldId}-error` : undefined"
        class="w-full rounded-lg border bg-paper px-4 py-3.5 font-inter text-h-16 font-medium text-ink outline-none transition-colors placeholder:font-normal placeholder:text-ink-3/75 focus:ring-1"
        :class="[
          isPassword ? 'pr-16' : '',
          error ? 'border-accent focus:border-accent focus:ring-accent' : 'border-ink/30 hover:border-ink/60 focus:border-ink focus:ring-ink'
        ]"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <button
        v-if="isPassword"
        type="button"
        :aria-label="passwordVisible ? 'Hide password' : 'Show password'"
        class="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 py-1 font-inter text-[12px] font-semibold text-ink-3 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        @click="passwordVisible = !passwordVisible"
      >
        {{ passwordVisible ? 'Hide' : 'Show' }}
      </button>
    </div>
    <p v-if="error" :id="`${fieldId}-error`" class="font-inter text-[12px] font-medium text-accent" role="alert">
      {{ error }}
    </p>
  </div>
</template>
