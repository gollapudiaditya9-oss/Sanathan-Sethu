# architecture.md

**Read `CLAUDE.md` first.** This document is how the code is organized; that one is why.

---

## 1. Repository structure

```
sanatanasetu/
├── CLAUDE.md
├── plan.md
├── architecture.md
├── design-system.md
├── README.md
├── package.json
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
│
├── app.vue                          # Root component, page transitions
│
├── assets/
│   ├── css/
│   │   └── main.css                 # CSS variables + Tailwind directives
│   └── fonts/                       # Self-hosted font files (Phase 6)
│
├── public/
│   ├── favicon.ico
│   └── og-images/                   # Open Graph images per route
│
├── components/
│   ├── ui/                          # The 7 design system primitives
│   │   ├── StatusPill.vue
│   │   ├── ButtonSmall.vue
│   │   ├── ButtonLarge.vue
│   │   ├── FormInput.vue
│   │   ├── SectionBand.vue
│   │   ├── SiteNav.vue
│   │   └── SiteFooter.vue
│   ├── page-blocks/                 # Reused page-level blocks
│   │   ├── ThreeScriptEyebrow.vue
│   │   ├── ListRow.vue              # The 140px / 120px / 100px row primitive
│   │   ├── StatTriplet.vue
│   │   ├── DarkBand.vue
│   │   └── PhotoBand.vue            # Dark photographic band placeholder
│   └── flow/                        # Booking flow specific
│       ├── BookingStepper.vue
│       ├── BookingRecap.vue
│       └── BookingSummaryCard.vue
│
├── composables/
│   ├── usePurohits.ts               # List + lookup
│   ├── useCalendar.ts               # Panchangam data + lookup
│   ├── useBookingState.ts           # Multi-step booking state (localStorage)
│   ├── useColumnWipe.ts             # The page transition driver
│   └── useThreeScript.ts            # Helper for the three-script eyebrow rendering
│
├── layouts/
│   ├── default.vue                  # Standard layout (SiteNav + slot + SiteFooter)
│   └── solemn.vue                   # Antyeshti layout (solemn nav variant, no transition)
│
├── pages/
│   ├── index.vue                    # /
│   ├── purohits/
│   │   ├── index.vue                # /purohits
│   │   └── [slug].vue               # /purohits/sri-anand-sastry
│   ├── consultants/
│   │   └── index.vue                # /consultants (Phase 6 — not in current plan)
│   ├── calendar.vue                 # /calendar
│   ├── book/
│   │   ├── index.vue                # Redirects to /book/choose-ritual
│   │   └── [step].vue               # /book/choose-ritual, /book/configure, etc.
│   ├── antyeshti.vue                # /antyeshti (uses solemn layout)
│   ├── pricing.vue                  # /pricing
│   └── partners/
│       └── index.vue                # /partners (Phase 6 — placeholder for now)
│
├── server/
│   └── api/
│       ├── antyeshti-request.post.ts
│       ├── booking/
│       │   ├── start.post.ts
│       │   └── [id]/
│       │       ├── step.post.ts
│       │       └── confirm.post.ts
│       ├── purohits/
│       │   ├── index.get.ts
│       │   └── [slug].get.ts
│       └── calendar/
│           └── today.get.ts
│
├── data/
│   ├── purohits.json                # Placeholder data (12 entries)
│   ├── rituals.json                 # The ritual catalog
│   └── calendar-festivals.json      # Upcoming festivals
│
├── figma-context/                   # JSON exports of each Figma frame
│   ├── home.json
│   ├── canary.json
│   ├── antyeshti.json
│   ├── purohits-list.json
│   ├── booking-flow.json
│   ├── pricing.json
│   └── calendar.json
│
└── tests/
    ├── unit/                        # Component-level tests
    └── e2e/                         # Playwright tests for the booking flow
```

---

## 2. Routing map

| Route | Page file | Layout | Notes |
|---|---|---|---|
| `/` | `pages/index.vue` | `default` | Home |
| `/purohits` | `pages/purohits/index.vue` | `default` | List of 12 |
| `/purohits/[slug]` | `pages/purohits/[slug].vue` | `default` | Profile (canary) |
| `/calendar` | `pages/calendar.vue` | `default` | Panchangam |
| `/book` | `pages/book/index.vue` | `default` | Redirects to step 1 |
| `/book/choose-ritual` | `pages/book/[step].vue` | `default` | Step 1 of 5 |
| `/book/configure` | `pages/book/[step].vue` | `default` | Step 2 of 5 |
| `/book/family-details` | `pages/book/[step].vue` | `default` | Step 3 of 5 |
| `/book/match-purohit` | `pages/book/[step].vue` | `default` | Step 4 of 5 |
| `/book/confirm` | `pages/book/[step].vue` | `default` | Step 5 of 5 |
| `/antyeshti` | `pages/antyeshti.vue` | **`solemn`** | No page transition |
| `/pricing` | `pages/pricing.vue` | `default` | |
| `/partners` | `pages/partners/index.vue` | `default` | Placeholder for now |

