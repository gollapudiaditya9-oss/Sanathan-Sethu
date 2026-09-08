<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from '#imports'
import ButtonLarge from '~/components/ui/ButtonLarge.vue'
import ButtonSmall from '~/components/ui/ButtonSmall.vue'
import FormInput from '~/components/ui/FormInput.vue'
import { useBookingState } from '~/composables/useBookingState'

const router = useRouter()
const { startOpenBooking } = useBookingState()

const bgLayer = ref<HTMLElement | null>(null)
const fgLayer = ref<HTMLElement | null>(null)
const wordLayer = ref<HTMLElement | null>(null)
const scrimLayer = ref<HTMLElement | null>(null)
const offerRow = ref<HTMLElement | null>(null)
const partnerSection = ref<HTMLElement | null>(null)
const activeOffer = ref(0)
const activePartner = ref(0)
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const menuOverlay = ref<HTMLElement | null>(null)
const institutionEmail = ref('')

let animationFrame = 0
let targetScroll = 0
let currentScroll = 0
let reduceMotion = false

const icons = {
  diya: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14s3 3 8 3 8-3 8-3-3 3-8 3-8-3-8-3z"/><path d="M12 3c1.5 2 2.5 3.2 2.5 4.8A2.5 2.5 0 0 1 12 10a2.5 2.5 0 0 1-2.5-2.2C9.5 6.2 10.5 5 12 3z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H8l-4 3z"/><path d="M9.5 9.5a2.2 2.2 0 1 1 3 2c-.7.5-1 .9-1 1.7"/></svg>',
  cal: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>',
  book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3z"/><path d="M17 7h2v13h-9"/></svg>'
}

const offerItems = [
  {
    tab: 'Book a Purohit',
    icon: icons.diya,
    title: 'Book a Purohit for a ritual',
    desc: 'Wedding, Griha Pravesh, Antyeshti, Upanayanam, daily rituals. A verified Purohit, the right samagri, the right day.',
    image: '/landing/menu/book-a-purohit.jpg',
    soon: false,
    action: 'Browse Purohits',
    to: '/purohits'
  },
  {
    tab: 'Ask an Expert',
    icon: icons.chat,
    title: 'Ask a verified expert',
    desc: 'Jatakam, Muhurtham, Vaastu, scriptural questions. A 30-minute phone call or a written report - you choose.',
    image: '/landing/menu/ask-an-expert.jpg',
    soon: false,
    action: 'Ask a question',
    to: '/consultants'
  },
  {
    tab: 'The Calendar',
    icon: icons.cal,
    title: 'Read the calendar',
    desc: 'Tithis, festivals, regional observances and auspicious dates - calculated using the Drik Ganitha system.',
    image: '/landing/menu/calendar.jpg',
    soon: false,
    action: 'Open the calendar',
    to: '/calendar'
  },
  {
    tab: 'The Library',
    icon: icons.book,
    title: 'The library',
    desc: 'Slokas by theme. Pravachanams from named gurus. The Vedas and Upanishads with citations.',
    image: '/landing/menu/library.jpg',
    soon: false,
    action: 'Open the library',
    to: '/library'
  }
]

const partnerItems = [
  {
    title: 'Purohit',
    description: 'Lineage-led, full-time. Bookings managed for you, samagri handled, dakshina between you and the family.',
    image: '/landing/menu/purohit.jpg',
    to: '/become-a-purohit'
  },
  {
    title: 'Consultant',
    description: 'Astrologers, Jyotishis, Vaastu experts. Take written or phone-call work on your schedule.',
    image: '/landing/menu/consultant.jpg',
    to: '/become-a-consultant'
  },
  {
    title: 'Caterer',
    description: 'Sattvic catering for ceremonies, prasadam preparation. We send you booking-aligned demand.',
    image: '/landing/menu/caterer.jpg',
    to: '/partners/caterer'
  },
  {
    title: 'Puja Store, Venue, Travel',
    description: 'Samagri suppliers, kalyanamandapams, transport providers. List on the platform.',
    image: '/landing/menu/puja-store.jpg',
    to: '/waitlist'
  }
]

const updateTarget = () => {
  targetScroll = window.scrollY
}

const setActiveOffer = (index: number) => {
  activeOffer.value = index
}

