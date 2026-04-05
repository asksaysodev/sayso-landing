import type { Metadata } from 'next';
import { BrokerAdPage } from '@/components/landing/BrokerAdPage';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sayso for Brokers & Team Owners | Fix Your Conversion Problem',
  description:
    'Sayso guides agents during live prospecting calls so they ask better questions, handle objections confidently, and convert more conversations into appointments.',
  alternates: {
    canonical: `${siteUrl}/broker/`,
  },
  openGraph: {
    title: 'Sayso for Brokers & Team Owners | Fix Your Conversion Problem',
    description:
      'Sayso guides agents during live prospecting calls so they ask better questions, handle objections confidently, and convert more conversations into appointments.',
    url: `${siteUrl}/broker/`,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Sayso | Real-Time AI Sales Coaching for Brokers',
      },
    ],
    type: 'website',
  },
  twitter: {
    title: 'Sayso for Brokers & Team Owners | Fix Your Conversion Problem',
    description:
      'Sayso guides agents during live prospecting calls so they ask better questions, handle objections confidently, and convert more conversations into appointments.',
    images: ['/og-default.png'],
  },
};

export default function BrokerPage() {
  return <BrokerAdPage />;
}
