/**
 * Compare: Sayso next to role-play, call recording review and printed
 * scripts. A table on desktop, swipe cards at 960px and below.
 */
import Link from 'next/link';
import Carousel from '@/components/ui/Carousel';
import { SectionHead } from '../HomeShared/SectionHead';
import { focusRing, section, soft, wrap } from '../HomeShared/styles';
import { CompareTable } from './components/CompareTable';
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
        <div className="hidden min-[961px]:block">
          <CompareTable methods={METHODS} />
        </div>
        <Carousel label="How Sayso compares" itemName="method" className="min-[961px]:hidden" trackClassName="grid grid-cols-4 gap-4">
          {METHODS.map((method) => (
            <MethodCard key={method.name} method={method} />
          ))}
        </Carousel>
        <p className="mx-auto mt-[18px] max-w-[700px] text-center text-sm text-[#556B86]">
          <Link href="/differences/" className={`rounded font-semibold text-[#2367EE] ${focusRing}`}>
            How Sayso compares &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
