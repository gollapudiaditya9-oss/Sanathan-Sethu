<script setup lang="ts">
import { useRoute } from '#imports'
import { usePurohits } from '~/composables/usePurohits'
import SectionBand from '~/components/ui/SectionBand.vue'
import DarkBand from '~/components/page-blocks/DarkBand.vue'
import AccordionRow from '~/components/ui/AccordionRow.vue'
import ConsultationCard from '~/components/page-blocks/ConsultationCard.vue'

const route = useRoute()
const slug = route.params.slug as string
const { getPurohitBySlug } = usePurohits()
const purohit = getPurohitBySlug(slug)

// Since we are mocking data, if a user navigates to a non-existent slug, we might not have data.
// In a real app we'd throw a 404, but here we can just show a fallback or error.
if (!purohit) {
  throw createError({ statusCode: 404, statusMessage: 'Purohit Not Found' })
}
</script>

<template>
  <div>
    <!-- Profile Hero -->
    <SectionBand padTop="xl" padBottom="xl" theme="bg">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        <!-- Left: Name -->
        <div class="md:col-span-6 lg:col-span-7 flex flex-col gap-4">
          <h1 class="font-bricolage text-h-92 md:text-h-110 text-ink leading-[0.9] tracking-[-0.04em]">
            {{ purohit.name }}.
          </h1>
          <p class="font-inter text-h-16 text-ink-3 max-w-[400px] mt-4">
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
        </div>

      </div>
    </SectionBand>

    <!-- Knowledge Section -->
    <SectionBand padTop="none" padBottom="xl" theme="paper" number="01" label="PUROHIT VERIFICATION" subtitle="BACKGROUND" position="01 / 02">
      <div class="flex flex-col md:flex-row gap-12 lg:gap-24 pt-8 border-t border-ink/10">
        <h2 class="font-bricolage text-h-68 text-ink tracking-[-0.03em] max-w-[600px] leading-[0.95]">
          Where the knowledge comes from.
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-ink/10 pt-8 mt-4">
          <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">SPECIALTIES</span>
            <p class="font-inter text-h-16 text-ink max-w-[400px]">
              {{ purohit.specialties.join(', ') }} — Custom timings for weddings, griha pravesh, and life rituals.
            </p>
          </div>
          
          <div class="flex flex-col gap-2">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">METHOD</span>
            <p class="font-inter text-h-16 text-ink max-w-[400px]">
              Drik Ganitha. Calculations against location and individual Jatakams.
            </p>
          </div>
          
          <div class="flex flex-col gap-2 mt-4">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">TRAINING</span>
            <p class="font-inter text-h-16 text-ink max-w-[400px]">
              {{ purohit.lineage }} — 12-year residential training.
            </p>
          </div>

          <div class="flex flex-col gap-2 mt-4">
            <span class="font-bricolage text-h-10 text-ink-3 uppercase tracking-[0.14em]">EXPERIENCE</span>
            <p class="font-inter text-h-16 text-ink max-w-[400px]">
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
        <h2 class="font-bricolage text-h-68 text-paper max-w-[900px] leading-[0.95] tracking-[-0.03em]">
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
        <h2 class="font-bricolage text-h-68 text-paper max-w-[900px] leading-[0.95] tracking-[-0.03em]">
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
            to="/book/consultation?type=phone" 
          />
          <ConsultationCard 
            number="02" 
            title="Written report" 
            description="A detailed PDF document with calculated timings and explanations. Sent in 48 hours." 
            fee="3100" 
            buttonLabel="Request a report" 
            to="/book/consultation?type=written" 
          />
        </div>
      </div>
    </SectionBand>

  </div>
</template>
