/**
 * /differences page composition. Dark fill-in-the-blank hero ("What's the
 * difference between Sayso and ___?"), the timing answer, the engine
 * differentiators, per-competitor comparisons, and the standard closing CTA.
 * The wrapper background is navy so the sticky navbar pill sits on the dark
 * hero at the top of the page; every section below sets its own background.
 */

import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { DifferencesHero } from './components/DifferencesHero';
import { TimingSection } from './components/TimingSection';
import { EngineSection } from './components/EngineSection';
import { ComparisonSection } from './components/ComparisonSection';

export function DifferencesPage() {
  return (
    <div className="relative bg-[#1D4871]">
      <SaysoNavbar />
      <DifferencesHero />
      <TimingSection />
      <EngineSection />
      <ComparisonSection />
      <div className="bg-white">
        <ContentCTA
          location="differences"
          headline="See the Difference on a Live Call"
          subheading="Book a demo and watch Sayso coach a real conversation in real time."
        />
      </div>
      <Footer />
    </div>
  );
}
