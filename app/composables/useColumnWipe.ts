import { gsap } from 'gsap'

// Module-level variable to detect rapid transitions
let lastTransitionTime = 0

export const useColumnWipe = () => {
  return {
    name: 'column-wipe',
    mode: 'out-in' as const,
    css: false,
    onLeave: (el: Element, done: () => void) => {
      // Execute only on client side
      if (typeof window === 'undefined') return done()

      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Downgrade for reduced motion
      if (isReducedMotion) {
        gsap.to(el, { opacity: 0, duration: 0.1, onComplete: done })
        return
      }

      const isMobile = window.innerWidth < 768
      const numColumns = isMobile ? 3 : 5
      
      // Prevent duplicate overlays if both Layout and Page transitions fire
      const existing = document.querySelectorAll('.column-wipe-overlay')
      existing.forEach(el => el.remove())
      
      const container = document.createElement('div')
      container.className = 'column-wipe-overlay'
      
      const cells: HTMLDivElement[] = []
      for (let i = 0; i < numColumns; i++) {
        const col = document.createElement('div')
        col.className = 'column-wipe-cell'
        gsap.set(col, { scaleY: 0, transformOrigin: 'top center' })
        container.appendChild(col)
        cells.push(col)
      }
      
      document.body.appendChild(container)
      
      gsap.to(cells, {
        scaleY: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
        onComplete: () => {
          gsap.set(el, { display: 'none' }) // Hide old page
          // Hold full coverage for one tick while new page mounts
          requestAnimationFrame(() => {
            done()
          })
        }
      })
    },
    onEnter: (el: Element, done: () => void) => {
      // Execute only on client side
      if (typeof window === 'undefined') return done()

      lastTransitionTime = Date.now()
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const container = document.querySelector('.column-wipe-overlay')

      // If downgraded (no overlay exists), crossfade in
      if (isReducedMotion || !container) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: isReducedMotion ? 0.1 : 0.2, onComplete: done })
        return
      }

      const cells = container.children
      gsap.set(cells, { transformOrigin: 'bottom center' })
      
      gsap.to(cells, {
        scaleY: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
        onComplete: () => {
          container.remove()
          done()
        }
      })
    }
  }
}
