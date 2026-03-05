import type { Metadata } from 'next';
import { DemoCalendarProvider } from "@/app/context/landing/DemoCalendarContext";
import { Footer } from "@/components/landing/Footer";
import { HeroWithVideo } from "@/components/landing/HeroWithVideo";
import { PainPointPanel } from "@/components/landing/PainPointPanel";
import SaysoNavbar from "@/components/landing/SaysoNavbar";
import { ThreeStepsSection } from "@/components/landing/ThreeStepsSection";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { isaContent } from "@/lib/content/personas/isa";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Sayso for ISAs & Prospecting Agents | Never Run Out of What to Say',
  description: 'Sayso gives you live prompts during prospecting calls so you always know what question to ask next.',
  alternates: {
    canonical: `${siteUrl}/isa`,
  },
  openGraph: {
    title: 'Sayso for ISAs & Prospecting Agents | Never Run Out of What to Say',
    description: 'Sayso gives you live prompts during prospecting calls so you always know what question to ask next.',
    url: `${siteUrl}/isa`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso — Real-Time AI Coaching for ISAs and Prospecting Agents' }],
    type: 'website',
  },
  twitter: {
    title: 'Sayso for ISAs & Prospecting Agents | Never Run Out of What to Say',
    description: 'Sayso gives you live prompts during prospecting calls so you always know what question to ask next.',
    images: ['/og-default.png'],
  },
};

export default function IsaPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-white">
        <SaysoNavbar />
        <HeroWithVideo content={isaContent.hero} />
        <PainPointPanel />
        <TransformationSection content={isaContent.transformation} />
        <ThreeStepsSection content={isaContent.threeSteps} />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
