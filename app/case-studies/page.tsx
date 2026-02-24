import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'See how real estate teams use Sayso to handle more objections, book more appointments, and close more deals.',
  alternates: {
    canonical: `${siteUrl}/case-studies`,
  },
  openGraph: {
    title: 'Case Studies | Sayso',
    description: 'See how real estate teams use Sayso to handle more objections, book more appointments, and close more deals.',
    url: `${siteUrl}/case-studies`,
    // TODO: create /public/og-default.png (1200x630) and uncomment
    // images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso Case Studies' }],
    type: 'website',
  },
  twitter: {
    title: 'Case Studies | Sayso',
    description: 'See how real estate teams use Sayso to handle more objections, book more appointments, and close more deals.',
    // images: ['/og-default.png'],
  },
};
import { Footer } from '@/components/landing/Footer';
import { CaseStudiesPage } from '@/components/landing/CaseStudiesPage';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

export default function CaseStudies() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-white">
        <SaysoNavbar />
        <CaseStudiesPage />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
