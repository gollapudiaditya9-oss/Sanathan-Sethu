import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue"
  ],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        ink:      'var(--ink)',
        'ink-2':  'var(--ink-2)',
        'ink-3':  'var(--ink-3)',
        paper:    'var(--paper)',
        accent:   'var(--accent)',
        success:  'var(--success)',
        solemn:   'var(--solemn)',
        'solemn-soft': 'var(--solemn-soft)',
        line:     'var(--line)',
      },
      fontSize: {
        'h-10':  ['10px', { lineHeight: '1.2', letterSpacing: '0.14em' }],
        'h-16':  ['16px', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        'h-26':  ['26px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h-42':  ['42px', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'h-68':  ['68px', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'h-92':  ['92px', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'h-110': ['110px',{ lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'h-178': ['178px',{ lineHeight: '0.9',  letterSpacing: '-0.04em' }],
      },
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
        inter:     ['Inter', 'sans-serif'],
        baskerville: ['"Libre Baskerville"', 'serif'],
        telugu:    ['"Noto Sans Telugu"', 'sans-serif'],
      }
    }
  }
} satisfies Config
