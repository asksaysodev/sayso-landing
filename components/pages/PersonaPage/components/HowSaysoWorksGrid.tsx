/** "How Sayso Works for {persona}" feature cards, linking to the product pages. */
import Link from 'next/link';
import { card, h2 } from '@/components/pages/contentStyles';
import type { UseCaseEntry } from '@/lib/content/for/types';

interface HowSaysoWorksGridProps {
  persona: string;
  items: UseCaseEntry['howSaysoWorks'];
}

export function HowSaysoWorksGrid({ persona, items }: HowSaysoWorksGridProps) {
  return (
    <>
      <h2 className={`${h2} mb-6 mt-10`}>How Sayso Works for {persona}</h2>
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.feature} className={card}>
            <h3 className="mb-2 font-sans text-base font-bold text-[#10233A]">
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-[#2367EE]">
                  {item.feature}
                </Link>
              ) : (
                item.feature
              )}
            </h3>
            <p className="font-sans text-sm leading-relaxed text-[#1D4871]/70">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
