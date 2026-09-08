// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'SanatanaSetu'
    }
  },

  hooks: {
    'pages:extend'(pages) {
      const isPrototypeRoute = (file?: string) => {
        const normalized = file?.replace(/\\/g, '/') ?? ''
        return /-AG\.vue$/.test(normalized)
          || /\(1\)\.vue$/.test(normalized)
          || normalized.includes('/pages/dev/')
      }

      const removePrototypeRoutes = (routes: typeof pages) => {
        for (let index = routes.length - 1; index >= 0; index -= 1) {
          const route = routes[index]
          if (isPrototypeRoute(route.file)) {
            routes.splice(index, 1)
            continue
          }
          if (route.children?.length) removePrototypeRoutes(route.children)
        }
      }

      removePrototypeRoutes(pages)

      // consultants.vue is a standalone directory page, not a nested layout.
      // Promote its generated child routes so they render their own page files.
      for (const parentPath of ['/consultants', '/partners', '/antyeshti']) {
        const parentPage = pages.find(page => page.path === parentPath)
        if (!parentPage?.children?.length) continue
        const childRoutes = parentPage.children.map(child => ({
          ...child,
          path: `${parentPath}/${child.path.replace(/^\//, '')}`
        }))
        parentPage.children = []
        pages.push(...childRoutes)
      }
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],

  runtimeConfig: {
    // Setu AI (the Library chat). Server-only. See .env.example.
    aiProvider: 'anthropic',
    aiApiKey: '',
    aiModel: 'claude-sonnet-5'
  },

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
