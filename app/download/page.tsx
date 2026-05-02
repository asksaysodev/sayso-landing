import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DownloadPage } from '@/components/landing/DownloadPage';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.asksayso.com';

export const metadata: Metadata = {
  title: 'Download Sayso | Real-Time Call Coaching for Real Estate Agents',
  description:
    'Download Sayso to get real-time call coaching, automatic call notes, and live market data on every prospecting call.',
  alternates: {
    canonical: `${siteUrl}/download/`,
  },
  openGraph: {
    title: 'Download Sayso',
    description:
      'Download Sayso to get real-time call coaching, automatic call notes, and live market data on every prospecting call.',
    url: `${siteUrl}/download/`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Download Sayso' }],
    type: 'website',
  },
  twitter: {
    title: 'Download Sayso',
    description:
      'Download Sayso to get real-time call coaching, automatic call notes, and live market data on every prospecting call.',
    images: ['/og-default.png'],
  },
};

export default function Download() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5]">
        <SaysoNavbar />
        <DownloadPage />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
