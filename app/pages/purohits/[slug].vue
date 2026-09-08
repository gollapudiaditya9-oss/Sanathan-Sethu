<script setup lang="ts">
import { useRoute, useRouter } from '#imports'
import { usePurohits } from '~/composables/usePurohits'
import SectionBand from '~/components/ui/SectionBand.vue'
import DarkBand from '~/components/page-blocks/DarkBand.vue'
import AccordionRow from '~/components/ui/AccordionRow.vue'
import ConsultationCard from '~/components/page-blocks/ConsultationCard.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import { useBookingState } from '~/composables/useBookingState'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const { getPurohitBySlug } = usePurohits()
const purohit = getPurohitBySlug(slug)
const { bookingState, setConfig, setSelectedPurohit, startProfileBooking } = useBookingState()

// Since we are mocking data, if a user navigates to a non-existent slug, we might not have data.
// In a real app we'd throw a 404, but here we can just show a fallback or error.
if (!purohit) {
  throw createError({ statusCode: 404, statusMessage: 'Purohit Not Found' })
}

const profile = purohit as typeof purohit & Record<string, any>

const publishedValue = (value: unknown, fallback = 'Not yet published') => {
  if (value === null || value === undefined || value === '') return fallback
  if (typeof value === 'string' && value.trim().startsWith('[')) return fallback
  return String(value)
}

const isVerified = computed(() => {
  return profile._status === 'verified' && publishedValue(profile.verified_at, '') !== ''
})

const credentialRows = computed(() => [
  { label: 'Vedam', value: publishedValue(profile.vedam) },
  { label: 'Guru', value: publishedValue(profile.guru) },
  { label: 'Pravara', value: publishedValue(profile.pravara) },
  { label: 'Gotram', value: publishedValue(profile.gotram) },
  { label: 'Patasala', value: publishedValue(profile.patasala) },
  { label: 'Years of practice', value: `${profile.years_of_service} years` },
  { label: 'References', value: publishedValue(profile.references, 'Under review') }
])

const serviceRows = computed(() => {
  if (Array.isArray(profile.services) && profile.services.length) return profile.services

  const advisory = Array.isArray(profile.advisory_list)
    ? profile.advisory_list.filter((item: string) => !item.startsWith('['))
    : []
  const names = advisory.length ? advisory : profile.specialties

  return names.map((name: string) => ({
    name,
    category: 'Ritual',
    duration: 'Confirm before booking'
  }))
})

const recommendations = computed(() => {
  return Array.isArray(profile.recommendations) ? profile.recommendations : []
})

const calendarToday = new Date()
const calendarYear = calendarToday.getUTCFullYear()
const calendarMonth = calendarToday.getUTCMonth()
const calendarLabel = new Intl.DateTimeFormat('en-IN', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
}).format(new Date(Date.UTC(calendarYear, calendarMonth, 1)))
const firstWeekday = (new Date(Date.UTC(calendarYear, calendarMonth, 1)).getUTCDay() + 6) % 7
const daysInMonth = new Date(Date.UTC(calendarYear, calendarMonth + 1, 0)).getUTCDate()
const calendarCells = [
  ...Array.from({ length: firstWeekday }, () => null),
  ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
]
const weekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const availabilityState = (day: number) => {
  if (day < calendarToday.getUTCDate()) return 'past'
  if (profile.availability?.booked_dates?.includes(day)) return 'booked'
  if (profile.availability?.available_dates?.includes(day)) return 'available'

  const hasPublishedAvailability = Array.isArray(profile.availability?.available_dates)
    || Array.isArray(profile.availability?.booked_dates)

  if (!hasPublishedAvailability) {
    const weekday = new Date(Date.UTC(calendarYear, calendarMonth, day)).getUTCDay()
    if (weekday >= 1 && weekday <= 5) return 'available'
  }

  return 'pending'
}

const availabilityLabel = (day: number) => {
  const state = availabilityState(day)
  const stateLabel = state === 'pending' ? 'availability not published' : state
  const selectedLabel = selectedAvailabilityDate.value === availabilityDate(day) ? ', selected' : ''
  return `${calendarLabel} ${day}, ${stateLabel}${selectedLabel}`
}

const availabilityDate = (day: number) => [
  calendarYear,
  String(calendarMonth + 1).padStart(2, '0'),
  String(day).padStart(2, '0')
].join('-')

