/**
 * Monthly / Annual switch above the homepage pricing cards. Annual shows the
 * green SAVE 30% badge. Homepage-only analytics ids, so GTM can tell them apart
 * from the /pricing toggle.
 */

interface BillingToggleProps {
  annual: boolean;
  onChange: (annual: boolean) => void;
}

const base =
  'inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#2367EE] focus-visible:ring-offset-2';
const on = 'bg-[#2367EE] text-white shadow-[0_4px_12px_-4px_rgba(35,103,238,0.5)]';
const off = 'bg-transparent text-[#556B86]';

export function BillingToggle({ annual, onChange }: BillingToggleProps) {
  return (
    <div className="mb-[26px] flex justify-center">
      <div role="group" aria-label="Billing period" className="flex gap-1 rounded-full border border-[rgba(16,35,58,0.14)] bg-white p-1">
        <button
          type="button"
          aria-pressed={!annual}
          onClick={() => onChange(false)}
          data-analytics-id="home-pricing-billing-toggle-monthly"
          className={`${base} ${annual ? off : on}`}>
          Monthly
        </button>
        <button
          type="button"
          aria-pressed={annual}
          onClick={() => onChange(true)}
          data-analytics-id="home-pricing-billing-toggle-annual"
          className={`${base} ${annual ? on : off}`}>
          Annual
          <span
            className={`ml-2 rounded-full px-2 py-[3px] text-[11px] font-extrabold tracking-[0.02em] ${
              annual ? 'bg-[#12a150] text-white shadow-[0_0_0_2px_rgba(255,255,255,0.35)]' : 'bg-[#d9f7e7] text-[#0f7a45]'
            }`}
          >
            SAVE 30%
          </span>
        </button>
      </div>
    </div>
  );
}
