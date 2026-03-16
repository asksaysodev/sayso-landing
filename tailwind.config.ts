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
