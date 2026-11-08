import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { CareersPageContent } from '@/components/landing/CareersPageContent';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';

const description =
  'Join Sayso and help close the gap between knowing what to do and doing it when it matters. See our mission, values, and how we work.';

export const metadata: Metadata = {
  title: 'Careers',
  description,
  alternates: {
    canonical: `${siteUrl}/careers/`,
  },
  openGraph: {
    title: 'Careers | Sayso',
    description,
    url: `${siteUrl}/careers/`,
    images: [
      { url: '/images/og-default.png', width: 1200, height: 630, alt: 'Careers at Sayso' },
    ],
    type: 'website',
  },
  twitter: {
    title: 'Careers | Sayso',
    description,
    images: ['/images/og-default.png'],
  },
};

export default function CareersPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5]">
        <SaysoNavbar />
        <CareersPageContent />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
