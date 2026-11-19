/** One agent quote under the /pricing plan cards. The quote and name come from the homepage reviews, so they stay in sync. */
import { REVIEWS } from '../../HomeReviews/data';

const REVIEW = REVIEWS.find((r) => r.name === 'David Simpson') ?? REVIEWS[0];

export function PricingProof() {
  return (
    <figure className="mx-auto mt-10 max-w-[640px] text-center">
      <blockquote className="text-balance text-[17px] italic leading-relaxed text-[#1D4871]">&ldquo;{REVIEW.quote}&rdquo;</blockquote>
      <figcaption className="mt-2 text-sm text-[#556B86]">
        {REVIEW.name}, {REVIEW.team}
      </figcaption>
    </figure>
  );
}
