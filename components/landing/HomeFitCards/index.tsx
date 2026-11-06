/**
 * Made to fit: six cards on how Sayso fits an agent's existing CRM, dialer,
 * lead types and scripts. A grid on desktop, an infinite carousel on mobile.
 */
import Carousel from '@/components/ui/Carousel';
import { SectionHead } from '../HomeShared/SectionHead';
import { section, wash, wrap } from '../HomeShared/styles';
import { FitCard } from './components/FitCard';
import { FIT_CARDS } from './data';

export function HomeFitCards() {
  return (
    <section id="fits" className={`${section} ${wash}`} aria-labelledby="fits-title">
      <div className={wrap}>
        <SectionHead id="fits-title" eyebrow="MADE TO FIT" title="Fits the way you already work." />
        <Carousel label="Made to fit" itemName="card" loop trackClassName="grid grid-cols-3 gap-5">
          {FIT_CARDS.map((card) => (
            <FitCard key={card.title} card={card} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
