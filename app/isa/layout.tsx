import localFont from 'next/font/local';

// Self-hosted (latin variable file, covers 400-500) so builds never fetch from Google Fonts.
const caveat = localFont({
  src: '../fonts/caveat-latin.woff2',
  weight: '400 500',
  variable: '--font-caveat',
  display: 'swap',
});

export default function IsaLayout({ children }: { children: React.ReactNode }) {
  return <div className={caveat.variable}>{children}</div>;
}
