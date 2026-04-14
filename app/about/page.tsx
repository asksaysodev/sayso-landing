import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { AboutPageContent } from '@/components/landing/AboutPageContent';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'About | Sayso',
  description:
    'Sayso was built by Kuvaal Patel, Director of Agent Development at Anderson Real Estate Group, to give real estate agents the structure they need on every call.',
  alternates: {
    canonical: `${siteUrl}/about/`,
  },
  openGraph: {
    title: 'About | Sayso',
    description:
      'Sayso was built by Kuvaal Patel, Director of Agent Development at Anderson Real Estate Group, to give real estate agents the structure they need on every call.',
    url: `${siteUrl}/about/`,
    images: [
      { url: '/og-default.png', width: 1200, height: 630, alt: 'About Sayso' },
    ],
    type: 'website',
  },
  twitter: {
    title: 'About | Sayso',
    description:
      'Sayso was built by Kuvaal Patel, Director of Agent Development at Anderson Real Estate Group, to give real estate agents the structure they need on every call.',
    images: ['/og-default.png'],
  },
};

export default function AboutPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5]">
        <SaysoNavbar />
        <AboutPageContent />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
