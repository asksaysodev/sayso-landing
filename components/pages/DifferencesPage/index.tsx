/**
 * /differences for team leaders: what Sayso does that the rest of their stack
 * doesn't, the live demo, what leaders get, support and proof.
 */

import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DifferencesHero } from './components/DifferencesHero';
import {
  ComparisonSection,
  DailyUseSection,
  LeaderFaqSection,
  LeadersGetSection,
  NotesSection,
  ProofSection,
  SupportSection,
  TimingSection,
} from './components/LeaderSections';
import { AiCallingSection } from './components/AiCallingSection';
import { CloseSection } from './components/CloseSection';

export function DifferencesPage() {
  return (
    <div className="relative bg-[#F4F4F5]">
      <SaysoNavbar />
      <DifferencesHero />
      <TimingSection />
      <ComparisonSection />
      <NotesSection />
      <DailyUseSection />
      <LeadersGetSection />
      <SupportSection />
      <ProofSection />
      <AiCallingSection />
      <LeaderFaqSection />
      <CloseSection />
      <Footer />
    </div>
  );
}
