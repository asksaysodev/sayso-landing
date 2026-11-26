'use client';

/**
 * Help Center search. A search field (hub hero or the help header) opens a
 * dialog; ⌘K / Ctrl+K opens it anywhere in /help/. The index is fetched from
 * /help/search.json the first time the dialog opens and ranked in the browser:
 * title > headings and keywords > description > body. A heading match links
 * straight to that section.
 */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { HelpSearchEntry } from '@/lib/help';

interface Result {
  entry: HelpSearchEntry;
  score: number;
  href: string;
  heading?: string;
}

let indexPromise: Promise<HelpSearchEntry[]> | null = null;
function loadIndex() {
  // A failed load is not cached, so the next open of the search tries again.
  indexPromise ??= fetch('/help/search.json')
    .then((r) => {
      if (!r.ok) throw new Error(`help search index: ${r.status}`);
      return r.json() as Promise<HelpSearchEntry[]>;
    })
    .catch((e) => {
      indexPromise = null;
      throw e;
    });
  return indexPromise;
}

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s]/g, ' ');

function rank(index: HelpSearchEntry[], query: string): Result[] {
  const terms = norm(query).split(/\s+/).filter((t) => t.length > 1 || /\d/.test(t));
  if (terms.length === 0) return [];
  const results: Result[] = [];
  for (const entry of index) {
    const title = norm(entry.title);
    const desc = norm(entry.description);
    const kw = norm(entry.keywords.join(' '));
    const body = norm(entry.text);
    let score = 0;
    let matchedAll = true;
    let bestHeading: { text: string; id: string } | undefined;
    let bestHeadingHits = 0;
    for (const t of terms) {
      let s = 0;
      if (title.includes(t)) s += 10;
      if (kw.includes(t)) s += 6;
      if (desc.includes(t)) s += 4;
      if (body.includes(t)) s += 1;
      for (const h of entry.headings) if (norm(h.text).includes(t)) s += 3;
      if (s === 0) matchedAll = false;
      score += s;
    }
    if (!matchedAll || score === 0) continue;
    if (norm(entry.title).includes(norm(query).trim())) score += 15;
    for (const h of entry.headings) {
      const hits = terms.filter((t) => norm(h.text).includes(t)).length;
      if (hits > bestHeadingHits) {
        bestHeadingHits = hits;
        bestHeading = h;
      }
    }
    const headingWins = bestHeading && !terms.every((t) => title.includes(t));
    results.push({
      entry,
      score,
      href: headingWins ? `${entry.url}#${bestHeading!.id}` : entry.url,
      heading: headingWins ? bestHeading!.text : undefined,
    });
  }
  return results.sort((a, b) => b.score - a.score).slice(0, 12);
}

export function HelpSearch({ variant = 'header' }: { variant?: 'hero' | 'header' }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<HelpSearchEntry[] | null>(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const show = useCallback(() => {
    setOpen(true);
    loadIndex().then(setIndex).catch(() => setIndex([]));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [show]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const results = useMemo(() => (index ? rank(index, query) : []), [index, query]);
  useEffect(() => setActive(0), [query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      router.push(results[active].href);
      close();
    }
  };

  return (
    <>
      {variant === 'hero' ? (
        <button
          type="button"
          onClick={show}
          className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-full bg-white px-5 py-4 text-left text-base text-[#1D4871]/60 shadow-card transition hover:shadow-card-hover"
        >
          <Search className="h-5 w-5 text-[#2367EE]" aria-hidden />
          <span className="flex-1">Search the Help Center</span>
          <span className="hidden rounded-md border border-[#D7DEE1] px-2 py-0.5 text-xs font-semibold text-[#1D4871]/60 sm:inline">⌘K</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={show}
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#1D4871]/60 shadow-card-sm transition hover:shadow-card-sm-hover"
        >
          <Search className="h-4 w-4 text-[#2367EE]" aria-hidden />
          <span>Search</span>
          <span className="hidden rounded border border-[#D7DEE1] px-1.5 text-[11px] font-semibold sm:inline">⌘K</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[9500] flex items-start justify-center bg-[#10233A]/40 px-4 pt-[10vh]" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search the Help Center"
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-popover"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[#D7DEE1] px-5 py-4">
              <Search className="h-5 w-5 text-[#2367EE]" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search, for example “meeting detection” or “add an agent”"
                aria-label="Search"
                className="flex-1 bg-transparent text-base text-[#10233A] outline-none placeholder:text-[#1D4871]/40"
              />
              <button type="button" onClick={close} aria-label="Close search" className="text-[#1D4871]/50 hover:text-[#10233A]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {!index && <p className="px-4 py-6 text-sm text-[#1D4871]/60">Loading…</p>}
              {index && query.trim() && results.length === 0 && (
                <p className="px-4 py-6 text-sm text-[#1D4871]/70">
                  No articles match “{query}”. Try fewer words, or email{' '}
                  <a href="mailto:support@asksayso.com" className="font-semibold text-[#2367EE]">support@asksayso.com</a>.
                </p>
              )}
              {index && !query.trim() && <p className="px-4 py-6 text-sm text-[#1D4871]/60">Type to search every Help Center article.</p>}
              <ul>
                {results.map((r, i) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      onClick={close}
                      onMouseEnter={() => setActive(i)}
                      className={`block rounded-xl px-4 py-3 ${i === active ? 'bg-[#2367EE]/5' : ''}`}
                    >
                      <span className="block text-xs font-semibold uppercase tracking-wide text-[#1D4871]/50">{r.entry.section}</span>
                      <span className="block font-semibold text-[#10233A]">{r.entry.title}</span>
                      {r.heading ? (
                        <span className="block text-sm text-[#2367EE]"># {r.heading}</span>
                      ) : (
                        <span className="line-clamp-1 block text-sm text-[#1D4871]/70">{r.entry.description}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
