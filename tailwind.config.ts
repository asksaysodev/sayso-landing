import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F4F4F5',
        'accent-bg': '#D7DEE1',
        primary: '#1D4871',
        cta: '#2367EE',
        accent: '#FFDE59',
      },
      fontFamily: {
        hero: ['var(--font-manrope)', 'sans-serif'],
        comic: ['var(--font-bangers)', 'cursive'],
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        handwriting: ['var(--font-caveat)', 'cursive'],
      },
      // Flat site shadows. Use these instead of repeating the raw strings.
      boxShadow: {
        card: '0 0 0 1px rgba(16,35,58,0.12), 0 14px 34px -16px rgba(16,35,58,0.25)',
        'card-hover': '0 0 0 1px rgba(16,35,58,0.2), 0 20px 40px -18px rgba(16,35,58,0.32)',
        'card-sm': '0 0 0 1px rgba(16,35,58,0.12), 0 1px 2px rgba(16,35,58,0.06)',
        'card-sm-hover': '0 0 0 1px rgba(16,35,58,0.22), 0 4px 12px -4px rgba(16,35,58,0.15)',
        popover: '0 0 0 1px rgba(16,35,58,0.12), 0 24px 48px -20px rgba(16,35,58,0.35)',
        // Named "button", not "cta": shadow-cta would collide with the cta color's shadow-color utility.
        button: '0 1px 2px rgba(16,35,58,0.18), 0 8px 20px -8px rgba(35,103,238,0.55)',
      },
      fontSize: {
        hero: ['30px', { lineHeight: '1.2', fontWeight: '700' }],
        heading: ['18px', { lineHeight: '1.4', fontWeight: '700' }],
        body: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        small: ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
export default config
