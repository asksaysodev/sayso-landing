import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Info, Lightbulb, TriangleAlert } from 'lucide-react';
import { Tab, Tabs } from '@/components/help/HelpTabs';
import { Clip } from '@/components/help/HelpClip';

/**
 * MDX renderer for help articles. Components available in .mdx:
 * <Callout type="note|tip|warning">, <Tabs><Tab label="Mac">, <Screenshot>,
 * <Kbd>, <Ui> (an on-screen label), <Faq q="…">.
 */

function Callout({ type = 'note', title, children }: { type?: 'note' | 'tip' | 'warning'; title?: string; children: React.ReactNode }) {
  const styles = {
    note: { box: 'border-[#2367EE]/20 bg-[#2367EE]/5', icon: <Info className="h-5 w-5 text-[#2367EE]" aria-hidden />, label: 'Note' },
    tip: { box: 'border-[#FFDE59] bg-[#FFDE59]/15', icon: <Lightbulb className="h-5 w-5 text-[#1D4871]" aria-hidden />, label: 'Tip' },
    warning: { box: 'border-red-200 bg-red-50', icon: <TriangleAlert className="h-5 w-5 text-red-600" aria-hidden />, label: 'Important' },
  }[type];
  return (
    <div className={`my-6 flex gap-3 rounded-2xl border px-5 py-4 ${styles.box}`}>
      <div className="mt-0.5 shrink-0">{styles.icon}</div>
      <div className="min-w-0 text-[15px] leading-relaxed text-[#1D4871]/85 [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:mb-2 [&>ol]:mb-2">
        {title && <p className="mb-1 font-bold text-[#10233A]">{title}</p>}
        {children}
      </div>
    </div>
  );
}

function Screenshot({ src, alt, caption, width }: { src: string; alt: string; caption?: string; width?: number }) {
  // A screenshot that has not been captured yet shows as a labeled gap in
  // previews instead of a broken image. Capture it or remove the tag before release.
  if (src.startsWith('/') && !fs.existsSync(path.join(process.cwd(), 'public', src))) {
    return (
      <div className="my-6 rounded-xl border-2 border-dashed border-[#D7DEE1] bg-white/60 px-5 py-6 text-center text-sm text-[#1D4871]/60">
        <span className="font-semibold text-[#1D4871]">Screenshot pending:</span> {alt}
      </div>
    );
  }
  return (
    <figure className="my-6">
      {/* Plain img: screenshots vary in size and are already optimized PNG/WebP files. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={width ? { maxWidth: width } : undefined}
        className="mx-auto w-full rounded-xl border border-[#D7DEE1] bg-white shadow-card"
      />
      {caption && <figcaption className="mt-2 text-center text-sm text-[#1D4871]/60">{caption}</figcaption>}
    </figure>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block min-w-[1.6em] rounded-md border border-[#D7DEE1] border-b-2 bg-white px-1.5 py-0.5 text-center font-sans text-[13px] font-semibold text-[#10233A]">
      {children}
    </kbd>
  );
}

/** A label exactly as it appears on screen (button, menu item, setting). */
function Ui({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-[#10233A]">{children}</strong>;
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group my-3 rounded-2xl bg-white px-5 py-4 shadow-card-sm">
      <summary className="cursor-pointer list-none font-bold text-[#10233A] marker:hidden">
        <span className="flex items-start justify-between gap-4">
          {q}
          <span aria-hidden className="mt-0.5 text-[#2367EE] transition-transform group-open:rotate-45">+</span>
        </span>
      </summary>
      <div className="mt-3 text-[15px] leading-relaxed text-[#1D4871]/85 [&>p:last-child]:mb-0">{children}</div>
    </details>
  );
}

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="scroll-mt-28 font-hero text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-[#10233A] mt-10 mb-3 md:text-2xl" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="scroll-mt-28 font-hero text-lg font-bold leading-snug text-[#10233A] mt-7 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mb-4 text-base leading-relaxed text-[#1D4871]/85" {...props} />,
  a: ({ href = '', children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const className = 'font-semibold text-[#2367EE] hover:underline';
    if (href.startsWith('/') || href.startsWith('#')) return <Link href={href} className={className}>{children}</Link>;
    if (/^https?:\/\//.test(href)) {
      return <a {...props} href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
    }
    return <a {...props} href={href} className={className}>{children}</a>;
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="mb-4 list-disc space-y-1.5 pl-6 text-[#1D4871]/85" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-[#1D4871]/85 marker:font-bold marker:text-[#2367EE]" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="pl-1 text-base leading-relaxed [&>p]:mb-2" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-bold text-[#10233A]" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-[#D7DEE1]/70 px-1.5 py-0.5 font-mono text-[13px] text-[#10233A] break-words" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-4 overflow-x-auto rounded-xl bg-[#10233A] p-4 text-sm text-white [&>code]:bg-transparent [&>code]:text-white" {...props} />
  ),
  hr: () => <hr className="my-8 border-[#D7DEE1]" />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-6 overflow-x-auto rounded-2xl bg-white shadow-card">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border-b border-[#D7DEE1] bg-[#F4F4F5] px-4 py-3 text-left font-bold text-[#10233A]" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b border-[#D7DEE1]/70 px-4 py-3 align-top text-[#1D4871]/85" {...props} />
  ),
  Callout,
  Screenshot,
  Kbd,
  Ui,
  Faq,
  Tabs,
  Tab,
  Clip,
};

export function HelpArticleContent({ content }: { content: string }) {
  return (
    <MDXRemote
      source={content}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
    />
  );
}
