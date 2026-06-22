# design-system.md

**Read `CLAUDE.md` first.** This document is the visual specification. The Figma file is the source of truth; this is the operational translation of it into tokens, code, and rules.

**Figma file:** https://www.figma.com/design/BPFv7N1agVYdCli9mniRHm/

---

## 1. Identity

**Name:** SanatanaSetu (Sanskrit: "the eternal bridge")

**Voice:** Plain, direct, never marketing. Sentences end. Claims are testable. Promises are kept. No exclamation marks. No emoji. No phrases like "we believe" or "we are passionate about." If we did something, we say we did it. If we will do something, we say we will.

**Visual register: two tracks.**
- **Standard track:** kumkum accent (`#C8472D`), Bricolage Grotesque **Bold** at headline weight, energetic but composed. Used everywhere except Antyeshti.
- **Solemn track:** solemn brown accent (`#7A4F3A`), Bricolage Grotesque **Medium** at headline weight (one weight down — visibly quieter), no kumkum. Used on `/antyeshti` only.

---

## 2. Design tokens

### Colors

```ts
// tailwind.config.ts — colors section
colors: {
  bg:       '#F6F1E8',  // page background (cream)
  ink:      '#1A1614',  // primary text, dark bands, primary CTAs
  'ink-2':  '#3A3230',  // body text on cream
  'ink-3':  '#6E625A',  // muted text, metadata, hairline labels
  paper:    '#FBF8F1',  // dark-band text, slightly lighter than bg (used for column-wipe overlay)
  accent:   '#C8472D',  // kumkum — punctuation only, never large fills
  solemn:   '#7A4F3A',  // brown — antyeshti CTA, antyeshti accents
  'solemn-soft': '#D9C7B3',  // light brown for muted text on dark solemn backgrounds
  line:     '#1A1614',  // hairlines (same as ink, isolated token so we can change weight independently)
},
```

### CSS variables (`assets/css/main.css`)

```css
:root {
  --bg: #F6F1E8;
  --ink: #1A1614;
  --ink-2: #3A3230;
  --ink-3: #6E625A;
  --paper: #FBF8F1;
  --accent: #C8472D;
  --solemn: #7A4F3A;
  --solemn-soft: #D9C7B3;
  --line: #1A1614;
}
```

### Type scale (golden ratio, base 16)

```ts
// tailwind.config.ts — fontSize section
fontSize: {
  // Headline scale (Bricolage Grotesque)
  'h-10':  ['10px', { lineHeight: '1.2', letterSpacing: '0.14em' }],   // caps labels, metadata, status pills
  'h-16':  ['16px', { lineHeight: '1.5', letterSpacing: '-0.005em' }], // body, button labels, all interactive
  'h-26':  ['26px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],  // list items, card titles
  'h-42':  ['42px', { lineHeight: '1.0', letterSpacing: '-0.02em' }],  // subsection headings, card amounts
  'h-68':  ['68px', { lineHeight: '1.0', letterSpacing: '-0.03em' }],  // stat numbers, mid-tier statements
  'h-92':  ['92px', { lineHeight: '0.95', letterSpacing: '-0.03em' }], // hero exception (multi-column pages)
  'h-110': ['110px',{ lineHeight: '0.95', letterSpacing: '-0.04em' }], // section headlines (default)
  'h-178': ['178px',{ lineHeight: '0.9',  letterSpacing: '-0.04em' }], // singular hero stat (canary "22" reserved)
},
```

**Type role table:**

| Size | Role | Where it shows up |
|---|---|---|
| 10px | Eyebrows, metadata, status pills | Three-script eyebrows, section band labels, status |
| 16px | Body, buttons, all interactive | Default for everything |
| 26px | List rows, card titles | Devotee/Partner row titles, Purohit name in list |
| 42px | Mid-tier headings, amounts | Pricing row labels, booking step recap |
| 68px | Big statements, stat numbers | Section headlines, Antyeshti "What we will not do" |
| 92px | **Hero on multi-column** (exception) | All hero headlines that share row with stat column |
| 110px | Hero (default) | Hero headlines on full-width pages |
| 178px | Singular hero stat (reserved) | The "22" on canary profile only — use nowhere else |

### Font families

```ts
fontFamily: {
  bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
  inter:     ['Inter', 'sans-serif'],
  baskerville: ['"Libre Baskerville"', 'serif'],
  telugu:    ['"Noto Sans Telugu"', 'sans-serif'],
},
```

