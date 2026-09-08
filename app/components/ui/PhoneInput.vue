<script setup lang="ts">
import { computed, nextTick, shallowRef, useId, useTemplateRef, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { countryDialCodes } from '~/data/countryDialCodes'

const props = withDefaults(defineProps<{
  label: string
  modelValue?: string
  error?: string
  defaultCountry?: string
  theme?: 'light' | 'dark'
  name?: string
  autocomplete?: string
  required?: boolean
}>(), {
  defaultCountry: 'IN',
  theme: 'light'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:valid': [value: boolean]
}>()

const fieldId = `phone-${useId()}`
const root = useTemplateRef<HTMLElement>('root')
const countryTrigger = useTemplateRef<HTMLButtonElement>('countryTrigger')
const countrySearch = useTemplateRef<HTMLInputElement>('countrySearch')
const countryList = useTemplateRef<HTMLElement>('countryList')
const isOpen = shallowRef(false)
const search = shallowRef('')
const nationalNumber = shallowRef('')
const selectedCode = shallowRef(props.defaultCountry)

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
const countryFlagUrl = (code: string) => `https://flagcdn.com/${code.toLowerCase()}.svg`

const countries = countryDialCodes
  .map(country => ({
    ...country,
    name: regionNames.of(country.code) ?? country.code
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

const selectedCountry = computed(() =>
  countries.find(country => country.code === selectedCode.value) ?? countries.find(country => country.code === 'IN')!
)
const isDark = computed(() => props.theme === 'dark')

const filteredCountries = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return countries
  return countries.filter(country =>
    country.name.toLowerCase().includes(query) ||
    country.code.toLowerCase().includes(query) ||
    `+${country.dialCode}`.includes(query)
  )
})

const nationalDigits = computed(() => nationalNumber.value.replace(/\D/g, ''))
const isValid = computed(() => nationalDigits.value.length >= 7 && nationalDigits.value.length <= 14)

const emitValue = () => {
  emit('update:modelValue', nationalDigits.value ? `+${selectedCountry.value.dialCode}${nationalDigits.value}` : '')
  emit('update:valid', isValid.value)
}

const selectCountry = (code: string) => {
  selectedCode.value = code
  isOpen.value = false
  search.value = ''
  emitValue()
  nextTick(() => countryTrigger.value?.focus())
}

const setCountryPickerOpen = async (open: boolean, returnFocus = false) => {
  isOpen.value = open
  if (!open) search.value = ''
  await nextTick()
  if (open) countrySearch.value?.focus()
  else if (returnFocus) countryTrigger.value?.focus()
}

const focusCountryOption = (index: number) => {
  const options = Array.from(countryList.value?.querySelectorAll<HTMLButtonElement>('[data-country-option]') ?? [])
  if (!options.length) return
  options[Math.max(0, Math.min(index, options.length - 1))]?.focus()
}

const handleCountryOptionKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    setCountryPickerOpen(false, true)
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    focusCountryOption(index + 1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    index === 0 ? countrySearch.value?.focus() : focusCountryOption(index - 1)
  } else if (event.key === 'Home') {
    event.preventDefault()
    focusCountryOption(0)
  } else if (event.key === 'End') {
    event.preventDefault()
    focusCountryOption(filteredCountries.value.length - 1)
  }
}

const updateNumber = (event: Event) => {
  nationalNumber.value = (event.target as HTMLInputElement).value
  emitValue()
}

watch(() => props.modelValue, (value) => {
  if (!value || nationalDigits.value) return
  const digits = value.replace(/\D/g, '')

  if (!value.trim().startsWith('+')) {
    selectedCode.value = props.defaultCountry
    nationalNumber.value = digits
    emit('update:valid', isValid.value)
    return
  }

  const match = [...countries]
    .sort((a, b) => b.dialCode.length - a.dialCode.length)
    .find(country => digits.startsWith(country.dialCode))

  if (match) {
    selectedCode.value = match.code
    nationalNumber.value = digits.slice(match.dialCode.length)
    emit('update:valid', isValid.value)
  }
}, { immediate: true })

onClickOutside(root, () => {
  isOpen.value = false
  search.value = ''
})
</script>

<template>
  <div ref="root" class="relative flex w-full max-w-[520px] flex-col gap-2">
    <label
      :for="fieldId"
      class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em]"
      :class="isDark ? 'text-paper/50' : 'text-ink-3'"
    >
      {{ label }}
    </label>

    <div
      class="flex rounded-lg border transition-colors focus-within:ring-1"
      :class="error
        ? 'border-accent focus-within:border-accent focus-within:ring-accent'
        : isDark
          ? 'border-paper/25 bg-ink/25 hover:border-paper/50 focus-within:border-paper focus-within:ring-paper'
          : 'border-ink/30 bg-paper hover:border-ink/60 focus-within:border-ink focus-within:ring-ink'"
    >
      <button
        ref="countryTrigger"
        type="button"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        :aria-label="`Country: ${selectedCountry.name}, +${selectedCountry.dialCode}`"
        class="grid min-w-[138px] shrink-0 grid-cols-[24px_minmax(44px,auto)_10px] items-center gap-x-2 rounded-l-lg border-r px-3 font-inter text-[14px] font-semibold transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
        :class="isDark
          ? 'border-paper/15 text-paper hover:bg-paper/10 focus-visible:ring-paper'
          : 'border-ink/15 text-ink hover:bg-bg focus-visible:ring-ink'"
        @click="setCountryPickerOpen(!isOpen)"
        @keydown.esc="setCountryPickerOpen(false)"
      >
        <span
          class="relative flex h-[18px] w-6 items-center justify-center overflow-hidden rounded-[2px] text-[9px] font-bold leading-none"
          :class="isDark ? 'bg-paper/10 text-paper/60' : 'bg-ink/5 text-ink-3'"
          aria-hidden="true"
        >
          {{ selectedCountry.code }}
          <img
            :src="countryFlagUrl(selectedCountry.code)"
            alt=""
            class="absolute inset-0 h-full w-full object-cover"
          >
        </span>
        <span class="whitespace-nowrap leading-none">+{{ selectedCountry.dialCode }}</span>
        <span class="text-center text-[10px] leading-none" :class="isDark ? 'text-paper/50' : 'text-ink-3'" aria-hidden="true">▼</span>
      </button>

      <input
        :id="fieldId"
        :value="nationalNumber"
        type="tel"
        :name="name"
        :required="required"
        inputmode="tel"
        :autocomplete="autocomplete ?? 'tel-national'"
        placeholder="Phone number"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${fieldId}-error` : undefined"
        class="min-w-0 flex-1 rounded-r-lg bg-transparent px-4 py-3.5 font-inter text-h-16 font-medium outline-none placeholder:font-normal"
        :class="isDark ? 'text-paper placeholder:text-paper/40' : 'text-ink placeholder:text-ink-3/75'"
        @input="updateNumber"
      >
    </div>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute left-0 top-full z-40 mt-2 w-full overflow-hidden rounded-xl border border-ink/20 bg-paper shadow-[0_22px_60px_rgba(26,22,20,0.18)]"
      >
        <div class="border-b border-ink/10 p-3">
          <input
            ref="countrySearch"
            v-model="search"
            type="search"
            autocomplete="off"
            aria-label="Search countries"
            placeholder="Search country or code"
            class="w-full rounded-lg border border-ink/20 bg-bg px-3 py-2.5 font-inter text-[14px] text-ink outline-none placeholder:text-ink-3 focus:border-ink focus:ring-1 focus:ring-ink"
            @keydown.esc.prevent="setCountryPickerOpen(false, true)"
            @keydown.down.prevent="focusCountryOption(0)"
          >
        </div>
        <ul ref="countryList" class="max-h-72 overflow-y-auto p-2" role="listbox" aria-label="Countries">
          <li v-for="(country, index) in filteredCountries" :key="country.code">
            <button
              data-country-option
              type="button"
              role="option"
              :aria-selected="country.code === selectedCode"
              class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
              :class="country.code === selectedCode ? 'bg-solemn-soft/35' : ''"
              @click="selectCountry(country.code)"
              @keydown="handleCountryOptionKeydown($event, index)"
            >
              <span class="relative flex h-[18px] w-6 shrink-0 items-center justify-center overflow-hidden rounded-[2px] bg-ink/5 font-inter text-[9px] font-bold leading-none text-ink-3" aria-hidden="true">
                {{ country.code }}
                <img
                  :src="countryFlagUrl(country.code)"
                  alt=""
                  loading="lazy"
                  class="absolute inset-0 h-full w-full object-cover"
                >
              </span>
              <span class="min-w-0 flex-1 truncate font-inter text-[14px] font-medium text-ink">{{ country.name }}</span>
              <span class="font-inter text-[13px] font-semibold text-ink-3">+{{ country.dialCode }}</span>
            </button>
          </li>
          <li v-if="!filteredCountries.length" class="px-3 py-6 text-center font-inter text-[14px] text-ink-3">
            No countries found
          </li>
        </ul>
      </div>
    </Transition>

    <p v-if="error" :id="`${fieldId}-error`" class="font-inter text-[12px] font-medium text-accent" role="alert">
      {{ error }}
    </p>
  </div>
</template>