const selectedAvailabilityDate = computed(() => bookingState.value.config.date)
const canSelectAvailability = (day: number) => ['available', 'pending'].includes(availabilityState(day))

const selectAvailabilityDate = (day: number) => {
  if (!canSelectAvailability(day)) return
  setConfig({
    ...bookingState.value.config,
    date: availabilityDate(day)
  })
}

const consultationLink = (type: 'phone' | 'written') => ({
  path: '/book/consultation',
  query: {
    type,
    purohit: profile.slug,
    ...(selectedAvailabilityDate.value ? { date: selectedAvailabilityDate.value } : {})
  }
})

const requestBooking = async () => {
  startProfileBooking({
    slug: profile.slug,
    name: profile.name,
    lineage: profile.lineage,
    city: profile.city,
    yearsOfService: profile.years_of_service
  })
  await router.push({
    path: '/book/choose-ritual',
    query: selectedAvailabilityDate.value ? { date: selectedAvailabilityDate.value } : undefined
  })
}

const cameFromBooking = route.query.from === 'booking'
const isSelected = computed(() => bookingState.value.selectedPurohit?.slug === purohit.slug)

const selectForBooking = async () => {
  setSelectedPurohit({
    slug: purohit.slug,
    name: purohit.name,
    lineage: purohit.lineage,
    city: purohit.city,
    yearsOfService: purohit.years_of_service
  })
  await router.push('/book/match-purohit')
}
</script>

