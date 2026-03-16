'use client';

import { useState } from 'react';
import { PaywallScreen } from '@/components/onboarding/screens/PaywallScreen';

type Device = 'Mac' | 'PC';
type Flow = 'A' | 'B';

const variants: { device: Device; flow: Flow; label: string }[] = [
  { device: 'Mac', flow: 'A', label: 'Apple · Flow A (Individual)' },
  { device: 'Mac', flow: 'B', label: 'Apple · Flow B (Teams)' },
  { device: 'PC',  flow: 'A', label: 'PC · Flow A (Individual)' },
  { device: 'PC',  flow: 'B', label: 'PC · Flow B (Teams)' },
];

export default function PaywallPreviewPage() {
  const [device, setDevice] = useState<Device>('Mac');
  const [flow, setFlow] = useState<Flow>('A');

  const isPathB = flow === 'B';

  return (
    <div className="min-h-screen bg-[#F8F8FA]">
      {/* Sticky toggle bar */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-[#1D4871]/20 px-4 py-3 flex flex-wrap gap-2 justify-center shadow-sm">
        {variants.map((v) => {
          const active = v.device === device && v.flow === flow;
          return (
            <button
              key={v.label}
              onClick={() => { setDevice(v.device); setFlow(v.flow); }}
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-colors cursor-pointer ${
                active
                  ? 'bg-[#2367EE] text-white border-[#1D4871]'
                  : 'bg-white text-[#1D4871] border-[#1D4871]/40 hover:border-[#1D4871]'
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      {/* Paywall preview */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <PaywallScreen computerType={device} isPathB={isPathB} />
      </div>
    </div>
  );
}
