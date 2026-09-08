<script setup lang="ts">
import SectionBand from '~/components/ui/SectionBand.vue'
import ThreeScriptEyebrow from '~/components/page-blocks/ThreeScriptEyebrow.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

const todayParts = getHyderabadToday()
const today = new Date(Date.UTC(todayParts.year, todayParts.month, todayParts.day))
const todayPanchang = getPanchangForDate(todayParts.year, todayParts.month, todayParts.day)
const upcomingFestivals = getUpcomingPanchangFestivals(todayParts.year, todayParts.month, todayParts.day)
const todayString = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC'
}).format(today)
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg">
      <div class="flex flex-col gap-8 ">
        <ThreeScriptEyebrow english="CALENDAR" sanskrit="पञ्चाङ्गम्" telugu="పంచాంగం" theme="dark" />
        <h1 class="font-bricolage text-h-68 md:text-h-92 text-ink leading-[0.95] tracking-[-0.03em]">
          The calendar<br>your family follows.
        </h1>
        <p class="font-inter text-h-26 text-ink-3 ">
          Tithis, festivals, regional observances. Calculated using Drik Ganitha against your location. Free for everyone, forever.
        </p>
        <div class="mt-4">
          <ButtonLarge label="Open the calendar" to="/calendar/grid" />
        </div>
      </div>
    </SectionBand>

    <!-- Today Card -->
    <SectionBand padTop="xl" padBottom="xl" theme="paper" number="01" label="TODAY" subtitle="HYDERABAD" position="01 / 03">
      <div class="flex flex-col gap-12 pt-12 md:pt-16">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="font-inter text-h-16 text-accent uppercase tracking-widest">{{ todayString }}</span>
            <h2 class="font-bricolage text-h-42 md:text-h-68 text-ink">{{ todayPanchang.tithi }} · {{ todayPanchang.paksha }} Paksha</h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-ink/10">
            <div class="flex flex-col gap-2">
              <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">NAKSHATRA</span>
              <span class="font-inter text-h-16 text-ink font-medium">{{ todayPanchang.nakshatra }}</span>
              <span class="font-inter text-h-10 text-ink-3">Ends {{ todayPanchang.nakshatraEnds }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">YOGA</span>
              <span class="font-inter text-h-16 text-ink font-medium">{{ todayPanchang.yoga }}</span>
              <span class="font-inter text-h-10 text-ink-3">Ends {{ todayPanchang.yogaEnds }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">KARANA</span>
              <span class="font-inter text-h-16 text-ink font-medium">{{ todayPanchang.karana }}</span>
              <span class="font-inter text-h-10 text-ink-3">At sunrise in Hyderabad</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">MUHURTHAM</span>
              <span class="font-inter text-h-16 text-ink font-medium">{{ todayPanchang.abhijitMuhurta }}</span>
              <span class="font-inter text-h-10 text-ink-3">Abhijit Muhurta · IST</span>
            </div>
          </div>
        </div>
      </div>
    </SectionBand>

    <!-- Upcoming Festivals -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg" number="02" label="UPCOMING FESTIVALS" subtitle="NEXT 30 DAYS" position="02 / 03">
      <div class="flex flex-col gap-12 pt-12 md:pt-16">
        <div class="flex flex-col border-t border-ink/10">
          <article v-for="festival in upcomingFestivals" :key="`${festival.date.toISOString()}-${festival.name}`" class="grid gap-3 border-b border-ink/10 py-8 md:grid-cols-[120px_1fr] md:gap-8">
            <time :datetime="festival.date.toISOString().slice(0, 10)" class="font-inter text-h-16 font-semibold text-accent">{{ festival.dateLabel }}</time>
            <div class="flex flex-col gap-2">
              <h3 class="font-bricolage text-h-26 text-ink">{{ festival.name }}</h3>
              <p v-if="festival.description" class="font-inter text-h-16 leading-relaxed text-ink-3">{{ festival.description }}</p>
              <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">{{ festival.category }}</span>
            </div>
          </article>
        </div>
      </div>
    </SectionBand>

    <!-- Regional Variance -->
    <SectionBand padTop="xl" padBottom="xl" theme="paper" number="03" label="REGIONAL VARIANCE" subtitle="WHY DATES MAY DIFFER" position="03 / 03">
      <div class="flex flex-col gap-12 pt-12 md:pt-16">
        <div class="flex flex-col gap-8 ">
          <h2 class="font-bricolage text-h-42 md:text-h-68 text-ink leading-[0.95] tracking-[-0.03em]">
            Why our calendar may<br>differ from another's.
          </h2>
          <p class="font-inter text-h-26 text-ink-3 leading-[1.4]">
            We use Drik Ganitha — astronomical calculation against your location. Some families and regions follow Vakya Panchangam, which uses traditional tables. The dates can differ by a day. Both are valid. We make our system explicit so you can compare.
          </p>
        </div>
      </div>
    </SectionBand>

  </div>
</template>
