# plan.md

**Read `CLAUDE.md` first.** This document is the execution plan; that one is the rules.

This plan is broken into 6 phases. Each phase has a clear "done" state. Do not start a phase until the previous one passes the checks at its end. Phases are roughly equal in time. Estimated total: 10-14 working days for an experienced Vue developer working with an AI assistant, possibly faster if Antigravity output is clean on the first pass.

---

## Phase 0 — Project bootstrap (½ day)

### Tasks
1. `npx nuxi@latest init sanatanasetu` — create Nuxt 3 project
2. Install dependencies:
   ```bash
   pnpm add -D @nuxtjs/tailwindcss @nuxt/fonts @vueuse/nuxt
   pnpm add vee-validate @vee-validate/zod zod gsap
   ```
3. Create `nuxt.config.ts` with modules: `@nuxtjs/tailwindcss`, `@nuxt/fonts`, `@vueuse/nuxt`. Enable `experimental.viewTransition: true`.
4. Create `tailwind.config.ts` with the full token system (colors, fontFamily, fontSize, spacing). The token map is in `design-system.md` section 2. Copy it exactly.
5. Create `assets/css/main.css` with:
   - `@tailwind base; @tailwind components; @tailwind utilities;`
   - `:root` CSS variables for the 6 color tokens (so non-Tailwind code can reference them too)
   - `@font-face` declarations (or rely on `@nuxt/fonts`)
   - `prefers-reduced-motion` override for the page transition
6. Create `app.vue` with `<NuxtLayout><NuxtPage /></NuxtLayout>` and the `pageTransition` config (see `architecture.md` § 5).
7. Set up `layouts/default.vue` (which holds the site nav and footer).

### Phase 0 done when
- `pnpm dev` runs without errors
- A blank page renders at `/` with the right cream background (`#F6F1E8`)
- Fonts load and `font-bricolage` / `font-inter` / `font-baskerville` classes work
- Tailwind classes use the token system (e.g., `text-h-110` not `text-[110px]`)

---

## Phase 1 — Design system primitives (1½ days)

Build the 5 visual unit components. These are used everywhere. Build them first, build them right, never touch them again.

### Components to create in `components/ui/`

1. **`StatusPill.vue`** — 20px tall, padding 4/9–10, 10px text size, hugs content
   - Props: `label` (string), `tone` (`'live' | 'opens-q3-2026' | 'verified' | 'neutral'`)
2. **`ButtonSmall.vue`** — ~36px tall, padding 10/16, 16px text, hugs content. Used for secondary actions (filter pills, "Read more").
   - Props: `label` (string), `variant` (`'primary' | 'outline'`), `iconRight` (boolean, default `true` shows `→`)
3. **`ButtonLarge.vue`** — ~43px tall, padding 13/18, 16px text, hugs content. Used for hero CTAs, Antyeshti submit, booking primary.
   - Props: `label`, `variant` (`'ink' | 'solemn'`), `iconRight`
4. **`FormInput.vue`** — 48px tall, padding 14/16, 16px text. Taller than buttons deliberately.
   - Props: `label`, `placeholder`, `helpText`, `modelValue` (v-model), `error`
5. **`SectionBand.vue`** — 64px tall full-width hairline strip with `01 · LABEL · SUBTITLE / 01 / 04` metadata
   - Props: `number` (string, e.g. `"01"`), `label`, `subtitle`, `position` (e.g. `"01 / 04"`), `tone` (`'ink' | 'solemn'`)

### Two more shared components

6. **`SiteNav.vue`** — the locked navigation (logo + 5 nav links + Sign in + Book a Purohit CTA). Props: `ctaLabel` (default `'Book a Purohit'`), `ctaTone` (`'ink' | 'solemn'`, default `'ink'`)
7. **`SiteFooter.vue`** — the big wordmark footer

### Phase 1 done when
- Each component renders independently on a `/dev/components` route (delete this route before deploying)
- Each component matches its Figma reference frame pixel-for-pixel at 1440px viewport
- No component uses absolute positioning
- No magic numbers in JSX/template — all values come from Tailwind token classes

---

## Phase 2 — Layout + Home page (2 days)

