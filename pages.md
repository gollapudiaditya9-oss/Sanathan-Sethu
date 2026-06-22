# pages.md

**Read `CLAUDE.md` and `design-system.md` first.** This document goes page-by-page with the exact section composition, copy, and component recipe.

The Figma file remains the source of truth for visual fidelity. This doc translates each page's intent into a build recipe Antigravity can follow.

---

## How to use this doc

For each page:
- **Route:** the URL path
- **Layout:** which Nuxt layout wraps it
- **Figma frame:** the frame name to verify against
- **Section order:** top-to-bottom recipe with components and copy
- **Data sources:** which composables feed the page
- **Validation:** which forms exist and what schema applies

If a copy snippet is shown in `monospace`, use it exactly. If it's in plain prose, the founder may iterate it — but don't editorialize without asking.

---

## 1. Home (`/`)

- **Route:** `/`
- **Layout:** `layouts/default.vue`
- **Figma frame:** `/ — Home (V3)`

### Section order

```
[SiteNav]
[Hero — 2-column]
[Photographic dark band]
[Section band 01: WHAT YOU CAN DO]
[Devotees: 4 list rows at 140px]
[Section band 02: WHO WE WORK WITH]
[Partners: 4 list rows at 140px]
[Institutions card — dark, notify form]
[Antyeshti referral section — solemn band]
[SiteFooter]
```

### Hero

- **Eyebrow:** `<ThreeScriptEyebrow english="SANATANASETU" telugu="సనాతనసేతు" sanskrit="सनातनसेतु" tone="accent" />`
- **Headline (92px, Bricolage Bold):** `A bridge between you\nand the rite.`
- **Sub:** `Verified Purohits, the right samagri, the right day. For weddings, housewarmings, naming ceremonies, the rites for the departed. Across Andhra Pradesh and Telangana.`
- **CTAs:** `<ButtonLarge label="Book a Purohit" />` next to `<ButtonSmall variant="outline" label="Browse 12 Purohits" />`
- **Right column — stat triplet (each at 68px Bricolage Bold):**
  - `12` — `PUROHITS · IN-PERSON VERIFIED`
  - `4 hr` — `ANTYESHTI CALLBACK · 24/7`
  - `[fee]` — `PLATFORM COMMISSION · NO HIDDEN FEES`

### Photographic dark band

A full-width 480px-tall section, `bg-ink`, with placeholder text `[real photo TBD — Purohit performing a Vivaha rite]` rendered in `paper` at 16px Inter Medium, dim and centered. Replace this with a real image (with consent) when one arrives.

### Devotees section

- **Section band:** `<SectionBand number="01" label="WHAT YOU CAN DO" subtitle="FOUR THINGS" position="01 / 04" />`
- **Section headline (h-68):** `For devotees and families.` (left-aligned at page gutter, 64px space below before first row)
- **4 rows, each `h-[140px]`:**

| # | Title | Description | Status | CTA |
|---|---|---|---|---|
| 01 | Book a Purohit for a ritual | Wedding, Griha Pravesh, Antyeshti, Upanayanam, daily rituals. A verified Purohit, the right samagri, the right day. | LIVE | Browse Purohits → |
| 02 | Ask a verified expert | Jatakam, Muhurtham, Vaastu, scriptural questions. A 30-minute phone call or a written report — you choose. | LIVE | Ask a question → |
| 03 | Read the calendar | Tithis, festivals, regional observances, and auspicious dates — calculated using the Drik Ganitha system. | LIVE | Open the calendar → |
| 04 | The library | Slokas by theme. Pravachanams from named gurus. The Vedas and Upanishads with citations. | OPENS Q3 2026 | Notify me → |

Row internal layout: `[number 56px] [title 360px] [description fills] [status-pill] [button-small]` — all on one row, vertically centered.

### Partners section

- **Section band:** `<SectionBand number="02" label="WHO WE WORK WITH" subtitle="FOUR ARCHETYPES" position="02 / 04" />`
- **Headline (h-68):** `For Purohits, consultants,\nand businesses.`
- **4 rows, each `h-[140px]`:**

