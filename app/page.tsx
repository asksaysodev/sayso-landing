import { Footer } from "@/components/landing/Footer";
import { Homepage } from '@/components/landing/Homepage';
import SaysoNavbar from "@/components/landing/SaysoNavbar";
import { buildMetadata } from '@/lib/seo/metadata';
import { generateSoftwareAppJsonLd } from '@/lib/seo/schema';

export const metadata = buildMetadata({
  title: 'Real-Time Guidance for Real Estate Agents and Teams',
  description:
    'Sayso gives real estate agents live guidance during prospecting calls: what to say next, how to handle objections, and when to ask for the appointment.',
  path: '/',
});

const softwareAppJsonLd = generateSoftwareAppJsonLd({
  description:
    'Real-time guidance for residential real estate agents and teams. Live prompts during prospecting calls, automatic call notes, and in-call market data.',
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
