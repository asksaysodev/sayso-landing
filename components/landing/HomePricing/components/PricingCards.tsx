'use client';

/**
 * The billing toggle and the two plan cards: Individual Agent+ (price follows
 * the toggle, Get Sayso opens the create-account flow, like /pricing) and Teams and
 * Brokerages (Book a demo opens the demo calendar).
 *
 * Teams is first in the DOM (it leads on phones) and sits on the right from
 * 961px. Below 961px the toggle moves into the agent card (it only
 * changes that price), and each card shows 3 features until expanded.
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

const card = `${panel} flex flex-col border-t-4 border-t-[#FFDE59] p-5 min-[380px]:p-6 min-[961px]:p-7`;

export function PricingCards({ analyticsIds }: { analyticsIds: PricingAnalyticsIds }) {
  const [annual, setAnnual] = useState(true);
  const { openDemoCalendar, openSignup } = useDemoCalendar();

  return (
    <>
      <BillingToggle
        annual={annual}
        onChange={setAnnual}
        monthlyId={analyticsIds.monthly}
        annualId={analyticsIds.annual}
        className="mb-[26px] hidden justify-center min-[961px]:flex"
      />
      <div className="mx-auto grid max-w-[960px] grid-cols-1 items-stretch gap-4 min-[961px]:grid-cols-2 min-[961px]:gap-[22px]">
        <div className={`${card} !bg-[#1D4871] text-white min-[961px]:order-last`}>
          <h3 className="font-hero text-[22px] font-bold">{TEAM_PLAN_NAME}</h3>
          <div className="mt-2 font-hero text-[36px] font-extrabold leading-none tracking-[-0.03em] min-[961px]:text-[40px]">Custom</div>
          <p className="mt-2 text-sm text-white/85">Priced by team size.</p>
          <FeatureList items={TEAM_FEATURES_SUMMARY} inverted />
          <Button variant="secondary" onClick={openDemoCalendar} className="self-start !shadow-none" data-analytics-id={analyticsIds.teams}>
            Book a demo
          </Button>
        </div>
        <div className={card}>
          <h3 className="font-hero text-[22px] font-bold">{INDIVIDUAL_PLAN_NAME}</h3>
          <BillingToggle
            annual={annual}
            onChange={setAnnual}
            monthlyId={analyticsIds.monthly}
            annualId={analyticsIds.annual}
            className="mt-3 flex min-[961px]:hidden"
          />
          <div className="mt-3 font-hero text-[44px] font-extrabold leading-none tracking-[-0.03em] tabular-nums min-[961px]:mt-2 min-[961px]:text-[52px]" aria-live="polite">
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
            Get Sayso
          </Button>
        </div>
      </div>
    </>
  );
}