**Font usage rule (LOCKED):**
- **Bricolage Grotesque Bold** — all headlines on standard track (h-26 through h-110)
- **Bricolage Grotesque Medium** — all headlines on solemn track (h-26 through h-92)
- **Inter Bold** — logo lockup, eyebrows when emphasized, section band numbers
- **Inter Semi Bold** — button labels, eyebrow metadata, current-page nav item
- **Inter Medium** — nav links, body text, list item descriptions
- **Inter Regular** — only inside form inputs as the placeholder text
- **Libre Baskerville Italic** — ONLY two uses: (1) ritual names when written in English (Muhurtham, Antyeshti, Vivaha, Griha Pravesh, Upanayanam, Sraddha, Naming, Homam, Yagna, Puja), (2) the founder's quote on `/antyeshti`. **Never use it for general emphasis.**
- **Noto Sans Telugu Semi Bold** — Telugu characters in the three-script eyebrow

### Spacing

**Rule: 4-multiple grid.** Every padding, margin, and gap must be a multiple of 4. Page gutter is always 56px on desktop. The Tailwind default scale is fine; just don't reach for `p-[15px]`.

| Token | Value | Use |
|---|---|---|
| Page gutter | `px-14` (56px) | Left and right of all major content blocks |
| Section padding (large) | `py-24` (96px) | Top/bottom of hero, dark bands |
| Section padding (medium) | `py-20` (80px) | Top/bottom of regular sections |
| Component padding (input) | `py-4 px-4` (16px) | Form inputs |
| Component padding (button-lg) | `py-3.5 px-5 pr-4` (14/20/16) | Large buttons |
| Component padding (button-sm) | `py-2.5 px-4 pr-3.5` (10/16/14) | Small buttons |
| Component padding (pill) | `py-1 px-2.5` (4/10) | Status pills |
| Row item spacing | `space-y-8` (32px) | Between blocks within a section |
| Card item spacing | `space-y-4` (16px) | Between items within a card |

### Mobile responsive scale

| Property | 1440 desktop | 768 tablet | 380 mobile |
|---|---|---|---|
| Page gutter | 56px | 32px | 20px |
| Hero headline | 92px / 110px | 68px | 42px |
| Section headline | 68px | 42px | 32px |
| List row height | 140px / 120px / 100px | auto | auto (stacks) |
| Section band | 64px | 56px | 48px |

---

## 3. The 5 visual unit components

These are LOCKED. The Figma file has been audited 6 times to settle these dimensions. Build them once and never tune them.

### 3.1 StatusPill

- **Height:** 20px (intrinsic from padding + 10px text)
- **Padding:** 4px vertical, 9-10px horizontal
- **Text:** 10px, letter-spacing 0.14em, uppercase
- **Border-radius:** full (pill)
- **Sizing:** `width: hug-content`

```vue
<!-- components/ui/StatusPill.vue -->
<script setup lang="ts">
type Tone = 'live' | 'opens-q3-2026' | 'verified' | 'neutral'
const props = defineProps<{ label: string; tone?: Tone }>()
const tone = computed(() => props.tone ?? 'neutral')

const styles = computed(() => {
  switch (tone.value) {
    case 'live': return 'border-accent text-accent before:bg-accent'
    case 'opens-q3-2026': return 'border-ink-3 text-ink-3'
    case 'verified': return 'border-ink text-ink'
    default: return 'border-ink text-ink'
  }
})
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-inter font-semibold tracking-[0.14em] text-h-10 uppercase whitespace-nowrap"
    :class="styles"
  >
    <span v-if="tone === 'live'" class="w-1 h-1 rounded-full bg-accent" />
    {{ label }}
  </span>
</template>
```

### 3.2 ButtonSmall

- **Height:** ~36px (intrinsic)
- **Padding:** 10px vertical, 16px left, 14px right
- **Text:** 16px, weight 600 (Semi Bold)
- **Border-radius:** 8px
- **Sizing:** hug-content
- **Default trailing icon:** `→` (text arrow, not SVG)

