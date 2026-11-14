/** Closing CTA band. */

import { section } from '@/components/landing/HomeShared/styles';
import { TeamDemoButton } from '@/components/landing/HomeTeams/components/TeamDemoButton';
import { sectionTitle, sectionWrap } from '../styles';

export function CloseSection() {
  return (
    <section className={section}>
      <div className={sectionWrap}>
        <h2 className={sectionTitle}>The next call is the one that counts.</h2>
        <p className="mx-auto mt-5 max-w-xl text-[1.1rem] leading-relaxed text-[#556B86]">
          See Sayso on a live call with your team’s scripts.
        </p>
        <div className="mt-9">
          <TeamDemoButton analyticsId="cta-book-demo-differences-close" />
        </div>
      </div>
    </section>
  );
}
