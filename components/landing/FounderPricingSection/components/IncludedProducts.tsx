/**
 * "All products for the entire org" section. Shows the four Sayso products
 * as small cards. Carousel on mobile, 2x2 grid on md+.
 */

import { INCLUDED_PRODUCTS } from '../data';
import type { IncludedProduct } from '../types';
import { Carousel } from './Carousel';
import { heading, whitePanel, yellowTag } from '../styles';

function ProductCard({ product }: { product: IncludedProduct }) {
  return (
    <div className={`${whitePanel} p-5 md:p-6 w-full`}>
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="font-hero text-xl font-bold leading-tight text-[#10233A]">{product.name}</div>
        <span className={`${yellowTag}`}>{product.tag}</span>
      </div>
      <p className="text-sm md:text-[15px] text-[#556B86] leading-relaxed">{product.description}</p>
    </div>
  );
}

export function IncludedProducts() {
  return (
    <section>
      <div className="mb-7">
        <h2 className={`mb-3 ${heading}`}>All products for the entire org</h2>
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
