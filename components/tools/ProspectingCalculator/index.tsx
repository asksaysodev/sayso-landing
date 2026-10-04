'use client';

/**
 * ProspectingCalculator: works backward from a yearly client goal to the daily
 * dials, conversations and appointments it takes. Holds the input state and
 * composes the inputs and results panels.
 */
import { useMemo, useState } from 'react';
import { CalculatorInputs } from './components/CalculatorInputs';
import { FunnelResults } from './components/FunnelResults';
import { DEFAULT_DRAFT, calculateFunnel, parseDraft } from './data';
import type { CalculatorDraft } from './types';

export function ProspectingCalculator() {
  const [draft, setDraft] = useState<CalculatorDraft>(DEFAULT_DRAFT);
  const stages = useMemo(() => {
    const inputs = parseDraft(draft);
    return inputs ? calculateFunnel(inputs) : null;
  }, [draft]);

  function handleChange(key: keyof CalculatorDraft, value: string) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 bg-white border-2 border-[#1D4871] rounded-2xl p-6 md:p-8">
      <div>
        <h2 className="font-hero text-xl text-[#1D4871] font-bold mb-1">Your numbers</h2>
        <p className="text-sm text-[#1D4871]/60 mb-5">
          These are starting numbers. Replace them with your own from your CRM or dialer.
        </p>
        <CalculatorInputs values={draft} onChange={handleChange} />
        <button
          type="button"
          onClick={() => setDraft(DEFAULT_DRAFT)}
          className="mt-5 text-sm font-bold text-[#2367EE] hover:underline"
        >
          Reset to starting numbers
        </button>
      </div>
      <div>
        <h2 className="font-hero text-xl text-[#1D4871] font-bold mb-5">What it takes</h2>
        <FunnelResults stages={stages} />
      </div>
    </div>
  );
}
