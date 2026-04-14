import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { PrivacyPolicyPage } from '@/components/landing/PrivacyPolicyPage';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sayso',
  description: 'Learn how AskSayso, Inc. collects, uses, and protects your personal information.',
  alternates: {
    canonical: `${siteUrl}/privacy/`,
  },
  openGraph: {
    title: 'Privacy Policy | Sayso',
    description: 'Learn how AskSayso, Inc. collects, uses, and protects your personal information.',
    url: `${siteUrl}/privacy/`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso Privacy Policy' }],
    type: 'website',
  },
  twitter: {
    title: 'Privacy Policy | Sayso',
    description: 'Learn how AskSayso, Inc. collects, uses, and protects your personal information.',
    images: ['/og-default.png'],
  },
};

export default function Privacy() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5]">
        <SaysoNavbar />
        <PrivacyPolicyPage />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
