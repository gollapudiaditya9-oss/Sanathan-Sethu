<script setup lang="ts">
import { definePageMeta, useRouter } from '#imports'
import { useBookingState } from '~/composables/useBookingState'
import StepperBand from '~/components/page-blocks/StepperBand.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import FormInput from '~/components/ui/FormInput.vue'
import DatePicker from '~/components/ui/DatePicker.vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { onBeforeRouteLeave } from 'vue-router'
import { computed } from 'vue'

definePageMeta({
  layout: 'booking'
})

const router = useRouter()
const { bookingState, setConfig } = useBookingState()

// If no ritual is selected, redirect back to step 1
if (!bookingState.value.ritual) {
  router.replace('/book/choose-ritual')
}

const step2Schema = toTypedSchema(
  z.object({
    date: z.string().min(1, 'Please pick a preferred date'),
    timeWindow: z.string().min(1, 'Please select a time window'),
    location: z.string().min(2, 'Where will the rites be held?'),
    considerations: z.string().optional(),
    customRitualName: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (bookingState.value.ritual?.id === 'others' && (!data.customRitualName || data.customRitualName.length < 2)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please specify the ritual you want to book',
        path: ['customRitualName']
      })
    }
  })
)

const { handleSubmit, errors, values } = useForm({
  validationSchema: step2Schema,
  initialValues: {
    date: bookingState.value.config?.date || '',
    timeWindow: bookingState.value.config?.timeWindow || '',
    location: bookingState.value.config?.location || '',
    considerations: bookingState.value.config?.considerations || '',
    customRitualName: bookingState.value.config?.customRitualName || ''
  }
})

const { value: date } = useField<string>('date')
const { value: timeWindow } = useField<string>('timeWindow')
const { value: location } = useField<string>('location')
const { value: considerations } = useField<string>('considerations')
const { value: customRitualName } = useField<string>('customRitualName')
const continueLabel = computed(() => bookingState.value.origin === 'profile' && bookingState.value.selectedPurohit
  ? 'Continue to family details'
  : 'Find matching Purohits')

const onSubmit = handleSubmit((values) => {
  setConfig({
    date: values.date,
    timeWindow: values.timeWindow,
    location: values.location,
    considerations: values.considerations || '',
    customRitualName: values.customRitualName || ''
  })
  router.push(bookingState.value.origin === 'profile' && bookingState.value.selectedPurohit
    ? '/book/family-details'
    : '/book/match-purohit')
})

const saveDraft = () => {
  setConfig({
    date: values.date || '',
    timeWindow: values.timeWindow || '',
    location: values.location || '',
    considerations: values.considerations || '',
    customRitualName: values.customRitualName || ''
  })
}

onBeforeRouteLeave(() => {
  saveDraft()
})

const goBack = () => {
  saveDraft()
  router.push('/book/choose-ritual')
}
</script>

<template>
  <div class="flex flex-col h-full">
    <StepperBand :currentStep="2" />
    
    <div class="flex-grow flex justify-center w-full px-6 md:px-14 py-12 md:py-24">
      <div class="w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        
        <!-- Left Recap -->
        <div class="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">STEP 01 · CHOSEN</span>
            <h2 class="font-bricolage text-h-42 text-ink leading-none mt-2">
              <em class="font-bricolage italic font-normal">{{ bookingState.ritual?.name }}</em>
            </h2>
            <p class="font-inter text-h-16 text-ink-3 mt-4">
              {{ bookingState.ritual?.description }}
            </p>
          </div>
          <div class="mt-4">
            <ButtonSmall variant="outline" label="Change ritual" @click="goBack" />
          </div>
        </div>

        <!-- Right Active Form -->
        <div class="md:col-span-7 lg:col-span-8 flex flex-col">
          <div class="flex flex-col gap-4 mb-12">
            <span class="font-inter font-semibold text-h-10 text-ink-3 uppercase tracking-[0.14em]">STEP 02 · CONFIGURE</span>
            <h1 class="font-bricolage text-h-68 text-ink tracking-[-0.03em] leading-[0.95]">
              When and where?
            </h1>
          </div>

          <form @submit="onSubmit" class="flex flex-col gap-8 ">
            <!-- Custom Ritual Section -->
            <div v-if="bookingState.ritual?.id === 'others'" class="flex flex-col gap-6 p-6 bg-accent/5 border border-accent/20 rounded-xl mb-4">
              <div class="flex flex-col gap-1">
                <span class="font-inter font-semibold text-h-16 text-ink">Custom Ritual Request</span>
                <span class="font-inter text-h-14 text-ink-3">Since you selected "Other Ritual", please specify exactly what you are looking for.</span>
              </div>
              <FormInput 
                label="RITUAL NAME" 
                v-model="customRitualName"
                :error="errors.customRitualName"
                placeholder="E.g., Ayush Homam, Shashtiabdapoorthi" 
              />
            </div>

            <DatePicker
              label="PREFERRED DATE" 
              v-model="date"
              :error="errors.date"
              helpText="Auspicious dates calculated against the Jatakams once you submit details" 
            />
            
            <FormInput 
              label="PREFERRED TIME WINDOW" 
              v-model="timeWindow"
              :error="errors.timeWindow"
              placeholder="Morning / Afternoon / Evening" 
            />
            
            <FormInput 
              label="LOCATION" 
              v-model="location"
              :error="errors.location"
              placeholder="Hyderabad, Telangana" 
              helpText="Where the rites will be performed" 
            />
            
            <FormInput 
              label="ANY SPECIAL CONSIDERATIONS" 
              v-model="considerations"
              :error="errors.considerations"
              placeholder="Optional" 
            />

            <!-- Continue Row -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-4 border-t border-ink/10">
              <ButtonSmall variant="outline" label="Back" type="button" @click="goBack" />
              <ButtonLarge :label="continueLabel" type="submit" />
            </div>
          </form>

        </div>
        
      </div>
    </div>
  </div>
</template>
