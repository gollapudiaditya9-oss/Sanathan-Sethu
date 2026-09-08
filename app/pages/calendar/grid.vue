<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import SectionBand from '~/components/ui/SectionBand.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import { useRouter } from '#imports'
import { useBookingState } from '~/composables/useBookingState'

const router = useRouter()
const { bookingState, setConfig, startOpenBooking } = useBookingState()

const todayParts = getHyderabadToday()
const today = new Date(Date.UTC(todayParts.year, todayParts.month, todayParts.day))
const visibleMonth = shallowRef(new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)))
const selectedDate = shallowRef(today.getUTCDate())

const monthFormatter = new Intl.DateTimeFormat('en-IN', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
})
const dayFormatter = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
})

const currentMonth = computed(() => monthFormatter.format(visibleMonth.value))
const previousMonthLabel = computed(() => monthFormatter.format(new Date(Date.UTC(
  visibleMonth.value.getUTCFullYear(),
  visibleMonth.value.getUTCMonth() - 1,
  1
))))
const nextMonthLabel = computed(() => monthFormatter.format(new Date(Date.UTC(
  visibleMonth.value.getUTCFullYear(),
  visibleMonth.value.getUTCMonth() + 1,
  1
))))
const daysInMonth = computed(() => new Date(Date.UTC(
  visibleMonth.value.getUTCFullYear(),
  visibleMonth.value.getUTCMonth() + 1,
  0
)).getUTCDate())
const monthDays = computed(() => Array.from({ length: daysInMonth.value }, (_, index) => ({
  day: index + 1,
  ...getPanchangForDate(
    visibleMonth.value.getUTCFullYear(),
    visibleMonth.value.getUTCMonth(),
    index + 1
  )
})))
const leadingDays = computed(() => (
  new Date(Date.UTC(visibleMonth.value.getUTCFullYear(), visibleMonth.value.getUTCMonth(), 1)).getUTCDay() + 6
) % 7)
const isCurrentMonth = computed(() =>
  visibleMonth.value.getUTCFullYear() === today.getUTCFullYear()
  && visibleMonth.value.getUTCMonth() === today.getUTCMonth()
)
const selectedDateValue = computed(() => new Date(Date.UTC(
  visibleMonth.value.getUTCFullYear(),
  visibleMonth.value.getUTCMonth(),
  selectedDate.value
)))
const selectedDateLabel = computed(() => dayFormatter.format(selectedDateValue.value))
const selectedDateIso = computed(() => [
  selectedDateValue.value.getUTCFullYear(),
  String(selectedDateValue.value.getUTCMonth() + 1).padStart(2, '0'),
  String(selectedDateValue.value.getUTCDate()).padStart(2, '0')
].join('-'))
const selectedPanchang = computed(() => monthDays.value.find(day => day.day === selectedDate.value) ?? monthDays.value[0]!)

const isToday = (day: number) => isCurrentMonth.value && day === today.getUTCDate()
const selectDate = (day: number) => {
  selectedDate.value = day
}
const changeMonth = (offset: number) => {
  visibleMonth.value = new Date(Date.UTC(
    visibleMonth.value.getUTCFullYear(),
    visibleMonth.value.getUTCMonth() + offset,
    1
  ))
  selectedDate.value = isCurrentMonth.value ? today.getUTCDate() : 1
}
const prevMonth = () => changeMonth(-1)
const nextMonth = () => changeMonth(1)
const goToday = () => {
  visibleMonth.value = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1))
  selectedDate.value = today.getUTCDate()
}

const carrySelectedDate = () => {
  setConfig({
    ...bookingState.value.config,
    date: selectedDateIso.value
  })
}

const askAboutSelectedDate = async () => {
  carrySelectedDate()
  await router.push({ path: '/consultants/routing', query: { date: selectedDateIso.value, intent: 'date' } })
}

const findMuhurtam = async () => {
  startOpenBooking()
  carrySelectedDate()
  await router.push({ path: '/book/choose-ritual', query: { date: selectedDateIso.value } })
}
</script>

