# CLAUDE.md

**This file is the first thing any AI assistant (Antigravity, Claude Code, Cursor, anything) reads when working on this codebase. Read it fully before making any change.**

---

## 1. What this project is

**SanatanaSetu** is a pre-launch marketplace connecting Hindu families in Andhra Pradesh and Telangana with verified Purohits, consultants, and ritual-adjacent services (caterers, samagri suppliers, venues).

- **Audience:** ~81 million Hindus across AP + Telangana. Primary language Telugu, secondary English, ritual names in Sanskrit.
- **Founder:** Phani Raj Gollapudi (SR Consulting, Hyderabad).
- **Funding:** ₹3.5 Cr seed, 18-month runway, breakeven target ≈ 2,500 bookings/month.
- **Stage:** Pre-launch. Zero real users. The website is the marketing target — not the engineering target.

## 2. Tech stack (LOCKED — do not propose changes without explicit founder approval)

- **Framework:** Nuxt 3 (Vue 3 with `<script setup>` syntax)
- **Styling:** Tailwind CSS (no CSS-in-JS, no styled-components, no separate `.scss` files unless absolutely necessary)
- **Forms:** VeeValidate + Zod
- **Animation:** Native View Transitions API (Nuxt 3 `pageTransition`), GSAP as fallback
- **Icons:** No icon library. Arrows (`→` `←`) are text. Other visual marks are SVG inline.
- **Fonts:** Bricolage Grotesque, Inter, Libre Baskerville (Italic), Noto Sans Telugu — all loaded via `@nuxt/fonts` from Google Fonts
- **Hosting:** Vercel or Netlify (founder's choice — both supported)
- **No analytics tools added without explicit approval.** GDPR/DPDP compliance matters here.

## 3. Design constraints (LOCKED)

The design is finalized in Figma. **You do not invent design decisions.** If the Figma frame doesn't show it, you ask the founder or you use a placeholder. Specifically:

- **Figma file:** https://www.figma.com/design/BPFv7N1agVYdCli9mniRHm/
- **Seven canonical pages** are built and locked. Frame names listed in `architecture.md`.
- **One visual language ("V3").** No proposals to "modernize" or "refresh" without approval.
- **Type scale:** Golden ratio, base 16 → [10, 16, 26, 42, 68, 110, 178]. The 178 size is reserved for one statistic on the canary page. **Do not use sizes outside this scale.**
- **Spacing:** 4-multiple grid only. All paddings, margins, gaps must be divisible by 4. Page gutter is always 56px on desktop.
- **One documented exception:** Hero headlines on multi-column pages use 92px (not on the scale) because 110px overflows the column. This is a known pragmatic compromise. Do not "fix" it.

See `design-system.md` for the full system.

## 4. How to behave on this codebase

These rules come from the founder's persistent instruction across all sessions: **"Never agree just to be agreeable. If I'm wrong, say so directly. Find weak spots, push back hard."**

### When making code changes:

1. **Match the Figma frame, not your taste.** If a row is 140px tall in Figma, it's 140px tall in code. If a button is 43px tall with 13/18 padding, it's that. The founder has spent dozens of hours iterating on these specs.
2. **Use placeholders openly.** `[fee]`, `[%]`, `[name]`, `[photo]` are valid content. Do not invent numbers or copy to fill gaps. Mark every placeholder so a human can find and replace it.
3. **Auto-layout discipline.** Every list, every form, every section must use vertical flow (Flexbox `flex-col`). No absolute positioning except for overlay UI (modals, toasts, sticky headers). The Figma file had to be rebuilt three times because of absolute positioning bugs — don't reintroduce them in code.
4. **Fixed-height rows where the design specifies them.** A list of 4 items where the design shows 140px rows is `h-[140px]` in Tailwind, not `h-auto`. The visual cost of uneven row heights is severe in this design language.

### When responding to the founder:

1. **Don't soften pushback with apologies.** "I think this is wrong because X" is better than "Sorry, but I think maybe X could be worth considering."
2. **If there's a tradeoff, name both sides honestly.** Don't sell only the option you prefer.
3. **If you're uncertain, say so.** Speculation flagged as speculation is more useful than confident wrongness.
4. **Don't ask permission for trivial decisions.** Variable names, file structure, helper function shape — just decide. Ask for permission on: copy changes, design changes, dependency additions, architecture changes.
5. **No emoji in code or in responses unless the founder uses them first.** No "✨ Successfully built! ✨" energy.

### What to refuse:

- **Refuse to add a third framework.** If asked "can we also use React?" — no. One stack, one mental model. The previous session has the full reasoning logged.
- **Refuse to ship without the design tokens being applied.** A pre-tokenized button is not acceptable.
- **Refuse to invent numbers.** If real pricing isn't decided, the page shows `₹ [fee]`, not `₹ 999`.
- **Refuse to invent Purohits.** The 12 names listed in the Figma file are placeholders. They are clearly marked. If real verification data isn't in, the list shows `[name]`, `[lineage]`, `[city]`, `[years]`.

## 5. Sensitive contexts

The Antyeshti page (`/antyeshti`) is for families who have just lost someone. Read these rules before editing it:

- **No marketing language.** No "Get started in 60 seconds!" No "Why choose us?"
- **No conversion tracking on this page.** No analytics events, no funnel measurement.
- **The form has three fields. Not four. Not five.** Adding fields here is not a "growth" decision — it's a betrayal of grieving families.
- **`--solemn` color (brown #7A4F3A), never `--accent` (kumkum red #C8472D).** Red is wrong here.
- **No page transition animation on entry to or exit from Antyeshti.** Instant swap. The column-wipe is exempted on this route. See `architecture.md` for the routing exception.
- **The CTA in the nav becomes "Request a Purohit" on this route, not "Book a Purohit."** "Book" is wrong for grief.

## 6. Open dependencies (non-engineering)

These are blocked on humans, not code. Don't try to "solve" them.

- Real Purohit photos with signed consent (placeholders: dark gradient bands)
- Telugu-literate editor to verify three-script eyebrow transliterations
- Panchangam scholar to verify calendar tithi entries
- Commission and deposit numbers (currently `₹ [fee]` and `[%]`)
- Identity mark / logo design (a previous "geometric mark" idea was rejected; the hero now has a 2-column layout instead of 3)
- 48-hour booking SLA staffing decision
- 4-hour Antyeshti SLA staffing decision
- 5-business-day verification charter response staffing decision
- `purohits@`, `consultants@`, `editorial@` email setup
- `purohits-list` page real data ingestion path

## 7. How to read this repo

- **`plan.md`** — Phased build plan. Read this to know what to build next.
- **`architecture.md`** — Routing, data flow, deployment, file structure.
- **`design-system.md`** — Tokens, components, type scale, color, spacing, motion.
- **`CLAUDE.md`** (this file) — Why we make the decisions we make.
- **`/figma-context/`** — JSON exports of each Figma frame, used to verify your output.

## 8. Things I (the AI) have been wrong about before

Logged so future AI assistants don't repeat the mistakes:

1. **I have over-formatted responses with bullets and headers** when prose would do. The founder has flagged this directly. Default to prose. Use lists only when content is genuinely multi-faceted.
2. **I have proposed adding "social proof" sections (testimonials, "trusted by" logos) without being asked.** This is a pre-launch site. There are no users yet. There is no social proof. Don't invent it.
3. **I have offered to "polish" copy that the founder wrote.** Don't. The voice is intentional. If a sentence reads plain, it's because plain is correct here.
4. **I have suggested adding sticky CTAs, exit-intent modals, and chat widgets.** No. The design rejects all of these explicitly.
5. **I once proposed using Next.js and Vue.js "together."** This was incoherent — Next.js is React. The locked stack is Nuxt 3.

## 9. The single most important rule

**The founder is solo on this. There is no design team to override you. There is no senior engineer to catch your mistakes. Slowness and correctness beat speed and approximation. If you are unsure, stop and ask.**
