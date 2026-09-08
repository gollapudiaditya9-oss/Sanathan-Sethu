<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ label: string; modelValue?: string; placeholder?: string; helpText?: string; rows?: number; required?: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const fieldId = computed(() => `textarea-${props.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="fieldId" class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">{{ label }}<span v-if="required" class="ml-1 text-accent">•</span></label>
    <p v-if="helpText" :id="`${fieldId}-help`" class="font-inter text-[12px] leading-relaxed text-ink-3">{{ helpText }}</p>
    <textarea :id="fieldId" :value="modelValue" :placeholder="placeholder" :rows="rows ?? 5" :required="required" :aria-describedby="helpText ? `${fieldId}-help` : undefined" class="w-full resize-y rounded-lg border border-ink-3 bg-paper px-4 py-4 font-inter text-h-16 text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink" @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />
  </div>
</template>
