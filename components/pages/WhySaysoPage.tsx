/**
 * /why-sayso: the opening, the problem with how agents learn today, what makes
 * Sayso different (with the Sayso widget), who it is built for, team quotes,
 * FAQ and the closing call to action. Copy comes from lib/content/why-sayso.
 */
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { ContentInlineCTA } from '@/components/pages/ContentInlineCTA';
import { FAQ } from '@/components/pages/FAQ';
import { WidgetFigure } from '@/components/pages/WidgetFigure';
import { body, card, h1, h2, linkCard, quote } from '@/components/pages/contentStyles';
import { generateWebPageJsonLd } from '@/lib/seo/schema';
import type { WhySaysoContent } from '@/lib/content/why-sayso';

interface WhySaysoPageProps {
  content: WhySaysoContent;
}

export function WhySaysoPage({ content }: WhySaysoPageProps) {
  const webPageJsonLd = generateWebPageJsonLd(content.seoTitle, content.seoDescription, '/why-sayso');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Why Sayso' }]} />

      <article className="mx-auto max-w-[800px] px-6 pb-10">
        <h1 className={`${h1} mb-6 mt-6`}>{content.h1}</h1>
        <p className={`${body} mb-8 text-lg`}>{content.opening}</p>

        <h2 className={`${h2} mb-4 mt-10`}>The Problem with How Agents Learn Today</h2>
        {content.problemToday.split('\n\n').map((paragraph, i) => (
          <p key={i} className={`${body} mb-5`}>
            {paragraph}
          </p>
        ))}

        <h2 className={`${h2} mb-6 mt-10`}>What Makes Sayso Different</h2>
        <WidgetFigure
          preset="notes"
          label="The Sayso widget during a call, showing a live cue, captured LPMAMA letters and a note"
          caption="Sample call: a live cue, captured letters and the note under Motivation."
          className="mb-8"
        />
        <div className="mb-8 space-y-5">
          {content.differentiators.map((diff) => (
            <div key={diff.title} className={card}>
              <p className="mb-2 font-sans text-base font-bold text-[#10233A]">{diff.title}</p>
              <p className="font-sans text-sm leading-relaxed text-[#1D4871]/70">{diff.description}</p>
            </div>
          ))}
        </div>

        <ContentInlineCTA location="why-sayso-page" />

        <h2 className={`${h2} mb-6 mt-10`}>Who Sayso Is Built For</h2>
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {content.whoItsFor.map((persona) => (
            <Link key={persona.persona} href={persona.href} className={`group ${linkCard}`}>
              <p className="mb-1 font-sans text-base font-bold text-[#10233A] transition-colors group-hover:text-[#2367EE]">
                {persona.persona}
              </p>
              <p className="font-sans text-sm leading-relaxed text-[#1D4871]/70">{persona.description}</p>
            </Link>
          ))}
        </div>

        <h2 className={`${h2} mb-4 mt-10`}>What Teams Are Saying</h2>
        <div className="mb-8 space-y-4">
          {content.socialProof.map((text, i) => (
            <blockquote key={i} className={quote}>
              <p className="font-sans text-base italic leading-relaxed text-[#10233A]">&ldquo;{text}&rdquo;</p>
            </blockquote>
          ))}
        </div>
      </article>

      {content.faq.length > 0 && <FAQ items={content.faq} />}

      <ContentCTA
        location="why-sayso-page"
        headline="Get Started Today"
        subheading="See the difference real-time coaching makes on your calls."
      />
    </>
  );
}
