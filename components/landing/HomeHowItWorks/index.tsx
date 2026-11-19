/**
 * How it works: three cards, each with a static widget view. A grid on
 * desktop, a finite swipeable carousel on mobile.
 */
import Carousel from '@/components/ui/Carousel';
import { SectionHead } from '../HomeShared/SectionHead';
import { section, soft, wrap } from '../HomeShared/styles';
import { HowCard } from './components/HowCard';
import { HOW_STEPS } from './data';

export function HomeHowItWorks() {
  return (
    <section id="how" className={section} aria-labelledby="how-title">
      <div className={wrap}>
        <SectionHead
          id="how-title"
          eyebrow="HOW IT WORKS"
          title={
            <>
              You make the call. <span className={soft}>Sayso keeps you on track.</span>
            </>
          }
        />
        <Carousel label="How it works" itemName="step" trackClassName="grid grid-cols-3 gap-[22px]">
          {HOW_STEPS.map((step, i) => (
            <HowCard key={step.title} number={i + 1} title={step.title} preset={step.preset} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
