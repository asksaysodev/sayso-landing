/**
 * Previous / next feature links beside the breadcrumb, following the order in
 * lib/content/products (Cue, Smart Capture, Pulse, Playbook). The first page
 * shows only next, the last only previous. On phones the row spans the full
 * width: previous on the left edge, next on the right edge.
 */
import Link from 'next/link';
import { getAllProductEntries } from '@/lib/content/products';

const pill =
  'inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 text-sm font-semibold text-[#1D4871] shadow-card-sm transition hover:-translate-y-px hover:shadow-card-sm-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2';

/** "Cue - Real-Time Guidance" becomes "Cue". */
const shortName = (h1: string) => h1.split(' - ')[0];

export function ProductPager({ slug }: { slug: string }) {
  const entries = getAllProductEntries();
  const index = entries.findIndex((e) => e.slug === slug);
  if (index === -1) return null;
  const prev = entries[index - 1];
  const next = entries[index + 1];

  return (
    <nav aria-label="Other features" className="flex w-full gap-2 sm:w-auto">
      {prev && (
        <Link href={`/products/${prev.slug}`} className={pill} aria-label={`Previous feature: ${shortName(prev.h1)}`}>
          <span aria-hidden="true">&larr;</span>
          {shortName(prev.h1)}
        </Link>
      )}
      {next && (
        <Link href={`/products/${next.slug}`} className={`${pill} ml-auto`} aria-label={`Next feature: ${shortName(next.h1)}`}>
          {shortName(next.h1)}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </nav>
  );
}
