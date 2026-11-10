/**
 * Monthly / Annual switch: above the pricing cards on desktop, inside the
 * Individual Agent+ card on phones (the parent passes the layout classes). Annual shows the green SAVE
 * badge (percent derived in lib/content/pricing). Each page passes its own
 * analytics ids, so GTM can tell the homepage and /pricing apart.
 */
import { ANNUAL_DISCOUNT_PERCENT } from '@/lib/content/pricing';

interface BillingToggleProps {
  annual: boolean;
  onChange: (annual: boolean) => void;
  monthlyId: string;
  annualId: string;
  className?: string;
}

const base =
  'inline-flex h-9 items-center whitespace-nowrap rounded-full px-3 text-sm min-[380px]:px-4 font-semibold transition-colors focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#2367EE] focus-visible:ring-offset-2';
const on = 'bg-[#2367EE] text-white shadow-[0_4px_12px_-4px_rgba(35,103,238,0.5)]';
const off = 'bg-transparent text-[#556B86]';

export function BillingToggle({ annual, onChange, monthlyId, annualId, className = 'mb-[26px] flex justify-center' }: BillingToggleProps) {
  return (
    <div className={className}>
      <div role="group" aria-label="Billing period" className="flex gap-1 rounded-full border border-[rgba(16,35,58,0.14)] bg-white p-1">
        <button
          type="button"
          aria-pressed={!annual}
          onClick={() => onChange(false)}
          data-analytics-id={monthlyId}
          className={`${base} ${annual ? off : on}`}>
          Monthly
        </button>
        <button
          type="button"
          aria-pressed={annual}
          onClick={() => onChange(true)}
          data-analytics-id={annualId}
          className={`${base} ${annual ? on : off}`}>
          Annual
          <span
            className={`ml-1.5 rounded-full px-1.5 py-[3px] min-[380px]:ml-2 min-[380px]:px-2 text-[11px] font-extrabold tracking-[0.02em] ${
              annual ? 'bg-[#12a150] text-white shadow-[0_0_0_2px_rgba(255,255,255,0.35)]' : 'bg-[#d9f7e7] text-[#0f7a45]'
            }`}
          >
            SAVE {ANNUAL_DISCOUNT_PERCENT}%
          </span>
        </button>
      </div>
    </div>
  );
}
