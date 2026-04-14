import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { PricingSection } from '@/components/landing/PricingSection';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for individual agents and teams. Free trial included.',
  alternates: {
    canonical: `${siteUrl}/pricing/`,
  },
  openGraph: {
    title: 'Pricing | Sayso',
    description:
      'Simple, transparent pricing for individual agents and teams. Free trial included.',
    url: `${siteUrl}/pricing/`,
    type: 'website',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Sayso Pricing',
      },
    ],
  },
  twitter: {
    title: 'Pricing | Sayso',
    description:
      'Simple, transparent pricing for individual agents and teams. Free trial included.',
    images: ['/og-default.png'],
  },
};

export default function PricingPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F8F8FA] min-h-screen">
        <SaysoNavbar />
        <main className="pt-24">
          <PricingSection />
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
