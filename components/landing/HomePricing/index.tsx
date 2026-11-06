/**
 * Pricing: monthly / annual toggle and the Individual Agent+ and Teams and
 * Brokerages plans. Shared by the homepage and /pricing; /pricing passes an
 * H1 heading, its own analytics ids and extra content under the cards.
 */
import type { ReactNode } from 'react';
import { SectionHead } from '../HomeShared/SectionHead';
import { section, soft, wrap } from '../HomeShared/styles';
import { PricingCards } from './components/PricingCards';
import { HOME_PRICING_IDS, type PricingAnalyticsIds } from './types';

interface HomePricingProps {
  /** Heading level of the section title. Default `h2`. */
  titleAs?: 'h1' | 'h2';
  analyticsIds?: PricingAnalyticsIds;
  /** Extra content under the plan cards. */
  children?: ReactNode;
  className?: string;
}

export function HomePricing({ titleAs, analyticsIds = HOME_PRICING_IDS, children, className = '' }: HomePricingProps) {
  return (
    <section id="pricing" className={`${section} ${className}`} aria-labelledby="pricing-title">
      <div className={wrap}>
        <SectionHead
          id="pricing-title"
          as={titleAs}
          eyebrow="PRICING"
          title={
            <>
              One plan for agents. <span className={soft}>Built out for teams.</span>
            </>
          }
        />
        <PricingCards analyticsIds={analyticsIds} />
        {children}
      </div>
    </section>
  );
}
