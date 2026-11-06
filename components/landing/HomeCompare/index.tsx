/**
 * Compare: Sayso next to role-play, call recording review and printed
 * scripts. Four cards on desktop, a finite carousel on mobile.
 */
import Link from 'next/link';
import Carousel from '@/components/ui/Carousel';
import { SectionHead } from '../HomeShared/SectionHead';
import { focusRing, section, soft, wrap } from '../HomeShared/styles';
import { MethodCard } from './components/MethodCard';
import { METHODS } from './data';

export function HomeCompare() {
  return (
    <section id="compare" className={section} aria-labelledby="compare-title">
      <div className={wrap}>
        <SectionHead
          id="compare-title"
          eyebrow="COMPARE"
          title={
            <>
              Training helps before the call. <span className={soft}>Sayso helps during it.</span>
            </>
          }
        />
        <Carousel label="How Sayso compares" itemName="method" trackClassName="grid grid-cols-4 gap-4">
          {METHODS.map((method) => (
            <MethodCard key={method.name} method={method} />
          ))}
        </Carousel>
        <p className="mx-auto mt-[18px] max-w-[700px] text-center text-sm text-[#556B86]">
          Keep the role-play and the call reviews. Sayso covers the minutes when the prospect is on the line.
          <br />
          <Link href="/differences/" className={`rounded font-semibold text-[#2367EE] ${focusRing}`}>
            How Sayso compares &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
