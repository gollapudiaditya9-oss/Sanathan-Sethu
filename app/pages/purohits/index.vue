<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePurohits } from '~/composables/usePurohits'
import SectionBand from '~/components/ui/SectionBand.vue'
import ThreeScriptEyebrow from '~/components/page-blocks/ThreeScriptEyebrow.vue'
import DirectoryRow from '~/components/page-blocks/DirectoryRow.vue'

const { getPurohits } = usePurohits()
const purohits = getPurohits()

const searchQuery = ref('')
const selectedRitual = ref('')
const selectedCity = ref('')
const selectedLanguage = ref('')
const selectedFormat = ref('')
const minimumYears = ref(0)
const sortBy = ref('recommended')
const filtersOpen = ref(false)

const ritualOptions = computed(() => [...new Set(purohits.flatMap(purohit => purohit.specialties))].sort())
const cityOptions = computed(() => [...new Set(purohits.map(purohit => purohit.city))].sort())
const languageOptions = computed(() => [...new Set(purohits.flatMap(purohit => purohit.languages))].sort())

const engagementFormats = [
  { value: 'single-ritual', label: 'Single ritual' },
  { value: 'phone-consultation', label: 'Phone consultation' },
  { value: 'recurring', label: 'Recurring rituals' }
]

const activeFilterCount = computed(() => [
  selectedRitual.value,
  selectedCity.value,
  selectedLanguage.value,
  selectedFormat.value,
  minimumYears.value > 0
].filter(Boolean).length)

const hasFilters = computed(() => searchQuery.value.trim().length > 0 || activeFilterCount.value > 0 || sortBy.value !== 'recommended')

const filteredPurohits = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()
  const matches = purohits.filter((purohit) => {
    const searchableText = [
      purohit.name,
      purohit.lineage,
      purohit.patasala,
      purohit.city,
      ...purohit.specialties,
      ...purohit.languages
    ].join(' ').toLocaleLowerCase()

    return (!query || searchableText.includes(query))
      && (!selectedRitual.value || purohit.specialties.includes(selectedRitual.value))
      && (!selectedCity.value || purohit.city === selectedCity.value)
      && (!selectedLanguage.value || purohit.languages.includes(selectedLanguage.value))
      && (!selectedFormat.value || purohit.engagement_formats.includes(selectedFormat.value))
      && purohit.years_of_service >= minimumYears.value
  })

  if (sortBy.value === 'experience-high') return [...matches].sort((a, b) => b.years_of_service - a.years_of_service)
  if (sortBy.value === 'experience-low') return [...matches].sort((a, b) => a.years_of_service - b.years_of_service)
  if (sortBy.value === 'name') return [...matches].sort((a, b) => a.name.localeCompare(b.name))
  return matches
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedRitual.value = ''
  selectedCity.value = ''
  selectedLanguage.value = ''
  selectedFormat.value = ''
  minimumYears.value = 0
  sortBy.value = 'recommended'
}
</script>

