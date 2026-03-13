import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { AffiliatePageContent } from '@/components/landing/AffiliatePageContent';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Affiliate Program | Sayso',
  description: 'Earn recurring commission by referring users to Sayso. Apply to become a Sayso affiliate today.',
  alternates: {
    canonical: `${siteUrl}/affiliate`,
  },
  openGraph: {
    title: 'Affiliate Program | Sayso',
    description: 'Earn recurring commission by referring users to Sayso. Apply to become a Sayso affiliate today.',
    url: `${siteUrl}/affiliate`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso Affiliate Program' }],
    type: 'website',
  },
  twitter: {
    title: 'Affiliate Program | Sayso',
    description: 'Earn recurring commission by referring users to Sayso. Apply to become a Sayso affiliate today.',
    images: ['/og-default.png'],
  },
};

export default function AffiliatePage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5]">
        <SaysoNavbar />
        <AffiliatePageContent />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