### Tasks
1. Build `layouts/default.vue` — renders `<SiteNav>`, `<slot>`, `<SiteFooter>`
2. Build `pages/index.vue` (the home page). Section breakdown:
   - Hero (2 columns: left = headline + mission + CTAs; right = 3-stat triplet). Headline is 92px on this page (documented exception).
   - Dark photographic band placeholder (use `bg-ink` with a `[real photo TBD]` text overlay until real images arrive)
   - Devotees section: section band "01" + 4 list rows, each 140px tall, with status pill BESIDE CTA horizontally
   - Partners section: section band "02" + 4 list rows, same shape
   - Institutions section: dark card with notify form
   - Antyeshti referral section: solemn band, --solemn CTA, quieter 68px Bricolage Medium headline
   - Big wordmark footer (handled by layout)
3. All list rows are `h-[140px]` exactly. Content is vertically centered.
4. Eyebrow text uses three scripts: English · Telugu · Sanskrit. See `design-system.md` § 4 for the Telugu font range trick.

### Phase 2 done when
- `/` matches the Figma frame `/ — Home (V3)` at 1440px viewport
- All 8 list rows are exactly 140px tall (Devotees + Partners)
- No console errors
- Lighthouse performance ≥ 90, accessibility ≥ 95 on a local build

---

## Phase 3 — Browse + Profile + Calendar (3 days)

### Tasks
1. `pages/purohits/index.vue` — list page
   - Hero: "Verified Purohits. Named lineages." + filter pill row
   - Section band "01"
   - 12 list rows (one per Purohit), each 120px tall, with [num, name+lineage, specialty, location, years, View profile CTA]
   - All data goes through `composables/usePurohits.ts` which returns the placeholder array. When real data is wired, only the composable changes.
   - Dark verification band at the bottom with "Read the verification charter" CTA
2. `pages/purohits/[slug].vue` — profile page (the canary)
   - This is the editorial profile. Reuses the design system completely.
   - Section breakdown documented in Figma frame `CANARY V3 · Purohit profile (structure on cream)`.
3. `pages/calendar.vue`
   - "Panchangam" three-script eyebrow
   - Today card with 4-cell detail grid (Nakshatra, Yoga, Karana, Muhurtham)
   - Upcoming festivals list (100px rows)
   - Regional variance prose section
   - All panchangam data lives in `composables/useCalendar.ts` — placeholder data only, marked with `[verify with panchangam scholar]`

### Phase 3 done when
- `/purohits` renders all 12 placeholder rows with consistent 120px height
- `/purohits/[slug]` works for each of the 12 placeholder slugs (`sri-anand-sastry`, etc.)
- `/calendar` renders today + upcoming festivals
- Filter pills on `/purohits` are visual only for now (filtering logic comes in Phase 5)

---

## Phase 4 — Booking flow + Antyeshti + Pricing (3 days)

This phase has the most form complexity. Use VeeValidate + Zod from the start. Do not roll custom validation.

### Tasks
1. `pages/book/index.vue` — redirects to `/book/choose-ritual`
2. `pages/book/[step].vue` — single dynamic route handling 5 steps:
   - `choose-ritual` → grid of ritual options
   - `configure` → date, time window, location, considerations (this is the one shown in the Figma frame)
   - `family-details` → jatakams, family member info
   - `match-purohit` → list of matched Purohits, select one
   - `confirm` → review + submit
   - State persisted in `composables/useBookingState.ts` using `useLocalStorage` from VueUse so refresh doesn't kill the flow.
3. `pages/antyeshti.vue` — the solemn-variant page. Specific notes:
   - **No `<NuxtPage>` page transition on this route.** See `architecture.md` § 5 for how to disable per-route.
   - **No analytics events. No tracking pixels.**
   - Dark hero with form on the right (3 fields only: name, phone, location)
   - On submit: POST to `/api/antyeshti-request` and route to a confirmation page
   - All accent colors are `--solemn` (brown), not `--accent` (kumkum)
4. `pages/pricing.vue`
   - Hero "Three numbers. No hidden fees."
   - Three mechanism rows (deposit / commission / minimum)
   - Dark "What we will not take" band
   - Worked example table
   - FAQ rows
   - All numbers are placeholders (`₹ [fee]`, `[%]`). Do not invent values.

### Phase 4 done when
- The booking flow walks through all 5 steps with state preserved across refresh
- Antyeshti form submits a POST to a stub `/api/antyeshti-request` endpoint that just `console.log`s the payload (real handler is a Phase 6 task)
- Pricing page renders all three sections
- Antyeshti page has no transition animation when navigated to or away from
- All forms validate with VeeValidate + Zod (no native HTML validation)

