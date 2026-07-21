/**
 * The reusable "Claim your offer" button. Links to the create-account page so
 * attendees sign up right after the webinar (see ACCOUNT_CREATION_URL).
 *
 * Variants: primary (big hero/price button), mini (sticky bar), block (full
 * width for the mobile sticky bar).
 */

import { ACCOUNT_CREATION_URL } from '../data';

type Variant = 'primary' | 'mini' | 'block';

const VARIANT_CLS: Record<Variant, string> = {
  primary: 'px-11 py-4 text-lg v2-comic-btn',
  mini: 'px-5 py-2 text-sm v2-comic-shadow-sm',
  block: 'block w-full px-6 py-3.5 text-base',
};

export function ClaimButton({
  variant = 'primary',
  label = 'Claim your offer',
  className = '',
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={ACCOUNT_CREATION_URL}
      data-analytics-id="cta-claim-offer-webinar"
      className={`inline-flex items-center justify-center rounded-full bg-[#2367EE] font-bold text-white v2-comic-border focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2367EE]/40 ${VARIANT_CLS[variant]} ${className}`}
    >
      {label}
    </a>
  );
}
