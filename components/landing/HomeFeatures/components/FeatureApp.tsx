'use client';

/** The dark app-style Features panel: product tabs on the left, the selected product's panel on the right. */
import { inter } from '@/components/SaysoWidget/font';
import { useState } from 'react';
import { FEATURES } from '../data';
import { FeaturePanel } from './FeaturePanel';
import { FeatureTabs } from './FeatureTabs';

export function FeatureApp() {
  const [active, setActive] = useState(0);
  return (
    <div className={`${inter.variable} overflow-hidden rounded-3xl border border-[rgba(16,35,58,0.12)] bg-[#172a42] font-[family-name:var(--font-inter)] text-[#F4F4F5] shadow-[0_1px_2px_rgba(16,35,58,0.06),0_14px_34px_-16px_rgba(16,35,58,0.25)]`}>
      <div className="grid grid-cols-1 min-[961px]:grid-cols-[230px_minmax(0,1fr)]">
        <FeatureTabs active={active} onSelect={setActive} />
        <FeaturePanel key={FEATURES[active].id} feature={FEATURES[active]} />
      </div>
    </div>
  );
}
