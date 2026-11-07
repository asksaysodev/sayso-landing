/**
 * Solution page (/for/[slug]): the persona's story (empathy, problem, what
 * they try, a better approach with the Sayso widget), how Sayso works for
 * them, get started, related links, FAQ and the closing call to action.
 * Composition only; copy comes from lib/content/for.
 */
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { FAQ } from '@/components/pages/FAQ';
import { FeatureCTAButtons } from '@/components/pages/FeatureCTAButtons';
import { WidgetFigure } from '@/components/pages/WidgetFigure';
import { body, h1, h2, textLink } from '@/components/pages/contentStyles';
import { generateWebPageJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/schema';
import { renderInlineMarkdown } from '@/lib/utils/render-inline-markdown';
import type { UseCaseEntry } from '@/lib/content/for/types';
import { ProseSection } from './components/ProseSection';
import { HowSaysoWorksGrid } from './components/HowSaysoWorksGrid';
import { LinkList } from './components/LinkList';

interface PersonaPageProps {
  entry: UseCaseEntry;
}

export function PersonaPage({ entry }: PersonaPageProps) {
  const webPageJsonLd = generateWebPageJsonLd(entry.seoTitle, entry.seoDescription, `/for/${entry.slug}`);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Solutions', url: '/for' },
    { name: entry.persona, url: `/for/${entry.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/for' }, { label: entry.persona }]} />

      <article className="mx-auto max-w-[800px] px-6 pb-10">
        <h1 className={`${h1} mb-6 mt-6`}>{entry.h1}</h1>

        {/* Opening empathy: no product mention yet */}
        <div className="mb-8 space-y-4">
          {entry.openingEmpathy.map((paragraph, i) => (
            <p key={i} className={body}>
              {renderInlineMarkdown(paragraph)}
            </p>
          ))}
        </div>

        <ProseSection heading={entry.theProblemHeading ?? 'The Real Problem'} paragraphs={entry.theProblem} />
        <ProseSection
          heading={entry.whatTheyTryHeading ?? `What Most ${entry.persona} Try (And Why It Falls Short)`}
          paragraphs={entry.whatTheyTry}
        />

        {/* Sayso is introduced here, so the widget appears here */}
        <ProseSection heading={entry.betterApproachHeading ?? 'A Better Approach: Real-Time Guidance'} paragraphs={entry.betterApproach}>
          <WidgetFigure
            preset="cues"
            label="The Sayso widget during a call, showing live cues and the LPMAMA letters"
            caption="Sample call: cues update as the prospect talks."
            className="mt-8"
          />
        </ProseSection>

        <ContentInlineCTA location="persona-page" />

        <HowSaysoWorksGrid persona={entry.persona} items={entry.howSaysoWorks} />

        {entry.getStarted && (
          <>
            <h2 className={`${h2} mb-4 mt-10`}>Get Started</h2>
            <p className={`${body} mb-5`}>{entry.getStarted}</p>
            <FeatureCTAButtons
              className="mb-6"
              downloadAnalyticsId="cta-download-persona-page-get-started"
              demoAnalyticsId="cta-book-demo-persona-page-get-started"
            />
          </>
        )}

        <LinkList
          heading="Related Features"
          links={entry.relatedProducts}
          bold
          footer={
            <Link href="/for" className={textLink}>
              See all solutions &rarr;
            </Link>
          }
        />
        {entry.relatedObjections && entry.relatedObjections.length > 0 && (
          <LinkList heading="Objection Scripts" links={entry.relatedObjections} />
        )}
        {entry.relatedBlogPosts.length > 0 && <LinkList heading="From the Blog" links={entry.relatedBlogPosts} />}
      </article>

      {entry.faq.length > 0 && <FAQ items={entry.faq} />}

      <ContentCTA
        location="persona-page"
        headline="Get Started Today"
        subheading={`See how Sayso helps ${entry.persona.toLowerCase()} sound better on every call.`}
      />
    </>
  );
}
