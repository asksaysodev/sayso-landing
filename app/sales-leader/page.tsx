import type { Metadata } from 'next';
import { SalesLeaderAdPage } from '@/components/landing/SalesLeaderAdPage';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sayso for Sales Leaders | Turn Role-Play Into Real Results',
  description:
    'Sayso listens during prospect conversations and shows agents what to ask next — so they stay confident and in control when it matters most.',
  alternates: {
    canonical: `${siteUrl}/sales-leader`,
  },
  openGraph: {
    title: 'Sayso for Sales Leaders | Turn Role-Play Into Real Results',
    description:
      'Sayso listens during prospect conversations and shows agents what to ask next — so they stay confident and in control when it matters most.',
    url: `${siteUrl}/sales-leader`,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Sayso — Real-Time AI Sales Coaching for Sales Leaders',
      },
    ],
    type: 'website',
  },
  twitter: {
    title: 'Sayso for Sales Leaders | Turn Role-Play Into Real Results',
    description:
      'Sayso listens during prospect conversations and shows agents what to ask next — so they stay confident and in control when it matters most.',
    images: ['/og-default.png'],
  },
};

export default function SalesLeaderPage() {
  return <SalesLeaderAdPage />;
}
