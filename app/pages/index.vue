<script setup lang="ts">
import { useRouter } from '#imports'
import ThreeScriptEyebrow from '~/components/page-blocks/ThreeScriptEyebrow.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import SectionBand from '~/components/ui/SectionBand.vue'
import StatusPill from '~/components/ui/StatusPill.vue'
import FormInput from '~/components/ui/FormInput.vue'

const router = useRouter()
</script>

<template>
  <div class="w-full flex flex-col">
    <!-- Hero Section -->
    <div class="mx-auto w-full max-w-[1440px] px-6 md:px-14 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- Left col -->
      <div class="col-span-12 lg:col-span-7 flex flex-col items-start gap-8">
        <ThreeScriptEyebrow english="SANĀTANA SETU" telugu="సనాతన సేతువు" sanskrit="सनातन सेतुः" />
        <h1 class="font-bricolage text-[68px] md:text-[92px] leading-[0.95] tracking-[-0.03em] text-ink">
          A bridge between you<br>and the rite.
        </h1>
        <p class="font-inter text-h-26 text-ink-3 max-w-2xl leading-snug">
          Verified Purohits, the right samagri, the right day. For weddings, housewarmings, naming ceremonies, the rites for the departed. Across Andhra Pradesh and Telangana.
        </p>
        <div class="flex flex-wrap items-center gap-4 mt-4">
          <ButtonLarge label="Book a Purohit" @click="router.push('/book/choose-ritual')" />
          <ButtonLarge variant="outline" label="Browse 12 Purohits" @click="router.push('/purohits')" />
        </div>
      </div>
      <!-- Right col Stats -->
      <div class="col-span-12 lg:col-span-5 flex flex-col gap-12 mt-12 lg:mt-0 lg:pl-16 lg:border-l border-ink/10">
         <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-68 leading-none text-ink">12</span>
            <span class="font-inter text-h-10 text-accent uppercase tracking-[0.14em] font-semibold">PUROHITS &middot; IN-PERSON VERIFIED</span>
         </div>
         <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-68 leading-none text-ink">4 hr</span>
            <span class="font-inter text-h-10 text-accent uppercase tracking-[0.14em] font-semibold">ANTYESHTI CALLBACK &middot; 24/7</span>
         </div>
         <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-68 leading-none text-ink">0%</span>
            <span class="font-inter text-h-10 text-accent uppercase tracking-[0.14em] font-semibold">PLATFORM COMMISSION &middot; NO HIDDEN FEES</span>
         </div>
      </div>
    </div>

    <!-- Photographic dark band -->
    <div class="w-full bg-ink-2 h-[480px] flex items-center justify-center px-6 border-y border-ink/10">
      <div class="flex flex-col items-center gap-4 text-paper/50">
        <span class="font-bricolage text-h-26">Sanatana Setu</span>
        <span class="font-inter text-h-10 tracking-[0.14em] uppercase">Placeholder Graphic</span>
      </div>
    </div>

    <!-- Devotees Section -->
    <SectionBand number="01" label="WHAT YOU CAN DO" subtitle="FOUR THINGS" position="01 / 03" />
    <div class="mx-auto w-full max-w-[1440px] px-6 md:px-14 mt-16 mb-24">
      <h2 class="font-bricolage text-h-68 text-ink mb-16 tracking-[-0.03em] leading-none">For devotees and families.</h2>
      
      <div class="flex flex-col border-t border-ink/10">
        <!-- Row 01 -->
        <div class="flex flex-col sm:flex-row sm:items-center h-auto sm:h-[140px] py-8 sm:py-0 border-b border-ink/10 gap-4 sm:gap-6">
          <span class="w-[56px] font-inter font-semibold text-h-16 text-ink shrink-0">01</span>
          <span class="w-full sm:w-[320px] font-bricolage text-h-42 text-ink leading-[1.1] shrink-0">Book a Purohit for a ritual</span>
          <span class="flex-1 font-inter text-h-16 text-ink-3 min-w-[200px]">Wedding, Griha Pravesh, Antyeshti, Upanayanam, daily rituals. A verified Purohit, the right samagri, the right day.</span>
          <div class="w-[140px] shrink-0 flex items-center mt-4 sm:mt-0">
            <StatusPill status="LIVE" />
          </div>
          <div class="w-[200px] shrink-0 mt-4 sm:mt-0 flex justify-start">
            <ButtonSmall variant="outline" label="Browse Purohits" class="w-full justify-center" @click="router.push('/purohits')" />
          </div>
        </div>
        
        <!-- Row 02 -->
        <div class="flex flex-col sm:flex-row sm:items-center h-auto sm:h-[140px] py-8 sm:py-0 border-b border-ink/10 gap-4 sm:gap-6">
          <span class="w-[56px] font-inter font-semibold text-h-16 text-ink shrink-0">02</span>
          <span class="w-full sm:w-[320px] font-bricolage text-h-42 text-ink leading-[1.1] shrink-0">Ask a verified expert</span>
          <span class="flex-1 font-inter text-h-16 text-ink-3 min-w-[200px]">Jatakam, Muhurtham, Vaastu, scriptural questions. A 30-minute phone call or a written report — you choose.</span>
          <div class="w-[140px] shrink-0 flex items-center mt-4 sm:mt-0">
            <StatusPill status="LIVE" />
          </div>
          <div class="w-[200px] shrink-0 mt-4 sm:mt-0 flex justify-start">
            <ButtonSmall variant="outline" label="Ask a question" class="w-full justify-center" @click="router.push('/waitlist')" />
          </div>
        </div>

        <!-- Row 03 -->
        <div class="flex flex-col sm:flex-row sm:items-center h-auto sm:h-[140px] py-8 sm:py-0 border-b border-ink/10 gap-4 sm:gap-6">
          <span class="w-[56px] font-inter font-semibold text-h-16 text-ink shrink-0">03</span>
          <span class="w-full sm:w-[320px] font-bricolage text-h-42 text-ink leading-[1.1] shrink-0">Read the calendar</span>
          <span class="flex-1 font-inter text-h-16 text-ink-3 min-w-[200px]">Tithis, festivals, regional observances, and auspicious dates — calculated using the Drik Ganitha system.</span>
          <div class="w-[140px] shrink-0 flex items-center mt-4 sm:mt-0">
            <StatusPill status="LIVE" />
          </div>
          <div class="w-[200px] shrink-0 mt-4 sm:mt-0 flex justify-start">
            <ButtonSmall variant="outline" label="Open the calendar" class="w-full justify-center" @click="router.push('/calendar')" />
          </div>
        </div>

        <!-- Row 04 -->
        <div class="flex flex-col sm:flex-row sm:items-center h-auto sm:h-[140px] py-8 sm:py-0 border-b border-ink/10 gap-4 sm:gap-6 opacity-50">
          <span class="w-[56px] font-inter font-semibold text-h-16 text-ink shrink-0">04</span>
          <span class="w-full sm:w-[320px] font-bricolage text-h-42 text-ink leading-[1.1] shrink-0">The library</span>
          <span class="flex-1 font-inter text-h-16 text-ink-3 min-w-[200px]">Slokas by theme. Pravachanams from named gurus. The Vedas and Upanishads with citations.</span>
          <div class="w-[140px] shrink-0 flex items-center mt-4 sm:mt-0">
            <StatusPill status="OPENS Q3 2026" />
          </div>
          <div class="w-[200px] shrink-0 mt-4 sm:mt-0 flex justify-start">
            <ButtonSmall variant="outline" label="Notify me" class="w-full justify-center" @click="router.push('/waitlist')" />
          </div>
        </div>
      </div>
    </div>


    <!-- Partners Section -->
    <SectionBand number="02" label="WHO WE WORK WITH" subtitle="FOUR ARCHETYPES" position="02 / 03" />
    <div class="mx-auto w-full max-w-[1440px] px-6 md:px-14 mt-16 mb-24">
      <h2 class="font-bricolage text-h-68 text-ink mb-16 tracking-[-0.03em] leading-none">For Purohits, consultants,<br>and businesses.</h2>
      
      <div class="flex flex-col border-t border-ink/10">
        <!-- Row 01 -->
        <div class="flex flex-col sm:flex-row sm:items-center h-auto sm:h-[140px] py-8 sm:py-0 border-b border-ink/10 gap-4 sm:gap-6">
          <span class="w-[56px] font-inter font-semibold text-h-16 text-ink shrink-0">01</span>
          <span class="w-full sm:w-[320px] font-bricolage text-h-42 text-ink leading-[1.1] shrink-0">Purohit</span>
          <span class="flex-1 font-inter text-h-16 text-ink-3 min-w-[200px]">Lineage-led, full-time. Bookings managed for you, samagri handled, dakshina between you and the family.</span>
          <div class="w-[140px] shrink-0 flex items-center mt-4 sm:mt-0">
            <StatusPill status="OPEN" />
          </div>
          <div class="w-[200px] shrink-0 mt-4 sm:mt-0 flex justify-start">
            <ButtonSmall variant="outline" label="Apply" class="w-full justify-center" @click="router.push('/waitlist')" />
          </div>
        </div>
        
        <!-- Row 02 -->
        <div class="flex flex-col sm:flex-row sm:items-center h-auto sm:h-[140px] py-8 sm:py-0 border-b border-ink/10 gap-4 sm:gap-6">
          <span class="w-[56px] font-inter font-semibold text-h-16 text-ink shrink-0">02</span>
          <span class="w-full sm:w-[320px] font-bricolage text-h-42 text-ink leading-[1.1] shrink-0">Consultant</span>
          <span class="flex-1 font-inter text-h-16 text-ink-3 min-w-[200px]">Astrologers, Jyotishis, Vaastu experts. Take written or phone-call work on your schedule.</span>
          <div class="w-[140px] shrink-0 flex items-center mt-4 sm:mt-0">
            <StatusPill status="OPEN" />
          </div>
          <div class="w-[200px] shrink-0 mt-4 sm:mt-0 flex justify-start">
            <ButtonSmall variant="outline" label="Apply" class="w-full justify-center" @click="router.push('/waitlist')" />
          </div>
        </div>

        <!-- Row 03 -->
        <div class="flex flex-col sm:flex-row sm:items-center h-auto sm:h-[140px] py-8 sm:py-0 border-b border-ink/10 gap-4 sm:gap-6">
          <span class="w-[56px] font-inter font-semibold text-h-16 text-ink shrink-0">03</span>
          <span class="w-full sm:w-[320px] font-bricolage text-h-42 text-ink leading-[1.1] shrink-0">Caterer</span>
          <span class="flex-1 font-inter text-h-16 text-ink-3 min-w-[200px]">Sattvic catering for ceremonies, prasadam preparation. We send you booking-aligned demand.</span>
          <div class="w-[140px] shrink-0 flex items-center mt-4 sm:mt-0">
            <StatusPill status="OPEN" />
          </div>
          <div class="w-[200px] shrink-0 mt-4 sm:mt-0 flex justify-start">
            <ButtonSmall variant="outline" label="Apply" class="w-full justify-center" @click="router.push('/waitlist')" />
          </div>
        </div>

        <!-- Row 04 -->
        <div class="flex flex-col sm:flex-row sm:items-center h-auto sm:h-[140px] py-8 sm:py-0 border-b border-ink/10 gap-4 sm:gap-6">
          <span class="w-[56px] font-inter font-semibold text-h-16 text-ink shrink-0">04</span>
          <span class="w-full sm:w-[320px] font-bricolage text-h-42 text-ink leading-[1.1] shrink-0">Puja Store, Venue, Travel</span>
          <span class="flex-1 font-inter text-h-16 text-ink-3 min-w-[200px]">Samagri suppliers, kalyanamandapams, transport providers. List on the platform.</span>
          <div class="w-[140px] shrink-0 flex items-center mt-4 sm:mt-0">
            <StatusPill status="OPEN" />
          </div>
          <div class="w-[200px] shrink-0 mt-4 sm:mt-0 flex justify-start">
            <ButtonSmall variant="outline" label="Apply" class="w-full justify-center" @click="router.push('/waitlist')" />
          </div>
        </div>
      </div>
    </div>

    <!-- Institutions Card -->
    <div class="mx-auto w-full max-w-[1440px] px-6 md:px-14 mb-24">
      <div class="w-full bg-ink p-12 md:p-24 flex flex-col lg:flex-row gap-16 items-start justify-between rounded-lg">
        <div class="max-w-xl flex flex-col gap-6">
          <span class="font-inter text-h-10 text-accent uppercase tracking-[0.14em] font-semibold">FOR INSTITUTIONS</span>
          <h2 class="font-bricolage text-[56px] md:text-h-68 text-paper leading-[0.95] tracking-[-0.03em]">Temples, gurukuls, and family trusts.</h2>
          <p class="font-inter text-h-16 text-paper/70">Recurring rituals, festival calendars, donor coordination. We will reach out to you.</p>
        </div>
        <div class="w-full max-w-[400px] flex flex-col gap-6 lg:mt-auto">
          <FormInput label="EMAIL" placeholder="you@institution.org" />
          <ButtonLarge label="Notify me &rarr;" @click="router.push('/waitlist')" />
        </div>
      </div>
    </div>

    <!-- Antyeshti Section -->
    <SectionBand number="03" label="IF YOU HAVE LOST SOMEONE" position="03 / 03" tone="solemn" />
    <div class="mx-auto w-full max-w-[1440px] px-6 md:px-14 pb-32 pt-16">
      <div class="max-w-3xl flex flex-col items-start gap-8">
        <h2 class="font-bricolage text-[56px] md:text-h-68 text-ink leading-[0.95] tracking-[-0.03em]">The rites for the departed.</h2>
        <p class="font-inter text-h-16 text-ink-3">
          If you are arranging an Antyeshti, our coordinator will call you within four hours. A verified Purohit reaches you within twelve.
        </p>
        <ButtonLarge label="Request a Purohit &rarr;" variant="solemn" @click="router.push('/antyeshti')" />
      </div>
    </div>

  </div>
</template>
