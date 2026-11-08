/**
 * Product page hero: the H1, the hero paragraphs, the Download / Book a demo
 * buttons and the real Sayso widget in the state that fits the product.
 */
import { FeatureCTAButtons } from '@/components/pages/FeatureCTAButtons';
import { WidgetFigure } from '@/components/pages/WidgetFigure';
import { PageHeader } from '@/components/pages/PageHeader';
import type { ProductEntry } from '@/lib/content/products/types';
import { DEFAULT_VISUAL, PRODUCT_VISUALS } from '../data';

interface ProductHeroProps {
  entry: ProductEntry;
}

export function ProductHero({ entry }: ProductHeroProps) {
  const visual = PRODUCT_VISUALS[entry.slug] ?? DEFAULT_VISUAL;

  return (
    <section className="pb-8">
      <PageHeader
        title={entry.h1}
        intro={
          <div className="space-y-4">
            {entry.heroDescription.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        }
      >
        <FeatureCTAButtons className="justify-center" />
      </PageHeader>
      <WidgetFigure
        preset={visual.preset}
        label={entry.screenshotAlt}
        caption={visual.caption}
        className="mx-auto mt-2 w-full max-w-[880px] px-4 sm:px-6"
      />
    </section>
  );
}
