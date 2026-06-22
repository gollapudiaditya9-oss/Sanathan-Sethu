<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePurohits } from '~/composables/usePurohits'
import SectionBand from '~/components/ui/SectionBand.vue'
import ThreeScriptEyebrow from '~/components/page-blocks/ThreeScriptEyebrow.vue'
import DirectoryRow from '~/components/page-blocks/DirectoryRow.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

const { getPurohits } = usePurohits()
const purohits = getPurohits()

const filters = ['All twelve', 'Muhurtham', 'Vivaha', 'Griha Pravesh', 'Hyderabad']
const activeFilter = ref('All twelve')

const filteredPurohits = computed(() => {
  if (activeFilter.value === 'All twelve') return purohits
  return purohits.filter(p => 
    p.specialties.includes(activeFilter.value) || 
    p.city === activeFilter.value
  )
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionBand padTop="xl" padBottom="lg" theme="bg">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <div class="flex flex-col gap-8">
          <ThreeScriptEyebrow english="PUROHITS" sanskrit="पुरोहिताः" telugu="పురోహితులు" theme="dark" />
          <h1 class="font-bricolage text-h-68 md:text-h-92 text-ink">
            Verified Purohits.<br>Named lineages.
          </h1>
          <p class="font-inter text-h-26 text-ink-3 max-w-[600px]">
            Twelve Purohits onboarded. Each interviewed in person. References checked. Lineage and patasala documented.
          </p>
        </div>
        
        <div class="flex flex-col lg:items-end justify-end">
          <div class="flex flex-wrap gap-2 max-w-[400px]">
            <button 
              v-for="filter in filters" 
              :key="filter"
              @click="activeFilter = filter"
              class="px-4 py-2 rounded-full font-inter text-h-16 border transition-colors"
              :class="activeFilter === filter ? 'bg-ink text-paper border-ink' : 'bg-transparent text-ink-3 border-ink/20 hover:border-ink/50'"
            >
              {{ filter }}
            </button>
          </div>
        </div>
      </div>
    </SectionBand>

    <!-- Purohits List -->
    <SectionBand padTop="xl" padBottom="xl" theme="paper" number="01" label="ALL TWELVE PUROHITS" subtitle="IN-PERSON VERIFIED" position="01 / 02">
      <div class="flex flex-col gap-12">
        <div class="border-t border-ink/10 flex flex-col">
          <DirectoryRow 
            v-for="(purohit, index) in filteredPurohits" 
            :key="purohit.slug"
            :number="String(index + 1).padStart(2, '0')"
            :name="purohit.name"
            :lineage="purohit.lineage"
            :specialty="purohit.specialties.join(', ')"
            :location="purohit.city"
            :years="purohit.years_of_service"
            :to="`/purohits/${purohit.slug}`"
          />
          
          <div v-if="filteredPurohits.length === 0" class="py-12 text-center">
            <p class="font-inter text-h-16 text-ink-3">No Purohits found matching this filter.</p>
          </div>
        </div>
      </div>
    </SectionBand>

    <!-- Dark Verification Band -->
    <div class="bg-ink py-24 px-8 md:px-14 flex flex-col items-center text-center gap-8">
      <span class="font-bricolage text-h-16 text-accent tracking-[0.14em]">HOW WE VERIFY</span>
      <h2 class="font-bricolage text-h-68 text-paper">
        Twelve Purohits.<br>Five checks each.
      </h2>
      <p class="font-inter text-h-26 text-paper/70 max-w-[800px]">
        Outreach by lineage. Intake form. References checked. In-person interview at their patasala or home. Trial work observed.
      </p>
      <div class="mt-4">
        <!-- Using a custom style for the button to match the 'accent' background requirement on dark mode -->
        <NuxtLink to="/verification" class="inline-flex items-center justify-center h-[60px] px-8 bg-accent text-paper font-bricolage font-medium text-h-16 rounded-[4px] hover:opacity-90 transition-opacity">
          Read the verification charter
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
