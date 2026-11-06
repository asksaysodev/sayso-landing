/** Pricing: monthly / annual toggle and the Individual Agent+ and Teams and Brokerages plans. */
import { SectionHead } from '../HomeShared/SectionHead';
import { section, soft, wrap } from '../HomeShared/styles';
import { PricingCards } from './components/PricingCards';

export function HomePricing() {
  return (
    <section id="pricing" className={section} aria-labelledby="pricing-title">
      <div className={wrap}>
        <SectionHead
          id="pricing-title"
          eyebrow="PRICING"
          title={
            <>
              One plan for agents. <span className={soft}>Built out for teams.</span>
            </>
          }
        />
        <PricingCards />
      </div>
    </section>
  );
}
