/** "What Makes This Different" cards for a product page: a grid on desktop, a swipe row on mobile. */
import Carousel from '@/components/ui/Carousel';
import { card, column, h2 } from '@/components/pages/contentStyles';
import type { ProductEntry } from '@/lib/content/products/types';

interface DifferentiatorGridProps {
  heading?: string;
  items: ProductEntry['differentiators'];
}

export function DifferentiatorGrid({ heading, items }: DifferentiatorGridProps) {
  return (
    <section className={`${column} pb-10`}>
      <h2 className={`${h2} mb-6 mt-10`}>{heading ?? 'What Makes This Different'}</h2>
      <Carousel label={heading ?? 'What Makes This Different'} itemName="card" trackClassName="grid grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item.title} className={card}>
            <h3 className="mb-2 font-sans text-base font-bold text-[#10233A]">{item.title}</h3>
            <p className="font-sans text-sm leading-relaxed text-[#1D4871]/70">{item.body}</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
