# do-not-refactor.md

**Read `CLAUDE.md` first.** This document lists patterns that look improvable but are intentional. Every entry has the reasoning so future AI assistants (and future me) don't silently undo them under the banner of "cleaner code."

If you (the AI) find yourself thinking "I should just consolidate these / DRY this up / simplify that" while reading this codebase, search this file first. If your candidate refactor is on this list, **stop**.

---

## 1. The five visual unit components are NOT collapsed into one

**The pattern:** `StatusPill.vue`, `ButtonSmall.vue`, `ButtonLarge.vue`, `FormInput.vue`, `SectionBand.vue` are five separate files. Each has its own props and styles. They look similar enough that they could be one `<Pill>` component with `size="sm" | "md" | "lg"` and `variant="solid" | "outline"` variants. Or one mega `<UIBase>` component with everything configurable.

**Do not do this.** Reasoning:

1. These five components are visually distinct in the design. The Figma file has been audited 6+ times to settle their exact dimensions: 20px tall pill, 36px tall small button, 43px tall large button, 48px tall input, 64px tall section band. The differences are deliberate — they tell the user what kind of element they're looking at without needing a label.
2. Consolidating them into one component with size props introduces a permanent risk of accidentally setting the wrong size and breaking the visual hierarchy. Separate files = the developer literally cannot write `<Button size="pill">` and mean it.
3. The five components have different semantic roles. A status pill is not a button — it's never clickable. An input is not a button — it has different focus behavior. Mashing them into one tree makes the semantic distinction harder for screen readers.
4. The total LOC saved by consolidation is small. The risk of regression is high.

**Symptom that you're about to violate this:** writing `defineProps<{ size: 'pill' | 'sm' | 'lg' | 'input' | 'band' }>`. Stop.

---

## 2. List row heights are FIXED, not auto

**The pattern:** Devotee/Partner rows on the home page are `h-[140px]`. Purohit list rows are `h-[120px]`. Festival rows are `h-[100px]`. The content is vertically centered within these fixed heights.

**Do not change to `min-h-` or `h-auto`.** Reasoning:

1. The visual cost of uneven row heights in this design language is severe. The home page went through three rebuilds before we accepted that all 8 rows on the home page must be exactly 140px, including the ones whose content fits in 98px. Single-line rows have extra breathing room — that's the tradeoff, and it's correct.
2. Content lengths vary across rows (some titles are 2 lines, some 1). Without fixed heights, the page becomes a stack of slightly-different-sized rows, which looks broken, not breathing.
3. On mobile, these rows DO become `h-auto` (single-column stack). The fixed height is a desktop convention. Don't strip it from desktop because mobile doesn't need it.

**Symptom that you're about to violate this:** writing "this row is mostly empty, let me tighten it up." Stop.

---

## 3. The 92px hero headline is NOT on the type scale

**The pattern:** Most type sizes are on the golden ratio scale `[10, 16, 26, 42, 68, 110, 178]`. Hero headlines on multi-column pages use 92px. This is the only off-scale value.

**Do not "fix" this by moving it to 110 or 68.** Reasoning:

1. We tried 110px. The phrase "between you" overflowed the 564px left column. The decision was: either widen the column (which broke the 3-column hero proportion) or drop to 92px. 92px won.
2. 92px is documented as the multi-column hero exception in `design-system.md` § 2. It applies consistently across `/`, `/purohits`, `/calendar`, `/pricing`. Don't add new exceptions, but don't remove this one either.
3. Single-column pages can use 110px (full-width hero, no column constraint). Use the right size for the layout, not "the scale value."

**Symptom that you're about to violate this:** writing "this should be on the scale, let me round to 110 or 68." Stop.

---

## 4. The Antyeshti page is intentionally minimalist

**The pattern:** `/antyeshti` has a 3-field form (name, phone, location). No email field. No preferred Purohit selector. No date picker. No marketing copy. No analytics tracking. No page transition animation. The CTA in the nav becomes "Request a Purohit" with a brown (`--solemn`) background.

**Do not add fields, tracking, or animation to this page.** Reasoning:

1. The audience for this page is a family who has just lost someone, often making this request within hours of a death. Every additional field is a betrayal of the design's promise to be lightweight in that moment.
2. The 4-hour callback SLA means the coordinator will ask follow-up questions on the phone. Anything we capture in the form, we'd just re-confirm. Form length = friction, not data quality.
3. The lack of page transition is deliberate. The column-wipe is a beautiful piece of motion language for the rest of the site, but in a grief context it reads as performative. Instant swap is the only acceptable behavior here.
4. Analytics tracking on this page is a hard no. We do not measure conversion on Antyeshti. We do not A/B test Antyeshti. We do not run heatmaps on Antyeshti.

**Symptom that you're about to violate this:** writing "we should add an email field for follow-up" or "let's measure conversion rate on this form." Stop.

---

## 5. Placeholder text is NOT auto-replaced with realistic-looking content

