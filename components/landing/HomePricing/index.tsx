/**
 * Pricing: monthly / annual toggle and the Individual Agent+ and Teams and
 * Brokerages plans. Shared by the homepage and /pricing; /pricing passes its
 * own H1 header, its own analytics ids, the agent-first card order and extra
 * content under the cards.
 */
import type { ReactNode } from 'react';
import { SectionHead } from '../HomeShared/SectionHead';
import { section, soft, wrap } from '../HomeShared/styles';
import { PricingCards } from './components/PricingCards';
import { HOME_PRICING_IDS, type PricingAnalyticsIds } from './types';

interface HomePricingProps {
  /** Replaces the default section header. Its heading must carry id="pricing-title". */
  header?: ReactNode;
  analyticsIds?: PricingAnalyticsIds;
  /** Individual Agent+ first in the DOM and on screen, with one billing toggle above the cards. */
  agentFirst?: boolean;
  /** Extra content under the plan cards. */
  children?: ReactNode;
  className?: string;
}

export function HomePricing({ header, analyticsIds = HOME_PRICING_IDS, agentFirst = false, children, className = '' }: HomePricingProps) {
  return (
    <section id="pricing" className={`${section} ${className}`} aria-labelledby="pricing-title">
      <div className={wrap}>
        {header ?? (
          <SectionHead
            id="pricing-title"
            eyebrow="PRICING"
            title={
              <>
                One plan for agents. <span className={soft}>Built out for teams.</span>
              </>
            }
          />
        )}
        <PricingCards analyticsIds={analyticsIds} agentFirst={agentFirst} />
        {children}
      </div>
    </section>
  );
}
