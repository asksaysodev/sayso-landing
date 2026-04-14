import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { TermsOfServicePage } from '@/components/landing/TermsOfServicePage';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Sayso',
  description: 'Review the terms and conditions governing your use of Sayso and the AskSayso platform.',
  alternates: {
    canonical: `${siteUrl}/terms/`,
  },
  openGraph: {
    title: 'Terms and Conditions | Sayso',
    description: 'Review the terms and conditions governing your use of Sayso and the AskSayso platform.',
    url: `${siteUrl}/terms/`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso Terms and Conditions' }],
    type: 'website',
  },
  twitter: {
    title: 'Terms and Conditions | Sayso',
    description: 'Review the terms and conditions governing your use of Sayso and the AskSayso platform.',
    images: ['/og-default.png'],
  },
};

export default function Terms() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5]">
        <SaysoNavbar />
        <TermsOfServicePage />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
