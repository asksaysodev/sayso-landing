'use client';

/**
 * ProspectingCalculator: works backward from a yearly client goal to the daily
 * dials, conversations and appointments it takes. Holds the input state and
 * composes the inputs and results panels.
 */
import { useMemo, useState } from 'react';
import { CalculatorInputs } from './components/CalculatorInputs';
import { FunnelResults } from './components/FunnelResults';
import { DEFAULT_INPUTS, calculateFunnel } from './data';
import type { CalculatorInputs as Inputs } from './types';

export function ProspectingCalculator() {
  const [values, setValues] = useState<Inputs>(DEFAULT_INPUTS);
  const stages = useMemo(() => calculateFunnel(values), [values]);

  function handleChange(key: keyof Inputs, value: number) {
    setValues((prev) => ({ ...prev, [key]: Number.isFinite(value) ? value : 0 }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 bg-white border-2 border-[#1D4871] rounded-2xl p-6 md:p-8">
      <div>
        <h2 className="font-hero text-xl text-[#1D4871] font-bold mb-1">Your numbers</h2>
        <p className="text-sm text-[#1D4871]/60 mb-5">
          These are starting numbers. Replace them with your own from your CRM or dialer.
        </p>
        <CalculatorInputs values={values} onChange={handleChange} />
        <button
          type="button"
          onClick={() => setValues(DEFAULT_INPUTS)}
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
