import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-caveat',
  display: 'swap',
});

export default function IsaLayout({ children }: { children: React.ReactNode }) {
  return <div className={caveat.variable}>{children}</div>;
}