const setMenuOpen = (open: boolean, returnFocus = false) => {
  menuOpen.value = open
  document.body.style.overflow = open ? 'hidden' : ''
  nextTick(() => {
    if (open) window.setTimeout(() => menuOverlay.value?.querySelector<HTMLElement>('button')?.focus(), 450)
    else if (returnFocus) menuButton.value?.focus()
  })
}

const toggleMenu = () => {
  setMenuOpen(!menuOpen.value)
}

const goTo = (path: string) => {
  if (menuOpen.value) setMenuOpen(false)
  router.push(path)
}

const beginBooking = () => {
  startOpenBooking()
  goTo('/book/choose-ritual')
}

const notifyInstitution = () => {
  router.push({
    path: '/waitlist',
    query: institutionEmail.value.trim() ? { email: institutionEmail.value.trim(), source: 'institution' } : { source: 'institution' }
  })
}

const handleMenuKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    setMenuOpen(false, true)
    return
  }
  if (event.key !== 'Tab') return
  const focusable = Array.from(menuOverlay.value?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]') ?? [])
  if (!focusable.length) return
  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

const animateHero = () => {
  animationFrame = window.requestAnimationFrame(animateHero)
  currentScroll += (targetScroll - currentScroll) * (reduceMotion ? 1 : 0.09)

  const viewportHeight = window.innerHeight || 800
  const progress = Math.min(currentScroll / viewportHeight, 1)

  if (bgLayer.value) {
    bgLayer.value.style.transform = `translateY(${currentScroll * 0.34}px) scale(${1 + progress * 0.04})`
  }

  if (fgLayer.value) {
    fgLayer.value.style.transform = `translateY(${currentScroll * 0.06}px) scale(${1 + progress * 0.09})`
  }

  if (wordLayer.value) {
    wordLayer.value.style.transform = `translateY(${currentScroll * 0.5}px)`
    wordLayer.value.style.opacity = String(Math.max(0, 1 - progress * 1.1))
  }

  if (scrimLayer.value) {
    scrimLayer.value.style.opacity = String(Math.max(0, 1 - progress * 1.3))
  }

  if (!reduceMotion && offerRow.value) {
    const active = offerRow.value.querySelector<HTMLElement>('.offer-item.is-active')
    const scene = active?.querySelector<HTMLElement>('.offer-scene')
    const sceneBg = scene?.querySelector<HTMLElement>('.offer-scene__plate--bg')

    if (active && sceneBg) {
      const rect = active.getBoundingClientRect()
      const offset = ((viewportHeight - rect.top) / (viewportHeight + rect.height)) - 0.5
      sceneBg.style.transform = `translateY(${offset * 24}px) scale(1.04)`
    }
  }

  if (partnerSection.value && window.innerWidth >= 1200) {
    const steps = Array.from(partnerSection.value.querySelectorAll<HTMLElement>('.partner-step'))
    const focusLine = viewportHeight * 0.5
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    steps.forEach((step, index) => {
      const rect = step.getBoundingClientRect()
      const distance = Math.abs(rect.top + rect.height * 0.5 - focusLine)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    activePartner.value = closestIndex
  }
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  updateTarget()
  window.addEventListener('scroll', updateTarget, { passive: true })
  animateHero()
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('scroll', updateTarget)
  window.cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div class="w-full flex flex-col">
    <section class="setu-hero" aria-label="Sanatana Setu">
      <h1 class="sr-only">SanatanaSetu</h1>
      <div ref="bgLayer" class="setu-hero__plate setu-hero__plate--bg">
        <img src="/landing/kedarnath-hero-bg.jpg" alt="" aria-hidden="true">
      </div>

      <div ref="scrimLayer" class="setu-hero__scrim" aria-hidden="true" />

      <div ref="wordLayer" class="setu-hero__word" aria-hidden="true">
        <b>Setu.</b>
      </div>

      <div ref="fgLayer" class="setu-hero__plate setu-hero__plate--fg">
        <img src="/landing/sanatanasetu-fg.webp" alt="" aria-hidden="true">
      </div>

      <div class="setu-hero__fade" aria-hidden="true" />
      <div class="setu-hero__bar">
        <button
          ref="menuButton"
          type="button"
          class="menu-btn"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          aria-controls="homepage-menu"
          @click="toggleMenu"
        >
          <i />
          <i />
        </button>

        <NuxtLink to="/" class="setu-hero__brand" @click="setMenuOpen(false)">
          SanatanaSetu.
        </NuxtLink>

        <button type="button" class="pill-btn pill-btn--fill" @click="beginBooking">
          Book a Purohit
        </button>
      </div>

      <div id="homepage-menu" ref="menuOverlay" class="menu-overlay" :class="{ 'is-open': menuOpen }" :aria-hidden="!menuOpen" role="dialog" aria-modal="true" aria-label="Homepage menu" @keydown="handleMenuKeydown">
        <nav class="menu-nav" aria-label="Homepage menu">
          <button type="button" @click="goTo('/purohits')">Purohits</button>
          <button type="button" @click="goTo('/consultants')">Consultants</button>
          <button type="button" @click="goTo('/calendar')">Calendar</button>
          <button type="button" @click="goTo('/partners')">For Partners</button>
          <button type="button" @click="goTo('/signin')">Login</button>
        </nav>
      </div>

      <div class="setu-hero__scroll">Scroll</div>
    </section>

    <section class="home-offer" aria-label="For devotees and families">
      <div class="home-offer__wrap">
        <div class="home-offer__head">
          <p>For devotees and families</p>
        </div>

        <div ref="offerRow" class="offer-row">
          <article
            v-for="(item, index) in offerItems"
            :key="item.tab"
            class="offer-item"
            :class="{ 'is-active': activeOffer === index }"
          >
            <div class="offer-scene">
              <div class="offer-scene__plate offer-scene__plate--bg">
                <img :src="item.image" :alt="item.title">
              </div>
              <div class="offer-scene__shade" aria-hidden="true" />
              <div class="offer-scene__icon" v-html="item.icon" />
              <div class="offer-scene__content">
                <h2>{{ item.title }}</h2>
                <p>{{ item.desc }}</p>
              </div>
              <div class="offer-scene__action">
                <button
                  type="button"
                  class="offer-action"
                  :class="{ 'offer-action--muted': item.soon }"
                  @click.stop="goTo(item.to)"
                >
                  <span>{{ item.action }}</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              class="offer-label"
              :aria-label="`Show ${item.tab}`"
              :aria-pressed="activeOffer === index"
              :disabled="activeOffer === index"
              @click="setActiveOffer(index)"
            >
              <span class="offer-label__index">0{{ index + 1 }}</span>
              <span class="offer-label__text">{{ item.tab }}</span>
            </button>
          </article>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section ref="partnerSection" class="partner-steps" aria-labelledby="partner-steps-title">
      <div class="partner-steps__inner">
        <h2 id="partner-steps-title" class="font-bricolage text-h-68 text-ink tracking-[-0.03em] leading-none">
          For Purohits, consultants,<br>and businesses.
        </h2>

        <div class="partner-steps__layout">
          <div class="partner-steps__list" role="list">
            <article
              v-for="(item, index) in partnerItems"
              :key="item.title"
              class="partner-step"
              :class="{ 'is-active': activePartner === index }"
              :aria-current="activePartner === index ? 'step' : undefined"
              role="listitem"
            >
              <div class="partner-step__copy">
                <h3 class="partner-step__title">{{ item.title }}</h3>
                <p class="partner-step__description">{{ item.description }}</p>
                <div class="partner-step__actions">
                  <ButtonSmall variant="outline" label="Apply" class="w-full justify-center" @click="router.push(item.to)" />
                </div>
              </div>
            </article>
          </div>

          <div class="partner-visual-column" aria-hidden="true">
            <div class="partner-visual-sticky">
              <img class="partner-visual__photo partner-visual__photo--background" :src="partnerItems[activePartner]!.image" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Institutions Section -->
    <section class="w-full bg-solemn-soft px-6 py-16 md:px-14 md:py-24">
      <div class="mx-auto w-full  flex flex-col lg:flex-row gap-16 items-start justify-between">
        <div class="flex flex-col gap-6">
          <span class="font-inter text-h-10 text-accent uppercase tracking-[0.14em] font-semibold">FOR INSTITUTIONS</span>
          <h2 class="font-bricolage text-[56px] md:text-h-68 text-ink leading-[0.95] tracking-[-0.03em]">Temples, gurukuls, and family trusts.</h2>
          <p class="font-inter text-h-16 text-ink-2">Recurring rituals, festival calendars, donor coordination. We will reach out to you.</p>
        </div>
        <div class="flex w-full flex-col items-start gap-6 lg:mt-auto lg:w-[clamp(320px,32vw,520px)] lg:flex-none">
          <FormInput v-model="institutionEmail" class="w-full" label="EMAIL" type="email" name="email" autocomplete="email" placeholder="you@institution.org" />
          <ButtonLarge label="Notify me" @click="notifyInstitution" />
        </div>
      </div>
    </section>


  </div>
</template>

<style scoped>
.setu-hero {
  position: relative;
  height: 100svh;
  min-height: 620px;
  overflow: hidden;
  background: #0d1113;
  isolation: isolate;
}

.setu-hero__plate {
  position: absolute;
  top: -8%;
  left: 0;
  right: 0;
  height: 116%;
  will-change: transform;
}

.setu-hero__plate img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 42%;
}

.setu-hero__plate--bg {
  z-index: 1;
}

.setu-hero__plate--fg {
  z-index: 4;
}

.setu-hero__scrim {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: radial-gradient(56% 32% at 52% 30%, rgba(8, 12, 14, 0.46), transparent 72%);
  will-change: opacity;
}

.setu-hero__word {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: grid;
  place-items: center;
  color: #fff2dd;
  font-family: "Bricolage Grotesque", sans-serif;
  text-shadow: 0 8px 48px rgba(0, 0, 0, 0.55);
  will-change: transform, opacity;
}

.setu-hero__word b {
  margin-bottom: 18vh;
  font-size: clamp(90px, 17vw, 280px);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 0.82;
}

.setu-hero__fade {
  position: absolute;
  z-index: 5;
  left: 0;
  right: 0;
  bottom: 0;
  height: clamp(96px, 14vh, 140px);
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgba(8, 12, 14, 0.34));
}

.setu-hero__scroll {
  position: absolute;
  z-index: 6;
  left: 44px;
  bottom: 30px;
  color: rgba(251, 248, 241, 0.92);
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
}

.setu-hero__bar {
  position: absolute;
  z-index: 60;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px 44px;
}

.setu-hero__brand {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff2dd;
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 21px;
  font-weight: 700;
  text-decoration: none;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.6);
  transform: translate(-50%, -50%);
}

