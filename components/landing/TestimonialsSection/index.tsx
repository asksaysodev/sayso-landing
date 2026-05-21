/**
 * TestimonialsSection composes the homepage's "What agents are saying" block.
 *
 * Responsive layout:
 *   • Mobile (< md): MobileCarousel renders one testimonial per swipeable slide.
 *   • Tablet (md):   TestimonialBlocks stack vertically in a single column.
 *   • Desktop (lg+): TestimonialBlocks sit side-by-side in a two-column grid.
 *
 * All sub-components live under ./components and shared types/data under
 * ./types and ./data respectively.
 */

import { testimonials } from './data';
import { MobileCarousel } from './components/MobileCarousel';
import { TestimonialBlock } from './components/TestimonialBlock';

export function TestimonialsSection() {
  return (
    <section className="relative bg-[#F4F4F5] py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
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

        <div className="md:hidden">
          <MobileCarousel testimonials={testimonials} />
        </div>

        <div className="hidden md:grid max-w-6xl mx-auto grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8">
          {testimonials.map((t) => (
            <TestimonialBlock key={t.number} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
