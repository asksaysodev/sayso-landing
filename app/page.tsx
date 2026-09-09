import type { Metadata } from 'next';
import { Footer } from "@/components/landing/Footer";
import { Homepage } from '@/components/landing/Homepage';
import SaysoNavbar from "@/components/landing/SaysoNavbar";
import { siteUrl } from '@/lib/config';
import { generateSoftwareAppJsonLd } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: { absolute: 'Live AI Call Coaching for Real Estate Agents | Sayso' },
  description: 'Stay focused on the conversation. Sayso gives real estate agents live guidance on what to say next and captures structured notes during calls.',
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: 'Stay in the Call When the Moment Matters Most | Sayso',
    description: 'AI call coaching for real estate agents. Get live guidance and structured notes while you stay focused on the person.',
    url: `${siteUrl}/`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Sayso for real estate agents' }],
    type: 'website',
  },
  twitter: {
    title: 'Stay in the Call When the Moment Matters Most | Sayso',
    description: 'AI call coaching for real estate agents. Get live guidance and structured notes while you stay focused on the person.',
    images: ['/images/og-default.png'],
  },
};

const softwareAppJsonLd = generateSoftwareAppJsonLd({
  description:
    'Sayso is AI call coaching software for real estate agents. It suggests what to say next, helps with objections, and captures structured notes during live calls so agents can stay focused on the conversation.',
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
            <Homepage />
            <Footer />
        </div>
    );
}
