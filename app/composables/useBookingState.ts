import { useCookie } from '#app'

export interface BookingState {
  origin: 'open' | 'profile'
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
  selectedPurohit?: {
    slug: string
    name: string
    lineage: string
    city: string
    yearsOfService: number
  } | null
}

export const useBookingState = () => {
  // We use useCookie to persist state across reloads and support SSR
  const bookingState = useCookie<BookingState>('booking-state', {
    default: () => ({
      origin: 'open',
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
      },
      selectedPurohit: null
    }),
    watch: true
  })

  const setRitual = (ritual: BookingState['ritual']) => {
    bookingState.value.ritual = ritual
  }

  const startOpenBooking = () => {
    bookingState.value.origin = 'open'
    bookingState.value.selectedPurohit = null
  }

  const startProfileBooking = (selectedPurohit: NonNullable<BookingState['selectedPurohit']>) => {
    bookingState.value.origin = 'profile'
    bookingState.value.selectedPurohit = selectedPurohit
  }

  const setConfig = (config: BookingState['config']) => {
    bookingState.value.config = config
  }

  const setFamilyDetails = (familyDetails: BookingState['familyDetails']) => {
    bookingState.value.familyDetails = familyDetails
  }

  const setSelectedPurohit = (selectedPurohit: BookingState['selectedPurohit']) => {
    bookingState.value.selectedPurohit = selectedPurohit
  }

  const resetBooking = () => {
    bookingState.value = {
      origin: 'open',
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
      },
      selectedPurohit: null
    }
  }

  return {
    bookingState,
    startOpenBooking,
    startProfileBooking,
    setRitual,
    setConfig,
    setFamilyDetails,
    setSelectedPurohit,
    resetBooking
  }
}
