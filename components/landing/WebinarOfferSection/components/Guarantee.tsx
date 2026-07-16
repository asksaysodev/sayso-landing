/**
 * The money-back guarantee bubble. Light blue panel with a shield icon, used
 * under the offer columns near the top and again near the closing CTA.
 */

import { ShieldCheck } from 'lucide-react';
import { GUARANTEE_TEXT } from '../data';

export function Guarantee({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3.5 bg-[#EEF1FF] v2-comic-border rounded-2xl p-5 md:p-6 ${className}`}
    >
      <ShieldCheck
        size={26}
        strokeWidth={2.25}
        className="shrink-0 text-[#2367EE] mt-0.5"
        aria-hidden="true"
      />
      <p className="text-sm md:text-base leading-relaxed text-[#1D4871]">
        <span className="font-bold text-[#2367EE]">The guarantee:</span>{' '}
        {GUARANTEE_TEXT}
      </p>
    </div>
  );
}
