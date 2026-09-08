import { defineNuxtRouteMiddleware } from '#imports'
import { useColumnWipe } from '~/composables/useColumnWipe'

// NuxtPage reads route.meta.pageTransition and NuxtLayout reads
// route.meta.layoutTransition internally (both wrap their own Suspense
// output in a real <Transition>, which correctly survives Nuxt's
// per-route RouteProvider keying). Setting both here makes the wipe
// cover page changes and layout changes; useColumnWipe's onLeave already
// de-dupes if both fire for the same navigation.
export default defineNuxtRouteMiddleware((to, from) => {
  const isAntyeshti = to.path.startsWith('/antyeshti') || from.path.startsWith('/antyeshti')
  to.meta.pageTransition = isAntyeshti ? false : useColumnWipe()
  to.meta.layoutTransition = isAntyeshti ? false : useColumnWipe()
})