.menu-btn {
  position: relative;
  width: 36px;
  height: 34px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.menu-btn i {
  position: absolute;
  right: 6px;
  left: 6px;
  height: 2px;
  border-radius: 2px;
  background: #fff2dd;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
  transition: top 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.menu-btn i:nth-child(1) {
  top: 12px;
}

.menu-btn i:nth-child(2) {
  top: 20px;
}

.menu-btn[aria-expanded="true"] i:nth-child(1) {
  top: 16px;
  transform: rotate(45deg);
}

.menu-btn[aria-expanded="true"] i:nth-child(2) {
  top: 16px;
  transform: rotate(-45deg);
}

.menu-btn:focus-visible,
.setu-hero__brand:focus-visible,
.pill-btn:focus-visible,
.menu-nav button:focus-visible {
  outline: 2px solid #fff2dd;
  outline-offset: 4px;
}

.pill-btn {
  display: inline-flex;
  min-width: 157px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 14px 26px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.15s, background 0.2s, color 0.2s, border-color 0.2s;
}

.pill-btn--fill {
  background: var(--accent);
  color: #fff7ec;
}

.pill-btn--fill:hover {
  background: #b5532c;
  transform: translateY(-1px);
}

.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 18, 17, 0.97);
  backdrop-filter: blur(8px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s, visibility 0.4s;
}

.menu-overlay.is-open {
  opacity: 1;
  visibility: visible;
}

.menu-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}

