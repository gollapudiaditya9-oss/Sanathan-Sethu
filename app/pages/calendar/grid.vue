<script setup lang="ts">
import { ref } from 'vue'
import SectionBand from '~/components/ui/SectionBand.vue'
import DarkBand from '~/components/page-blocks/DarkBand.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import ThreeScriptEyebrow from '~/components/page-blocks/ThreeScriptEyebrow.vue'
import { useRouter } from '#imports'

const router = useRouter()

// Mocking calendar state
const currentMonth = ref('May 2026')
const selectedDate = ref(14)

const prevMonth = () => alert("Previous month functionality coming soon.")
const nextMonth = () => alert("Next month functionality coming soon.")
const goToday = () => { selectedDate.value = 14; currentMonth.value = 'May 2026' }
</script>

<template>
  <div class="bg-bg min-h-screen">
    
    <!-- Header Hero -->
    <div class="mx-auto w-full max-w-[1440px] px-6 md:px-14 py-16 md:py-24">
      <div class="flex justify-between items-start">
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
        
        <div class="hidden md:flex items-center gap-2">
          <button @click="prevMonth" class="px-5 py-2.5 rounded-lg border border-ink/20 font-inter font-semibold text-[14px] text-ink hover:bg-ink/5 transition-colors">&larr; April</button>
          <button @click="goToday" class="px-5 py-2.5 rounded-lg border border-ink/20 font-inter font-semibold text-[14px] text-ink hover:bg-ink/5 transition-colors">Today</button>
          <button @click="nextMonth" class="px-5 py-2.5 rounded-lg border border-ink/20 font-inter font-semibold text-[14px] text-ink hover:bg-ink/5 transition-colors">June &rarr;</button>
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
          <span class="font-inter font-semibold text-h-16 text-ink">Vishavasu</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">AYANA</span>
          <span class="font-inter font-semibold text-h-16 text-ink">Uttarayana</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">RITU</span>
          <span class="font-inter font-semibold text-h-16 text-ink">Grishma</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">MASA</span>
          <span class="font-inter font-semibold text-h-16 text-ink">Vaishakha-Jyeshtha</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">LOCATION</span>
          <span class="font-inter font-semibold text-h-16 text-ink">Hyderabad</span>
        </div>
      </div>
    </div>

    <!-- The Month Grid -->
    <SectionBand padTop="none" padBottom="none" theme="bg" number="01" label="THE MONTH" subtitle="TITHIS, FESTIVALS, MUHURTHAMS" position="01 / 03" />
    <div class="mx-auto w-full max-w-[1440px] px-6 md:px-14 py-12">
      <div class="w-full border-t border-l border-ink/20 flex flex-col">
        <!-- Days Header -->
        <div class="grid grid-cols-7 border-b border-ink/20 bg-bg">
          <div v-for="day in ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']" :key="day" class="p-4 border-r border-ink/20 font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">
            {{ day }}
          </div>
        </div>
        
        <!-- Grid Cells -->
        <div class="grid grid-cols-7 border-b border-ink/20">
          <!-- Empty April Days -->
          <div v-for="i in 4" :key="`emp-${i}`" class="border-r border-ink/20 min-h-[140px] md:min-h-[180px] bg-paper"></div>
          
          <!-- May Days -->
          <div v-for="i in 31" :key="i" 
            @click="selectedDate = i"
            class="border-r border-ink/20 border-b border-ink/20 min-h-[140px] md:min-h-[180px] p-4 flex flex-col items-start justify-start cursor-pointer transition-colors relative"
            :class="[
              selectedDate === i ? 'bg-ink text-paper' : 'bg-bg hover:bg-ink/5',
              i === 20 ? 'bg-ink text-paper' : ''
            ]"
          >
            <span class="font-bricolage text-h-26" :class="[selectedDate === i || i === 20 ? 'text-paper' : 'text-ink']">{{ i }}</span>
            
            <div v-if="i === 4" class="mt-auto text-[10px] font-inter text-accent uppercase tracking-widest mt-2">Akshaya Tritiya</div>
            <div v-if="i === 6" class="mt-auto text-[10px] font-inter text-ink-3 uppercase tracking-widest mt-2">&middot; Muhurtham</div>
            <div v-if="i === 8" class="mt-auto text-[10px] font-inter text-ink-3 uppercase tracking-widest mt-2">&middot; Muhurtham</div>
            <div v-if="i === 12" class="mt-auto text-[10px] font-inter text-accent uppercase tracking-widest mt-2">Mohini Ekadashi</div>
            <div v-if="i === 14" class="mt-auto text-[10px] font-inter text-ink-3 uppercase tracking-widest mt-2">&middot; Muhurtham</div>
            <div v-if="i === 16" class="mt-auto text-[10px] font-inter text-ink-3 uppercase tracking-widest mt-2">&middot; Muhurtham</div>
            <div v-if="i === 19" class="mt-auto text-[10px] font-inter text-ink-3 uppercase tracking-widest mt-2">&middot; Muhurtham</div>
            <div v-if="i === 22" class="mt-auto text-[10px] font-inter text-accent uppercase tracking-widest mt-2">Buddha Purnima</div>
            <div v-if="i === 25" class="mt-auto text-[10px] font-inter text-ink-3 uppercase tracking-widest mt-2">&middot; Muhurtham</div>
            <div v-if="i === 27" class="mt-auto text-[10px] font-inter text-accent uppercase tracking-widest mt-2">Vat Savitri Vrata</div>
            <div v-if="i === 28" class="mt-auto text-[10px] font-inter text-ink-3 uppercase tracking-widest mt-2">&middot; Muhurtham</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Today Details -->
    <SectionBand padTop="none" padBottom="none" theme="bg" number="02" label="TODAY" subtitle="WEDNESDAY, MAY 20, 2026" position="02 / 03" />
    <div class="mx-auto w-full max-w-[1440px] px-6 md:px-14 py-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">
      
      <!-- Left Info -->
      <div class="flex flex-col gap-12">
        <div class="flex flex-col gap-2">
          <span class="font-inter font-semibold text-[10px] text-accent uppercase tracking-[0.14em]">TITHI &middot; NAKSHATRA &middot; YOGA</span>
          <h2 class="font-bricolage text-[56px] md:text-h-92 leading-[0.95] tracking-[-0.03em] text-ink">
            Trayodashi.<br>Vishakha.
          </h2>
        </div>

        <div class="flex flex-col border-t border-ink/10 pt-4">
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">SUNRISE</span>
            <span class="font-inter font-semibold text-h-16 text-ink">05:43</span>
          </div>
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">SUNSET</span>
            <span class="font-inter font-semibold text-h-16 text-ink">18:47</span>
          </div>
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">RAHU KALAM</span>
            <span class="font-inter font-semibold text-h-16 text-ink">12:15 &ndash; 13:53</span>
          </div>
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">YAMAGANDAM</span>
            <span class="font-inter font-semibold text-h-16 text-ink">07:22 &ndash; 09:00</span>
          </div>
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">ABHIJIT MUHURTHA</span>
            <span class="font-inter font-semibold text-h-16 text-ink">11:52 &ndash; 12:44</span>
          </div>
          <div class="flex justify-between items-center py-6 border-b border-ink/10">
            <span class="font-inter font-semibold text-[10px] text-ink-3 uppercase tracking-[0.14em]">CHAUGHADIYA</span>
            <span class="font-inter font-semibold text-h-16 text-ink">Shubh &middot; 06:32 - 08:11</span>
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
            <ButtonSmall label="Ask about this date &rarr;" variant="primary" class="w-full justify-center" @click="router.push('/waitlist')" />
            <ButtonSmall label="Find a muhurtham &rarr;" variant="outline" class="w-full justify-center" @click="router.push('/book')" />
          </div>
        </div>
      </div>

    </div>

    <!-- Note on Accuracy -->
    <SectionBand padTop="none" padBottom="none" theme="bg" number="03" label="A NOTE ON ACCURACY" subtitle="REGIONAL VARIANCE" position="03 / 03" />

    <!-- Dark Footer section -->
    <div class="w-full bg-ink py-24 md:py-32 px-6 md:px-14">
      <div class="mx-auto w-full max-w-[1440px] flex flex-col gap-12">
        <span class="font-inter font-semibold text-[10px] text-accent uppercase tracking-[0.14em]">WHAT THIS CALENDAR IS NOT</span>
        <h2 class="font-bricolage text-[56px] md:text-h-92 leading-[0.95] tracking-[-0.03em] text-paper max-w-[800px]">
          This is not a replacement for a Purohit.
        </h2>
        <p class="font-inter text-h-16 text-paper/70 max-w-[600px] leading-relaxed">
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
