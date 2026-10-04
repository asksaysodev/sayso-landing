/**
 * Testimonial cards built from the shared testimonial data: stat, quote,
 * agent with a link to their video, and achievement badge.
 */

import { testimonials } from '@/components/landing/TestimonialsSection/data';
import { Card } from './Card';
import { PeekCarousel } from './PeekCarousel';
import { Section } from './Section';
import { VideoThumbLink } from './VideoThumbLink';

export function TestimonialCards() {
  return (
    <Section id="testimonials" title="Testimonials" alt>
      <PeekCarousel gridClassName="md:grid-cols-2 lg:grid-cols-4" itemLabel="testimonial">
        {testimonials.map((t) => (
          <Card key={t.number}>
            <div className="sm:min-h-[84px] font-comic text-[40px] leading-none text-cta">
              {t.stat.value}
              <small className="block mt-1.5 font-hero text-sm font-bold leading-snug text-[#515C6C]">
                {t.stat.label}
              </small>
            </div>
            <blockquote className="flex-1 my-3.5 sm:my-5 text-[17px] font-semibold leading-relaxed text-[#0D1B2A]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3.5 border-t border-accent-bg pt-4">
              <VideoThumbLink videoId={t.videoId} name={t.name} />
              <div>
                <strong className="block text-[15px] text-primary">{t.name}</strong>
                <span className="block text-[13px] font-semibold leading-snug text-[#515C6C]">
                  {t.attribution}
                </span>
              </div>
            </div>
            <span className="self-start mt-3.5 rounded-md border-[1.5px] border-primary bg-accent px-2 py-1.5 text-xs font-extrabold leading-none text-[#0D1B2A]">
              {t.badge}
            </span>
          </Card>
        ))}
      </PeekCarousel>
    </Section>
  );
}
