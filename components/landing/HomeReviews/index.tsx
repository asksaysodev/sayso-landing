/**
 * Reviews: four agent quotes linking to their video stories, then a two-row
 * team logo marquee. Equal-height cards on desktop, an infinite carousel on mobile.
 */
import Carousel from '@/components/ui/Carousel';
import { SectionHead } from '../HomeShared/SectionHead';
import { section, wash, wrap } from '../HomeShared/styles';
import { LogoMarquee } from './components/LogoMarquee';
import { ReviewCard } from './components/ReviewCard';
import { REVIEWS, TEAM_LOGO_ROWS } from './data';

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
        <LogoMarquee rows={TEAM_LOGO_ROWS} label="Teams using Sayso" />
      </div>
    </section>
  );
}