<template>
  <div>
    <SectionBand pad-top="xl" pad-bottom="lg" theme="bg">
      <div class="flex  flex-col gap-8">
        <ThreeScriptEyebrow english="PUROHITS" sanskrit="पुरोहिताः" telugu="పురోహితులు" tone="accent" />
        <h1 class="font-bricolage text-h-68 leading-[1.04] text-ink md:text-h-92">
          Verified Purohits.<br>Named lineages.
        </h1>
        <p class="font-inter text-h-26 text-ink-3">
          Twelve Purohits onboarded. Each interviewed in person. References checked. Lineage and patasala documented.
        </p>
      </div>
    </SectionBand>

    <section class="border-y border-ink/10 bg-paper" aria-label="Search and filter Purohits">
      <div class="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-14">
        <div class="flex flex-col gap-4">
          <label for="purohit-search" class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">Search the directory</label>
          <div class="flex flex-col gap-3 sm:flex-row">
            <div class="flex min-h-[56px] min-w-0 flex-1 items-center rounded-lg border border-ink bg-paper focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink">
              <svg class="ml-4 h-5 w-5 shrink-0 text-ink-3" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input id="purohit-search" v-model="searchQuery" type="search" placeholder="Name, ritual, lineage or city" class="min-w-0 flex-1 bg-transparent px-4 py-4 font-inter text-h-16 font-medium text-ink placeholder:font-normal placeholder:text-ink-3 focus:outline-none">
            </div>
            <button type="button" class="inline-flex min-h-[56px] shrink-0 items-center justify-center rounded-lg border border-ink bg-ink px-6 font-inter text-h-16 font-semibold text-paper transition-colors hover:bg-ink-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" :aria-expanded="filtersOpen" aria-controls="advanced-purohit-filters" @click="filtersOpen = !filtersOpen">
              <span>{{ filtersOpen ? 'Close filters' : 'Filters' }}</span>
              <span v-if="activeFilterCount" class="ml-3 rounded-full bg-paper px-2 py-1 text-h-10 text-ink">{{ activeFilterCount }}</span>
              <span v-else class="ml-3" aria-hidden="true">+</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <div v-show="filtersOpen" id="advanced-purohit-filters" class="border-y border-ink bg-paper">
      <div class="mx-auto flex w-full  flex-col gap-8 px-6 py-8 lg:px-14">
        <div class="flex items-start justify-between gap-8">
          <div class="flex flex-col gap-1">
            <h2 class="font-bricolage text-h-26 text-ink">Refine your search</h2>
            <p class="font-inter text-h-16 text-ink-3">Choose one or more filters. Results update immediately.</p>
          </div>
          <button v-if="hasFilters" type="button" class="min-h-[44px] shrink-0 font-inter text-h-16 font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" @click="clearFilters">Clear all</button>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <label class="flex flex-col gap-2 font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">
            Ritual or service
            <span class="relative">
              <select v-model="selectedRitual" class="filter-select"><option value="">Any ritual</option><option v-for="ritual in ritualOptions" :key="ritual" :value="ritual">{{ ritual }}</option></select>
              <span class="select-arrow" aria-hidden="true">↓</span>
            </span>
          </label>
          <label class="filter-label">Location<span class="relative"><select v-model="selectedCity" class="filter-select"><option value="">Any city</option><option v-for="city in cityOptions" :key="city" :value="city">{{ city }}</option></select><span class="select-arrow" aria-hidden="true">↓</span></span></label>
          <label class="filter-label">Language<span class="relative"><select v-model="selectedLanguage" class="filter-select"><option value="">Any language</option><option v-for="language in languageOptions" :key="language" :value="language">{{ language }}</option></select><span class="select-arrow" aria-hidden="true">↓</span></span></label>
          <label class="filter-label">Engagement type<span class="relative"><select v-model="selectedFormat" class="filter-select"><option value="">Any engagement</option><option v-for="format in engagementFormats" :key="format.value" :value="format.value">{{ format.label }}</option></select><span class="select-arrow" aria-hidden="true">↓</span></span></label>
          <label class="filter-label">Minimum experience<span class="relative"><select v-model.number="minimumYears" class="filter-select"><option :value="0">Any experience</option><option :value="10">10+ years</option><option :value="15">15+ years</option><option :value="20">20+ years</option></select><span class="select-arrow" aria-hidden="true">↓</span></span></label>
          <label class="filter-label">Sort results<span class="relative"><select v-model="sortBy" class="filter-select"><option value="recommended">Recommended order</option><option value="experience-high">Most experienced</option><option value="experience-low">Least experienced</option><option value="name">Name A–Z</option></select><span class="select-arrow" aria-hidden="true">↓</span></span></label>
        </div>

        <p class="font-inter text-h-16 font-semibold text-ink" aria-live="polite">{{ filteredPurohits.length }} {{ filteredPurohits.length === 1 ? 'match' : 'matches' }}</p>
      </div>
    </div>

    <SectionBand pad-top="none" pad-bottom="xl" theme="paper">
      <div class="flex flex-col gap-12">
        <div class="flex flex-col border-t border-ink/10">
          <div class="hidden min-h-[64px] items-center border-b border-ink/20 bg-bg px-14 font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3 md:flex" aria-hidden="true">
            <div class="w-[56px] shrink-0">No.</div>
            <div class="w-[360px] shrink-0">Purohit &amp; lineage</div>
            <div class="w-[280px] shrink-0">Specialties</div>
            <div class="w-[160px] shrink-0">Location</div>
            <div class="w-[120px] shrink-0">Experience</div>
            <div class="ml-auto text-right">Profile</div>
          </div>
          <DirectoryRow v-for="(purohit, index) in filteredPurohits" :key="purohit.slug" :number="String(index + 1).padStart(2, '0')" :name="purohit.name" :lineage="purohit.lineage" :specialty="purohit.specialties.join(', ')" :location="purohit.city" :years="purohit.years_of_service" :to="`/purohits/${purohit.slug}`" />

          <div v-if="filteredPurohits.length === 0" class="flex flex-col items-center gap-6 py-24 text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 font-bricolage text-h-26 text-ink-3" aria-hidden="true">0</div>
            <div class="flex flex-col gap-2">
              <h2 class="font-bricolage text-h-26 text-ink">No Purohits match these filters.</h2>
              <p class="font-inter text-h-16 text-ink-3">Try another city or ritual, or clear the search to see everyone.</p>
            </div>
            <button type="button" class="min-h-[44px] rounded-lg bg-ink px-5 py-3 font-inter text-h-16 font-semibold text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" @click="clearFilters">Clear all filters</button>
          </div>
        </div>
      </div>
    </SectionBand>

    <div class="flex flex-col items-center gap-8 bg-ink px-8 py-24 text-center md:px-14">
      <span class="font-bricolage text-h-16 tracking-[0.14em] text-accent">HOW WE VERIFY</span>
      <h2 class="font-bricolage text-h-68 text-paper">Twelve Purohits.<br>Five checks each.</h2>
      <p class="font-inter text-h-26 text-paper/70">Outreach by lineage. Intake form. References checked. In-person interview at their patasala or home. Trial work observed.</p>
      <div class="mt-4"><NuxtLink to="/verification" class="inline-flex h-[60px] items-center justify-center rounded-[4px] bg-accent px-8 font-bricolage text-h-16 font-medium text-paper transition-opacity hover:opacity-90">Read the verification charter</NuxtLink></div>
    </div>
  </div>
</template>

<style scoped>
.filter-label {
  @apply flex flex-col gap-2 font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3;
}

.filter-select {
  @apply min-h-[48px] w-full appearance-none rounded-lg border border-ink-3 bg-paper px-4 py-3 pr-10 font-inter text-h-16 font-medium normal-case tracking-normal text-ink focus:border-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink;
}

.select-arrow {
  @apply pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-h-16 text-ink-3;
}
</style>