<template>
  <div>
    <SectionBand padTop="md" padBottom="sm" theme="bg">
      <nav aria-label="Breadcrumb" class="flex flex-wrap items-center gap-2 font-inter text-h-14 text-ink-3">
        <NuxtLink to="/" class="transition-colors hover:text-ink">Home</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink to="/purohits" class="transition-colors hover:text-ink">Purohits</NuxtLink>
        <span aria-hidden="true">/</span>
        <span class="text-ink" aria-current="page">{{ purohit.name }}</span>
      </nav>
    </SectionBand>

    <!-- Profile Hero -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        <!-- Left: Name -->
        <div class="md:col-span-6 lg:col-span-7 flex flex-col gap-4">
          <h1 class="font-bricolage text-h-92 md:text-h-110 text-ink leading-[0.9] tracking-[-0.04em]">
            {{ purohit.name }}.
          </h1>
          <p class="font-inter text-h-16 text-ink-3  mt-4">
            Lineage verified. All references checked.
          </p>
        </div>

        <!-- Right: Stats Grid -->
        <div class="md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-12">
          <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">LINEAGE</span>
            <span class="font-inter text-h-16 text-ink">{{ purohit.lineage }}</span>
          </div>
          
          <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">PATASALA</span>
            <span class="font-inter text-h-16 text-ink">{{ purohit.patasala }}</span>
          </div>

          <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">YEARS OF SERVICE</span>
            <span class="font-bricolage text-h-68 text-ink">{{ purohit.years_of_service }}</span>
          </div>
          
          <div class="flex flex-col justify-end gap-2 pb-2">
            <div class="h-4 w-[120px] bg-ink"></div>
            <div class="h-4 w-[160px] bg-ink mt-1"></div>
            <div class="h-4 w-[140px] bg-ink mt-1"></div>
          </div>

          <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">LOCATION</span>
            <span class="font-inter text-h-16 text-ink">{{ purohit.city }}</span>
          </div>

          <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">LANGUAGES</span>
            <span class="font-inter text-h-16 text-ink">{{ purohit.languages.join(', ') }}</span>
          </div>
        </div>

      </div>
    </SectionBand>

    <SectionBand v-if="cameFromBooking" padTop="lg" padBottom="lg" theme="paper">
      <div class="flex flex-col gap-8 border-y border-ink/10 py-10 md:flex-row md:items-center md:justify-between">
        <div class="">
          <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">YOUR BOOKING</span>
          <h2 class="mt-3 font-bricolage text-h-42 leading-none text-ink">Choose {{ purohit.name }} for this request.</h2>
          <p class="mt-4 font-inter text-h-16 text-ink-3">Your ritual, date, location, and family details will remain saved when you return.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <ButtonSmall label="Back to matches" variant="outline" to="/book/match-purohit" />
          <ButtonLarge :label="isSelected ? 'Selected — return to booking' : 'Select this Purohit'" @click="selectForBooking" />
        </div>
      </div>
    </SectionBand>

    <SectionBand padTop="lg" padBottom="xl" theme="paper">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <aside class="flex flex-col gap-7 lg:col-span-4">
          <div class="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-line/60">
            <img
              v-if="profile.photo_url"
              :src="profile.photo_url"
              :alt="`Portrait of ${purohit.name}`"
              class="h-full w-full object-cover"
            >
            <div v-else class="flex h-full items-center justify-center px-8 text-center font-inter text-h-14 text-ink-3">
              Portrait added after the Purohit gives consent.
            </div>
            <span class="absolute left-5 top-5 rounded-full bg-ink px-4 py-2 font-inter text-h-10 font-semibold uppercase tracking-[0.12em] text-paper">
              {{ isVerified ? '✓ Verified Purohit' : 'Verification in progress' }}
            </span>
          </div>

          <div>
            <h2 class="font-bricolage text-h-42 font-bold leading-none text-ink">{{ purohit.name }}</h2>
            <p class="mt-3 font-bricolage text-h-16 italic text-ink-3">
              {{ publishedValue(profile.vedam) }} · {{ publishedValue(profile.gotram) }}
            </p>
          </div>

          <div class="flex flex-wrap gap-2" aria-label="Languages">
            <span v-for="language in purohit.languages" :key="language" class="rounded-full border border-ink/15 bg-bg px-4 py-2 font-inter text-h-12 text-ink">
              {{ language }}
            </span>
          </div>

          <ButtonLarge class="w-full justify-center" label="Request a booking" @click="requestBooking" />
          <p class="font-inter text-h-12 leading-relaxed text-ink-3">
            SanatanaSetu coordinates the request. Availability, scope, and fees are confirmed before a booking is accepted.
          </p>
        </aside>

        <div class="flex flex-col gap-16 lg:col-span-8">
          <section aria-labelledby="profile-credentials-title">
            <p class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">Credentials</p>
            <h2 id="profile-credentials-title" class="mt-2 font-bricolage text-h-42 font-bold leading-none text-ink">Lineage</h2>
            <dl class="mt-8 border-t border-ink/10">
              <div v-for="row in credentialRows" :key="row.label" class="grid grid-cols-[minmax(120px,0.7fr)_minmax(0,1.8fr)] gap-5 border-b border-ink/10 py-4">
                <dt class="font-inter text-h-14 text-ink-3">{{ row.label }}</dt>
                <dd class="font-bricolage text-h-16 text-ink">{{ row.value }}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="profile-services-title">
            <p class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">Rituals</p>
            <h2 id="profile-services-title" class="mt-2 font-bricolage text-h-42 font-bold leading-none text-ink">Services he performs</h2>
            <div class="mt-8 border-t border-ink/10">
              <article v-for="service in serviceRows" :key="service.name" class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-8 border-b border-ink/10 py-5">
                <div>
                  <h3 class="font-bricolage text-h-26 leading-tight text-ink">{{ service.name }}</h3>
                  <p class="mt-1 font-inter text-h-12 text-ink-3">{{ service.category }}</p>
                </div>
                <p class="text-right font-inter text-h-12 text-ink-3">{{ service.duration }}</p>
              </article>
            </div>
          </section>

          <section aria-labelledby="profile-availability-title">
            <p class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">Availability</p>
            <h2 id="profile-availability-title" class="mt-2 font-bricolage text-h-42 font-bold leading-none text-ink">{{ calendarLabel }}</h2>

            <div class="mt-8 rounded-2xl border border-ink/15 bg-bg p-5 sm:p-8">
              <div class="grid grid-cols-7 gap-2 text-center" role="grid" :aria-label="`${calendarLabel} availability`">
                <span v-for="(weekday, index) in weekdayLabels" :key="`${weekday}-${index}`" role="columnheader" class="py-3 font-inter text-h-10 font-semibold text-ink-3">{{ weekday }}</span>
                <template
                  v-for="(day, index) in calendarCells"
                  :key="`${day ?? 'empty'}-${index}`"
                >
                  <div
                    v-if="day === null"
                    class="invisible flex aspect-square items-center justify-center rounded-lg border border-transparent font-bricolage text-h-16"
                    aria-hidden="true"
                  />
                  <button
                  v-else
                  type="button"
                  class="flex aspect-square items-center justify-center rounded-lg border font-bricolage text-h-16"
                  role="gridcell"
                  :aria-label="availabilityLabel(day)"
                  :aria-selected="selectedAvailabilityDate === availabilityDate(day)"
                  :disabled="!canSelectAvailability(day)"
                  @click="selectAvailabilityDate(day)"
                  :class="selectedAvailabilityDate === availabilityDate(day)
                      ? 'border-2 border-ink bg-ink text-paper'
                    : availabilityState(day) === 'past'
                      ? 'border-ink/40 bg-ink/10 text-ink-3 line-through decoration-ink/70'
                      : availabilityState(day) === 'booked'
                        ? 'border-ink bg-ink text-paper'
                        : availabilityState(day) === 'available'
                          ? 'border-2 border-ink bg-bg text-ink'
                          : 'border-2 border-dashed border-ink/60 bg-paper text-ink-2'"
                >
                  {{ day }}
                  </button>
                </template>
              </div>

              <div class="mt-8 flex flex-wrap gap-x-7 gap-y-4 font-inter text-h-14 font-medium text-ink-2" aria-label="Availability legend">
                <span class="flex items-center gap-2.5"><i class="h-5 w-5 shrink-0 rounded-sm border-2 border-ink bg-bg not-italic" aria-hidden="true" />Available</span>
                <span class="flex items-center gap-2.5"><i class="h-5 w-5 shrink-0 rounded-sm border-2 border-ink bg-ink not-italic" aria-hidden="true" />Booked</span>
                <span class="flex items-center gap-2.5"><i class="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-ink/60 bg-ink/10 text-h-12 font-bold not-italic text-ink" aria-hidden="true">/</i>Past</span>
                <span class="flex items-center gap-2.5"><i class="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 border-dashed border-ink/70 bg-paper text-h-10 font-bold not-italic text-ink" aria-hidden="true">?</i>Not published</span>
              </div>
            </div>

            <p class="mt-5 font-inter text-h-12 leading-relaxed text-ink-3">
              Available dates can be selected for a booking request and are confirmed only after the Purohit responds. Unpublished dates require manual confirmation.
            </p>
          </section>

          <section aria-labelledby="profile-location-title">
            <p class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">Locations</p>
            <h2 id="profile-location-title" class="mt-2 font-bricolage text-h-42 font-bold leading-none text-ink">Where he serves</h2>
            <p class="mt-6 font-bricolage text-h-26 leading-relaxed text-ink-2">
              Based in {{ purohit.city }}. {{ publishedValue(profile.service_area, 'Travel and service areas are confirmed for each request.') }}
            </p>
          </section>

          <section aria-labelledby="profile-recommendations-title">
            <p class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-ink-3">Recommendations</p>
            <h2 id="profile-recommendations-title" class="mt-2 font-bricolage text-h-42 font-bold leading-none text-ink">What devotees say</h2>

            <div v-if="recommendations.length" class="mt-8 flex flex-col gap-5">
              <blockquote v-for="recommendation in recommendations" :key="`${recommendation.name}-${recommendation.date}`" class="rounded-2xl border border-ink/15 bg-bg p-7 sm:p-9">
                <p class="font-bricolage text-h-26 leading-relaxed text-ink">“{{ recommendation.quote }}”</p>
                <footer class="mt-7 flex flex-wrap items-end justify-between gap-5 border-t border-ink/10 pt-5 font-inter text-h-12">
                  <span><strong class="block text-ink">{{ recommendation.name }}</strong><span class="text-ink-3">{{ recommendation.location }}</span></span>
                  <time class="uppercase tracking-[0.08em] text-ink-3">{{ recommendation.date }}</time>
                </footer>
              </blockquote>
            </div>
            <div v-else class="mt-8 rounded-2xl border border-dashed border-ink/20 bg-bg p-8 font-inter text-h-16 text-ink-3">
              No consented recommendations have been published for this profile yet.
            </div>
            <p class="mt-5 font-inter text-h-12 leading-relaxed text-ink-3">
              Recommendations are published only with the devotee’s consent after a booking coordinated through SanatanaSetu.
            </p>
          </section>
        </div>
      </div>
    </SectionBand>

    <!-- Knowledge Section -->
    <SectionBand padTop="none" padBottom="xl" theme="paper" number="01" label="PUROHIT VERIFICATION" subtitle="BACKGROUND" position="01 / 02">
      <div class="flex flex-col md:flex-row gap-12 lg:gap-24 pt-8 border-t border-ink/10">
        <h2 class="font-bricolage text-h-68 text-ink tracking-[-0.03em]  leading-[0.95]">
          Where the knowledge comes from.
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-ink/10 pt-8 mt-4">
          <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">SPECIALTIES</span>
            <p class="font-inter text-h-16 text-ink ">
              {{ purohit.specialties.join(', ') }} — Custom timings for weddings, griha pravesh, and life rituals.
            </p>
          </div>
          
          <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">METHOD</span>
            <p class="font-inter text-h-16 text-ink ">
              Drik Ganitha. Calculations against location and individual Jatakams.
            </p>
          </div>
          
          <div class="flex flex-col gap-2 mt-4">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">TRAINING</span>
            <p class="font-inter text-h-16 text-ink ">
              {{ purohit.lineage }} — 12-year residential training.
            </p>
          </div>

          <div class="flex flex-col gap-2 mt-4">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">EXPERIENCE</span>
            <p class="font-inter text-h-16 text-ink ">
              Twenty-two years. Over 800 wedding muhurthams fixed.
            </p>
          </div>
        </div>
      </div>
    </SectionBand>

    <!-- Quote Highlight -->
    <DarkBand padTop="xl" padBottom="xl">
      <div class="flex flex-col gap-6">
        <span class="font-bricolage text-h-10 text-accent uppercase tracking-[0.14em]">APPROACH</span>
        <h2 class="font-bricolage text-h-68 text-paper  leading-[0.95] tracking-[-0.03em]">
          He performs every <em class="font-bricolage italic font-normal text-paper/80">muhurtham</em> calculation by hand.
        </h2>
      </div>
    </DarkBand>

    <!-- Questions Section -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg" number="02" label="BRING HIM THESE QUESTIONS" position="02 / 02">
      <div class="flex flex-col gap-12 pt-12 border-t border-ink/10">
          <AccordionRow 
            number="01" 
            title="When to marry" 
            description="Muhurthams are fixed against the Jatakams of both the bride and the groom." 
          />
          <AccordionRow 
            number="02" 
            title="When to enter a new home" 
            description="Griha Pravesham timings take into account the direction of the house and the Nakshatra of the owner." 
          />
          <AccordionRow 
            number="03" 
            title="When to name a child" 
            description="Namakaranam is traditionally done on the 11th or 21st day. Specific syllables are suggested based on Nakshatra." 
          />
          <AccordionRow 
            number="04" 
            title="When to travel" 
            description="Long journeys or starting a new venture can be aligned with auspicious timings to ensure success." 
          />
        </div>
    </SectionBand>

    <!-- Testimonial -->
    <DarkBand padTop="xl" padBottom="xl">
      <div class="flex flex-col gap-12">
        <span class="font-bricolage text-h-10 text-accent uppercase tracking-[0.14em]">IN HIS WORDS</span>
        <h2 class="font-bricolage text-h-68 text-paper  leading-[0.95] tracking-[-0.03em]">
          “I cast a chart using the Drik Ganitha system. A wedding date for a Hyderabad family is not the same as for a Chennai family on the same day.”
        </h2>
      </div>
    </DarkBand>

    <!-- Consultation Cards -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg">
      <div class="flex flex-col gap-12">
        <h2 class="font-bricolage text-h-68 text-ink tracking-[-0.03em]">
          Two ways to consult.
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ConsultationCard 
            number="01" 
            title="Phone call" 
            description="A 30-minute conversation to discuss your query directly with the Purohit." 
            fee="2100" 
            buttonLabel="Book a timeslot" 
            :to="consultationLink('phone')" 
          />
          <ConsultationCard 
            number="02" 
            title="Written report" 
            description="A detailed PDF document with calculated timings and explanations. Sent in 48 hours." 
            fee="3100" 
            buttonLabel="Request a report" 
            :to="consultationLink('written')" 
          />
        </div>
      </div>
    </SectionBand>

  </div>
</template>
