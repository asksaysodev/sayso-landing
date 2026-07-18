/**
 * The money-back guarantee bubble. Light blue panel with the guarantee copy,
 * centered, used to close the page.
 */

import { GUARANTEE_TEXT } from '../data';

export function Guarantee({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-[#EEF1FF] v2-comic-border rounded-2xl p-5 md:p-6 text-center ${className}`}
    >
      <p className="text-sm md:text-base leading-relaxed text-[#1D4871]">
        <span className="font-bold text-[#2367EE]">The guarantee:</span>{' '}
        {GUARANTEE_TEXT}
      </p>
    </div>
  );
}