.menu-nav button {
  border: 0;
  background: transparent;
  color: #fff2dd;
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: clamp(34px, 6vw, 64px);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.22;
  opacity: 0;
  cursor: pointer;
  transform: translateY(20px);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s, color 0.2s;
}

.menu-overlay.is-open .menu-nav button {
  opacity: 0.92;
  transform: translateY(0);
}

.menu-overlay.is-open .menu-nav button:nth-child(2) {
  transition-delay: 0.05s;
}

.menu-overlay.is-open .menu-nav button:nth-child(3) {
  transition-delay: 0.1s;
}

.menu-overlay.is-open .menu-nav button:nth-child(4) {
  transition-delay: 0.15s;
}

.menu-overlay.is-open .menu-nav button:nth-child(5) {
  transition-delay: 0.2s;
}

.menu-nav button:hover {
  color: var(--accent);
  opacity: 1;
}

.home-offer {
  padding: clamp(112px, 9vw, 160px) 0 130px;
  background: var(--bg);
}

.home-offer__wrap {
  width: min(100% - 88px, 1440px);
  margin: 0 auto;
}

.home-offer__head {
  margin-bottom: 34px;
}

.home-offer__head p {
  color: var(--accent);
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}


.offer-row {
  display: flex;
  gap: 14px;
  height: 560px;
}

