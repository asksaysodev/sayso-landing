'use client';

/**
 * The billing toggle and the two plan cards: Individual Agent+ (price follows
 * the toggle, Claim early access opens the create-account flow, like /pricing) and Teams and
 * Brokerages (Book a demo opens the demo calendar).
 */
import { useState, Fragment } from 'react';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';
import { panel } from '../../HomeShared/styles';
import {
  AGENT_SUPPORT_SUMMARY,
  INDIVIDUAL_PLAN_NAME,
  INDIVIDUAL_PRICE,
  ONBOARDING_LINE,
  PLAN_PRODUCTS,
  TEAM_FEATURES_SUMMARY,
  TEAM_PLAN_NAME,
} from '@/lib/content/pricing';
import type { PricingAnalyticsIds } from '../types';
import { BillingToggle } from './BillingToggle';
import { FeatureList } from './FeatureList';

const card = `${panel} flex flex-col border-t-4 border-t-[#FFDE59] p-7`;

export function PricingCards({ analyticsIds }: { analyticsIds: PricingAnalyticsIds }) {
  const [annual, setAnnual] = useState(true);
  const { openDemoCalendar, openSignup } = useDemoCalendar();

  return (
    <>
      <BillingToggle annual={annual} onChange={setAnnual} monthlyId={analyticsIds.monthly} annualId={analyticsIds.annual} />
      <div className="mx-auto grid max-w-[960px] grid-cols-1 items-stretch gap-[22px] min-[961px]:grid-cols-2">
        <div className={card}>
          <h3 className="font-hero text-[22px] font-bold">{INDIVIDUAL_PLAN_NAME}</h3>
          <div className="mt-2 font-hero text-[52px] font-extrabold leading-none tracking-[-0.03em] tabular-nums" aria-live="polite">
            {annual ? INDIVIDUAL_PRICE.annual : INDIVIDUAL_PRICE.monthly}
            <small className="text-base font-semibold tracking-normal text-[#556B86]"> / month</small>
          </div>
          <p className="mt-2 text-sm text-[#556B86]">{annual ? 'Billed annually.' : 'Billed monthly.'}</p>
          <FeatureList
            items={[
              ...PLAN_PRODUCTS.map((p) => (
                <Fragment key={p.name}>
                  <b>{p.name}:</b> {p.summary}
                </Fragment>
              )),
              ONBOARDING_LINE,
              AGENT_SUPPORT_SUMMARY,
            ]}
          />
          <Button onClick={openSignup} className="self-start" data-analytics-id={analyticsIds.agent}>
            Claim early access
          </Button>
        </div>
        <div className={`${card} !bg-[#1D4871] text-white`}>
          <h3 className="font-hero text-[22px] font-bold">{TEAM_PLAN_NAME}</h3>
          <div className="mt-2 font-hero text-[40px] font-extrabold leading-none tracking-[-0.03em]">Custom</div>
          <p className="mt-2 text-sm text-white/85">Priced by team size.</p>
          <FeatureList items={TEAM_FEATURES_SUMMARY} inverted />
          <Button variant="secondary" onClick={openDemoCalendar} className="self-start !shadow-none" data-analytics-id={analyticsIds.teams}>
            Book a demo
          </Button>
        </div>
      </div>
    </>
  );
}
