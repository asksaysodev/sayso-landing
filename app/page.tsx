import type { Metadata } from 'next';
import { Footer } from "@/components/landing/Footer";
import { HeroWithVideo } from "@/components/landing/HeroWithVideo";
import { PainPointPanel } from "@/components/landing/PainPointPanel";
import SaysoNavbar from "@/components/landing/SaysoNavbar";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ThreeStepsSection } from "@/components/landing/ThreeStepsSection";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { WhoItsForSection } from '@/components/landing/WhoItsForSection';
import { FAQSection } from '@/components/landing/FAQSection';
// PREVIEW / DO NOT MERGE: floating "book a demo" card (LIFT-style), homepage only.
import { DemoLiftCard } from '@/components/DemoLiftCard';
import { siteUrl } from '@/lib/config';
import { generateSoftwareAppJsonLd } from '@/lib/seo/schema';

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: 'Sayso: Fix Where Real Estate Prospecting Breaks Down',
    description: 'Sayso helps real estate agents turn messy prospecting conversations into booked appointments.',
    url: `${siteUrl}/`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Sayso | Fix Where Real Estate Prospecting Breaks Down' }],
    type: 'website',
  },
  twitter: {
    title: 'Sayso: Fix Where Real Estate Prospecting Breaks Down',
    description: 'Sayso helps real estate agents turn messy prospecting conversations into booked appointments.',
    images: ['/images/og-default.png'],
  },
};

const softwareAppJsonLd = generateSoftwareAppJsonLd({
  description:
    'Sayso is live call coaching software for real estate agents. It helps agents handle objections during prospecting calls, stay on track, and turn more conversations into booked appointments.',
  audienceType: 'Real estate agents',
});

export default function Home() {
    return (
        <div className="relative bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
            />
            <SaysoNavbar />
            <HeroWithVideo />
            <TestimonialsSection />
            <WhoItsForSection />
            <PainPointPanel />
            <TransformationSection />
            <ThreeStepsSection />
            <FAQSection />
            <Footer />
            {/* PREVIEW / DO NOT MERGE: floating "book a demo" card. */}
            <DemoLiftCard />
        </div>
    );
}
