import type { Metadata } from 'next';
import { SalesLeaderAdPage } from '@/components/landing/SalesLeaderAdPage';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sayso for Team Leaders | Coach Every Call While It\'s Still Happening',
  description:
    'Sayso listens during prospect conversations and shows agents what to ask next, so they stay confident and in control when it matters most.',
  alternates: {
    canonical: `${siteUrl}/sales-leader/`,
  },
  // Paid Facebook-ad landing page (paid traffic only). Noindex so it does not
  // compete organically with /for/team-leaders/. follow:true keeps links crawlable.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Sayso for Team Leaders | Coach Every Call While It\'s Still Happening',
    description:
      'Sayso listens during prospect conversations and shows agents what to ask next, so they stay confident and in control when it matters most.',
    url: `${siteUrl}/sales-leader/`,
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Sayso for team leaders: guidance on every live call',
      },
    ],
    type: 'website',
  },
  twitter: {
    title: 'Sayso for Team Leaders | Coach Every Call While It\'s Still Happening',
    description:
      'Sayso listens during prospect conversations and shows agents what to ask next, so they stay confident and in control when it matters most.',
    images: ['/images/og-default.png'],
  },
};

export default function SalesLeaderPage() {
  return <SalesLeaderAdPage />;
}
