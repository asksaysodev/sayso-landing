import localFont from 'next/font/local';

/**
 * Inter, the Sayso widget's UI font. Loaded here instead of the root layout so
 * only routes that render the widget (homepage, product and solution pages)
 * download it. Apply `inter.variable` to any element whose CSS reads
 * var(--font-inter). Not preloaded: the widget sits below the hero, and a
 * preload would compete with the hero for bandwidth on slow phones.
 * Self-hosted (latin variable file, covers 400-600) so builds never fetch
 * from Google Fonts.
 */
export const inter = localFont({
  src: '../../app/fonts/inter-latin.woff2',
  weight: '400 600',
  variable: '--font-inter',
  display: 'swap',
  preload: false,
});
