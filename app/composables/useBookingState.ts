import { useCookie } from '#app'

export interface BookingState {
  ritual: {
    id: string
    name: string
    description: string
  } | null
  config: {
    date: string
    timeWindow: string
    location: string
    considerations: string
    customRitualName?: string
  }
  familyDetails: {
    name: string
    phone: string
    familyName: string
    gothram: string
    wifeName: string
    childrenNames: string
    fatherName: string
    motherName: string
    familyNotes: string
  }
}

export const useBookingState = () => {
  // We use useCookie to persist state across reloads and support SSR
  const bookingState = useCookie<BookingState>('booking-state', {
    default: () => ({
      ritual: null,
      config: {
        date: '',
        timeWindow: '',
        location: '',
        considerations: '',
        customRitualName: ''
      },
      familyDetails: {
        name: '',
        phone: '',
        familyName: '',
        gothram: '',
        wifeName: '',
        childrenNames: '',
        fatherName: '',
        motherName: '',
        familyNotes: ''
      }
    }),
    watch: true
  })

  const setRitual = (ritual: BookingState['ritual']) => {
    bookingState.value.ritual = ritual
  }

  const setConfig = (config: BookingState['config']) => {
    bookingState.value.config = config
  }

  const setFamilyDetails = (familyDetails: BookingState['familyDetails']) => {
    bookingState.value.familyDetails = familyDetails
  }

  const resetBooking = () => {
    bookingState.value = {
      ritual: null,
      config: {
        date: '',
        timeWindow: '',
        location: '',
        considerations: '',
        customRitualName: ''
      },
      familyDetails: {
        name: '',
        phone: '',
        familyName: '',
        gothram: '',
        wifeName: '',
        childrenNames: '',
        fatherName: '',
        motherName: '',
        familyNotes: ''
      }
    }
  }

  return {
    bookingState,
    setRitual,
    setConfig,
    setFamilyDetails,
    resetBooking
  }
}
