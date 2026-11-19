/**
 * TestimonialsSection composes the homepage's "What agents are saying" block.
 *
 * Responsive layout:
 *   • Below lg (< 1024px): MobileCarousel renders one testimonial per swipeable
 *     slide. Used for both phones and tablets/half-screen browsers so users
 *     never end up scrolling through four stacked video blocks.
 *   • Desktop (lg+): TestimonialBlocks sit side-by-side in a four-column row.
 *
 * All sub-components live under ./components and shared types/data under
 * ./types and ./data respectively.
 */

import { testimonials } from './data';
import { MobileCarousel } from './components/MobileCarousel';
import { TestimonialBlock } from './components/TestimonialBlock';

export function TestimonialsSection() {
  return (
    <section className="relative bg-[#F4F4F5] py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          <span className="mb-4 inline-block font-hero text-xs font-bold uppercase tracking-[0.12em] text-[#556B86]">
            What agents are saying
          </span>
          <h2 className="text-balance font-hero font-extrabold text-[clamp(30px,4.5vw,46px)] leading-[1.1] tracking-[-0.03em] text-[#10233A]">
            Hear from our users
          </h2>
        </div>

        <div className="lg:hidden">
          <MobileCarousel testimonials={testimonials} />
        </div>

        <div className="hidden lg:grid max-w-6xl mx-auto grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <TestimonialBlock key={t.number} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
