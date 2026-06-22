<script setup lang="ts">
import { computed, shallowRef, useTemplateRef, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getBookingDateParts } from '~/utils/formatBookingDate'

const props = defineProps<{
  label: string
  modelValue?: string
  helpText?: string
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const root = useTemplateRef<HTMLElement>('root')
const isOpen = shallowRef(false)

const today = new Date()
today.setHours(0, 0, 0, 0)

const parseIsoDate = (value?: string) => {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  const date = new Date(year, month - 1, day)
  return Number.isNaN(date.getTime()) ? null : date
}

const formatIsoDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const selectedDate = computed(() => parseIsoDate(props.modelValue))
const visibleMonth = shallowRef(
  new Date(
    selectedDate.value?.getFullYear() ?? today.getFullYear(),
    selectedDate.value?.getMonth() ?? today.getMonth(),
    1
  )
)

watch(() => props.modelValue, (value) => {
  const date = parseIsoDate(value)
  if (date) visibleMonth.value = new Date(date.getFullYear(), date.getMonth(), 1)
})

onClickOutside(root, () => {
  isOpen.value = false
})

const monthLabel = computed(() => new Intl.DateTimeFormat('en-IN', {
  month: 'long',
  year: 'numeric'
}).format(visibleMonth.value))

const monthOptions = Array.from({ length: 12 }, (_, month) => ({
  value: month,
  label: new Intl.DateTimeFormat('en-IN', { month: 'long' }).format(new Date(2024, month, 1))
}))

const lastAvailableYear = 2047
const yearOptions = Array.from(
  { length: lastAvailableYear - today.getFullYear() + 1 },
  (_, index) => today.getFullYear() + index
)

const formattedDateParts = computed(() => getBookingDateParts(selectedDate.value))

const days = computed(() => {
  const year = visibleMonth.value.getFullYear()
  const month = visibleMonth.value.getMonth()
  const leadingDays = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return [
    ...Array.from({ length: leadingDays }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1))
  ]
})

const canGoPrevious = computed(() => {
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  return visibleMonth.value > currentMonth
})

const canGoNext = computed(() =>
  visibleMonth.value < new Date(lastAvailableYear, 11, 1)
)

const moveMonth = (direction: number) => {
  if (direction < 0 && !canGoPrevious.value) return
  if (direction > 0 && !canGoNext.value) return
  visibleMonth.value = new Date(
    visibleMonth.value.getFullYear(),
    visibleMonth.value.getMonth() + direction,
    1
  )
}

const changeMonth = (event: Event) => {
  const month = Number((event.target as HTMLSelectElement).value)
  visibleMonth.value = new Date(visibleMonth.value.getFullYear(), month, 1)
}

const changeYear = (event: Event) => {
  const year = Number((event.target as HTMLSelectElement).value)
  const month = year === today.getFullYear()
    ? Math.max(visibleMonth.value.getMonth(), today.getMonth())
    : visibleMonth.value.getMonth()

  visibleMonth.value = new Date(year, month, 1)
}

const isPastMonth = (month: number) =>
  visibleMonth.value.getFullYear() === today.getFullYear() && month < today.getMonth()

const isPast = (date: Date) => date < today
const isToday = (date: Date) => formatIsoDate(date) === formatIsoDate(today)
const isSelected = (date: Date) => formatIsoDate(date) === props.modelValue

const selectDate = (date: Date) => {
  if (isPast(date)) return
  emit('update:modelValue', formatIsoDate(date))
  isOpen.value = false
}

