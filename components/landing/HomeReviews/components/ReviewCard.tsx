/** One review card: badge, quote, agent and team, and a link to the agent's video story. */
import { focusRing, panel } from '../../HomeShared/styles';
import type { Review } from '../data';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className={`${panel} m-0 flex h-full flex-col gap-3.5 p-5`}>
      <span className="self-start rounded-md border border-[rgba(16,35,58,0.14)] bg-[#FFDE59] px-[7px] font-comic text-[13px] tracking-[0.06em] text-[#1D4871]">
        {review.badge}
      </span>
      <blockquote className="m-0 flex-1 text-[17px] font-medium leading-[1.45] text-[#10233A] before:my-4 before:mb-2 before:block before:font-comic before:text-[46px] before:leading-[0] before:text-[#2367EE] before:content-['\201C']">
        {review.quote}
      </blockquote>
      <figcaption className="mt-auto text-[13px] text-[#556B86]">
        <b className="block text-[14.5px] text-[#10233A]">{review.name}</b>
        {review.team}
        <a
          href={review.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-2.5 flex w-max rounded text-[13.5px] font-semibold text-[#2367EE] hover:underline ${focusRing}`}
        >
          <span aria-hidden="true">&#9654;&nbsp;</span>Watch {review.firstName}&rsquo;s story
        </a>
      </figcaption>
    </figure>
  );
}