---

## 3. Layouts

### `layouts/default.vue`

```vue
<template>
  <div class="min-h-screen bg-bg flex flex-col">
    <SiteNav />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
```

### `layouts/solemn.vue`

Same shape, but:
- `<SiteNav cta-label="Request a Purohit" cta-tone="solemn" />`
- `<SiteFooter>` background stays ink-black
- The route metadata disables the page transition (handled at the route level — see § 5)

---

## 4. Composables (data layer)

The pages never import JSON directly. They always go through a composable. This means when we wire real backends in Phase 6, only the composables change — pages stay untouched.

### `composables/usePurohits.ts`

```ts
import purohits from '~/data/purohits.json'

export const usePurohits = () => {
  const list = computed(() => purohits)

  const findBySlug = (slug: string) =>
    purohits.find(p => p.slug === slug)

  const filterBy = (filters: { ritual?: string; city?: string }) =>
    purohits.filter(p => {
      if (filters.ritual && !p.specialties.includes(filters.ritual)) return false
      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false
      return true
    })

  return { list, findBySlug, filterBy }
}
```

### `composables/useBookingState.ts`

```ts
import { useLocalStorage } from '@vueuse/core'

export interface BookingState {
  ritualSlug: string | null
  date: string | null
  timeWindow: 'morning' | 'afternoon' | 'evening' | null
  location: string | null
  considerations: string
  family: Record<string, any>
  selectedPurohitSlug: string | null
}

const empty: BookingState = {
  ritualSlug: null,
  date: null,
  timeWindow: null,
  location: null,
  considerations: '',
  family: {},
  selectedPurohitSlug: null,
}

export const useBookingState = () => {
  const state = useLocalStorage<BookingState>('sanatanasetu-booking-state', empty)

  const reset = () => { state.value = { ...empty } }

  const isStepComplete = (step: string) => {
    switch (step) {
      case 'choose-ritual': return !!state.value.ritualSlug
      case 'configure': return !!state.value.date && !!state.value.location
      case 'family-details': return Object.keys(state.value.family).length > 0
      case 'match-purohit': return !!state.value.selectedPurohitSlug
      default: return false
    }
  }

  return { state, reset, isStepComplete }
}
```

### `composables/useCalendar.ts`

Returns today's panchangam data (from placeholder JSON for now) and the upcoming festivals list. Real implementation will call the Drik Ganitha API in Phase 6.

---

## 5. Motion: the column-wipe page transition

This is the signature visual element. Implementation in `app.vue`:

```vue
<template>
  <NuxtLayout>
    <NuxtPage :transition="pageTransitionConfig" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useColumnWipe } from '~/composables/useColumnWipe'

const route = useRoute()

// Antyeshti is exempt — instant swap, no animation
const pageTransitionConfig = computed(() => {
  if (route.path === '/antyeshti') {
    return { name: 'none', mode: 'out-in' as const }
  }
  return {
    name: 'column-wipe',
    mode: 'out-in' as const,
    onBeforeEnter: useColumnWipe().onBeforeEnter,
    onEnter: useColumnWipe().onEnter,
    onLeave: useColumnWipe().onLeave,
  }
})
</script>
```

### The column wipe logic (`composables/useColumnWipe.ts`)

```ts
import gsap from 'gsap'

let lastTransitionAt = 0

export const useColumnWipe = () => {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const numColumns = computed(() => {
    if (process.server) return 5
    return window.innerWidth < 768 ? 3 : 5
  })

  // If we just transitioned (within 3s), fall back to a simple crossfade
  // to prevent the wipe from feeling repetitive on rapid clicks
  const shouldUseFallback = () => Date.now() - lastTransitionAt < 3000

  const onLeave = (el: HTMLElement, done: () => void) => {
    if (reducedMotion.value) {
      gsap.to(el, { opacity: 0, duration: 0.1, onComplete: done })
      return
    }
    if (shouldUseFallback()) {
      gsap.to(el, { opacity: 0, duration: 0.2, onComplete: done })
      return
    }

    // Build the column overlay
    const overlay = document.createElement('div')
    overlay.className = 'column-wipe-overlay'
    overlay.style.position = 'fixed'
    overlay.style.inset = '0'
    overlay.style.zIndex = '9999'
    overlay.style.pointerEvents = 'none'
    overlay.style.display = 'grid'
    overlay.style.gridTemplateColumns = `repeat(${numColumns.value}, 1fr)`

    const cols: HTMLElement[] = []
    for (let i = 0; i < numColumns.value; i++) {
      const col = document.createElement('div')
      col.style.background = 'var(--paper, #FBF8F1)'
      col.style.transform = 'translateY(-101%)'
      overlay.appendChild(col)
      cols.push(col)
    }
    document.body.appendChild(overlay)

    gsap.to(cols, {
      y: '0%',
      duration: 0.4,
      ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
      stagger: 0.04,
      onComplete: () => {
        lastTransitionAt = Date.now()
        // Hand off — Nuxt swaps content while columns are at full coverage
        done()

        // Then wipe the columns back out (on next tick, so new page is in)
        requestAnimationFrame(() => {
          gsap.to(cols, {
            y: '101%',
            duration: 0.35,
            ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
            stagger: 0.04,
            onComplete: () => overlay.remove(),
          })
        })
      },
    })
  }

  const onEnter = (el: HTMLElement, done: () => void) => done()
  const onBeforeEnter = (el: HTMLElement) => {}

  return { onLeave, onEnter, onBeforeEnter }
}
```