<template>
  <div class="bg-bg min-h-screen">
    
    <!-- Header Hero -->
    <div class="mx-auto w-full  px-6 md:px-14 py-16 md:py-24">
      <div class="flex flex-col justify-between gap-8 md:flex-row md:items-start">
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-2 font-inter font-semibold text-h-10 text-accent uppercase tracking-[0.14em]">
            <span>PANCHANGAM</span>
            <span class="text-ink-3">&middot;</span>
            <span class="text-ink-3">Drik Ganitha</span>
            <span class="text-ink-3">&middot;</span>
            <span class="text-ink-3">V3</span>
          </div>
          <h1 class="font-bricolage text-[92px] leading-[0.95] tracking-[-0.03em] text-ink">
            {{ currentMonth }}.
          </h1>
        </div>
        
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" :aria-label="`Show ${previousMonthLabel}`" @click="prevMonth" class="px-5 py-2.5 rounded-lg border border-ink/20 font-inter font-semibold text-[14px] text-ink hover:bg-ink/5 transition-colors">&larr; {{ previousMonthLabel }}</button>
          <button type="button" @click="goToday" class="px-5 py-2.5 rounded-lg border border-ink/20 font-inter font-semibold text-[14px] text-ink hover:bg-ink/5 transition-colors">Today</button>
          <button type="button" :aria-label="`Show ${nextMonthLabel}`" @click="nextMonth" class="px-5 py-2.5 rounded-lg border border-ink/20 font-inter font-semibold text-[14px] text-ink hover:bg-ink/5 transition-colors">{{ nextMonthLabel }} &rarr;</button>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="grid grid-cols-2 md:grid-cols-6 gap-6 mt-16">
        <div class="flex flex-col gap-1">
          <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">SYSTEM</span>
          <span class="font-inter font-semibold text-h-16 text-ink">Drik Ganitha</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">SAMVATSARA</span>
          <span class="font-inter font-semibold text-h-16 text-ink">{{ selectedPanchang.samvatsara }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">AYANA</span>
          <span class="font-inter font-semibold text-h-16 text-ink">{{ selectedPanchang.ayana }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">RITU</span>
          <span class="font-inter font-semibold text-h-16 text-ink">{{ selectedPanchang.ritu }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">MASA</span>
          <span class="font-inter font-semibold text-h-16 text-ink">{{ selectedPanchang.masa }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">LOCATION</span>
          <span class="font-inter font-semibold text-h-16 text-ink">Hyderabad</span>
        </div>
      </div>
    </div>

    <!-- The Month Grid -->
    <SectionBand padTop="none" padBottom="none" theme="bg" number="01" label="THE MONTH" subtitle="TITHIS, FESTIVALS, MUHURTHAMS" position="01 / 03" />
    <div class="mx-auto w-full  px-6 md:px-14 py-12">
      <div class="w-full border-t border-l border-ink/20 flex flex-col">
        <!-- Days Header -->
        <div class="grid grid-cols-7 border-b border-ink/20 bg-bg">
          <div v-for="day in ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']" :key="day" class="p-4 border-r border-ink/20 font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">
            {{ day }}
          </div>
        </div>
        
        <!-- Grid Cells -->
        <div class="grid grid-cols-7 border-b border-ink/20">
          <div v-for="i in leadingDays" :key="`empty-${i}`" class="border-r border-ink/20 min-h-[140px] md:min-h-[180px] bg-paper" aria-hidden="true"></div>
          
          <button v-for="day in monthDays" :key="day.day"
            type="button"
            :aria-label="`${dayFormatter.format(day.date)}. ${day.tithi}, ${day.paksha} Paksha${day.festivals.length ? `. ${day.festivals.map(festival => festival.name).join(', ')}` : ''}`"
            :aria-pressed="selectedDate === day.day"
            @click="selectDate(day.day)"
            class="border-r border-ink/20 border-b border-ink/20 min-h-[140px] md:min-h-[180px] p-4 flex flex-col items-start justify-start cursor-pointer transition-colors relative text-left"
            :class="[
              selectedDate === day.day ? 'bg-ink text-paper' : 'bg-bg hover:bg-ink/5',
              isToday(day.day) && selectedDate !== day.day ? 'ring-2 ring-inset ring-accent' : ''
            ]"
          >
            <span class="font-bricolage text-h-26" :class="selectedDate === day.day ? 'text-paper' : 'text-ink'">{{ day.day }}</span>
            <span class="mt-3 font-inter text-[11px] font-semibold leading-tight" :class="selectedDate === day.day ? 'text-paper' : 'text-ink'">{{ day.tithi }}</span>
            <span class="mt-1 font-inter text-[10px] leading-tight" :class="selectedDate === day.day ? 'text-paper/70' : 'text-ink-3'">{{ day.paksha }} · {{ day.masa }}</span>
            <span v-if="day.festivals.length" class="mt-3 font-inter text-[10px] font-semibold leading-tight" :class="selectedDate === day.day ? 'text-paper/85' : 'text-accent'">{{ day.festivals[0]?.name }}</span>
            <span v-if="isToday(day.day)" class="mt-auto pt-2 font-inter text-[10px] font-semibold uppercase tracking-widest" :class="selectedDate === day.day ? 'text-paper/80' : 'text-accent'">Today</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Today Details -->
    <SectionBand padTop="none" padBottom="none" theme="bg" number="02" label="SELECTED DATE" :subtitle="selectedDateLabel" position="02 / 03" />
    <div class="mx-auto w-full  px-6 md:px-14 py-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">
      
      <!-- Left Info -->
      <div class="flex flex-col gap-12">
        <div class="flex flex-col gap-2">
          <span class="font-inter font-semibold text-[10px] text-accent uppercase tracking-[0.14em]">SELECTED DATE</span>
          <h2 class="font-bricolage text-[56px] md:text-h-92 leading-[0.95] tracking-[-0.03em] text-ink">
            {{ selectedDateLabel }}.
          </h2>
        </div>

        <div class="flex flex-col border-t border-ink/10 pt-4">
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">SYSTEM</span>
            <span class="font-inter font-semibold text-h-16 text-ink">Drik Ganitha</span>
          </div>
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">LOCATION</span>
            <span class="font-inter font-semibold text-h-16 text-ink">Hyderabad</span>
          </div>
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">TITHI</span>
            <span class="font-inter font-semibold text-h-16 text-ink">{{ selectedPanchang.tithi }} · {{ selectedPanchang.paksha }}</span>
          </div>
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">NAKSHATRA</span>
            <span class="font-inter font-semibold text-h-16 text-ink">{{ selectedPanchang.nakshatra }} · until {{ selectedPanchang.nakshatraEnds }}</span>
          </div>
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">YOGA</span>
            <span class="font-inter font-semibold text-h-16 text-ink">{{ selectedPanchang.yoga }} · until {{ selectedPanchang.yogaEnds }}</span>
          </div>
          <div class="flex justify-between items-center gap-6 py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">KARANA</span>
            <span class="font-inter font-semibold text-h-16 text-right text-ink">{{ selectedPanchang.karana }}</span>
          </div>
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">MUHURTHAM</span>
            <span class="font-inter font-semibold text-h-16 text-ink">{{ selectedPanchang.abhijitMuhurta }}</span>
          </div>
          <div class="flex justify-between items-center gap-6 py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">SUNRISE / SUNSET</span>
            <span class="font-inter font-semibold text-h-16 text-right text-ink">{{ selectedPanchang.sunrise }} / {{ selectedPanchang.sunset }}</span>
          </div>
          <div class="flex justify-between items-center gap-6 py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">RAHU KALAM</span>
            <span class="font-inter font-semibold text-h-16 text-right text-ink">{{ selectedPanchang.rahuKalam }}</span>
          </div>
        </div>
      </div>

      <!-- Right Card -->
      <div class="w-full mt-4 lg:mt-0">
        <div class="w-full rounded-xl border border-ink/20 bg-paper p-8 flex flex-col gap-6 sticky top-24">
          <span class="font-inter font-semibold text-[10px] text-accent uppercase tracking-[0.14em]">IS THIS A GOOD DAY?</span>
          <p class="font-inter text-h-16 text-ink-2 leading-relaxed">
            Panchangam shows favorable windows. But auspiciousness for your event depends on Jatakam and location &mdash; ask a Purohit.
          </p>
          <div class="flex flex-col gap-3 mt-4">
            <ButtonSmall label="Ask about this date" variant="primary" class="w-full justify-center" @click="askAboutSelectedDate" />
            <ButtonSmall label="Find a muhurtham" variant="outline" class="w-full justify-center" @click="findMuhurtam" />
          </div>
        </div>
      </div>

    </div>

    <!-- Note on Accuracy -->
    <SectionBand padTop="none" padBottom="none" theme="bg" number="03" label="A NOTE ON ACCURACY" subtitle="REGIONAL VARIANCE" position="03 / 03" />

    <!-- Dark Footer section -->
    <div class="w-full bg-ink py-24 md:py-32 px-6 md:px-14">
      <div class="mx-auto w-full  flex flex-col gap-12">
        <span class="font-inter font-semibold text-[10px] text-accent uppercase tracking-[0.14em]">WHAT THIS CALENDAR IS NOT</span>
        <h2 class="font-bricolage text-[56px] md:text-h-92 leading-[0.95] tracking-[-0.03em] text-paper ">
          This is not a replacement for a Purohit.
        </h2>
        <p class="font-inter text-h-16 text-paper/70  leading-relaxed">
          Panchangam values calculated using Drik Ganitha. Regional traditions vary &mdash; Telugu, Tamil, Marathi, Bengali, and other sampradayas observe different tithis at the boundary moments. For an actual life event &mdash; a wedding, a Griha Pravesh, an Antyeshti &mdash; consult a Purohit.
        </p>

        <div class="w-full flex justify-between items-end mt-24 border-t border-paper/10 pt-12">
          <span class="font-bricolage text-h-26 text-paper">SanatanaSetu.</span>
          <span class="font-inter text-[10px] text-paper/50">Panchangam calculated for Hyderabad - adjust to your location</span>
        </div>
      </div>
    </div>

  </div>
</template>
