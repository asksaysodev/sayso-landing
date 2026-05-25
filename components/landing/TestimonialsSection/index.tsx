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
          <span className="inline-block text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-3">
            What agents are saying
          </span>
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] tracking-wide mb-4">
            Real agents, real conversations
          </h2>
          <p className="text-base md:text-lg text-[#1D4871]/70 leading-relaxed">
            Agents using Sayso share how the prompts change the way they handle live prospecting conversations and guide them toward booked appointments.
          </p>
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
