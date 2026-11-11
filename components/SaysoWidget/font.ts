import { Inter } from 'next/font/google';

/**
 * Inter, the Sayso widget's UI font. Loaded here instead of the root layout so
 * only routes that render the widget (homepage, product and solution pages)
 * download it. Apply `inter.variable` to any element whose CSS reads
 * var(--font-inter). Not preloaded: the widget sits below the hero, and a
 * preload would compete with the hero for bandwidth on slow phones.
 */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
});
