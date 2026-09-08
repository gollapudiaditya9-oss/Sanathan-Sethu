<script setup lang="ts">
import StatusPill from '~/components/ui/StatusPill.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import FormInput from '~/components/ui/FormInput.vue'
import PhoneInput from '~/components/ui/PhoneInput.vue'
import SectionBand from '~/components/ui/SectionBand.vue'
import ThreeScriptEyebrow from '~/components/page-blocks/ThreeScriptEyebrow.vue'
import ListRow from '~/components/page-blocks/ListRow.vue'
import StatTriplet from '~/components/page-blocks/StatTriplet.vue'
import DarkBand from '~/components/page-blocks/DarkBand.vue'
import PhotoBand from '~/components/page-blocks/PhotoBand.vue'

import { ref } from 'vue'

const testInput = ref('')
const testError = ref('')
</script>

<template>
  <SectionBand padTop="xl" padBottom="xl" class="bg-paper min-h-screen">
    <div class="flex flex-col gap-16  mx-auto">
      <h1 class="font-bricolage text-h-68 text-ink">Design System Dev</h1>
      
      <!-- Typographic Scale -->
      <section class="flex flex-col gap-6">
        <h2 class="font-inter text-h-16 font-bold uppercase tracking-[0.14em] text-ink-3">Typography</h2>
        <div class="flex flex-col gap-4 border border-ink/10 p-8 rounded-lg">
          <p class="font-bricolage text-h-178">h-178</p>
          <p class="font-bricolage text-h-110">h-110</p>
          <p class="font-bricolage text-h-92">h-92</p>
          <p class="font-bricolage text-h-68">h-68</p>
          <p class="font-bricolage text-h-42">h-42 (Bricolage)</p>
          <p class="font-bricolage text-h-26">h-26</p>
          <p class="font-inter text-h-16">h-16</p>
          <p class="font-inter text-h-10 uppercase tracking-[0.14em]">h-10</p>
        </div>
      </section>

      <!-- Status Pills -->
      <section class="flex flex-col gap-6">
        <h2 class="font-inter text-h-16 font-bold uppercase tracking-[0.14em] text-ink-3">Status Pills</h2>
        <div class="flex flex-wrap gap-4 border border-ink/10 p-8 rounded-lg">
          <StatusPill label="Booking Live" tone="live" />
          <StatusPill label="Opens Q3 2026" tone="opens-q3-2026" />
          <StatusPill label="Verified" tone="verified" />
          <StatusPill label="Default" tone="neutral" />
        </div>
      </section>

      <!-- Buttons -->
      <section class="flex flex-col gap-6">
        <h2 class="font-inter text-h-16 font-bold uppercase tracking-[0.14em] text-ink-3">Buttons</h2>
        <div class="flex flex-col gap-8 border border-ink/10 p-8 rounded-lg">
          <div class="flex flex-wrap gap-4 items-center">
            <ButtonSmall label="Book Puja" variant="primary" />
            <ButtonSmall label="Learn More" variant="outline" />
            <ButtonSmall label="View Profile" variant="outline" :iconRight="false" />
          </div>
          <div class="flex flex-wrap gap-4 items-center bg-bg p-8 rounded-lg">
            <ButtonLarge label="Confirm Booking" variant="ink" />
            <ButtonLarge label="Antyeshti Support" variant="solemn" />
          </div>
        </div>
      </section>

      <!-- Form Inputs -->
      <section class="flex flex-col gap-6">
        <h2 class="font-inter text-h-16 font-bold uppercase tracking-[0.14em] text-ink-3">Form Input</h2>
        <div class="flex flex-col gap-8 border border-ink/10 p-8 rounded-lg">
          <FormInput label="Full Name" placeholder="Eg. Ramesh Sharma" v-model="testInput" />
          <PhoneInput label="Phone Number" error="Please enter a valid phone number" />
          <FormInput label="Gotra" helpText="Optional if unknown" />
        </div>
      </section>

      <!-- Page Blocks -->
      <section class="flex flex-col gap-6">
        <h2 class="font-inter text-h-16 font-bold uppercase tracking-[0.14em] text-ink-3">Page Blocks</h2>
        
        <div class="border border-ink/10 p-8 rounded-lg flex flex-col gap-8">
          <div>
            <h3 class="mb-4 font-inter text-h-10 text-ink-3">Three Script Eyebrow</h3>
            <ThreeScriptEyebrow english="Bridging" sanskrit="संयोग" telugu="సంధానం" />
          </div>
          
          <div>
            <h3 class="mb-4 font-inter text-h-10 text-ink-3">List Row</h3>
            <div class="border border-ink/10 rounded-lg overflow-hidden">
              <ListRow 
                title="Satyanarayan Puja" 
                subtitle="Starts from ₹2,100 • 2 Hours"
                statusLabel="Booking Live"
                statusTone="live"
                actionLabel="Book"
                imageSrc="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80"
              />
              <ListRow 
                title="Vivaha Samskara" 
                subtitle="Multi-day • Full team"
                statusLabel="Opens Q3 2026"
                statusTone="opens-q3-2026"
                imageSrc="https://images.unsplash.com/photo-1583089892943-e02e5ee600b5?w=400&q=80"
              />
            </div>
          </div>

          <div>
            <h3 class="mb-4 font-inter text-h-10 text-ink-3">Stat Triplet</h3>
            <StatTriplet 
              :stats="[
                { label: 'Verified Purohits', value: '108+' },
                { label: 'Pujas Completed', value: '1,200+' },
                { label: 'States Covered', value: '4' }
              ]"
            />
          </div>
        </div>
      </section>

    </div>
  </SectionBand>
</template>
