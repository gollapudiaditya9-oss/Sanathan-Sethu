<script setup lang="ts">
import { definePageMeta, useRouter } from '#imports'
import { shallowRef } from 'vue'
import SectionBand from '~/components/ui/SectionBand.vue'
import ThreeScriptEyebrow from '~/components/page-blocks/ThreeScriptEyebrow.vue'
import FormInput from '~/components/ui/FormInput.vue'
import PhoneInput from '~/components/ui/PhoneInput.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'

definePageMeta({
  layout: 'solemn'
})

const router = useRouter()
const name = shallowRef('')
const phone = shallowRef('')
const phoneValid = shallowRef(false)
const location = shallowRef('')
const errors = shallowRef({ name: '', phone: '', location: '', form: '' })
const submitting = shallowRef(false)

const submitRequest = async () => {
  errors.value = {
    name: name.value.trim() ? '' : 'Please enter the name of a family member.',
    phone: phoneValid.value ? '' : 'Please enter a valid phone number.',
    location: location.value.trim() ? '' : 'Please enter the location.',
    form: ''
  }
  if (errors.value.name || errors.value.phone || errors.value.location) return

  submitting.value = true
  try {
    await $fetch('/api/antyeshti-request', {
      method: 'POST',
      body: { name: name.value.trim(), phone: phone.value, location: location.value.trim() }
    })
    await router.push('/antyeshti/confirmed')
  } catch {
    errors.value = { ...errors.value, form: 'We could not record the request. Please try again.' }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="bg-ink text-paper selection:bg-paper selection:text-ink">
    
    <!-- Hero (Dark) -->
    <div class="w-full flex justify-center px-6 md:px-14 py-16 md:py-24 border-b border-paper/10">
      <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
        
        <!-- Left: Copy + SLA -->
        <div class="flex flex-col lg:pr-14">
          <ThreeScriptEyebrow english="ANTYESHTI" telugu="అంత్యేష్టి" sanskrit="अन्त्येष्टि" theme="light" />
          
          <h1 class="font-bricolage font-medium text-h-92 text-paper leading-[0.9] tracking-[-0.04em] mt-8 whitespace-pre-line">
            If you have
            lost someone.
          </h1>
          
          <p class="font-inter text-h-16 text-paper/60  mt-6">
            We will call you within four hours. You stay with your family. A verified Purohit will arrive with the right samagri for the rites.
          </p>
          
          <div class="flex flex-col sm:flex-row border-y border-paper/10 py-6 mt-12 gap-8 sm:gap-12">
            <div class="flex flex-col gap-1">
              <span class="font-inter font-semibold text-[10px] text-paper/40 uppercase tracking-[0.14em]">WE CALL YOU IN</span>
              <span class="font-inter text-h-16 text-paper">4 hours</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-inter font-semibold text-[10px] text-paper/40 uppercase tracking-[0.14em]">PUROHIT ARRIVES IN</span>
              <span class="font-inter text-h-16 text-paper">12 hours</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-inter font-semibold text-[10px] text-paper/40 uppercase tracking-[0.14em]">AVAILABLE</span>
              <span class="font-inter text-h-16 text-paper">24/7</span>
            </div>
          </div>
        </div>

        <!-- Right: 3-field form -->
        <div class="bg-ink-2 rounded-xl p-8 md:p-12 flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <span class="font-inter font-semibold text-[10px] text-paper/40 uppercase tracking-[0.14em]">REQUEST A PUROHIT NOW</span>
            <h2 class="font-bricolage text-h-42 text-paper leading-[0.9] whitespace-pre-line">
              Three details.
              That is all.
            </h2>
          </div>

          <form class="flex flex-col gap-6" novalidate @submit.prevent="submitRequest">
            <FormInput 
              v-model="name"
              label="YOUR NAME" 
              placeholder="Family member who can be reached" 
              name="name"
              autocomplete="name"
              :error="errors.name"
              theme="dark"
            />
            <PhoneInput
              v-model="phone"
              v-model:valid="phoneValid"
              label="PHONE NUMBER" 
              :error="errors.phone"
              theme="dark"
            />
            <FormInput 
              v-model="location"
              label="LOCATION" 
              placeholder="City or village where the rites will be held" 
              name="location"
              autocomplete="address-level2"
              :error="errors.location"
              theme="dark"
            />
            
            <div class="pt-4">
              <ButtonLarge :label="submitting ? 'Sending request…' : 'Request a Purohit'" type="submit" variant="solemn" class="w-full justify-center" :aria-disabled="submitting" />
              <p v-if="errors.form" class="mt-4 font-inter text-[12px] text-accent" role="alert">{{ errors.form }}</p>
              <p class="font-inter text-[12px] text-paper/40 text-center mt-4">
                We call you. The family is not asked to make further arrangements.
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>

    <!-- Section: What happens next -->
    <SectionBand padTop="xl" padBottom="xl" theme="ink" number="01" label="WHAT HAPPENS NEXT · THE FOUR STEPS" position="01 / 03" tone="solemn">
      <div class="flex flex-col pt-12">
        <h2 class="font-bricolage font-medium text-h-68 text-paper tracking-[-0.03em] mb-12 whitespace-pre-line">
          You will not be left
          to figure this out.
        </h2>
        
        <div class="flex flex-col border-t border-paper/10">
          <div class="flex flex-col md:flex-row items-start md:items-center py-8 border-b border-paper/10 gap-6">
            <div class="font-bricolage text-h-68 text-paper/20 w-full md:w-[80px]">01</div>
            <div class="font-bricolage text-h-26 text-paper w-full md:w-[440px]">You submit the request</div>
            <div class="font-inter text-h-16 text-paper/60 w-full flex-grow ">
              Three fields. Name, phone, location. We do not need more from you right now.
            </div>
          </div>
          <div class="flex flex-col md:flex-row items-start md:items-center py-8 border-b border-paper/10 gap-6">
            <div class="font-bricolage text-h-68 text-paper/20 w-full md:w-[80px]">02</div>
            <div class="font-bricolage text-h-26 text-paper w-full md:w-[440px]">We call within four hours</div>
            <div class="font-inter text-h-16 text-paper/60 w-full flex-grow ">
              The platform coordinator calls you. We ask what we need to know. The family does not coordinate.
            </div>
          </div>
          <div class="flex flex-col md:flex-row items-start md:items-center py-8 border-b border-paper/10 gap-6">
            <div class="font-bricolage text-h-68 text-paper/20 w-full md:w-[80px]">03</div>
            <div class="font-bricolage text-h-26 text-paper w-full md:w-[440px]">A Purohit travels to you</div>
            <div class="font-inter text-h-16 text-paper/60 w-full flex-grow ">
              Verified Purohit with the right samagri. They reach you within twelve hours of your call back.
            </div>
          </div>
          <div class="flex flex-col md:flex-row items-start md:items-center py-8 border-b border-paper/10 gap-6">
            <div class="font-bricolage text-h-68 text-paper/20 w-full md:w-[80px]">04</div>
            <div class="font-bricolage text-h-26 text-paper w-full md:w-[440px]">The rites are performed</div>
            <div class="font-inter text-h-16 text-paper/60 w-full flex-grow ">
              You stay with your family. The Purohit handles every step of the rites. No further arrangements asked of you.
            </div>
          </div>
        </div>
      </div>
    </SectionBand>

    <!-- Dark Band: What we will not do -->
    <div class="bg-ink-2 py-24 px-6 md:px-14 border-y border-paper/10">
      <div class="mx-auto flex flex-col gap-6">
        <span class="font-inter font-semibold text-h-10 text-paper/40 uppercase tracking-[0.14em]">WHAT WE WILL NOT DO</span>
        <h2 class="font-bricolage font-medium text-h-68 text-paper  leading-[0.95] tracking-[-0.03em] whitespace-pre-line">
          We will not ask the family
          to complete more forms.
          We will not call multiple times.
          We will not advertise.
        </h2>
      </div>
    </div>

    <!-- Section: What is included -->
    <SectionBand padTop="xl" padBottom="xl" theme="ink" number="02" label="WHAT IS INCLUDED" position="02 / 03" tone="solemn">
      <div class="flex flex-col pt-12">
        <h2 class="font-bricolage font-medium text-h-68 text-paper tracking-[-0.03em] mb-12 whitespace-pre-line">
          Everything for the rites.
          Nothing extra.
        </h2>
        
        <div class="flex flex-col border-t border-paper/10">
          <div class="flex flex-col md:flex-row items-start md:items-center py-8 border-b border-paper/10 gap-6">
            <div class="font-bricolage text-h-68 text-paper/20 w-full md:w-[80px]">01</div>
            <div class="font-bricolage text-h-26 text-paper w-full md:w-[440px]">Verified Purohit</div>
            <div class="font-inter text-h-16 text-paper/60 w-full flex-grow ">
              Lineage-led, interviewed, references confirmed. The Purohit who comes to you is the same Purohit listed on our site.
            </div>
          </div>
          <div class="flex flex-col md:flex-row items-start md:items-center py-8 border-b border-paper/10 gap-6">
            <div class="font-bricolage text-h-68 text-paper/20 w-full md:w-[80px]">02</div>
            <div class="font-bricolage text-h-26 text-paper w-full md:w-[440px]">All samagri</div>
            <div class="font-inter text-h-16 text-paper/60 w-full flex-grow ">
              Coconut, banana, rice, flowers, dhoop, ghee, honey, sandalwood. Everything needed for the rites is brought by the Purohit.
            </div>
          </div>
        </div>
      </div>
    </SectionBand>

    <!-- Section: A Note -->
    <SectionBand padTop="xl" padBottom="xl" theme="ink" number="03" label="A NOTE" position="03 / 03" tone="solemn">
      <div class="flex flex-col pt-12">
        <div class="flex flex-col gap-8">
          <p class="font-bricolage italic text-[32px] md:text-[36px] text-paper/80 leading-[1.3] ">
            "This service exists because my own family went through this without help. The phone calls, the searching, the arrangements made in grief — they should not be required of a family that has just lost someone. If you have come to this page, we will help."
          </p>
          <div class="font-inter font-semibold text-[10px] text-paper/40 uppercase tracking-[0.14em]">
            — PHANI RAJ GOLLAPUDI, FOUNDER
          </div>
        </div>
      </div>
    </SectionBand>

  </div>
</template>