```vue
<!-- components/ui/ButtonSmall.vue -->
<script setup lang="ts">
const props = defineProps<{
  label: string
  variant?: 'primary' | 'outline'
  iconRight?: boolean
  to?: string
}>()
const variant = computed(() => props.variant ?? 'primary')
const iconRight = computed(() => props.iconRight !== false)

const styles = computed(() => {
  if (variant.value === 'primary') return 'bg-ink text-paper'
  return 'border border-ink text-ink'
})
</script>

<template>
  <component
    :is="to ? resolveComponent('NuxtLink') : 'button'"
    :to="to"
    class="inline-flex items-center gap-3 rounded-lg py-2.5 pl-4 pr-3.5 font-inter font-semibold text-h-16"
    :class="styles"
  >
    <span>{{ label }}</span>
    <span v-if="iconRight" aria-hidden="true">→</span>
  </component>
</template>
```

### 3.3 ButtonLarge

- **Height:** ~43px (intrinsic)
- **Padding:** 13px vertical, 18px left, 16px right
- **Text:** 16px Semi Bold
- **Border-radius:** 8px
- **Variants:** `ink` (standard track), `solemn` (Antyeshti)

```vue
<!-- components/ui/ButtonLarge.vue -->
<script setup lang="ts">
const props = defineProps<{
  label: string
  variant?: 'ink' | 'solemn'
  iconRight?: boolean
  to?: string
  type?: 'button' | 'submit'
}>()
const variant = computed(() => props.variant ?? 'ink')
const iconRight = computed(() => props.iconRight !== false)

const styles = computed(() => {
  if (variant.value === 'solemn') return 'bg-solemn text-paper'
  return 'bg-ink text-paper'
})
</script>

<template>
  <component
    :is="to ? resolveComponent('NuxtLink') : 'button'"
    :to="to"
    :type="!to && (type ?? 'button')"
    class="inline-flex items-center gap-3 rounded-lg py-3.5 pl-5 pr-4 font-inter font-semibold text-h-16"
    :class="styles"
  >
    <span>{{ label }}</span>
    <span v-if="iconRight" aria-hidden="true">→</span>
  </component>
</template>
```

### 3.4 FormInput

- **Height:** 48px (intentionally taller than buttons — make this difference deliberate)
- **Padding:** 14px vertical, 16px horizontal
- **Text:** 16px Regular (placeholder), 16px Medium (value)
- **Border:** 1px solid `ink-3` (default), `ink` (focus), `accent` (error)
- **Border-radius:** 8px

```vue
<!-- components/ui/FormInput.vue -->
<script setup lang="ts">
const props = defineProps<{
  label: string
  placeholder?: string
  helpText?: string
  modelValue: string | undefined
  error?: string
  type?: string
}>()
defineEmits<{ 'update:modelValue': [v: string] }>()

const inputId = `field-${Math.random().toString(36).slice(2, 9)}`
</script>

<template>
  <div class="flex flex-col gap-2">
    <label
      :for="inputId"
      class="font-inter font-semibold text-h-10 tracking-[0.14em] uppercase text-ink-3"
    >{{ label }}</label>
    <input
      :id="inputId"
      :type="type ?? 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full rounded-lg border bg-paper px-4 py-4 text-h-16 font-inter font-medium text-ink placeholder:text-ink-3 placeholder:font-normal focus:outline-none focus:border-ink"
      :class="error ? 'border-accent' : 'border-ink-3'"
    />
    <p v-if="error" class="font-inter text-h-10 text-accent">{{ error }}</p>
    <p v-else-if="helpText" class="font-inter text-h-10 text-ink-3">{{ helpText }}</p>
  </div>
</template>
```

### 3.5 SectionBand

- **Height:** 64px (intrinsic from padding)
- **Padding:** 20px vertical, 56px horizontal (matches page gutter)
- **Border:** 1px ink on top AND bottom (creates double hairline against neighbors)
- **Layout:** 3 cells, `space-between`: [number] [label · subtitle] [position]
- **Text:** 16px Bold for number/position; 10px Semi Bold uppercase for label