| # | Title | Description | Status | CTA |
|---|---|---|---|---|
| 01 | Purohit | Lineage-led, full-time. Bookings managed for you, samagri handled, dakshina between you and the family. | OPEN | Apply → |
| 02 | Consultant | Astrologers, Jyotishis, Vaastu experts. Take written or phone-call work on your schedule. | OPEN | Apply → |
| 03 | Caterer | Sattvic catering for ceremonies, prasadam preparation. We send you booking-aligned demand. | OPEN | Apply → |
| 04 | Puja Store, Venue, Travel | Samagri suppliers, kalyanamandapams, transport providers. List on the platform. | OPEN | Apply → |

### Institutions card

- Dark card (`bg-ink`), full-width within page gutter
- **Eyebrow (accent):** `FOR INSTITUTIONS`
- **Headline (h-68, paper):** `Temples, gurukuls, and family trusts.`
- **Description:** `Recurring rituals, festival calendars, donor coordination. We will reach out to you.`
- Notify form: single `<FormInput label="EMAIL" placeholder="you@institution.org" />` + `<ButtonLarge label="Notify me" />`

### Antyeshti referral section

- **Section band (solemn):** `<SectionBand number="04" label="IF YOU HAVE LOST SOMEONE" position="04 / 04" tone="solemn" />`
- **Headline (h-68 Bricolage Medium — note: Medium, not Bold):** `The rites for the departed.`
- **Sub:** `If you are arranging an Antyeshti, our coordinator will call you within four hours. A verified Purohit reaches you within twelve.`
- **CTA:** `<ButtonLarge label="Request a Purohit" variant="solemn" />`

### Footer

`<SiteFooter />` — see component definition.

---

## 2. Purohits list (`/purohits`)

- **Route:** `/purohits`
- **Layout:** `layouts/default.vue`
- **Figma frame:** `/purohits — Purohits list (V3)`

### Section order

```
[SiteNav]
[Hero — 2-column with filter pills on right]
[Section band 01: ALL TWELVE PUROHITS]
[12 list rows at 120px]
[Dark verification band]
[SiteFooter]
```

### Hero

- **Eyebrow:** `<ThreeScriptEyebrow english="PUROHITS" telugu="పురోహితులు" sanskrit="पुरोहिताः" tone="accent" />`
- **Headline (92px):** `Verified Purohits.\nNamed lineages.`
- **Sub:** `Twelve Purohits onboarded. Each interviewed in person. References checked. Lineage and patasala documented.`
- **Right column — filter pills:** Wrap in `flex flex-wrap gap-2`. Pills: `All twelve` (active), `Muhurtham`, `Vivaha`, `Griha Pravesh`, `Hyderabad`. Clicking a pill filters the list below.

### List

- **Section band:** `<SectionBand number="01" label="ALL TWELVE PUROHITS · IN-PERSON VERIFIED" position="01 / 02" />`
- 12 rows, each `h-[120px]`, layout: `[num 56px] [name + lineage 360px] [specialty 280px] [location 160px] [years 120px] [View profile CTA]`
- Data from `usePurohits().list` — see `data/purohits.json`

### Dark verification band

- `bg-ink`, `py-24 px-14`
- **Eyebrow (accent):** `HOW WE VERIFY`
- **Headline (h-92, paper):** `Twelve Purohits.\nFive checks each.`
- **Sub (paper-dimmed):** `Outreach by lineage. Intake form. References checked. In-person interview at their patasala or home. Trial work observed.`
- **CTA:** `<ButtonLarge label="Read the verification charter" />` — but with accent kumkum background instead of ink, since we're on a dark band

---

## 3. Purohit profile (`/purohits/[slug]`)

- **Route:** `/purohits/[slug]` (e.g. `/purohits/sri-anand-sastry`)
- **Layout:** `layouts/default.vue`
- **Figma frame:** `CANARY V3 · Purohit profile (structure on cream)`

The canary page. Lots of editorial structure. Section breakdown:

### Section order

```
[SiteNav]
[Profile hero — 3 column: name+lineage / details / 22-year stat]
[Credentials grid]
[Advisory list — 24px items]
[Dark band — quote from a family]
[Booking format cards — choose engagement type]
[SiteFooter]
```

### Profile hero

