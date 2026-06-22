/**
 * Antyeshti page — regression tests
 *
 * These tests enforce the rules in CLAUDE.md § 5 ("Sensitive contexts"),
 * architecture.md § 9 ("The Antyeshti exception"), and do-not-refactor.md § 4.
 *
 * If a test in this file fails, the build SHOULD fail.
 * Do not skip, comment out, or weaken these tests without founder approval.
 */

import { test, expect } from '@playwright/test'

test.describe('/antyeshti — exemption rules', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/antyeshti')
  })

  // -------------------------------------------------------------------------
  // FORM SHAPE: exactly 3 fields, no more, no less
  // -------------------------------------------------------------------------

  test('form has exactly 3 input fields (name, phone, location)', async ({ page }) => {
    const inputs = page.locator('form input:not([type="hidden"])')
    await expect(inputs).toHaveCount(3)

    // The three fields must be findable by their labels
    await expect(page.getByLabel(/YOUR NAME/i)).toBeVisible()
    await expect(page.getByLabel(/PHONE NUMBER/i)).toBeVisible()
    await expect(page.getByLabel(/LOCATION/i)).toBeVisible()
  })

  test('form does NOT have an email field', async ({ page }) => {
    // An email field has been historically tempting to add for "follow-up."
    // It is not allowed here. See do-not-refactor.md § 4.
    const emailInputs = page.locator('input[type="email"]')
    await expect(emailInputs).toHaveCount(0)

    // Also check by label, in case someone uses type="text" with email label
    const emailLabels = page.getByLabel(/email/i)
    await expect(emailLabels).toHaveCount(0)
  })

  test('form does NOT have a date picker', async ({ page }) => {
    const dateInputs = page.locator('input[type="date"], input[type="datetime-local"]')
    await expect(dateInputs).toHaveCount(0)
  })

  test('form does NOT have a Purohit selector', async ({ page }) => {
    // The Purohit is chosen by the coordinator, not by the family in this moment.
    const selects = page.locator('form select')
    await expect(selects).toHaveCount(0)
  })

  // -------------------------------------------------------------------------
  // VISUAL VARIANT: solemn track, not standard track
  // -------------------------------------------------------------------------

  test('nav CTA reads "Request a Purohit", not "Book a Purohit"', async ({ page }) => {
    const cta = page.locator('header').getByRole('link', { name: /Request a Purohit/i })
      .or(page.locator('header').getByRole('button', { name: /Request a Purohit/i }))
    await expect(cta).toBeVisible()

    const wrongCta = page.locator('header').getByRole('link', { name: /^Book a Purohit$/i })
      .or(page.locator('header').getByRole('button', { name: /^Book a Purohit$/i }))
    await expect(wrongCta).toHaveCount(0)
  })

  test('submit button uses solemn brown background, not kumkum red', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /Request a Purohit/i }).last()
    const bgColor = await submitBtn.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor
    })

    // --solemn is #7A4F3A → rgb(122, 79, 58)
    // --accent (kumkum, NOT allowed here) is #C8472D → rgb(200, 71, 45)
    expect(bgColor).toContain('122')      // matches solemn brown
    expect(bgColor).not.toContain('200')  // does NOT match kumkum red
  })

  test('page background is dark (--ink), not cream (--bg)', async ({ page }) => {
    // The hero section specifically uses bg-ink as background
    const hero = page.locator('section').first()
    const bgColor = await hero.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor
    })

    // --ink is #1A1614 → rgb(26, 22, 20)
    expect(bgColor).toMatch(/rgb\(2[56], 2[12], 2[01]\)/)
  })

  // -------------------------------------------------------------------------
  // MOTION: no page transition on entry or exit
  // -------------------------------------------------------------------------

  test('no column-wipe overlay appears when navigating to /antyeshti', async ({ page }) => {
    // Start from home, then navigate to antyeshti
    await page.goto('/')

    // Set up listener for the column-wipe overlay
    let overlayAppeared = false
    page.on('domcontentloaded', async () => {
      const overlay = await page.locator('.column-wipe-overlay').count()
      if (overlay > 0) overlayAppeared = true
    })

    await page.click('a[href="/antyeshti"]')
    await page.waitForURL('**/antyeshti')

    expect(overlayAppeared).toBe(false)
  })

  test('no column-wipe overlay appears when navigating away from /antyeshti', async ({ page }) => {
    let overlayAppeared = false
    page.on('domcontentloaded', async () => {
      const overlay = await page.locator('.column-wipe-overlay').count()
      if (overlay > 0) overlayAppeared = true
    })

    await page.goto('/')
    expect(overlayAppeared).toBe(false)
  })

  // -------------------------------------------------------------------------
  // ANALYTICS: no events fire from this page
  // -------------------------------------------------------------------------

  test('no analytics scripts are loaded on /antyeshti', async ({ page, context }) => {
    const analyticsRequests: string[] = []

    context.on('request', (request) => {
      const url = request.url()
      // Common analytics endpoints — extend this list as providers are added
      const blocklist = [
        'plausible.io',
        'usefathom.com',
        'google-analytics.com',
        'googletagmanager.com',
        'segment.com',
        'amplitude.com',
        'mixpanel.com',
        'posthog.com',
        'hotjar.com',
        'fullstory.com',
      ]

      if (blocklist.some(domain => url.includes(domain))) {
        analyticsRequests.push(url)
      }
    })

    await page.goto('/antyeshti')
    await page.waitForLoadState('networkidle')

    expect(analyticsRequests).toEqual([])
  })

  // -------------------------------------------------------------------------
  // VALIDATION: form submission requires all 3 fields with valid format
  // -------------------------------------------------------------------------

  test('form rejects submission with empty fields', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /Request a Purohit/i }).last()
    await submitBtn.click()

    // Expect at least one validation error visible
    const errors = page.locator('[role="alert"], .text-accent, p.text-accent')
    await expect(errors.first()).toBeVisible({ timeout: 2000 })
  })

  test('form rejects malformed phone number', async ({ page }) => {
    await page.getByLabel(/YOUR NAME/i).fill('Test Family')
    await page.getByLabel(/PHONE NUMBER/i).fill('abc')
    await page.getByLabel(/LOCATION/i).fill('Hyderabad')

    const submitBtn = page.getByRole('button', { name: /Request a Purohit/i }).last()
    await submitBtn.click()

    const errors = page.locator('p').filter({ hasText: /phone/i })
    await expect(errors.first()).toBeVisible({ timeout: 2000 })
  })

  test('valid submission redirects to /antyeshti/confirmed', async ({ page }) => {
    await page.getByLabel(/YOUR NAME/i).fill('Test Family')
    await page.getByLabel(/PHONE NUMBER/i).fill('+919876543210')
    await page.getByLabel(/LOCATION/i).fill('Hyderabad')

    // Intercept the API call to return success without actually sending
    await page.route('**/api/antyeshti-request', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    const submitBtn = page.getByRole('button', { name: /Request a Purohit/i }).last()
    await submitBtn.click()

    await expect(page).toHaveURL(/\/antyeshti\/confirmed/, { timeout: 5000 })
  })

  // -------------------------------------------------------------------------
  // CONTENT: founder's quote must be present
  // -------------------------------------------------------------------------

  test('founder\'s note section renders with attribution', async ({ page }) => {
    // The note is a structural part of the page — its absence indicates
    // the page was rebuilt without all sections.
    await expect(page.getByText(/PHANI RAJ GOLLAPUDI, FOUNDER/i)).toBeVisible()
  })

  test('"What we will not do" dark band is present', async ({ page }) => {
    // This is the page's emotional anchor. Its removal would indicate
    // the page was simplified beyond what is acceptable.
    await expect(page.getByText(/WHAT WE WILL NOT DO/i)).toBeVisible()
    await expect(page.getByText(/We will not advertise/i)).toBeVisible()
  })

  test('SLA promises (4 hours, 12 hours, 24\\/7) are present', async ({ page }) => {
    await expect(page.getByText('4 hours')).toBeVisible()
    await expect(page.getByText('12 hours')).toBeVisible()
    await expect(page.getByText('24/7')).toBeVisible()
  })

  // -------------------------------------------------------------------------
  // ACCESSIBILITY: critical floor for this page
  // -------------------------------------------------------------------------

  test('all form inputs have associated labels', async ({ page }) => {
    const inputs = await page.locator('form input:not([type="hidden"])').all()

    for (const input of inputs) {
      const id = await input.getAttribute('id')
      expect(id).toBeTruthy()

      const associatedLabel = page.locator(`label[for="${id}"]`)
      await expect(associatedLabel).toBeVisible()
    }
  })

  test('Telugu and Sanskrit script characters use correct lang attribute', async ({ page }) => {
    const teluguSpans = page.locator('[lang="te"]')
    await expect(teluguSpans.first()).toBeVisible()

    const sanskritSpans = page.locator('[lang="sa"]')
    await expect(sanskritSpans.first()).toBeVisible()
  })

  test('reduced-motion preference disables what little motion remains', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('/antyeshti')

    // Even though Antyeshti has no page transition, button hover transitions
    // should respect the preference. We test that no CSS animations are
    // running on the page.
    const animatingElements = await page.evaluate(() => {
      const all = document.querySelectorAll('*')
      let count = 0
      for (const el of all) {
        const cs = window.getComputedStyle(el as HTMLElement)
        if (cs.animationName !== 'none' && cs.animationDuration !== '0s') count++
      }
      return count
    })

    expect(animatingElements).toBe(0)

    await context.close()
  })
})

test.describe('/antyeshti — page does NOT appear in standard product surfaces', () => {

  test('Antyeshti is NOT in the main nav', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('header nav')
    await expect(nav.getByRole('link', { name: /antyeshti/i })).toHaveCount(0)
  })

  test('Antyeshti referral section on home page uses solemn variant', async ({ page }) => {
    await page.goto('/')

    // Find the section containing the Antyeshti CTA
    const antyeshtiCta = page.getByRole('link', { name: /Request a Purohit/i })
    await expect(antyeshtiCta).toBeVisible()

    // Its background should be solemn brown, not ink black
    const bgColor = await antyeshtiCta.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor
    })

    expect(bgColor).toContain('122')  // --solemn rgb(122, 79, 58)
  })
})