```vue
<!-- components/ui/SectionBand.vue -->
<script setup lang="ts">
defineProps<{
  number: string       // "01"
  label: string        // "WHAT YOU CAN DO"
  subtitle?: string    // "FOUR THINGS"
  position?: string    // "01 / 04"
  tone?: 'ink' | 'solemn'
}>()
</script>

<template>
  <div
    class="w-full px-14 py-5 flex items-center justify-between border-y"
    :class="tone === 'solemn' ? 'border-solemn' : 'border-ink'"
  >
    <span
      class="font-inter font-bold text-h-16"
      :class="tone === 'solemn' ? 'text-solemn' : 'text-ink'"
    >{{ number }}</span>
    <span
      class="font-inter font-semibold text-h-10 tracking-[0.14em] uppercase"
      :class="tone === 'solemn' ? 'text-solemn' : 'text-ink'"
    >
      {{ label }}<template v-if="subtitle">&nbsp;·&nbsp;{{ subtitle }}</template>
    </span>
    <span
      v-if="position"
      class="font-inter font-bold text-h-16"
      :class="tone === 'solemn' ? 'text-solemn' : 'text-ink'"
    >{{ position }}</span>
  </div>
</template>
```

---

## 4. The three-script eyebrow

Every section eyebrow uses three scripts: English label · Telugu transliteration · Sanskrit transliteration. Example:

```
PUROHITS  ·  పురోహితులు  ·  पुरोहिताः
```

The Telugu characters need `font-telugu` (Noto Sans Telugu); the rest use Inter. Implementation:

```vue
<!-- components/page-blocks/ThreeScriptEyebrow.vue -->
<script setup lang="ts">
defineProps<{
  english: string  // "PUROHITS"
  telugu: string   // "పురోహితులు"
  sanskrit: string // "पुरोहिताः"
  tone?: 'accent' | 'solemn' | 'ink' | 'soft'
}>()
</script>

<template>
  <p
    class="font-inter font-semibold text-h-10 tracking-[0.14em] uppercase"
    :class="{
      'text-accent': tone === 'accent' || !tone,
      'text-solemn': tone === 'solemn',
      'text-ink': tone === 'ink',
      'text-solemn-soft': tone === 'soft',
    }"
  >
    <span>{{ english }}</span>
    <span class="mx-3">·</span>
    <span class="font-telugu">{{ telugu }}</span>
    <span class="mx-3">·</span>
    <span>{{ sanskrit }}</span>
  </p>
</template>
```

The transliterations need editorial review by a Telugu speaker (open dependency). **Don't trust AI-generated transliterations to ship.** Mark these as `[verify-transliteration]` in the data file until reviewed.

---

## 5. Page-by-page surface specs

Each page is broken down by section. Reference the Figma frame for visual fidelity; this list tells you the structural intent.

### 5.1 Home (`/`)

| Section | Component pattern | Notes |
|---|---|---|
| Nav | `<SiteNav />` | Default tone |
| Hero | 2-column, `92px` headline left, 3-stat triplet right | Hero exception applies |
| Dark photo band | `<PhotoBand>` with placeholder | Replace with real photo + dim overlay when available |
| Devotees section | `<SectionBand number="01" ... />` + 4× `<ListRow>` at `140px` | Each row has number / title / description / `<StatusPill>` / `<ButtonSmall>` |
| Partners section | `<SectionBand number="02" ... />` + 4× `<ListRow>` at `140px` | Same shape |
| Institutions card | Dark card with notify form | Single email input + `<ButtonLarge>` |
| Antyeshti referral | Solemn band, quieter 68px headline, `<ButtonLarge variant="solemn">` | Don't drown this in scale — solemnity wins |
| Footer | `<SiteFooter />` | |

### 5.2 Purohits list (`/purohits`)

| Section | Component pattern | Notes |
|---|---|---|
| Nav | `<SiteNav />` | |
| Hero | 2-column: headline + sub left, filter pills right | `92px` headline, exception applies |
| Section band 01 | "ALL TWELVE PUROHITS · IN-PERSON VERIFIED" | |
| List rows | 12× `<ListRow>` at `120px` | [num, name+lineage, specialty, location, years, View profile CTA] |
| Dark verification band | Section with "Read the verification charter" CTA | |
| Footer | | |

### 5.3 Purohit profile (`/purohits/[slug]`)

The canary page. Editorial profile layout. Reference Figma frame `CANARY V3 · Purohit profile (structure on cream)`.

### 5.4 Calendar (`/calendar`)

