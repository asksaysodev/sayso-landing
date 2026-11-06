/**
 * Product page hero: the H1, the hero paragraphs, the Download / Book a demo
 * buttons and the real Sayso widget in the state that fits the product.
 */
import { FeatureCTAButtons } from '@/components/pages/FeatureCTAButtons';
import { WidgetFigure } from '@/components/pages/WidgetFigure';
import { body, column, h1 } from '@/components/pages/contentStyles';
import type { ProductEntry } from '@/lib/content/products/types';
import { DEFAULT_VISUAL, PRODUCT_VISUALS } from '../data';

interface ProductHeroProps {
  entry: ProductEntry;
}

export function ProductHero({ entry }: ProductHeroProps) {
  const visual = PRODUCT_VISUALS[entry.slug] ?? DEFAULT_VISUAL;

  return (
    <section className="pb-8 pt-6">
      <div className={column}>
        <h1 className={`${h1} mb-5`}>{entry.h1}</h1>
        <div className="mb-7 space-y-4">
          {entry.heroDescription.map((paragraph, index) => (
            <p key={index} className={`${body} md:text-lg`}>
              {paragraph}
            </p>
          ))}
        </div>
        <FeatureCTAButtons />
      </div>
      <WidgetFigure
        preset={visual.preset}
        label={entry.screenshotAlt}
        caption={visual.caption}
        className="mx-auto mt-10 w-full max-w-[880px] px-4 sm:px-6"
      />
    </section>
  );
}
