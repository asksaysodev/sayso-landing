/** One Made to fit card: picture box, headline, one line of copy and an optional link. */
import Link from 'next/link';
import { focusRing, panelShadow } from '../../HomeShared/styles';
import type { FitCard as FitCardData } from '../data';
import { FitArt } from './FitArt';

const linkClass = `mx-1.5 mb-1 mt-auto rounded pt-2 text-sm font-bold text-[#2367EE] ${focusRing}`;

export function FitCard({ card }: { card: FitCardData }) {
  return (
    <article className={`flex flex-col rounded-2xl border border-[rgba(16,35,58,0.14)] bg-white p-3.5 ${panelShadow}`}>
      <FitArt art={card.art} />
      <h3 className="mx-1.5 mb-1.5 mt-4 font-hero text-lg font-bold text-[#10233A]">{card.title}</h3>
      <p className="mx-1.5 mb-1.5 text-[14.5px] text-[#556B86]">{card.body}</p>
      {card.link &&
        (card.link.external ? (
          <a href={card.link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {card.link.label} &rarr;
          </a>
        ) : (
          <Link href={card.link.href} className={linkClass}>
            {card.link.label} &rarr;
          </Link>
        ))}
    </article>
  );
}
