/**
 * Product page (/products/[slug]): breadcrumb with previous / next feature
 * links, hero with the live widget picture, how it
 * works, who it is for, differentiators, social proof, related reading, FAQ
 * and the closing call to action. Composition only; copy comes from
 * lib/content/products.
 */
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { FAQ } from '@/components/pages/FAQ';
import { column } from '@/components/pages/contentStyles';
import { generateSoftwareAppJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/schema';
import type { ProductEntry } from '@/lib/content/products/types';
import { ProductHero } from './components/ProductHero';
import { ProductPager } from './components/ProductPager';
import { HowItWorksSteps } from './components/HowItWorksSteps';
import { WhoItsFor } from './components/WhoItsFor';
import { DifferentiatorGrid } from './components/DifferentiatorGrid';
import { SocialProof } from './components/SocialProof';
import { RelatedReading } from './components/RelatedReading';

interface ProductPageProps {
  entry: ProductEntry;
}

export function ProductPage({ entry }: ProductPageProps) {
  const softwareJsonLd = generateSoftwareAppJsonLd({ featureList: entry.featureList });
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: entry.h1, url: `/products/${entry.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 pt-6">
        <Breadcrumb
          className=""
          items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: entry.h1 }]}
        />
        <ProductPager slug={entry.slug} />
      </div>

      <ProductHero entry={entry} />
      <HowItWorksSteps heading={entry.howItWorksHeading} steps={entry.howItWorks} />
      <div className={column}>
        <ContentInlineCTA location="feature-page" />
      </div>
      <WhoItsFor paragraphs={entry.whoItsFor} personaLinks={entry.personaLinks} />
      <DifferentiatorGrid heading={entry.differentiatorsHeading} items={entry.differentiators} />
      {entry.socialProof && <SocialProof text={entry.socialProof} />}
      <RelatedReading products={entry.relatedProducts} posts={entry.relatedBlogPosts} />
      {entry.faq.length > 0 && <FAQ items={entry.faq} />}
      <ContentCTA location="feature-page" />
    </>
  );
}