**Notes:**
- Total animation duration: ~750ms (400 down + 350 up, with a brief overlap at full coverage)
- The `paper` color (`#FBF8F1`) is the wipe fill — slightly lighter than the page background so the wipe is visible against `--bg #F6F1E8`
- `prefers-reduced-motion` users get a 100ms crossfade
- Antyeshti is exempt at the route level
- A rapid second transition (within 3s) downgrades to a 200ms crossfade

### CSS (in `assets/css/main.css`)

```css
@media (prefers-reduced-motion: reduce) {
  .column-wipe-overlay { display: none !important; }
}
```

---

## 6. Forms (VeeValidate + Zod)

Every form uses this pattern. Example for Antyeshti:

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = toTypedSchema(z.object({
  name: z.string().min(1, 'Please share a name we can call you by'),
  phone: z.string().regex(/^[+0-9\s-]{10,}$/, 'Phone number does not look right'),
  location: z.string().min(2, 'Where are the rites being held?'),
}))

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
})

const [name, nameAttrs] = defineField('name')
const [phone, phoneAttrs] = defineField('phone')
const [location, locationAttrs] = defineField('location')

const onSubmit = handleSubmit(async (values) => {
  await $fetch('/api/antyeshti-request', {
    method: 'POST',
    body: values,
  })
  await navigateTo('/antyeshti/confirmed')
})
</script>

<template>
  <form @submit="onSubmit">
    <FormInput v-model="name" v-bind="nameAttrs" label="YOUR NAME" :error="errors.name" />
    <FormInput v-model="phone" v-bind="phoneAttrs" label="PHONE NUMBER" :error="errors.phone" />
    <FormInput v-model="location" v-bind="locationAttrs" label="LOCATION" :error="errors.location" />
    <ButtonLarge label="Request a Purohit" variant="solemn" />
  </form>
</template>
```

---

## 7. Deployment

**Recommended: Vercel.** Reasons:
- Native Nuxt 3 support
- View Transitions work out of the box
- Edge functions for the panchangam API later
- Image optimization built in
- Free tier covers pre-launch volume

**Alternative: Netlify.** Equivalent. Founder picks.

### Environment variables

```
NUXT_PUBLIC_SITE_URL=https://sanatanasetu.com
NUXT_PUBLIC_SUPPORT_EMAIL=hello@sanatanasetu.com
NUXT_ANTYESHTI_NOTIFICATION_EMAIL=antyeshti@sanatanasetu.com
NUXT_ANTYESHTI_NOTIFICATION_PHONE=+91[number]
NUXT_BOOKING_NOTIFICATION_EMAIL=bookings@sanatanasetu.com
NUXT_PANCHANGAM_API_KEY=[blocked on choice of provider]
```

### Build commands

- **Install:** `pnpm install`
- **Dev:** `pnpm dev` → http://localhost:3000
- **Build:** `pnpm build`
- **Preview:** `pnpm preview`
- **Type check:** `pnpm typecheck`

### Robots + sitemap

- Pre-launch: `robots.txt` disallows all crawling
- Launch: open up, generate sitemap with `@nuxtjs/sitemap`

---

## 8. Performance budget

| Metric | Budget |
|---|---|
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.0s |
| Cumulative Layout Shift | < 0.05 |
| Total Blocking Time | < 200ms |
| JS bundle (first load) | < 150 KB gzipped |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |

If any of these regress, the build fails CI.

---

## 9. The Antyeshti exception (in one place)

Because this comes up across multiple files, I'm consolidating the rules here:

1. Layout: `solemn.vue` (not `default.vue`)
2. Nav CTA: "Request a Purohit" with `--solemn` background (not "Book a Purohit" with `--ink`)
3. Page transition: **disabled** — instant swap
4. Color accent: `--solemn` brown (`#7A4F3A`), not `--accent` kumkum (`#C8472D`)
5. Form fields: exactly 3 (name, phone, location). No email, no preferred Purohit, no date picker
6. Analytics: **no events fire** from this page or its `/confirmed` follow-up. If/when analytics are added in Phase 6, this route is excluded at the tracking-library level
7. SLA: founder commits to a 4-hour callback. The page promises this. Staffing decision is open.
8. The page title in the browser tab is "Antyeshti — SanatanaSetu" (not "Request a Purohit | SanatanaSetu" — keep the page name first, restrained)
