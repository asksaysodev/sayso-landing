import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { FounderPricingSection } from '@/components/landing/FounderPricingSection';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Founding Team Pricing',
  description:
    'One price for your whole team, all Sayso products included for every agent. Lock in lifetime Founder Pricing before public launch.',
  alternates: {
    canonical: `${siteUrl}/founderpricing/`,
  },
  // Noindex: time-limited promo that overlaps /pricing/. When the program closes,
  // replace this with a 301 redirect to /pricing/. follow:true keeps links crawlable.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Founding Team Pricing | Sayso',
    description:
      'One price for your whole team, all Sayso products included for every agent. Lock in lifetime Founder Pricing before public launch.',
    url: `${siteUrl}/founderpricing/`,
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Sayso Founding Team Pricing',
      },
    ],
  },
  twitter: {
    title: 'Founding Team Pricing | Sayso',
    description:
      'One price for your whole team, all Sayso products included for every agent. Lock in lifetime Founder Pricing before public launch.',
    images: ['/images/og-default.png'],
  },
};

export default function FounderPricingPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5] min-h-screen">
        <SaysoNavbar />
        <main className="pt-24">
          <FounderPricingSection />
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
