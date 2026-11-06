/**
 * The one-line answer the hero CTA scrolls to: Sayso works in the moment,
 * not after it. A single statement band on the light wash surface.
 */

import { section, wash } from '@/components/landing/HomeShared/styles';
import { sectionTitle, sectionWrap } from '../styles';

export function MomentSection() {
  return (
    <section id="how" className={`${wash} ${section}`}>
      <div className={sectionWrap}>
        <h2 className={sectionTitle}>
          The difference? Sayso is in the moment, not after.
        </h2>
        <p className="mt-6 text-[1.2rem] text-[#556B86] max-w-3xl mx-auto leading-relaxed">
          Sayso works during the call, shows you what to say, and gets out of the
          way. There is nothing to study, nothing to remember, and no hoping the
          agent remembers what to do.
        </p>
      </div>
    </section>
  );
}
