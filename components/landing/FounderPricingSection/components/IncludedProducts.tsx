/**
 * "All products for the entire org" section. Shows the four Sayso products
 * as small cards. Carousel on mobile, 2x2 grid on md+.
 */

import { INCLUDED_PRODUCTS } from '../data';
import type { IncludedProduct } from '../types';
import { Carousel } from './Carousel';

function ProductCard({ product }: { product: IncludedProduct }) {
  return (
    <div className="rounded-[20px] border border-[rgba(16,35,58,0.12)] bg-white shadow-[0_1px_2px_rgba(16,35,58,0.06),0_14px_34px_-16px_rgba(16,35,58,0.25)] p-5 md:p-6 w-full">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="font-hero text-xl font-bold leading-tight text-[#10233A]">
          {product.name}
        </div>
        <span className="rounded-full bg-[#FFDE59] px-2.5 py-[3px] text-xs font-semibold text-[#1D4871] whitespace-nowrap">
          {product.tag}
        </span>
      </div>
      <p className="text-sm md:text-[15px] text-[#556B86] leading-relaxed">
        {product.description}
      </p>
    </div>
  );
}

export function IncludedProducts() {
  return (
    <section>
      <div className="mb-7">
        <h2 className="mb-3 font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[clamp(28px,4vw,40px)] leading-[1.1]">
          All products for the entire org
        </h2>
        <p className="text-base md:text-lg text-[#556B86] leading-relaxed">
          Cue, Smart Capture, Pulse, and Playbook are available for everyone in your organization.
        </p>
      </div>

      <Carousel ariaLabel="Included products">
        {INCLUDED_PRODUCTS.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))}
      </Carousel>
    </section>
  );
}
