<script setup lang="ts">
import { computed, useId } from 'vue'

const props = defineProps<{
  label: string
  placeholder?: string
  helpText?: string
  modelValue?: string
  error?: string
  type?: string
  id?: string
  name?: string
  autocomplete?: string
  required?: boolean
  disabled?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [v: string] }>()

const generatedId = `field-${useId()}`
const inputId = computed(() => props.id ?? generatedId)
</script>

<template>
  <div class="flex w-full max-w-[520px] flex-col gap-2">
    <label
      :for="inputId"
      class="font-inter font-semibold text-h-10 tracking-[0.14em] uppercase text-ink-3"
    >{{ label }}</label>
    <input
      :id="inputId"
      :type="type ?? 'text'"
      :name="name"
      :autocomplete="autocomplete"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full rounded-lg border bg-paper px-4 py-4 text-h-16 font-inter font-medium text-ink placeholder:text-ink-3 placeholder:font-normal focus:outline-none focus:border-ink transition-colors duration-120 ease-out"
      :class="error ? 'border-accent focus:ring-1 focus:ring-accent' : 'border-ink-3 focus:ring-1 focus:ring-ink'"
    />
    <p v-if="error" :id="`${inputId}-error`" class="font-inter font-semibold text-h-10 text-accent" role="alert">{{ error }}</p>
    <p v-else-if="helpText" :id="`${inputId}-help`" class="font-inter font-medium text-h-10 text-ink-3">{{ helpText }}</p>
  </div>
</template>
