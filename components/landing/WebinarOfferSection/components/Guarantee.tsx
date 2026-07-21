/**
 * The signed-client guarantee. Dashed card with a yellow seal, the promise, and
 * the terms, followed by a centered claim button.
 */

import { ClaimButton } from './ClaimButton';

export function Guarantee() {
  return (
    <section className="py-12 md:py-14">
      <div className="max-w-[680px] mx-auto px-5 md:px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white border-[2.5px] border-dashed border-[#1D4871] rounded-2xl p-7 md:p-8">
          <div className="shrink-0 w-20 h-20 rounded-full bg-[#FFDE59] border-2 border-[#1D4871] flex items-center justify-center text-center text-[10px] font-extrabold uppercase leading-tight text-[#1D4871] p-2 -rotate-6">
            Signed client or free
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-comic text-xl md:text-2xl text-[#1D4871] tracking-wide mb-2">
              Sign 1 client in your first 12 months, or you get your money back.
            </h3>
            <p className="text-[15px] text-[#1D4871]/70 leading-relaxed">
              Signed means a buyer agreement or a listing agreement. Your part?
              Have 20 conversations a week through Sayso and show up to the weekly
              training. If you haven&apos;t signed a client, we refund the full
              $2,700.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <ClaimButton variant="primary" />
        </div>
      </div>
    </section>
  );
}
