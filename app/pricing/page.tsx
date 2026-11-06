import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { HomePricing } from '@/components/landing/HomePricing';
import { Button } from '@/components/ui/Button';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for individual agents and teams. Cancel anytime, no contracts.',
  alternates: {
    canonical: `${siteUrl}/pricing/`,
  },
  openGraph: {
    title: 'Pricing | Sayso',
    description:
      'Simple, transparent pricing for individual agents and teams. Cancel anytime, no contracts.',
    url: `${siteUrl}/pricing/`,
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Sayso Pricing',
      },
    ],
  },
  twitter: {
    title: 'Pricing | Sayso',
    description:
      'Simple, transparent pricing for individual agents and teams. Cancel anytime, no contracts.',
    images: ['/images/og-default.png'],
  },
};

/** Analytics ids for the pricing controls on this page (the homepage reports its own). */
const PRICING_PAGE_IDS = {
  monthly: 'pricing-billing-toggle-monthly',
  annual: 'pricing-billing-toggle-annual',
  agent: 'cta-download-pricing-individual',
  teams: 'cta-book-demo-pricing-teams',
};

export default function PricingPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative min-h-screen bg-[#F4F4F5]">
        <SaysoNavbar />
        <main>
          <HomePricing titleAs="h1" srTitlePrefix="Sayso pricing:" analyticsIds={PRICING_PAGE_IDS} className="!pt-12 min-[641px]:!pt-16">
            <div className="mx-auto mt-10 max-w-[640px] text-center">
              <p className="text-base leading-relaxed text-[#556B86]">
                Every plan includes a custom setup and training. Founding member and early access pricing is locked
                for life: as long as your subscription stays active, your rate will never increase.
              </p>
              <Button href="/demo" variant="secondary" className="mt-6" data-analytics-id="cta-book-demo-pricing-coming-soon">
                Questions? Chat with our team
              </Button>
              <p className="mt-6 text-xs text-[#556B86]">
                Prices are shown in USD. You can cancel anytime, and there are no contracts.
              </p>
            </div>
          </HomePricing>
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