const openCalendar = () => {
  const date = selectedDate.value ?? today
  visibleMonth.value = new Date(date.getFullYear(), date.getMonth(), 1)
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div ref="root" class="relative flex flex-col gap-2">
    <label
      id="preferred-date-label"
      class="font-inter font-semibold text-h-10 tracking-[0.14em] uppercase text-ink-3"
    >{{ label }}</label>

    <button
      type="button"
      aria-labelledby="preferred-date-label"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      :aria-invalid="!!error"
      :aria-describedby="error ? 'preferred-date-error' : helpText ? 'preferred-date-help' : undefined"
      class="group flex w-full items-center justify-between gap-4 rounded-lg border bg-paper px-4 py-4 text-left font-inter text-h-16 transition-colors duration-150 focus:outline-none focus:ring-1"
      :class="error
        ? 'border-accent focus:border-accent focus:ring-accent'
        : 'border-ink-3 hover:border-ink focus:border-ink focus:ring-ink'"
      @click="openCalendar"
      @keydown.esc="isOpen = false"
    >
      <span :class="formattedDateParts ? 'font-medium text-ink' : 'font-normal text-ink-3'">
        <template v-if="formattedDateParts">
          {{ formattedDateParts.weekday }}, {{ formattedDateParts.day }}<sup class="ml-px text-[0.62em] leading-none">{{ formattedDateParts.suffix }}</sup>
          {{ formattedDateParts.month }}, {{ formattedDateParts.year }}
        </template>
        <template v-else>Choose a preferred date</template>
      </span>
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink text-paper transition-transform duration-150 group-hover:-translate-y-0.5" aria-hidden="true">
        <svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-none stroke-current" stroke-width="1.7">
          <path d="M6.75 3.75v3M17.25 3.75v3M4 9.25h16M5.75 5.5h12.5A1.75 1.75 0 0 1 20 7.25v11A1.75 1.75 0 0 1 18.25 20H5.75A1.75 1.75 0 0 1 4 18.25v-11A1.75 1.75 0 0 1 5.75 5.5Z" />
          <path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" stroke-linecap="round" stroke-width="2.4" />
        </svg>
      </span>
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div
        v-if="isOpen"
        role="dialog"
        aria-modal="false"
        aria-label="Choose a preferred date"
        class="absolute left-0 top-full z-30 mt-2 w-full max-w-[390px] overflow-hidden rounded-xl border border-ink/20 bg-paper shadow-[0_22px_60px_rgba(26,22,20,0.18)]"
        @keydown.esc="isOpen = false"
      >
        <div class="flex items-end justify-between gap-3 border-b border-ink/10 px-4 py-4 sm:px-5">
          <div class="min-w-0">
            <p class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">Select date</p>
            <div class="mt-2 flex items-center gap-2">
              <label class="relative block">
                <span class="sr-only">Month</span>
                <select
                  aria-label="Month"
                  :value="visibleMonth.getMonth()"
                  class="w-[116px] appearance-none rounded-md border border-ink/15 bg-bg py-2 pl-3 pr-7 font-bricolage text-[17px] leading-none text-ink outline-none transition-colors hover:border-ink focus:border-ink focus:ring-1 focus:ring-ink sm:w-[132px]"
                  @change="changeMonth"
                >
                  <option
                    v-for="month in monthOptions"
                    :key="month.value"
                    :value="month.value"
                    :disabled="isPastMonth(month.value)"
                  >{{ month.label }}</option>
                </select>
                <span class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 font-inter text-[11px] text-ink-3" aria-hidden="true">↓</span>
              </label>

              <label class="relative block">
                <span class="sr-only">Year</span>
                <select
                  aria-label="Year"
                  :value="visibleMonth.getFullYear()"
                  class="w-[82px] appearance-none rounded-md border border-ink/15 bg-bg py-2 pl-3 pr-7 font-bricolage text-[17px] leading-none text-ink outline-none transition-colors hover:border-ink focus:border-ink focus:ring-1 focus:ring-ink"
                  @change="changeYear"
                >
                  <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
                </select>
                <span class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 font-inter text-[11px] text-ink-3" aria-hidden="true">↓</span>
              </label>
            </div>
          </div>
          <div class="flex shrink-0 gap-1.5">
            <button
              type="button"
              aria-label="Previous month"
              :disabled="!canGoPrevious"
              class="flex h-9 w-9 items-center justify-center rounded-md border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:cursor-not-allowed disabled:opacity-25"
              @click="moveMonth(-1)"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              aria-label="Next month"
              :disabled="!canGoNext"
              class="flex h-9 w-9 items-center justify-center rounded-md border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:cursor-not-allowed disabled:opacity-25"
              @click="moveMonth(1)"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div class="p-4">
          <div class="mb-2 grid grid-cols-7" aria-hidden="true">
            <span
              v-for="weekday in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
              :key="weekday"
              class="py-2 text-center font-inter text-h-10 font-semibold text-ink-3"
            >{{ weekday }}</span>
          </div>

          <div class="grid grid-cols-7 gap-1" role="grid" :aria-label="monthLabel">
            <div v-for="(date, index) in days" :key="date?.toISOString() ?? `blank-${index}`" role="gridcell">
              <button
                v-if="date"
                type="button"
                :disabled="isPast(date)"
                :aria-label="new Intl.DateTimeFormat('en-IN', { dateStyle: 'full' }).format(date)"
                :aria-selected="isSelected(date)"
                class="relative flex aspect-square w-full items-center justify-center rounded-md font-inter text-[14px] font-medium transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                :class="{
                  'bg-ink text-paper': isSelected(date),
                  'text-accent ring-1 ring-inset ring-accent/40': isToday(date) && !isSelected(date),
                  'text-ink hover:bg-solemn-soft/50': !isPast(date) && !isSelected(date) && !isToday(date),
                  'cursor-not-allowed text-ink/25': isPast(date)
                }"
                @click="selectDate(date)"
              >
                {{ date.getDate() }}
                <span v-if="isSelected(date)" class="absolute bottom-1 h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-ink/10 bg-bg/60 px-5 py-3 font-inter text-h-10 font-medium text-ink-3">
          Past dates are unavailable
        </div>
      </div>
    </Transition>

    <p v-if="error" id="preferred-date-error" class="font-inter font-semibold text-h-10 text-accent" role="alert">{{ error }}</p>
    <p v-else-if="helpText" id="preferred-date-help" class="font-inter font-medium text-h-10 text-ink-3">{{ helpText }}</p>
  </div>
</template>