- **Eyebrow:** `LINEAGE · [lineage name]` in accent
- **Headline (h-68 Bricolage Bold):** `[Sri Purohit Name]`
- **3-column layout** with center column showing credentials, right column showing the years-of-service stat at 68px (NOT 178 — that's reserved for the global canary, and we already settled this is too dominant in a profile cell)

### Credentials grid

3×2 grid of credential cards, each card showing one of: years of service, patasala, lineage, languages spoken, specializations, references.

### Advisory list

A list of 5-8 ritual types this Purohit is qualified to perform, each 24px Bricolage Bold. Hairline separators between items.

### Dark quote band

A family's testimonial about working with this Purohit. **Only if a real signed quote is available — otherwise omit this section entirely.** Do not use AI-generated quotes.

### Booking format cards

3 cards side-by-side, each describing an engagement type:
- **Phone consultation** — 30-minute call, ₹ [fee]
- **Single ritual booking** — full rite, fee varies
- **Recurring engagement** — for institutions, monthly retainer

Each card has a `<ButtonLarge>` to start that flow.

---

## 4. Calendar (`/calendar`)

- **Route:** `/calendar`
- **Layout:** `layouts/default.vue`
- **Figma frame:** `/calendar — Dharma Calendar (V3)`

### Section order

```
[SiteNav with cta-label="Open the calendar"]
[Hero — single column]
[Section band 01: TODAY · LOCATION]
[Today card — eyebrow + tithi + 4-cell detail grid]
[Section band 02: UPCOMING FESTIVALS]
[5 festival rows at 100px]
[Section band 03: REGIONAL VARIANCE]
[Regional variance prose]
[SiteFooter]
```

### Hero

- **Eyebrow:** `<ThreeScriptEyebrow english="CALENDAR" telugu="పంచాంగం" sanskrit="पञ्चाङ्गम्" tone="accent" />`
- **Headline (92px):** `The calendar\nyour family follows.`
- **Sub:** `Tithis, festivals, regional observances. Calculated using Drik Ganitha against your location. Free for everyone, forever.`

### Today card

- **Section band:** `<SectionBand number="01" label="TODAY · HYDERABAD" position="01 / 03" />` (location detected client-side, defaults to Hyderabad)
- **Eyebrow:** `[Day], [Month] [Date], [Year]` — pulled live from system time
- **Tithi headline (h-68):** `Shukla Tritiya · Vrishabha Masa` — pulled from panchangam composable
- **4-cell detail grid:** Nakshatra / Yoga / Karana / Muhurtham, each cell in a 4-up horizontal grid with hairlines between

### Upcoming festivals

- **Section band:** `<SectionBand number="02" label="UPCOMING FESTIVALS · NEXT 30 DAYS" position="02 / 03" />`
- 5 rows, each `h-[100px]`: `[date in accent] [name in h-26] [description] [Read more outline button]`

### Regional variance section

- **Section band:** `<SectionBand number="03" label="REGIONAL VARIANCE · WHY DATES MAY DIFFER" position="03 / 03" />`
- Prose section (`py-20`):
  - **Headline (h-68):** `Why our calendar may\ndiffer from another's.`
  - **Body:** `We use Drik Ganitha — astronomical calculation against your location. Some families and regions follow Vakya Panchangam, which uses traditional tables. The dates can differ by a day. Both are valid. We make our system explicit so you can compare.`

---

## 5. Booking flow (`/book/[step]`)

- **Routes:** `/book/choose-ritual`, `/book/configure`, `/book/family-details`, `/book/match-purohit`, `/book/confirm`
- **Layout:** `layouts/default.vue`, but with a minimal nav variant — pass `<SiteNav minimal />` or use a dedicated `layouts/booking.vue`
- **Figma frame:** `/book — Booking flow 5 steps (V3)`

### State management

All state lives in `composables/useBookingState.ts` — persisted to `localStorage`. Each step reads from and writes to this state. On refresh, the user lands back on the last step they completed.

### Section order (per step)

```
[Minimal nav — logo + Save & exit]
[Stepper band — 5 cells, current step highlighted]
[Main flow — 2 column: left recap, right active step]
[Footer]
```

### Step 1: Choose ritual (`/book/choose-ritual`)

- **Eyebrow:** `STEP 01 · CHOOSE RITUAL`
- **Headline (h-68):** `Which ritual?`
- Grid of ritual options (cards) — each card has the ritual name (English + Sanskrit Italic via Baskerville), a brief description, and indicative fee range
- Clicking a card → state updates, route advances to `/book/configure`

### Step 2: Configure (`/book/configure`) — this is the one shown in Figma

- **Left recap (440px wide):**
  - Eyebrow: `STEP 01 · CHOSEN`
  - Selected ritual at h-42
  - Short description
  - `<ButtonSmall variant="outline" label="Change ritual" />`

- **Right active form:**
  - Eyebrow: `STEP 02 · CONFIGURE`
  - Headline (h-68): `When and where?`
  - Form fields:
    1. `<FormInput label="PREFERRED DATE" placeholder="Select from auspicious dates..." helpText="Auspicious dates calculated against the Jatakams once you submit details" />`
    2. `<FormInput label="PREFERRED TIME WINDOW" placeholder="Morning / Afternoon / Evening" />`
    3. `<FormInput label="LOCATION" placeholder="Hyderabad, Telangana" helpText="Where the rites will be performed" />`
    4. `<FormInput label="ANY SPECIAL CONSIDERATIONS" placeholder="Optional" />`
  - Continue row: `<ButtonSmall variant="outline" label="Back" />` (left) + `<ButtonLarge label="Continue to family details" />` (right)

### Steps 3-5

Build the same shape — left recap of all previous steps, right active form. Step 4 shows matched Purohits as a list of cards. Step 5 is the final review + confirm.

### Validation schema (step 2 example)

```ts
import { z } from 'zod'

const step2Schema = z.object({
  date: z.string().min(1, 'Please pick a preferred date'),
  timeWindow: z.enum(['morning', 'afternoon', 'evening']),
  location: z.string().min(2, 'Where will the rites be held?'),
  considerations: z.string().optional(),
})
```

---

## 6. Pricing (`/pricing`)

- **Route:** `/pricing`
- **Layout:** `layouts/default.vue`
- **Figma frame:** `/pricing — Pricing (V3)`

### Section order

```
[SiteNav]
[Hero]
[Section band 01: HOW THE MONEY MOVES]
[3 mechanism rows at 160px]
[Dark band: What we will not take]
[Section band 02: WORKED EXAMPLE]
[Headline + 4 example rows]
[Section band 03: FREQUENTLY ASKED]
[4 FAQ rows]
[SiteFooter]
```

### Hero

- **Eyebrow:** `<ThreeScriptEyebrow english="PRICING" telugu="మూల్యం" sanskrit="मूल्यम्" tone="accent" />`
- **Headline (92px):** `Three numbers.\nNo hidden fees.`

### Mechanism rows

- **Section band:** `<SectionBand number="01" label="HOW THE MONEY MOVES · THREE MECHANISMS" position="01 / 03" />`
- 3 rows at `h-[160px]`, layout: `[num 56px] [title h-42 380px] [description fills] [amount h-42 accent 220px]`

| # | Title | Amount | Description |
|---|---|---|---|
| 01 | Booking deposit | ₹ [fee] | A small refundable hold on the date. Reserves the Purohit's time. Returned to you when the rites are complete. |
| 02 | Platform commission | [ % ] | Taken from the ritual fee — the amount you and the Purohit agreed upon. Covers verification, coordination, and platform costs. |
| 03 | Minimum top-up | ₹ [fee] | Applies when a ritual's total fee falls below our floor. Ensures the Purohit travels for a fair amount. |

### Dark band — what we will not take

- `bg-ink py-24 px-14`
- **Eyebrow (accent):** `WHAT WE WILL NOT TAKE`
- **Headline (h-68, paper):** `A share of dakshina.\nA cut of samagri costs.\nReferral fees from caterers.`

### Worked example

- **Section band:** `<SectionBand number="02" label="WORKED EXAMPLE · A WEDDING IN HYDERABAD" position="02 / 03" />`
- **Headline (h-68):** `A real example.`
- 4 rows (padding `py-7 px-14`, hairline between):
  - `Ritual fee (Purohit's charge)` → `₹ [fee]`
  - `Booking deposit (refundable)` → `₹ [fee]`
  - `Platform commission ([%])` → `₹ [fee]`
  - `Dakshina (paid directly to Purohit)` → `Between you and the Purohit`

### FAQ

- **Section band:** `<SectionBand number="03" label="FREQUENTLY ASKED" position="03 / 03" />`
- 4 rows, layout: `[question h-26 500px] [answer body 16px fills]`, padding `py-8 px-14`:

| Q | A |
|---|---|
| What if I want to cancel? | Booking deposit returned in full if cancelled 7+ days before. After that it goes to the Purohit's time block. |
| Can I tip the Purohit? | Dakshina, yes. Always between you and the Purohit. We do not see it or invoice for it. |
| Are samagri costs included? | Listed separately when you confirm. You pay the supplier directly. We do not take a cut. |
| What if the Purohit cancels? | We send a replacement of equal standing. Your booking deposit holds. If no replacement available, full refund. |

---

## 7. Antyeshti (`/antyeshti`)

**Solemn variant. Read § 9 of `architecture.md` for all rules.**

- **Route:** `/antyeshti`
- **Layout:** `layouts/solemn.vue`
- **Figma frame:** `/antyeshti — Antyeshti booking (V3 solemn)`

### Section order

```
[SiteNav — solemn variant]
[Hero — dark, 2-column: left copy + SLA stats, right 3-field form]
[Section band 01 (solemn): WHAT HAPPENS NEXT]
[4 step rows at 140px]
[Dark band: What we will not do]
[Section band 02 (solemn): WHAT IS INCLUDED]
[4 inclusion rows at 120px]
[Section band 03 (solemn): A NOTE]
[Founder's note — Libre Baskerville Italic]
[SiteFooter — solemn]
```

### Hero (dark, 720px tall)

- **Background:** `bg-ink`
- **Left column (820px wide, padding 56):**
  - **Eyebrow (solemn-soft):** `<ThreeScriptEyebrow english="ANTYESHTI" telugu="అంత్యేష్టి" sanskrit="अन्त्येष्टि" tone="soft" />`
  - **Headline (92px Bricolage Medium, paper):** `If you have\nlost someone.`
  - **Sub (solemn-soft):** `We will call you within four hours. You stay with your family. A verified Purohit will arrive with the right samagri for the rites.`
  - **SLA strip — 3 cells (hairlines top + bottom, solemn color):**
    - `WE CALL YOU IN` → `4 hours`
    - `PUROHIT ARRIVES IN` → `12 hours`
    - `AVAILABLE` → `24/7`
- **Right column (bg-ink-2, padding 48):**
  - **Eyebrow (solemn-soft):** `REQUEST A PUROHIT NOW`
  - **Title (h-42 paper):** `Three details.\nThat is all.`
  - **Form fields (3 only):**
    - `<FormInput label="YOUR NAME" placeholder="Family member who can be reached" />`
    - `<FormInput label="PHONE NUMBER" placeholder="+91" type="tel" />`
    - `<FormInput label="LOCATION" placeholder="City or village where the rites will be held" />`
  - **Submit:** `<ButtonLarge label="Request a Purohit" variant="solemn" type="submit" />`
  - **Reassurance (solemn-soft 12px):** `We call you. The family is not asked to make further arrangements.`

### What happens next

- **Section band:** `<SectionBand number="01" label="WHAT HAPPENS NEXT · THE FOUR STEPS" position="01 / 03" tone="solemn" />`
- **Headline (h-68):** `You will not be left\nto figure this out.`
- 4 rows at `h-[140px]`, layout: `[num 80px solemn] [title h-26 440px] [description fills]`:

| # | Title | Description |
|---|---|---|
| 01 | You submit the request | Three fields. Name, phone, location. We do not need more from you right now. |
| 02 | We call within four hours | The platform coordinator calls you. We ask what we need to know. The family does not coordinate. |
| 03 | A Purohit travels to you | Verified Purohit with the right samagri. They reach you within twelve hours of your call back. |
| 04 | The rites are performed | You stay with your family. The Purohit handles every step of the rites. No further arrangements asked of you. |

### Dark band — what we will not do

- `bg-ink py-24`
- **Eyebrow (solemn-soft):** `WHAT WE WILL NOT DO`
- **Headline (h-68 Bricolage Medium, paper, 4 lines):**
  - `We will not ask the family`
  - `to complete more forms.`
  - `We will not call multiple times.`
  - `We will not advertise.`

### What is included

- **Section band:** `<SectionBand number="02" label="WHAT IS INCLUDED" position="02 / 03" tone="solemn" />`
- **Headline (h-68):** `Everything for the rites.\nNothing extra.`
- 4 rows at `h-[120px]`:

| # | Title | Description |
|---|---|---|
| 01 | Verified Purohit | Lineage-led, interviewed, references confirmed. The Purohit who comes to you is the same Purohit listed on our site. |
| 02 | All samagri | Coconut, banana, rice, flowers, dhoop, ghee, honey, sandalwood. Everything needed for the rites is brought by the Purohit. |
| 03 | Travel and coordination | The Purohit reaches your location. You do not arrange transport. We handle scheduling with the family. |
| 04 | Post-rites guidance | The thirteen-day observances are explained. Reminders sent for the tenth and eleventh-day rites if you wish. |

### A note (founder's quote)

- **Section band:** `<SectionBand number="03" label="A NOTE" position="03 / 03" tone="solemn" />`
- **Eyebrow (solemn):** `FROM OUR FOUNDER`
- **Quote (Libre Baskerville Italic, h-26, line-height 160%):**

```
"This service exists because my own family went through this
without help. The phone calls, the searching, the arrangements
made in grief — they should not be required of a family that
has just lost someone. If you have come to this page, we will
help."
```

- **Attribution (Inter Semi Bold, h-10, tracked):** `— PHANI RAJ GOLLAPUDI, FOUNDER`

### Form submission flow

```ts
// pages/antyeshti.vue (simplified)
const schema = toTypedSchema(z.object({
  name: z.string().min(1, 'Please share a name we can call you by'),
  phone: z.string().regex(/^[+0-9\s-]{10,}$/, 'Phone number does not look right'),
  location: z.string().min(2, 'Where are the rites being held?'),
}))

const onSubmit = handleSubmit(async (values) => {
  await $fetch('/api/antyeshti-request', { method: 'POST', body: values })
  await navigateTo('/antyeshti/confirmed', { replace: true })
})
```

After submit → `/antyeshti/confirmed` shows a single-screen acknowledgment: "We have your request. We will call you within four hours." No marketing follow-up, no upsells, no related links.

---

## 8. Partners hub (`/partners`)

- **Route:** `/partners`
- **Layout:** `layouts/default.vue`
- **Figma frame:** Not yet built. **Placeholder for now.** Phase 6 deliverable.

Until built, this route renders a simple page:

```vue
<template>
  <div class="px-14 py-24">
    <h1 class="font-bricolage font-bold text-h-92 text-ink">For partners.</h1>
    <p class="font-inter text-h-16 text-ink-2 mt-8 max-w-xl">
      We are still finalizing the partner application flow. If you are a Purohit,
      consultant, caterer, or business serving Hindu families in Telugu states,
      please write to <a href="mailto:partners@sanatanasetu.com" class="underline">partners@sanatanasetu.com</a>.
    </p>
  </div>
</template>
```

---

## Validation against Figma — checklist before declaring a page done

For each page, before marking it complete, the AI must verify:

1. **Pixel-match at 1440px.** Open the Figma frame side-by-side with the deployed page at 1440px viewport. Visually compare. Major deviations (>4px spacing, wrong type size, wrong color) require a fix.
2. **List row heights are exact.** A 140px row in Figma is `h-[140px]` in code, not `min-h-[140px]` or `h-auto`.
3. **Three-script eyebrows render all three scripts correctly.** The Telugu span has `lang="te"` and uses `font-telugu`.
4. **Buttons match the right variant.** Don't use `ButtonLarge variant="ink"` on the Antyeshti page.
5. **Section bands have the right `tone` prop.** Solemn pages use `tone="solemn"`, others omit it.
6. **Page transitions are disabled on Antyeshti.** Verify by navigating to and from `/antyeshti` — no column-wipe should appear.
7. **All placeholders are still placeholders.** No invented numbers, no invented names, no AI-generated transliterations.

If any check fails, the page is not done.