**The pattern:** Pricing pages show `₹ [fee]` and `[ % ]`. Purohit list shows `[years]` for years of service if not verified. Photo bands show `[real photo TBD]` as overlay text. Transliterations not yet reviewed show `[verify-transliteration: <english>]`.

**Do not replace placeholders with fake-but-plausible content.** Reasoning:

1. The pricing numbers are blocked on a real business decision the founder is making. Filling them with `₹ 999` or `5%` to "make the page look complete" creates two problems: (a) the founder may publish without realizing the number is fake, (b) if shown to investors, the fake number becomes a real commitment.
2. Photos are blocked on signed consent from real Purohits. Substituting stock images creates the impression that these are real people's photos. That's a misrepresentation that hurts trust the moment a user notices.
3. Telugu transliterations done by AI are not safe to ship. The script has compound characters that need editorial review. A wrong transliteration on a Hindu-rituals site signals incompetence in the most damaging place.
4. Placeholders are greppable. Fake-but-plausible content is not. The launch checklist depends on `grep -r '\[' src/` finding everything that's not real yet. If you replace `[fee]` with `999`, that line silently passes the grep.

**Symptom that you're about to violate this:** writing "let me use a realistic value just for now." Stop.

---

## 6. The three-script eyebrow is NOT extracted into a config object

**The pattern:** Each page passes English, Telugu, and Sanskrit strings to `<ThreeScriptEyebrow>` directly. There's no central `eyebrows.ts` config file mapping section names to their three-script versions.

**Do not extract this into a config.** Reasoning:

1. Each page's eyebrow is contextual — the English label often differs slightly from the page title to fit the column. A config object encourages reuse that flattens this nuance.
2. The Telugu transliterations need editorial review per-occurrence, not per-string. Same English word may have different correct Telugu rendering in different contexts (formal vs. familiar). A central config encourages homogenization that hides this.
3. The number of eyebrows on the site is small (under 25 across all pages). A config saves no real lines.

**Symptom that you're about to violate this:** writing `import { eyebrows } from '~/data/eyebrows.ts'`. Stop.

---

## 7. The page gutter is 56px ALWAYS on desktop

**The pattern:** Every major content block at desktop has `px-14` (56px) padding left and right. Section bands have it. Heroes have it. List sections have it. The footer has it.

**Do not introduce a "compact" or "wide" gutter for specific pages.** Reasoning:

1. The 56px gutter aligns content vertically across page transitions. When the column-wipe completes and the new page reveals, the content sits at the same horizontal position as the previous page's content. This is a subtle but real piece of visual continuity.
2. Tailwind has `px-14` as a single class. Page-specific gutters mean multiple classes or arbitrary values, which slows down design audits.
3. If a section truly needs more breathing room, add internal padding, not gutter override.

**Symptom that you're about to violate this:** writing `<div class="px-20 lg:px-32">` on a specific page. Stop.

---

## 8. The column-wipe transition is NOT replaced with a "simpler" CSS transition

**The pattern:** Page transitions use a GSAP-driven 5-column wipe (3 on mobile) that takes ~750ms total. The implementation in `composables/useColumnWipe.ts` is non-trivial — it builds a DOM overlay, animates each column with a stagger, hands off mid-animation, then wipes the columns back out.

**Do not replace this with a CSS `transition: opacity` or a simple slide.** Reasoning:

1. This is the signature motion language of the site. Every Hyderabad-based reference design we looked at uses a generic fade. The column-wipe is what distinguishes this site visually.
2. The complexity is intentional. It uses GSAP because the View Transitions API has Safari quirks. It uses 5 columns desktop / 3 mobile because tighter columns feel cluttered on small screens. It uses ~750ms because tested durations under 500ms feel jarring and over 1000ms feel slow.
3. The fallback to crossfade on repeat-within-3s is the only acceptable "simpler" version, and it's already in the code.

**Symptom that you're about to violate this:** writing "let me try a CSS-only version of this." Stop.

---

## 9. The Libre Baskerville Italic font is restricted to two uses

**The pattern:** Libre Baskerville Italic appears in exactly two places: (a) ritual names written in English Latin script (Muhurtham, Antyeshti, Vivaha...), (b) the founder's quote on `/antyeshti`. Nowhere else.

**Do not add it for "emphasis" or "elegance" or "variety."** Reasoning:

1. The restriction is what makes the font work. If it appears everywhere, it loses meaning. When a reader sees italic Baskerville, they should know — without thinking — "this is a ritual name" or "this is the founder speaking."
2. Bricolage Grotesque + Inter is the entire typographic system otherwise. Two families. The Baskerville is the third only because it carries this specific role.
3. If you need emphasis, use `<strong>` rendered as Inter Semi Bold. If you need quotation marks, use them.

**Symptom that you're about to violate this:** writing `class="font-baskerville italic"` on a heading, a callout, a tagline, or anywhere not on the approved list. Stop.

---