.offer-item {
  position: relative;
  flex: 0 0 74px;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(47, 36, 31, 0.16);
  border-radius: 22px;
  background: transparent;
  cursor: pointer;
  transition: flex-grow 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
}

.offer-item:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 4px;
}

.offer-item.is-active {
  flex-grow: 1;
  border-color: transparent;
  cursor: default;
}

.offer-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  transition: opacity 0.3s;
}

.offer-item.is-active .offer-label {
  opacity: 0;
  visibility: hidden;
}

.offer-label__text {
  color: var(--ink-3);
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transform: rotate(180deg);
  white-space: nowrap;
  writing-mode: vertical-rl;
}

.offer-label__index {
  position: absolute;
  top: 16px;
  left: 50%;
  color: var(--ink-3);
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 700;
  transform: translateX(-50%);
}

.offer-scene {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s 0.1s;
}

.offer-item.is-active .offer-scene {
  opacity: 1;
  pointer-events: auto;
}

.offer-scene__icon,
.offer-scene__content,
.offer-scene__action {
  opacity: 0;
  visibility: hidden;
  transition: none;
}

.offer-item.is-active .offer-scene__icon,
.offer-item.is-active .offer-scene__content,
.offer-item.is-active .offer-scene__action {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.28s 0.24s cubic-bezier(0.16, 1, 0.3, 1), visibility 0s 0.24s;
}

.offer-scene__plate {
  position: absolute;
  top: -6%;
  left: 0;
  right: 0;
  height: 112%;
  will-change: transform;
}

.offer-scene__plate img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 38%;
}

.offer-scene__plate--bg {
  z-index: 1;
}

.offer-scene__shade {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: linear-gradient(to top, rgba(8, 12, 14, 0.85) 0%, rgba(8, 12, 14, 0.12) 50%, rgba(8, 12, 14, 0.35) 100%);
}

.offer-scene__icon {
  position: absolute;
  z-index: 4;
  top: 34px;
  left: 34px;
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
}

.offer-scene__icon :deep(svg) {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: #fff2dd;
  stroke-width: 1.6;
}

.offer-scene__content {
  position: absolute;
  z-index: 4;
  right: 230px;
  bottom: 40px;
  left: 40px;
  color: #fff2dd;
}

.offer-scene__content h2 {
  margin: 16px 0 12px;
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: clamp(30px, 3.2vw, 50px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.02;
}

.offer-scene__content p {
  color: rgba(251, 248, 241, 0.82);
  font-family: Inter, sans-serif;
  font-size: 17px;
  line-height: 1.45;
}

.offer-scene__action {
  position: absolute;
  z-index: 4;
  right: 36px;
  bottom: 40px;
}

.offer-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 14px 24px;
  background: var(--accent);
  color: #fff7ec;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  transition: transform 0.15s, background 0.2s, color 0.2s;
}

.offer-action:hover {
  background: #c86432;
  transform: translateY(-1px);
}

.offer-action--muted {
  border-color: rgba(251, 248, 241, 0.4);
  background: transparent;
  color: rgba(251, 248, 241, 0.82);
}

.partner-steps {
  position: relative;
  background: var(--bg);
  padding: 144px 0 96px;
}

.partner-steps__inner {
  width: min(calc(100% - 112px), 1440px);
  margin: 0 auto;
}

.partner-steps__inner > h2 {
  margin-bottom: 80px;
}

.partner-steps__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 500px);
  gap: clamp(72px, 8vw, 144px);
  align-items: start;
}

.partner-steps__list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(47, 36, 31, 0.1);
}

