/**
 * /differences page composition, following the approved "Style A Light"
 * mockup: a light hero that states the objection verbatim ("We already
 * use ___. So how is this different?") with a spinning drum filling the
 * blank, then the one-line answer, the homework everything else assigns,
 * the call-timeline comparison, a closing CTA, and the dark section on
 * how Sayso works live. Styled with the site design system throughout.
 */

import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DifferencesHero } from './components/DifferencesHero';
import { MomentSection } from './components/MomentSection';
import { HomeworkSection } from './components/HomeworkSection';
import { TimelineSection } from './components/TimelineSection';
import { CloseSection } from './components/CloseSection';
import { EngineSection } from './components/EngineSection';

export function DifferencesPage() {
  return (
    <div className="relative bg-white">
      <SaysoNavbar />
      <DifferencesHero />
      <MomentSection />
      <HomeworkSection />
      <TimelineSection />
      <CloseSection />
      <EngineSection />
      <Footer />
    </div>
  );
}
