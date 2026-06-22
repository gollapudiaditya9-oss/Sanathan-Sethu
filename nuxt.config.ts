// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  
  app: {
    pageTransition: { name: 'column-wipe', mode: 'out-in', css: false }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],

  fonts: {
    families: [
      { name: 'Bricolage Grotesque', provider: 'google' },
      { name: 'Inter', provider: 'google' },
      { name: 'Libre Baskerville', provider: 'google' },
      { name: 'Noto Sans Telugu', provider: 'google' }
    ]
  },

  css: [
    '~/assets/css/main.css'
  ],

  build: {
    transpile: ['gsap']
  }
})