.partner-step {
  display: flex;
  min-height: 72svh;
  align-items: center;
  border-bottom: 1px solid rgba(47, 36, 31, 0.1);
  opacity: 0.2;
  transition: opacity 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.partner-step.is-active {
  opacity: 1;
}

.partner-step__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.partner-step__title {
  color: var(--ink);
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 68px;
  letter-spacing: -0.03em;
  line-height: 0.95;
}

.partner-step__description {
  max-width: 46ch;
  color: var(--ink-3);
  font-family: Inter, sans-serif;
  font-size: 26px;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.partner-step__actions {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 24px;
  margin-top: 12px;
}

.partner-step__actions :deep(a),
.partner-step__actions :deep(button) {
  width: min(100%, 200px);
  justify-content: center;
}

.partner-visual-column {
  position: relative;
  min-height: 288svh;
}

.partner-visual-sticky {
  --partner-visual-height: clamp(480px, 72svh, 640px);
  --partner-visual-half-height: clamp(240px, 36svh, 320px);
  position: sticky;
  top: calc(50svh - var(--partner-visual-half-height));
  overflow: hidden;
  width: min(100%, 400px);
  height: var(--partner-visual-height);
  margin-left: auto;
  border-radius: 999px;
  isolation: isolate;
}

.partner-visual__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

.partner-visual__photo--background {
  z-index: 0;
}

@media (max-width: 1199px) {
  .partner-steps {
    padding: 96px 0;
  }

  .partner-steps__inner {
    width: calc(100% - 48px);
  }

  .partner-steps__inner > h2 {
    margin-bottom: 64px;
  }

  .partner-steps__layout {
    display: block;
  }

  .partner-step {
    display: block;
    min-height: 140px;
    padding: 28px 0;
    opacity: 1;
  }

  .partner-step__copy {
    display: grid;
    grid-template-columns: minmax(220px, 320px) minmax(200px, 1fr);
    gap: 24px;
    align-items: center;
  }

  .partner-step__title {
    font-size: 42px;
    line-height: 1.1;
  }

  .partner-step__description {
    font-size: 20px;
  }

  .partner-step__actions {
    grid-column: 1 / -1;
    margin-top: 0;
  }

  .partner-visual-column {
    display: none;
  }
}

@media (max-width: 900px) {
  .setu-hero {
    height: 100svh;
    min-height: 560px;
  }

  .setu-hero__bar {
    padding: 18px 20px;
  }

  .setu-hero__scroll {
    left: 20px;
  }

  .home-offer {
    padding: 88px 0 96px;
  }

  .home-offer__wrap {
    width: calc(100% - 40px);
  }

  .offer-row {
    flex-direction: column;
    height: auto;
  }

  .offer-item {
    flex: 0 0 auto;
    width: 100%;
    height: 60px;
    transition: height 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
  }

  .offer-item.is-active {
    height: 440px;
  }

  .offer-label__text {
    transform: none;
    writing-mode: horizontal-tb;
  }

  .offer-label__index {
    display: none;
  }

  .offer-scene__content {
    right: 22px;
    bottom: 86px;
    left: 22px;
  }

  .offer-scene__action {
    right: auto;
    bottom: 24px;
    left: 22px;
  }

  .offer-scene__icon {
    top: 22px;
    left: 22px;
  }
}

@media (max-width: 640px) {
  .setu-hero__brand {
    font-size: 13px;
  }

  .pill-btn {
    min-width: 100px;
    padding: 11px 12px;
    font-size: 11px;
  }

  .setu-hero__word b {
    margin-bottom: 12vh;
    font-size: clamp(78px, 26vw, 128px);
  }


  .offer-scene__content h2 {
    font-size: 34px;
  }

  .offer-scene__content p {
    font-size: 15px;
  }

  .partner-steps {
    padding: 64px 0 80px;
  }

  .partner-steps__inner {
    width: calc(100% - 48px);
  }

  .partner-steps__inner > h2 {
    margin-bottom: 40px;
    font-size: 42px;
    line-height: 1;
  }

  .partner-step {
    min-height: 0;
    padding: 28px 0;
  }

  .partner-step__copy {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    align-items: start;
  }

  .partner-step__title {
    font-size: 26px;
  }

  .partner-step__description {
    font-size: 17px;
  }

  .partner-step__actions {
    width: 100%;
    flex-wrap: wrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-btn i,
  .menu-overlay,
  .menu-nav button,
  .pill-btn {
    transition: none;
  }

  .setu-hero__plate,
  .setu-hero__word,
  .setu-hero__scrim,
  .offer-scene__plate {
    transform: none !important;
    transition: none !important;
  }

  .offer-item.is-active .offer-scene__icon,
  .offer-item.is-active .offer-scene__content,
  .offer-item.is-active .offer-scene__action {
    transition-delay: 0s;
  }

  .partner-step {
    transition: none;
  }
}
</style>
