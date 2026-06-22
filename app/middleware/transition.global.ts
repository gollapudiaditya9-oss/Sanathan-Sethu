import { defineNuxtRouteMiddleware } from '#imports'
import { useColumnWipe } from '~/composables/useColumnWipe'

export default defineNuxtRouteMiddleware((to) => {
  to.meta.layoutTransition = useColumnWipe()
})
