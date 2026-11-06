'use client';

/**
 * The billing toggle and the two plan cards: Individual Agent+ (price follows
 * the toggle, Claim early access goes to /founderpricing) and Teams and
 * Brokerages (Assemble your team opens the demo calendar).
 */
import { useState } from 'react';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';
import { panel } from '../../HomeShared/styles';
import { AGENT_FEATURES, AGENT_PRICE, TEAM_FEATURES } from '../data';
import type { PricingAnalyticsIds } from '../types';
import { BillingToggle } from './BillingToggle';
import { FeatureList } from './FeatureList';

const card = `${panel} flex flex-col border-t-4 border-t-[#FFDE59] p-7`;

export function PricingCards({ analyticsIds }: { analyticsIds: PricingAnalyticsIds }) {
  const [annual, setAnnual] = useState(true);
  const { openDemoCalendar } = useDemoCalendar();

  return (
    <>
      <BillingToggle annual={annual} onChange={setAnnual} monthlyId={analyticsIds.monthly} annualId={analyticsIds.annual} />
      <div className="mx-auto grid max-w-[960px] grid-cols-1 items-stretch gap-[22px] min-[961px]:grid-cols-2">
        <div className={card}>
          <h3 className="font-hero text-[22px] font-bold">Individual Agent+</h3>
          <div className="mt-2 font-hero text-[52px] font-extrabold leading-none tracking-[-0.03em] tabular-nums" aria-live="polite">
            {annual ? AGENT_PRICE.annual : AGENT_PRICE.monthly}
            <small className="text-base font-semibold tracking-normal text-[#556B86]"> / month</small>
          </div>
          <p className="mt-2 text-sm text-[#556B86]">{annual ? 'Billed annually.' : 'Billed monthly.'}</p>
          <FeatureList
            items={AGENT_FEATURES.map((f) =>
              f.name ? (
                <>
                  <b>{f.name}:</b> {f.text}
                </>
              ) : (
                f.text
              ),
            )}
          />
          <Button href="/founderpricing/" withArrow className="self-start" data-analytics-id={analyticsIds.agent}>
            Claim early access
          </Button>
        </div>
        <div className={`${card} !bg-[#1D4871] text-white`}>
          <h3 className="font-hero text-[22px] font-bold">Teams and Brokerages</h3>
          <div className="mt-2 font-hero text-[40px] font-extrabold leading-none tracking-[-0.03em]">Custom</div>
          <p className="mt-2 text-sm text-white/85">Priced by team size.</p>
          <FeatureList items={TEAM_FEATURES} inverted />
          <Button variant="secondary" onClick={openDemoCalendar} className="self-start !shadow-none" data-analytics-id={analyticsIds.teams}>
            Assemble your team
          </Button>
        </div>
      </div>
    </>
  );
}
