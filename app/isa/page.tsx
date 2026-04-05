import type { Metadata } from 'next';
import { IsaAdPage } from '@/components/landing/IsaAdPage';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sayso for ISAs | Never Miss the Details That Book the Appointment',
  description: 'Stay organized, never miss the important details, and have cleaner lead hand-offs to your agents.',
  alternates: {
    canonical: `${siteUrl}/isa/`,
  },
  openGraph: {
    title: 'Sayso for ISAs | Never Miss the Details That Book the Appointment',
    description: 'Stay organized, never miss the important details, and have cleaner lead hand-offs to your agents.',
    url: `${siteUrl}/isa/`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso | Real-Time AI Coaching for ISAs' }],
    type: 'website',
  },
  twitter: {
    title: 'Sayso for ISAs | Never Miss the Details That Book the Appointment',
    description: 'Stay organized, never miss the important details, and have cleaner lead hand-offs to your agents.',
    images: ['/og-default.png'],
  },
};

export default function IsaPage() {
  return <IsaAdPage />;
}
