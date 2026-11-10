import type { Metadata } from 'next';
import { Footer } from '@/components/landing/Footer';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { HomeTopStrip } from '@/components/landing/HomeTopStrip';
import { HomeHero } from '@/components/landing/HomeHero';
import { HomeLiveDemo } from '@/components/landing/HomeLiveDemo';
import { HomeHowItWorks } from '@/components/landing/HomeHowItWorks';
import { HomeFeatures } from '@/components/landing/HomeFeatures';
import { HomeFitCards } from '@/components/landing/HomeFitCards';
import { HomeCompare } from '@/components/landing/HomeCompare';
import { HomeReviews } from '@/components/landing/HomeReviews';
import { HomeTeams } from '@/components/landing/HomeTeams';
import { HomePricing } from '@/components/landing/HomePricing';
import { HomeFAQ } from '@/components/landing/HomeFAQ';
import { HOME_FAQ_ITEMS, faqSchemaItems } from '@/lib/content/faq';
import { HomeFinalCta } from '@/components/landing/HomeFinalCta';
import { siteUrl } from '@/lib/config';
import { generateFAQPageJsonLd, generateSoftwareAppJsonLd } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: {
    absolute: 'Real-Time AI Call Coaching for Real Estate Agents | Sayso',
  },
  description:
    'Sayso gives real estate agents live call coaching, objection prompts, and automatic CRM notes so more prospecting conversations become appointments.',
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: 'Real-Time AI Call Coaching for Real Estate Agents | Sayso',
    description:
      'Sayso gives real estate agents live call coaching, objection prompts, and automatic CRM notes so more prospecting conversations become appointments.',
    url: `${siteUrl}/`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Sayso real-time AI call coaching for real estate agents' }],
    type: 'website',
  },
  twitter: {
    title: 'Real-Time AI Call Coaching for Real Estate Agents | Sayso',
    description:
      'Sayso gives real estate agents live call coaching, objection prompts, and automatic CRM notes so more prospecting conversations become appointments.',
    images: ['/images/og-default.png'],
  },
};

const softwareAppJsonLd = generateSoftwareAppJsonLd({
  description:
    'Sayso is live call coaching software for real estate agents. It helps agents handle objections during prospecting calls, stay on track, and turn more conversations into booked appointments.',
  audienceType: 'Real estate agents',
});

// Built from the same list as the visible FAQ, so the two always match.
const faqJsonLd = generateFAQPageJsonLd(faqSchemaItems(HOME_FAQ_ITEMS));

export default function Home() {
  return (
    <div className="relative overflow-x-clip bg-[#F4F4F5] text-[#10233A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomeTopStrip />
      <SaysoNavbar />
      <main id="top">
        <HomeHero />
        <HomeLiveDemo />
        <HomeHowItWorks />
        <HomeFeatures />
        <HomeFitCards />
        <HomeCompare />
        <HomeReviews />
        <HomeTeams />
        <HomePricing />
        <HomeFAQ />
        <HomeFinalCta />
      </main>
      <Footer />
    </div>
  );
}