| Section | Component pattern | Notes |
|---|---|---|
| Nav | `<SiteNav cta-label="Open the calendar" />` | |
| Hero | 2-column with 92px headline | |
| Section band 01 | "TODAY · [location]" | |
| Today card | Eyebrow + 68px tithi + 4-cell detail grid | Nakshatra, Yoga, Karana, Muhurtham |
| Section band 02 | "UPCOMING FESTIVALS · NEXT 30 DAYS" | |
| Festival rows | 5× `<ListRow>` at `100px` | [date, name, description, Read more] |
| Section band 03 | "REGIONAL VARIANCE" | |
| Regional notes | Prose section explaining Drik Ganitha vs Vakya Panchangam | |
| Footer | | |

### 5.5 Booking flow (`/book/[step]`)

| Section | Component pattern | Notes |
|---|---|---|
| Nav | Simplified: logo + "Save & exit" (no menu, no main CTA) | Use a `<SiteNavMinimal>` component or pass a prop |
| Stepper band | 5 horizontal cells: `01 ✓` (done), `02` (active, ink-filled), `03` `04` `05` (next) | |
| Main flow | 2-column: left recap of previous step, right active form | |
| Active form | VeeValidate + Zod, all `<FormInput>` | |
| Continue row | `<ButtonSmall variant="outline" label="Back" />` + `<ButtonLarge label="Continue to ..." />` | |
| Sticky summary | Right rail card showing accumulated state | Progressive disclosure |
| Footer | | |

### 5.6 Pricing (`/pricing`)

| Section | Component pattern | Notes |
|---|---|---|
| Nav | `<SiteNav />` | |
| Hero | "Three numbers. No hidden fees." | 92px |
| Section band 01 | "HOW THE MONEY MOVES · THREE MECHANISMS" | |
| Mechanism rows | 3× `<ListRow>` at `160px` | [num, name, description, amount in accent] |
| Dark band | "What we will not take" | |
| Section band 02 | "WORKED EXAMPLE" | |
| Example table | 4 prose rows showing the breakdown | All values placeholders |
| Section band 03 | "FREQUENTLY ASKED" | |
| FAQ rows | 4× tall rows with [question, answer] | |
| Footer | | |

### 5.7 Antyeshti (`/antyeshti`)

**Solemn track. Read § 9 of `architecture.md` for the complete exception list.**

| Section | Component pattern | Notes |
|---|---|---|
| Nav | `<SiteNav cta-label="Request a Purohit" cta-tone="solemn" />` | |
| Hero | 2-column: left = headline + SLA stats; right = 3-field form | Dark background, not cream |
| Section band 01 (solemn) | "WHAT HAPPENS NEXT · THE FOUR STEPS" | |
| Step rows | 4× rows showing each step in the response | Cream background |
| Dark band | "What we will not do" — 68px statement | |
| Section band 02 | "WHAT IS INCLUDED" | |
| Inclusion rows | 4× rows | |
| Section band 03 | "A NOTE" | |
| Founder's note | Libre Baskerville Italic 26px, single paragraph + attribution | |
| Footer | Dark, with solemn tone | |

---

## 6. Motion language (LOCKED)

| Surface | Animation | Duration | Easing |
|---|---|---|---|
| Page transition (most routes) | Column-wipe, 5 cols desktop / 3 mobile, `--paper` fill | ~750ms total | cubic-bezier(0.65, 0, 0.35, 1) |
| Page transition (Antyeshti) | **None** — instant swap | 0ms | — |
| Rapid repeat transition (< 3s) | Fade fallback | 200ms | ease-out |
| `prefers-reduced-motion: reduce` | Fade crossfade | 100ms | linear |
| Hover on `<ButtonLarge>` | Background darkens 4% | 150ms | ease-out |
| Hover on `<ButtonSmall outline>` | Background fills `--ink`, text → `--paper` | 150ms | ease-out |
| Focus state (all interactive) | 2px ink outline, offset 2px | 80ms | linear |
| Section band hairline reveal | Hairlines draw in from center on scroll-into-view | 600ms | cubic-bezier(0.65, 0, 0.35, 1) |
| Form input focus | Border color transitions to `--ink` | 120ms | ease-out |

**Implementation reference for column-wipe:** `architecture.md` § 5.

**No other animations are approved.** No reveal-on-scroll fades, no parallax, no "loading shimmer" skeletons (use static placeholder text instead). The design is structural, not animated.

---

## 7. Placeholder conventions

Real data is blocked on humans. Placeholders are first-class:

| Type | Format | Example |
|---|---|---|
| Currency value | `₹ [fee]` | "Booking deposit: ₹ [fee]" |
| Percent | `[ % ]` | "Platform commission: [ % ]" |
| Name | `[name]` | "Sri [name]" |
| Photo | Dark gradient band with `[real photo TBD]` overlay | |
| Telugu transliteration | `[verify-transliteration: <english>]` | `[verify-transliteration: PUROHITS]` |
| Phone | `+91 [number]` | |
| Email | `[role]@sanatanasetu.com` | `bookings@sanatanasetu.com` (decide before launch) |

**Every placeholder is greppable.** Before launch, run:

```bash
grep -rn '\[fee\]\|\[%\]\|\[name\]\|\[number\]\|\[verify' --include='*.vue' --include='*.ts' --include='*.json'
```

Any results that don't have an assigned GitHub issue block the launch.

---

## 8. Accessibility floor

These are non-negotiable. CI fails if any regress.

- **Color contrast:** All text-on-background combinations pass WCAG AA (≥ 4.5:1 for body, ≥ 3:1 for large text). The `ink-3` on `bg` combination is the closest to the line — keep it for metadata only, never for body copy that matters.
- **Keyboard navigation:** Every interactive element reachable via Tab. Logical tab order. Visible `:focus-visible` styles.
- **Reduced motion:** Honored via `@media (prefers-reduced-motion: reduce)`. Page transitions degrade to 100ms crossfade. No parallax, no autoplay.
- **Forms:** All inputs have explicit `<label>` associations. Errors announced via `aria-describedby`. No "placeholder as label" pattern.
- **Screen reader:** All decorative icons (`→` arrows) have `aria-hidden="true"`. All meaningful icons have `aria-label`. The three-script eyebrows announce all three scripts.
- **Language attributes:** `<html lang="en">` site-wide; Telugu spans inside eyebrows wrapped in `<span lang="te">`; Sanskrit in `<span lang="sa">`.
- **Headings hierarchy:** One `<h1>` per page (the hero headline). Section headlines are `<h2>`. List item titles are `<h3>`. No skipping levels.
- **Target sizes:** All interactive elements ≥ 44×44px hit area (buttons are 36/43px tall but with adequate horizontal padding to reach 44 hit area — verify in testing).
- **Antyeshti-specific:** Form fields have generous error messages. No timed sessions. No CAPTCHA on the request form (slows down a grieving family — flag any spam differently).

---

## 9. The Libre Baskerville Italic rule (worth its own section)

This font is restricted because misuse breaks the visual hierarchy fast. **Use it for exactly two things:**

1. **Ritual names when written in English Latin script.** Inline within prose. Always italic. Examples:
   - "We help with *Muhurtham*, *Vivaha*, *Griha Pravesh*."
   - "If you are arranging an *Antyeshti*."
   - "The *Upanayanam* of your son."

2. **The founder's quote on `/antyeshti`.** Set at h-26 (26px) Italic, full quote in italics, single attribution line after.

**Never use it for:**
- General emphasis (use `<strong>` with Inter Semi Bold instead)
- Headline accents
- "Featured" anything
- Pull quotes other than the founder's note
- Decorative flourishes

If you're tempted to use Libre Baskerville Italic somewhere and it isn't one of the two cases above, you're wrong. Use Inter Medium with stronger weight if you need to emphasize.

---

## 10. Code Connect mapping (optional, recommended)

For each of the 7 design system primitives, we can map Figma component nodes to the corresponding `.vue` file via Figma Code Connect. This lets developers using the Figma Dev Mode plugin see the exact Vue source for a selected component.

Setup (Phase 1 task):

```bash
npx @figma/code-connect connect create
```

Then create `.figma.ts` mapping files alongside each component:

```ts
// components/ui/ButtonLarge.figma.ts
import { figma } from '@figma/code-connect/vue'
import ButtonLarge from './ButtonLarge.vue'

figma.connect(ButtonLarge, 'https://figma.com/design/BPFv7N1agVYdCli9mniRHm/?node-id=...', {
  props: {
    label: figma.string('label'),
    variant: figma.enum('variant', { ink: 'ink', solemn: 'solemn' }),
  },
  example: ({ label, variant }) => `<ButtonLarge label="${label}" variant="${variant}" />`,
})
```

This is optional but very useful if the team grows. Skip for Phase 1, revisit in Phase 5.