## 10. The booking flow state lives in localStorage, not the URL

**The pattern:** `useBookingState` persists to `localStorage`. The URL path indicates which step the user is on (`/book/configure`), but the data they've filled in (ritual chosen, date selected) is in localStorage.

**Do not move state to the URL query string.** Reasoning:

1. Booking flow state can be sensitive — family details, dates, locations. Putting it in the URL means it appears in browser history, server logs, analytics referrers (if any), and shared links.
2. The URL `/book/configure` is shareable in a useful way (lands the user on the right step). URL state would make `/book/configure?ritual=vivaha&date=2026-08-15&location=Hyderabad` shareable in a not-useful way.
3. The `useLocalStorage` from VueUse handles refresh-recovery cleanly. URL state would require server-side hydration logic and break refresh-recovery.

**Symptom that you're about to violate this:** writing `useRouter().push({ query: { ...bookingState.value } })`. Stop.

---

## 11. Forms use VeeValidate + Zod, NOT a custom validation utility

**The pattern:** Every form uses VeeValidate's `useForm` with `toTypedSchema(z.object(...))`. Errors render under each input via the `error` prop on `<FormInput>`.

**Do not roll a custom validation layer "for simplicity."** Reasoning:

1. VeeValidate + Zod gives us reactive error state, typed input handlers, and async validation support out of the box. Rolling these from scratch takes hours and introduces bugs.
2. Zod schemas double as TypeScript types via `z.infer<typeof schema>`. We get free type safety on form payloads.
3. The schema is also reusable on the server. The `POST /api/antyeshti-request` handler validates with the same Zod schema as the client form. Custom validation would force us to write the rules twice.

**Symptom that you're about to violate this:** writing `if (!name) errors.value.name = 'required'`. Stop.

---

## 12. The `<SiteNav>` component has TWO variants (default and minimal), NOT a slot

**The pattern:** Most pages render `<SiteNav>` with the full nav (logo + 5 links + Sign in + CTA). The booking flow uses a "minimal" variant (logo + Save & exit only) — implemented as a prop on the same component, OR as a separate `<SiteNavMinimal>` component. Either is fine, but it's a discrete variant, not slot-based composition.

**Do not refactor `<SiteNav>` to expose slots for every section.** Reasoning:

1. The two variants are the only two needed. Slot-based composition opens the door to "let me hide the search icon on this page" or "let me add an extra link to the nav on the partner pages," which we don't want.
2. The locked nav is the locked nav. Variations are limited intentionally.
3. If a third variant is genuinely needed (e.g., a "marketing landing page" without the full nav), add it as another prop value (`variant="default" | "minimal" | "landing"`), not as a slot escape hatch.

**Symptom that you're about to violate this:** writing `<SiteNav><template #right>...</template></SiteNav>`. Stop.

---

## 13. Tailwind config tokens are NOT renamed to "semantic" names

**The pattern:** Color tokens are `bg`, `ink`, `paper`, `accent`, `solemn`, `line`. Font sizes are `h-10`, `h-16`, `h-26`, etc. These are the names from `design-system.md`.

**Do not rename to `primary`, `secondary`, `surface`, `surface-1`, etc.** Reasoning:

1. The current names are unique to this design system. Generic names like `primary` carry baggage from every other design system and lead to confusion ("which one is primary? the one I should use most? the one that's the brand color?").
2. `ink` and `paper` describe what the color IS, not what it does. A future redesign that changes the brand from kumkum to indigo doesn't break these names. `primary` would either lie or need renaming.
3. The font-size names like `h-110` directly indicate the pixel value, which is the most useful information when reading the codebase.

**Symptom that you're about to violate this:** writing `colors: { primary: '#1A1614', secondary: '#C8472D' }`. Stop.

---

## 14. The footer is NOT a complex multi-column directory

**The pattern:** `<SiteFooter>` is a big wordmark (`SanatanaSetu.` at 68px+) with three small label columns underneath (Devotees, Partners, Platform) and a single muted note about the build status. That's it.

**Do not expand the footer with newsletter signup, social links, sitemap dump, contact form, etc.** Reasoning:

1. The big wordmark IS the design statement. Adding more elements diminishes it.
2. No newsletter — we don't have a newsletter strategy.
3. No social links — the founder has not committed to social media presence yet.
4. No "Sitemap" footer link — search engines find the sitemap.xml, humans don't navigate via footer sitemaps.

**Symptom that you're about to violate this:** writing "let me add a newsletter signup to the footer." Stop.

---

## When this list itself needs updating

This list is updated by the founder, not by the AI. If you (the AI) genuinely believe one of these patterns is wrong, **bring it up in the conversation, don't change it silently**. The founder will either:

1. Agree and update this list (removing or revising the entry), then approve the change
2. Disagree and add reasoning to the entry to make it more defensible
3. Defer the decision to a future review

Silent refactors of locked patterns are the single fastest way to lose the design's coherence. This entire file exists because that has happened before.
