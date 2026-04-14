import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { SecurityPage } from '@/components/landing/SecurityPage';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Security | Sayso',
  description: 'Learn how Sayso protects your data, conversations, and account access at every level.',
  alternates: {
    canonical: `${siteUrl}/security/`,
  },
  openGraph: {
    title: 'Security | Sayso',
    description: 'Learn how Sayso protects your data, conversations, and account access at every level.',
    url: `${siteUrl}/security/`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso Security' }],
    type: 'website',
  },
  twitter: {
    title: 'Security | Sayso',
    description: 'Learn how Sayso protects your data, conversations, and account access at every level.',
    images: ['/og-default.png'],
  },
};

export default function Security() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5]">
        <SaysoNavbar />
        <SecurityPage />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
