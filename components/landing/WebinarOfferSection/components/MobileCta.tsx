/**
 * Fixed bottom claim bar, mobile only. Keeps a call to action in reach on phones
 * where the sticky top bar hides its button. The page adds bottom padding so
 * content never hides behind it.
 */

import { ClaimButton } from './ClaimButton';

export function MobileCta() {
  return (
    <div className="sm:hidden fixed inset-x-0 bottom-0 z-[60] border-t-2 border-[#1D4871] bg-[#F4F4F5]/95 backdrop-blur px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] text-center">
      <ClaimButton variant="block" />
    </div>
  );
}
