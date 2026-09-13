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
import { DemoLiftCard } from '@/components/DemoLiftCard';
import { siteUrl } from '@/lib/config';
import { generateSoftwareAppJsonLd } from '@/lib/seo/schema';

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
            <DemoLiftCard />
        </div>
    );
}
