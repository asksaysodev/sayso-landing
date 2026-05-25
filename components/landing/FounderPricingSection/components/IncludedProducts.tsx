/**
 * "All products for the entire org" section. Shows the four Sayso products
 * as small cards. Carousel on mobile, 2x2 grid on md+.
 */

import { INCLUDED_PRODUCTS } from '../data';
import type { IncludedProduct } from '../types';
import { Carousel } from './Carousel';

function ProductCard({ product }: { product: IncludedProduct }) {
  return (
    <div className="bg-white v2-comic-border v2-comic-shadow rounded-2xl p-5 md:p-6 w-full">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="font-comic text-xl md:text-[22px] text-[#1D4871] tracking-wide leading-tight">
          {product.name}
        </div>
        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#1D4871] bg-[#FFDE59] border-2 border-[#1D4871] rounded-full px-2.5 py-1 whitespace-nowrap">
          {product.tag}
        </span>
      </div>
      <p className="text-sm md:text-[15px] text-[#1D4871]/80 leading-relaxed">
        {product.description}
      </p>
    </div>
  );
}

export function IncludedProducts() {
  return (
    <section>
      <div className="mb-7">
        <span className="block text-xs font-bold tracking-widest uppercase text-[#2367EE] mb-3">
          What&apos;s included
        </span>
        <h2 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mb-3">
          All products for the entire org
        </h2>
        <p className="text-base md:text-lg text-[#1D4871]/75 leading-relaxed">
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
