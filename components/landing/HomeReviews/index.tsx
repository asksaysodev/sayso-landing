/**
 * Reviews: four agent quotes linking to their video stories, then the team
 * logos. Equal-height cards on desktop, an infinite carousel on mobile.
 */
import Image from 'next/image';
import Carousel from '@/components/ui/Carousel';
import { SectionHead } from '../HomeShared/SectionHead';
import { section, wash, wrap } from '../HomeShared/styles';
import { ReviewCard } from './components/ReviewCard';
import { REVIEWS, TEAM_LOGOS } from './data';

export function HomeReviews() {
  return (
    <section id="reviews" className={`${section} ${wash}`} aria-labelledby="reviews-title">
      <div className={wrap}>
        <SectionHead id="reviews-title" eyebrow="REVIEWS" title="Agents on what changed." />
        <Carousel label="Agent reviews" itemName="review" loop trackClassName="grid grid-cols-4 auto-rows-fr gap-[18px]">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </Carousel>
        <ul aria-label="Teams using Sayso" className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-[22px]">
          {TEAM_LOGOS.map((logo) => (
            <li key={logo.src}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="160px"
                className="h-8 w-auto opacity-70 grayscale"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
