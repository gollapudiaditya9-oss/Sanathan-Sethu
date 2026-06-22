<script setup lang="ts">
import SectionBand from '~/components/ui/SectionBand.vue'
import ThreeScriptEyebrow from '~/components/page-blocks/ThreeScriptEyebrow.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'

// Mocking today's date
const today = new Date()
const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
const todayString = today.toLocaleDateString('en-US', dateOptions)

const mockFestivals = [
  { date: 'MAY 14', name: 'Akshaya Tritiya', desc: 'Auspicious day for new beginnings and investments.' },
  { date: 'MAY 23', name: 'Narasimha Jayanti', desc: 'Appearance day of Lord Narasimha.' },
  { date: 'JUN 06', name: 'Vat Purnima Vrat', desc: 'Observed by married women for the well-being of their husbands.' },
  { date: 'JUN 17', name: 'Ganga Dussehra', desc: 'Celebrates the descent of the river Ganges to Earth.' },
  { date: 'JUL 21', name: 'Guru Purnima', desc: 'A day to honor spiritual and academic teachers.' }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg">
      <div class="flex flex-col gap-8 max-w-[800px]">
        <ThreeScriptEyebrow english="CALENDAR" sanskrit="पञ्चाङ्गम्" telugu="పంచాంగం" theme="dark" />
        <h1 class="font-bricolage text-h-68 md:text-h-92 text-ink leading-[0.95] tracking-[-0.03em]">
          The calendar<br>your family follows.
        </h1>
        <p class="font-inter text-h-26 text-ink-3 max-w-[600px]">
          Tithis, festivals, regional observances. Calculated using Drik Ganitha against your location. Free for everyone, forever.
        </p>
        <div class="mt-4">
          <ButtonLarge label="Open the calendar &rarr;" to="/calendar/grid" />
        </div>
      </div>
    </SectionBand>

    <!-- Today Card -->
    <SectionBand padTop="xl" padBottom="xl" theme="paper" number="01" label="TODAY" subtitle="HYDERABAD" position="01 / 03">
      <div class="flex flex-col gap-12 pt-12 md:pt-16">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="font-inter text-h-16 text-accent uppercase tracking-widest">{{ todayString }}</span>
            <h3 class="font-bricolage text-h-42 md:text-h-68 text-ink">Shukla Tritiya · Vrishabha Masa</h3>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-ink/10">
            <div class="flex flex-col gap-2">
              <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">NAKSHATRA</span>
              <span class="font-inter text-h-16 text-ink font-medium">Rohini</span>
              <span class="font-inter text-h-10 text-ink-3">Ends at 04:30 PM</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">YOGA</span>
              <span class="font-inter text-h-16 text-ink font-medium">Sukarma</span>
              <span class="font-inter text-h-10 text-ink-3">Ends at 11:15 AM</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">KARANA</span>
              <span class="font-inter text-h-16 text-ink font-medium">Taitila</span>
              <span class="font-inter text-h-10 text-ink-3">Ends at 02:45 PM</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">MUHURTHAM</span>
              <span class="font-inter text-h-16 text-ink font-medium">Abhijit</span>
              <span class="font-inter text-h-10 text-ink-3">11:58 AM - 12:50 PM</span>
            </div>
          </div>
        </div>
      </div>
    </SectionBand>

    <!-- Upcoming Festivals -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg" number="02" label="UPCOMING FESTIVALS" subtitle="NEXT 30 DAYS" position="02 / 03">
      <div class="flex flex-col gap-12 pt-12 md:pt-16">
        <div class="flex flex-col">
          <div 
            v-for="fest in mockFestivals" 
            :key="fest.name"
            class="flex flex-col md:flex-row md:items-center min-h-[100px] py-6 border-b border-ink/10 gap-4 hover:bg-ink/5 px-4 -mx-4 transition-colors"
          >
            <div class="w-full md:w-[120px] font-bricolage text-h-16 text-accent shrink-0">
              {{ fest.date }}
            </div>
            <div class="w-full md:w-[300px] font-bricolage text-h-26 text-ink shrink-0">
              {{ fest.name }}
            </div>
            <div class="w-full font-inter text-h-16 text-ink-3">
              {{ fest.desc }}
            </div>
            <div class="ml-auto mt-2 md:mt-0 flex shrink-0 items-center gap-2 font-inter font-semibold text-sm text-ink hover:text-accent transition-colors whitespace-nowrap">
              <span>Read more</span>
              <span aria-hidden="true">→</span>
            </div>
          </div>
        </div>
      </div>
    </SectionBand>

    <!-- Regional Variance -->
    <SectionBand padTop="xl" padBottom="xl" theme="paper" number="03" label="REGIONAL VARIANCE" subtitle="WHY DATES MAY DIFFER" position="03 / 03">
      <div class="flex flex-col gap-12 pt-12 md:pt-16">
        <div class="flex flex-col gap-8 max-w-[800px]">
          <h3 class="font-bricolage text-h-42 md:text-h-68 text-ink leading-[0.95] tracking-[-0.03em]">
            Why our calendar may<br>differ from another's.
          </h3>
          <p class="font-inter text-h-26 text-ink-3 leading-[1.4]">
            We use Drik Ganitha — astronomical calculation against your location. Some families and regions follow Vakya Panchangam, which uses traditional tables. The dates can differ by a day. Both are valid. We make our system explicit so you can compare.
          </p>
        </div>
      </div>
    </SectionBand>

  </div>
</template>
