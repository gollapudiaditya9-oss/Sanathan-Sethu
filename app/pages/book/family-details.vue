<script setup lang="ts">
import { definePageMeta, useRouter } from '#imports'
import { useBookingState } from '~/composables/useBookingState'
import StepperBand from '~/components/page-blocks/StepperBand.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import FormInput from '~/components/ui/FormInput.vue'
import PhoneInput from '~/components/ui/PhoneInput.vue'
import { computed } from 'vue'
import { getBookingDateParts } from '~/utils/formatBookingDate'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { onBeforeRouteLeave } from 'vue-router'

definePageMeta({
  layout: 'booking'
})

const router = useRouter()
const { bookingState, setFamilyDetails } = useBookingState()

const formattedDateParts = computed(() => getBookingDateParts(bookingState.value.config?.date))

const familyDetailsSchema = toTypedSchema(z.object({
  name: z.string().trim().min(2, 'Please enter your full name'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  familyName: z.string().trim().min(2, 'Please enter your family or household name'),
  gothram: z.string().optional(),
  wifeName: z.string().optional(),
  childrenNames: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  familyNotes: z.string().optional()
}))

const { handleSubmit, errors, values } = useForm({
  validationSchema: familyDetailsSchema,
  initialValues: {
    name: bookingState.value.familyDetails?.name ?? '',
    phone: bookingState.value.familyDetails?.phone ?? '',
    familyName: bookingState.value.familyDetails?.familyName ?? '',
    gothram: bookingState.value.familyDetails?.gothram ?? '',
    wifeName: bookingState.value.familyDetails?.wifeName ?? '',
    childrenNames: bookingState.value.familyDetails?.childrenNames ?? '',
    fatherName: bookingState.value.familyDetails?.fatherName ?? '',
    motherName: bookingState.value.familyDetails?.motherName ?? '',
    familyNotes: bookingState.value.familyDetails?.familyNotes ?? ''
  }
})

const { value: name } = useField<string>('name')
const { value: phone } = useField<string>('phone')
const { value: familyName } = useField<string>('familyName')
const { value: gothram } = useField<string>('gothram')
const { value: wifeName } = useField<string>('wifeName')
const { value: childrenNames } = useField<string>('childrenNames')
const { value: fatherName } = useField<string>('fatherName')
const { value: motherName } = useField<string>('motherName')
const { value: familyNotes } = useField<string>('familyNotes')

// Protect route
if (!bookingState.value.config?.date) {
  router.replace('/book/configure')
}

const goBack = () => {
  saveDraft()
  router.push(bookingState.value.origin === 'profile' && bookingState.value.selectedPurohit
    ? '/book/configure'
    : '/book/match-purohit')
}

const saveDraft = () => {
  setFamilyDetails({
    name: values.name || '',
    phone: values.phone || '',
    familyName: values.familyName || '',
    gothram: values.gothram || '',
    wifeName: values.wifeName || '',
    childrenNames: values.childrenNames || '',
    fatherName: values.fatherName || '',
    motherName: values.motherName || '',
    familyNotes: values.familyNotes || ''
  })
}

onBeforeRouteLeave(() => {
  saveDraft()
})

const onContinue = handleSubmit((values) => {
  setFamilyDetails({
    name: values.name,
    phone: values.phone,
    familyName: values.familyName,
    gothram: values.gothram ?? '',
    wifeName: values.wifeName ?? '',
    childrenNames: values.childrenNames ?? '',
    fatherName: values.fatherName ?? '',
    motherName: values.motherName ?? '',
    familyNotes: values.familyNotes ?? ''
  })
  router.push('/book/confirm')
})
</script>

<template>
  <div class="flex flex-col h-full">
    <StepperBand :currentStep="bookingState.origin === 'profile' && bookingState.selectedPurohit ? 3 : 4" />
    
    <div class="flex-grow flex justify-center w-full px-6 md:px-14 py-12 md:py-24">
      <div class="w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        
        <!-- Left Recap -->
        <div class="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">STEP 01 & 02 · RECAP</span>
            <h2 class="font-bricolage text-h-42 text-ink leading-none mt-2">
              <em class="font-bricolage italic font-normal">
                {{ bookingState.ritual?.id === 'others' && bookingState.config?.customRitualName ? bookingState.config.customRitualName : bookingState.ritual?.name }}
              </em>
            </h2>
            <p class="font-inter text-h-16 text-ink-3 mt-4">
              <template v-if="formattedDateParts">
                {{ formattedDateParts.weekday }}, {{ formattedDateParts.day }}<sup class="ml-px text-[0.62em] leading-none">{{ formattedDateParts.suffix }}</sup>
                {{ formattedDateParts.month }}, {{ formattedDateParts.year }}, {{ bookingState.config?.timeWindow }}
              </template><br>
              {{ bookingState.config?.location }}
            </p>
          </div>
          <div class="mt-4">
            <ButtonSmall variant="outline" label="Edit configuration" @click="goBack" />
          </div>
        </div>

        <!-- Right Active Form -->
        <div class="md:col-span-7 lg:col-span-8 flex flex-col">
          <div class="flex flex-col gap-4 mb-12">
            <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">{{ bookingState.origin === 'profile' && bookingState.selectedPurohit ? 'STEP 03' : 'STEP 04' }} · FAMILY DETAILS</span>
            <h1 class="font-bricolage text-h-68 text-ink tracking-[-0.03em] leading-[0.95]">
              Tell us about your family.
            </h1>
            <p class="font-inter text-h-16 text-ink-3">
              These details help the Purohit prepare for your family and the people taking part.
            </p>
          </div>

          <form @submit="onContinue" class="flex  flex-col gap-10">
            <fieldset class="flex flex-col gap-6">
              <legend class="mb-6 flex w-full items-center gap-4">
                <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">Booking contact</span>
                <span class="h-px flex-1 bg-ink/10" />
              </legend>
              <FormInput v-model="name" :error="errors.name" label="YOUR NAME" placeholder="Full name" />
              <PhoneInput v-model="phone" :error="errors.phone" label="PHONE NUMBER" />
            </fieldset>

            <fieldset class="flex flex-col gap-6">
              <legend class="mb-6 flex w-full items-center gap-4">
                <span class="font-inter text-h-10 font-semibold uppercase tracking-[0.14em] text-accent">About the family</span>
                <span class="h-px flex-1 bg-ink/10" />
              </legend>
              <FormInput
                v-model="familyName"
                :error="errors.familyName"
                label="FAMILY OR HOUSEHOLD NAME"
                placeholder="Family name"
              />
              <FormInput
                v-model="gothram"
                :error="errors.gothram"
                label="GOTHRAM (OPTIONAL)"
                placeholder="If known"
                help-text="Useful for sankalpam and homam preparations"
              />
              <FormInput
                v-model="wifeName"
                :error="errors.wifeName"
                label="WIFE OR SPOUSE NAME (OPTIONAL)"
                placeholder="Full name"
              />
              <FormInput
                v-model="childrenNames"
                :error="errors.childrenNames"
                label="CHILDREN (OPTIONAL)"
                placeholder="Names and ages"
                help-text="Separate multiple children with commas"
              />
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormInput
                  v-model="fatherName"
                  :error="errors.fatherName"
                  label="FATHER'S NAME (OPTIONAL)"
                  placeholder="Full name"
                />
                <FormInput
                  v-model="motherName"
                  :error="errors.motherName"
                  label="MOTHER'S NAME (OPTIONAL)"
                  placeholder="Full name"
                />
              </div>
              <FormInput
                v-model="familyNotes"
                :error="errors.familyNotes"
                label="ANYTHING THE PUROHIT SHOULD KNOW (OPTIONAL)"
                placeholder="Traditions, language preference, or accessibility needs"
              />
            </fieldset>

            <!-- Continue Row -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-4 border-t border-ink/10">
              <ButtonSmall variant="outline" label="Back" type="button" @click="goBack" />
              <ButtonLarge label="Continue to confirmation" type="submit" />
            </div>
          </form>

        </div>
        
      </div>
    </div>
  </div>
</template>
