/**
 * Fixed bottom claim bar, mobile only. Keeps a call to action in reach on phones
 * where the sticky top bar hides its button. The page adds bottom padding so
 * content never hides behind it.
 */

import { ClaimButton } from './ClaimButton';

export function MobileCta() {
  return (
    <div className="sm:hidden fixed inset-x-0 bottom-0 z-[60] border-t border-[rgba(16,35,58,0.12)] bg-[#F4F4F5]/95 shadow-[0_-8px_24px_-12px_rgba(16,35,58,0.25)] backdrop-blur px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] text-center">
      <ClaimButton variant="block" />
    </div>
  );
}
