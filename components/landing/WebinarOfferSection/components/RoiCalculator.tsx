'use client';

/**
 * Simple ROI calculator shown inside the "return on one deal" FAQ. Slide your
 * average commission check to see the return and net against the $2,700 price.
 */

import { useState } from 'react';
import { PRICE_AMOUNT } from '../data';

const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

function Cell({ n, l, good = false }: { n: string; l: string; good?: boolean }) {
  return (
    <div className="bg-[#F4F4F5] rounded-xl p-4 text-center">
      <div
        className={`font-black italic text-2xl tabular-nums ${good ? 'text-[#1E7F4F]' : 'text-[#1D4871]'}`}
      >
        {n}
      </div>
      <div className="mt-1.5 text-[12px] font-bold uppercase tracking-wide text-[#1D4871]/60">
        {l}
      </div>
    </div>
  );
}

export function RoiCalculator() {
  const [gci, setGci] = useState(10000);
  const roiX = (gci / PRICE_AMOUNT).toFixed(1);
  const net = gci - PRICE_AMOUNT;

  return (
    <div>
      <label htmlFor="gci" className="block font-bold text-[#1D4871] mb-3">
        Your average commission check
      </label>
      <div className="flex items-center gap-4 mb-6">
        <input
          id="gci"
          type="range"
          min={4000}
          max={20000}
          step={500}
          value={gci}
          onChange={(e) => setGci(Number(e.target.value))}
          className="flex-1 accent-[#2367EE] h-1.5"
        />
        <span className="min-w-[110px] text-right text-2xl font-extrabold text-[#1D4871] tabular-nums">
          {fmt(gci)}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Cell n={fmt(PRICE_AMOUNT)} l="Sayso, all-in, 1 year" />
        <Cell n={`${roiX}x`} l="Return on ONE closing" good />
        <Cell n={`+${fmt(net)}`} l="Your net on that closing" good />
      </div>
    </div>
  );
}