---

## Phase 5 — Motion, polish, responsive (2 days)

### Tasks
1. **Column-wipe page transition** — see `architecture.md` § 5 for full implementation. 5 columns desktop, 3 columns mobile. Cream fill. 700-750ms total. Cubic-bezier easing. Antyeshti exempt. Repeat within 3 seconds → fade fallback. `prefers-reduced-motion` → 100ms crossfade.
2. **Responsive collapse rules:**
   - 1440 → 768: multi-column hero becomes single-column. Stats stack vertically.
   - 768 → 380: list rows stack (number above, content below, CTA full-width)
   - Section bands stay edge-to-edge at every breakpoint
   - Page gutter: 56 → 32 → 20
3. **Filter logic** for `/purohits` — clicking a pill filters the visible list. Use a `ref` array of selected filters. No URL params for now (Phase 6 task).
4. **Hairline scroll-reveal** — when a section band scrolls into view, the top/bottom hairlines should draw in from the center over 600ms. Use `@vueuse/core`'s `useElementVisibility` with a CSS transform.
5. **Focus states** — every interactive element must have a 2px ink outline on `:focus-visible`. Test by tabbing through every page.

### Phase 5 done when
- Page navigation triggers the column-wipe (everywhere except `/antyeshti`)
- All pages collapse cleanly to mobile (test in DevTools at 380px)
- Filter pills on `/purohits` actually filter the list
- Reduced-motion users get instant crossfade transitions
- All focus states visible and consistent

---

## Phase 6 — Backend wiring + launch prep (2 days)

This phase replaces stubs with real backends.

### Tasks
1. **API routes** in `server/api/`:
   - `POST /api/antyeshti-request` — writes to a database or sends an email to coordinator + WhatsApp notification. Founder will specify the destination.
   - `POST /api/booking/start` — creates a booking record, returns ID for state persistence
   - `POST /api/booking/:id/step` — saves each step's data
   - `POST /api/booking/:id/confirm` — finalizes booking, sends notifications
   - `GET /api/purohits` — list (eventually queries DB)
   - `GET /api/purohits/:slug` — profile
   - `GET /api/calendar/today?location=...` — panchangam for a date
2. **URL params for filters** — `/purohits?ritual=muhurtham&city=hyderabad` should preselect filters
3. **Real fonts loaded from local files** — at this point swap from Google Fonts CDN to self-hosted to remove the external dependency
4. **Sitemap + robots.txt** — use `@nuxtjs/sitemap`
5. **Open Graph + Twitter Card images** — generate one per page route
6. **Analytics decision** — founder confirms which analytics tool (or none) is acceptable. **Antyeshti page is excluded regardless.**
7. **Lighthouse pass** — perf ≥ 95, a11y ≥ 95, SEO ≥ 95 on production build

### Phase 6 done when
- All forms submit to real endpoints
- Filter URL params work
- Production build deploys cleanly to Vercel/Netlify
- Sitemap is correct
- No external font CDN requests

---

## Things explicitly NOT in this plan

These are out of scope for the launch site. Don't build them, don't propose them, don't sneak them in.

- A blog or editorial CMS
- User accounts / login (the booking flow works without an account by design)
- A Purohit-facing dashboard (separate codebase, separate phase)
- A native mobile app
- Chat widgets, exit-intent modals, scroll-triggered popups
- Multilingual UI translation (the three-script eyebrows are a design element, not full i18n)
- Recommendation engines, ML, anything resembling "personalization"
- Reviews / ratings (founder is intentionally against the Yelp model for sacred work)

If anyone asks for any of the above mid-build, the answer is "post-launch, after we know what real users want."

---

## How to know we're done

The launch site is done when:

1. All 7 routes render at 1440px and at 380px without overflow, clipping, or layout shift
2. The booking flow completes end-to-end from `/purohits` through `/book/confirm`
3. The Antyeshti form submits and the confirmation page renders within 100ms (no transition)
4. Lighthouse passes on all routes
5. The founder has reviewed every page in production once and given written go-ahead
6. The `[placeholder]` audit has been run and every remaining placeholder has a tracked GitHub issue assigned to a human, not an AI
