/** "Who This Is For" paragraphs plus links to the persona pages and pricing. */
import Link from 'next/link';
import { body, column, h2 } from '@/components/pages/contentStyles';
import type { ProductEntry } from '@/lib/content/products/types';

interface WhoItsForProps {
  paragraphs: string[];
  personaLinks?: ProductEntry['personaLinks'];
}

const linkClass = 'font-sans text-sm font-bold text-[#2367EE] hover:underline';

export function WhoItsFor({ paragraphs, personaLinks }: WhoItsForProps) {
  return (
    <section className={`${column} pb-10`}>
      <h2 className={`${h2} mb-4 mt-10`}>Who This Is For</h2>
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={body}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {personaLinks?.map((persona) => (
          <Link key={persona.href} href={persona.href} className={linkClass}>
            {persona.title} &rarr;
          </Link>
        ))}
        <Link href="/pricing" className={linkClass}>
          View Pricing &rarr;
        </Link>
      </div>
    </section>
  );
}
