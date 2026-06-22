# logic-explained.md

**What this file is:** A plain-language explanation of every piece of logic in the SanatanaSetu codebase. Updated every time code is written. Read this to understand what the code does, why it was written that way, and where the security boundaries are.

**Who this is for:** Phani Raj (founder). You don't need to know Vue.js to read this. By the time you do know Vue.js, this file will help you audit every decision.

**How to use it:** Read top-to-bottom as a learning path, or Ctrl+F for a specific file name when you want to understand something. Every section links back to the source file.

---

## Table of Contents

- [Concepts You'll See Everywhere](#concepts-youll-see-everywhere)
- [Phase 0 — Project Bootstrap](#phase-0--project-bootstrap)
- [Phase 1 — Design System Components](#phase-1--design-system-components)
- [Phase 2 — Home Page](#phase-2--home-page)
- [Phase 3 — Browse + Profile + Calendar](#phase-3--browse--profile--calendar)
- [Phase 4 — Booking Flow + Antyeshti + Pricing](#phase-4--booking-flow--antyeshti--pricing)
- [Phase 5 — Motion + Polish + Responsive](#phase-5--motion--polish--responsive)
- [Phase 6 — Backend Wiring + Launch Prep](#phase-6--backend-wiring--launch-prep)
- [Security Decisions Log](#security-decisions-log)

---

## Concepts You'll See Everywhere

These are the building blocks. I'll explain each one here once, then reference them in the per-file sections.

### Vue 3 — What It Is

Vue is a JavaScript framework for building user interfaces. Instead of writing raw HTML that's static, Vue lets you write **templates** where the content reacts to data changes. If a variable changes, the page updates automatically — you don't manually find the element and update it.

**Example in plain English:** Imagine a form where someone types their name. In raw HTML/JavaScript, you'd write code to listen for keyboard input, grab the text, and manually update the display. In Vue, you say "this input is connected to a variable called `name`" and both the input and any display of `name` stay in sync automatically.

### `<script setup>` — Vue's Modern Syntax

Vue components have three parts: `<script>` (logic), `<template>` (HTML structure), `<style>` (CSS). The `<script setup>` syntax is Vue 3's shorthand. Everything you declare inside it — variables, functions, imports — is automatically available in the template. No boilerplate.

```vue
<script setup>
// This variable is automatically available in the template below
const greeting = 'Hello'
</script>

<template>
  <p>{{ greeting }}</p>  <!-- Renders: Hello -->
</template>
```

### `ref()` and `computed()` — Reactive Data

- **`ref()`** — wraps a value so Vue tracks changes to it. When the value changes, anything using it re-renders.
  ```ts
  const count = ref(0)       // count.value is 0
  count.value = 5            // Now anything showing count re-renders
  ```

- **`computed()`** — a value derived from other reactive values. It auto-recalculates when its dependencies change.
  ```ts
  const doubled = computed(() => count.value * 2)  // Always 2× count
  ```

### Props — How Components Receive Data

A prop is data passed from a parent component to a child. Think of it as a function parameter but for UI components.

```vue
<!-- Parent passes data -->
<ButtonLarge label="Book a Purohit" variant="ink" />

<!-- Child declares what it accepts -->
<script setup>
defineProps<{ label: string; variant: 'ink' | 'solemn' }>()
</script>
```

The child can READ props but should never MODIFY them. Data flows one way: parent → child.

### `v-model` — Two-Way Binding for Forms

When a user types in an input, `v-model` keeps the variable and the input in sync:

```vue
<input v-model="name" />
<!-- If the user types "Phani", name.value becomes "Phani" -->
<!-- If code sets name.value = "Raj", the input shows "Raj" -->
```

Under the hood, `v-model` is shorthand for `:value="name"` (pass data down) + `@input="name = $event"` (listen for changes up).

### Nuxt 3 — What It Adds on Top of Vue

Nuxt is a framework built ON TOP of Vue. Vue handles the UI; Nuxt adds:
- **File-based routing** — a file at `pages/pricing.vue` automatically becomes the `/pricing` URL
- **Server-side rendering** — pages render on the server first (faster initial load, better SEO)
- **Auto-imports** — you don't need to write `import { ref } from 'vue'`; Nuxt does it for you
- **Server API routes** — files in `server/api/` become backend endpoints without a separate server
- **Layouts** — shared wrappers (nav + footer) that multiple pages use

### Composables — Reusable Logic

A composable is a function that encapsulates reactive logic so multiple components can use it. Named `useXxx()` by convention.

```ts
// composables/usePurohits.ts
export const usePurohits = () => {
  const list = computed(() => purohits)          // all purohits
  const findBySlug = (slug) => purohits.find(p => p.slug === slug)  // one purohit
  return { list, findBySlug }
}

// In any page:
const { list, findBySlug } = usePurohits()
```

**Why this matters for SanatanaSetu:** Right now `usePurohits` reads from a JSON file. In Phase 6, it will call an API. Because pages use the composable (not the JSON directly), only the composable needs to change — every page stays untouched.

### Tailwind CSS — Utility-First Styling

Instead of writing CSS in a separate file, you apply pre-built classes directly in HTML:

```html
<!-- Traditional CSS: write a class, define it elsewhere -->
<div class="hero-section">...</div>

<!-- Tailwind: describe the style inline with utility classes -->
<div class="bg-ink text-paper px-14 py-24">...</div>
```

`bg-ink` = background color is `--ink` (#1A1614). `px-14` = horizontal padding 56px. These come from `tailwind.config.ts` where our design tokens are defined.

### TypeScript — JavaScript with Type Safety

TypeScript adds type annotations to JavaScript. It catches errors BEFORE the code runs.

```ts
// JavaScript: no one knows what this function expects
function greet(name) { return 'Hello ' + name }

// TypeScript: if you pass a number, the editor screams at you
function greet(name: string): string { return 'Hello ' + name }
```

For SanatanaSetu, TypeScript ensures that a `BookingState` always has the right shape — you can't accidentally save a booking without a location.

### Zod — Runtime Validation

TypeScript checks types at BUILD time. But when a user submits a form, the data arrives at RUNTIME — TypeScript can't help there. Zod validates data at runtime:

```ts
const schema = z.object({
  name: z.string().min(1, 'Please share a name'),
  phone: z.string().regex(/^[+0-9\s-]{10,}$/, 'Phone number does not look right'),
})

// If the data doesn't match, Zod throws an error with the message
schema.parse({ name: '', phone: 'abc' })  // THROWS: name too short, phone invalid
```

**Security angle:** Zod runs on BOTH client and server. The client validates for UX (instant feedback). The server validates for security (never trust browser data).

### VeeValidate — Vue Form Library

VeeValidate connects Zod schemas to Vue forms. It handles:
- Showing error messages under each field
- Preventing submission until all fields are valid
- Tracking which fields the user has touched (don't show errors before they've tried)

### GSAP — Animation Library

GreenSock Animation Platform. We use it for one thing: the column-wipe page transition. CSS transitions can't do staggered multi-element animations reliably across browsers. GSAP can.

---

## Phase 0 — Project Bootstrap

*This section will be filled when Phase 0 is built. Each file will get its own subsection explaining:*
- *What the file does*
- *Why each config option was chosen*
- *What would break if you changed it*
- *Security implications (if any)*

### `nuxt.config.ts`
This is the command center for Nuxt. I enabled the required modules:
- `@nuxtjs/tailwindcss` injects Tailwind into our build process.
- `@nuxt/fonts` automatically downloads and serves Google Fonts locally (Bricolage, Inter, Libre Baskerville, Noto Sans Telugu) so we don't depend on external network requests, which improves load time and privacy.
- `@vueuse/nuxt` gives us utility composables (like `useLocalStorage` which we'll need for booking state).
I also added `gsap` to `build.transpile` so it works properly with Server-Side Rendering (SSR).

### `tailwind.config.ts`
Here I translated the tokens from `design-system.md` into Tailwind config.
- Colors point to CSS variables (like `var(--bg)`). This keeps the actual hex codes in one place (`main.css`), making it easier if we ever wanted to swap a theme at runtime (though we don't right now).
- The font size scale is explicit (`h-10`, `h-16`, etc.) and includes specific line-heights and letter-spacing per the Figma specs. We didn't use default sizes like `text-xl` to ensure we don't stray from the golden ratio scale.
- We did NOT rename `ink` and `paper` to generic names like `primary` and `secondary`. This prevents confusion—these names describe what the color *is*, not a theoretical semantic role.

### `assets/css/main.css`
This file defines the actual hex values for our tokens inside the `:root` block. It also handles the accessibility baseline:
- `body { @apply bg-bg text-ink font-inter antialiased; }` sets the default styling globally.
- `@media (prefers-reduced-motion: reduce)` is a critical accessibility feature. If a user has animations disabled in their OS settings (common for vestibular disorders), this block forces all animations and transitions to instantly complete (`0.01ms`).

### `app.vue`
This is the root component of the entire app. It simply tells Nuxt to render the current Layout (like the standard nav+footer) and inside that, render the current Page (like Home or Antyeshti). Later, we will attach the global GSAP column-wipe transition logic here.

---

## Phase 1 — Design System Components

*Each component is designed strictly to avoid arbitrary overrides (we use explicit props like `variant="ink"` instead of generic classes). This guarantees visual consistency.*

### `components/ui/StatusPill.vue`
**What it does:** Displays the small tags (like "Live" or "Verified").
**Logic:** It takes a `tone` prop. We compute the tailwind classes via a `switch` statement in the `<script setup>`. If `tone === 'live'`, we also render a small red dot `<span class="w-1 h-1 rounded-full bg-accent">`. This prevents having to write `bg-accent` everywhere manually.

### `components/ui/ButtonSmall.vue` & `ButtonLarge.vue`
**What they do:** Primary interactive elements.
**Logic:** They use Nuxt's `resolveComponent('NuxtLink')` conditionally. If you pass a `to` prop, it acts as a link `<NuxtLink to="...">`. If you don't, it acts as a regular `<button>`. This is an essential Vue pattern—it lets us use the exact same styling for buttons and links without duplicating code. I also added strict focus rings (`focus-visible:ring-2`) for keyboard accessibility.

### `components/ui/FormInput.vue`
**What it does:** A unified text input with built-in labeling and error handling.
**Logic:**
- Takes `modelValue` and emits `update:modelValue`. This enables Vue's `v-model` binding so the parent component can easily read the input data.
- Handles `aria-invalid` and `aria-describedby` automatically based on the `error` prop. This means screen readers will announce if a field is invalid without any extra work from the developer.
- Generates a unique `id` if none is provided (`Math.random().toString(36)`) so the `<label for="...">` always correctly connects to the `<input>`.

### `components/ui/SectionBand.vue`
**What it does:** Wraps page sections in the correct background color and sets the standard 1440px max-width container inside.
**Logic:** Takes `padTop` and `padBottom` props mapped to specific Tailwind padding classes (`pt-8`, `pb-16`, etc.). This enforces the 4-multiple spacing system and stops developers from using arbitrary padding.

### `components/ui/SiteNav.vue` & `SiteFooter.vue`
**What they do:** The global navigation and footer.
**Logic:** Simple static links with strict hover effects. They use `sticky top-0 z-50` for the nav so it follows the user down the page.

### Page Blocks
These are larger, composite components composed of the UI primitives above.
- **`ThreeScriptEyebrow.vue`**: Uses the `lang="sa"` and `lang="te"` HTML attributes. This is critical for screen readers and SEO when mixing languages on a single page, telling the browser which pronunciation engine/dictionary to use.
- **`ListRow.vue`**: The standard row used in Purohits and Antyeshti lists. Contains hover effects that scale the image and change the row background.
- **`StatTriplet.vue`**: Uses CSS Grid (`grid-cols-1 md:grid-cols-3`) to neatly divide 3 stats across the screen. We use `divide-x` and `divide-y` for the borders between stats so we don't have to manage border logic manually.

### `components/ui/SiteNav.vue`
*(Will explain: two variants (default vs solemn), CTA label swap on Antyeshti)*

### `components/ui/SiteFooter.vue`
*(Will explain: the wordmark footer, three label columns)*

---

## Phase 2 — Home Page

The Home Page (`pages/index.vue`) acts as an orchestration of the Phase 1 components.
- We don't define any arbitrary typography or spacing here.
- It strictly imports `SectionBand`, `ThreeScriptEyebrow`, `StatTriplet`, etc.
- **Data flow:** We pass props downward. For example, `imageSrc` and `statusLabel` are passed to `ListRow`. This keeps `ListRow` generic and reusable.
- **Layout selection:** We don't explicitly declare the layout inside `index.vue` because `default.vue` is automatically used by Nuxt for all pages unless overriden with `definePageMeta({ layout: 'solemn' })`. We'll use the latter for `/antyeshti`.

---

## Phase 3 — Browse + Profile + Calendar

In Phase 3, we implemented data-driven dynamic pages using `purohits.json`.

### `composables/usePurohits.ts`
**What it does:** Centralizes the logic to fetch Purohits data. 
**Vue Logic:** By keeping this in a composable (`usePurohits`), we decouple the data source from the UI. Right now it loads a JSON file, but if we later switch to a REST API or a database, we only have to change the code in this one file, and the entire app will instantly work with the new data source.

### `pages/purohits/index.vue`
**What it does:** The directory browse page with pill filters.
**Vue Logic:** We use `ref('All twelve')` to store the active filter and `computed` to filter the purohits array dynamically. In Vue, `computed` properties are highly efficient because they cache their result and only re-calculate when `activeFilter` changes.

### `pages/purohits/[slug].vue`
**What it does:** The profile page (built to exactly match the Figma design screenshot).
**Vue Logic:** This uses Nuxt's dynamic routing. The file name `[slug].vue` tells Nuxt that whatever string comes after `/purohits/` should be accessible via `route.params.slug`. We use this slug to fetch the specific Purohit's data. If no Purohit is found, we use `createError({ statusCode: 404 })` to safely break execution.

### `components/ui/AccordionRow.vue`
**What it does:** The "Bring him these questions" section.
**Vue Logic:** Uses a reactive `isOpen` ref. When clicked, it toggles `isOpen = !isOpen`. We bind this to the template using `:class` to transition the `max-height` and `opacity` for a smooth, CSS-only expand/collapse animation without needing heavy JavaScript animation libraries.

### `pages/calendar.vue`
**What it does:** The Dharma Calendar page.
**Vue Logic:** We use native JavaScript `Intl.DateTimeFormat` to generate the "Today" date string in a localized format without needing heavy external date libraries like `moment.js` or `date-fns`.

---

## Phase 4 — Booking Flow

In Phase 4, we built a 5-step booking flow using Vue and Nuxt composables.

### `composables/useBookingState.ts`
**What it does:** It stores the state of the user's booking (the ritual they chose, their preferred date, time, and location).
**Vue Logic:** We used Nuxt's `useCookie` instead of plain `localStorage`. The reason is that cookies are sent to the server. This allows Nuxt to server-side render (SSR) the booking page correctly right away, without the page "flickering" while it waits for JavaScript to load on the client. It provides a robust, seamless experience if the user refreshes their page mid-booking.

### `app/pages/book/configure.vue` (and other steps)
**What it does:** These pages handle the forms.
**Vue Logic:** We used `vee-validate` paired with `zod`. `zod` acts as our strict schema validator (e.g. "this field must be a string", "this field is required"). `vee-validate` binds to our form inputs and handles the error states automatically. We don't have to write messy `v-if` statements everywhere to check if a field is valid!

## Phase 5 — Pricing & Antyeshti

In Phase 5, we brought everything together by building the final standalone pages.

### `app/pages/antyeshti.vue`
**What it does:** The solemn booking page for emergency funeral rites.
**Vue Logic:** We used the `layouts/solemn.vue` we created in Phase 2. By defining `definePageMeta({ layout: 'solemn' })` at the top of the Vue component, Nuxt automatically wraps this specific page in the dark, inverted navigation layout. We didn't have to copy-paste the dark navigation code!

### `app/pages/pricing.vue`
**What it does:** The transparent breakdown of costs.
**Vue Logic:** We heavily reused the `<SectionBand>` component here, supplying the correct `number`, `label`, and `position` props so the layout remained mathematically perfect to your Figma designs without rewriting any grid logic.

---

## Phase 5 — Motion + Polish + Responsive
*(Will explain: GSAP column-wipe animation step by step, responsive breakpoint collapse, scroll-reveal)*

---

## Phase 6 — Backend Wiring + Launch Prep
*(Will explain: server API routes, email notifications, sitemap, self-hosted fonts)*

---

## Security Decisions Log

Every security-relevant decision gets logged here with reasoning. Updated as code is written.

### Template for each entry:

```
### [Date] — [Decision]
**File:** [path]
**What:** [what was decided]
**Why:** [reasoning]
**Risk if ignored:** [what could go wrong]
**How to verify:** [how to check this is working]
```

### Entries (will grow as we build):

---

### Pre-build — Form data never goes in URLs

**File:** `composables/useBookingState.ts`
**What:** Booking state (ritual chosen, date, location, family details) lives in localStorage, not URL query parameters.
**Why:** URL data appears in browser history, server access logs, analytics referrer headers, and any link the user shares. Family details and ritual bookings are personal.
**Risk if ignored:** A user shares a URL that contains their booking data. Or the server logs contain family addresses and preferred ritual dates.
**How to verify:** After completing a booking step, check the browser URL bar — it should show `/book/configure` with NO query parameters.

---

### Pre-build — Zod validation runs on BOTH client and server

**File:** Every form + every `server/api/*.ts` handler
**What:** The same Zod schema that validates the form on the client also validates the POST body on the server.
**Why:** Browser-side validation is for UX (instant feedback). Server-side validation is for security. A malicious user can bypass the browser entirely and send raw HTTP requests to the API.
**Risk if ignored:** Someone sends `{ "phone": "<script>alert('hacked')</script>" }` directly to `/api/antyeshti-request`. Without server-side Zod validation, this gets stored or emailed as-is.
**How to verify:** Use `curl` or Postman to send a malformed POST to each API endpoint and confirm it returns a 400 error with a validation message, not a 200.

---

### Pre-build — No analytics on Antyeshti (ever)

**File:** Analytics initialization code (Phase 6)
**What:** The `/antyeshti` route is excluded from ALL analytics at the code level, not via configuration.
**Why:** Configuration can be accidentally changed. A `.env` flag flip shouldn't be able to start tracking grieving families.
**Risk if ignored:** A future developer or config change starts measuring "conversion rate" on the grief form.
**How to verify:** The `antyeshti.spec.ts` test suite includes a test that checks no analytics network requests fire from `/antyeshti`.

---

### Pre-build — No CAPTCHA on Antyeshti form

**File:** `pages/antyeshti.vue`
**What:** The grief form has no CAPTCHA, no "prove you're human" challenge.
**Why:** A family member who just lost someone should not be asked to identify traffic lights. If spam becomes a problem, rate-limit on the server side instead.
**Risk if ignored:** Grief-stricken users abandon the form because they can't solve a CAPTCHA quickly.
**How to verify:** Submit the form — no challenge should appear between clicking "Request a Purohit" and seeing the confirmation.

---

### Pre-build — Placeholder data is never disguised as real data

**File:** All `[fee]`, `[name]`, `[verify-transliteration]` markers
**What:** Placeholders use square brackets so they're greppable and visually obvious.
**Why:** If a placeholder looks real (`₹ 999`), it might ship to production. If it looks like `₹ [fee]`, a human will catch it during review.
**Risk if ignored:** The site launches with fake pricing that becomes a real commitment to users or investors.
**How to verify:** Run `grep -rn '\[fee\]\|\[%\]\|\[name\]\|\[number\]\|\[verify' --include='*.vue' --include='*.ts' --include='*.json'` and confirm every result has a tracking issue.

---

*More entries will be added as each phase is built. Every time I write code that touches user data, authentication, API endpoints, or external services, a new entry appears here.*
