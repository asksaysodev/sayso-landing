import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';

import remarkGfm from 'remark-gfm';

interface BlogArticleContentProps {
  content: string;
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-hero text-xl md:text-[22px] text-[#1D4871] mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[#1D4871]/80 text-base leading-relaxed mb-5 font-sans" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[#2367EE] hover:underline font-bold" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-5 space-y-2 text-[#1D4871]/80 font-sans" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2 text-[#1D4871]/80 font-sans" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-base leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-[#FFDE59] bg-[#FFDE59]/10 px-6 py-4 my-6 rounded-r-lg italic text-[#1D4871]/80 font-sans" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-[#1D4871]" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-[#D7DEE1] rounded px-1.5 py-0.5 text-sm font-mono text-[#1D4871]" {...props} />
  ),
  hr: () => <hr className="border-[#D7DEE1] my-8" />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse border-2 border-[#1D4871] rounded-lg text-sm font-sans" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="bg-[#1D4871] text-white px-4 py-3 text-left font-bold" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-[#D7DEE1] px-4 py-3 text-[#1D4871]/80" {...props} />
  ),

  // Custom content components
  CalloutBox: ({ type = 'tip', children }: { type?: 'tip' | 'warning' | 'key-takeaway'; children: React.ReactNode }) => (
    <div
      className={`rounded-xl border-2 px-6 py-4 my-6 ${
        type === 'warning'
          ? 'border-red-300 bg-red-50'
          : type === 'key-takeaway'
            ? 'border-[#2367EE]/30 bg-[#2367EE]/5'
            : 'border-[#FFDE59] bg-[#FFDE59]/10'
      }`}
    >
      <div className="text-sm font-sans text-[#1D4871]/80">{children}</div>
    </div>
  ),

  ScriptExample: ({ label, children }: { label?: string; children: React.ReactNode }) => (
    <div className="bg-white border-2 border-[#1D4871] rounded-xl p-6 my-6">
      {label && (
        <span className="text-xs uppercase tracking-wide text-[#1D4871]/50 font-bold block mb-2">
          {label}
        </span>
      )}
      <div className="text-[#1D4871] italic font-sans leading-relaxed">{children}</div>
    </div>
  ),
};

export function BlogArticleContent({ content }: BlogArticleContentProps) {
  return (
    <div className="prose-sayso">
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
            ],
          },
        }}
      />
    </div>
  );
}
