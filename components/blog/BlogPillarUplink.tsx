import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog';
import type { TopicHub } from '@/lib/content/topic-hubs';

interface BlogPillarUplinkProps {
  /** The cluster's pillar post, when this post has one. */
  pillar?: BlogPostMeta | null;
  /** The topic hub this post belongs to. */
  hub?: TopicHub | null;
}

export function BlogPillarUplink({ pillar, hub }: BlogPillarUplinkProps) {
  if (!pillar && !hub) return null;
  return (
    <div className="bg-white px-5 py-3.5 mb-8 rounded-2xl shadow-card">
      {pillar && (
        <p className="text-center text-sm font-sans text-[#1D4871]/80 text-balance">
          This is part of our complete guide:{' '}
          <Link
            href={`/blog/${pillar.slug}`}
            className="text-[#2367EE] font-bold hover:underline"
          >
            {pillar.title}&nbsp;&rarr;
          </Link>
        </p>
      )}
      {hub && (
        <p className={`text-center text-sm font-sans text-[#1D4871]/80 text-balance${pillar ? ' mt-1.5' : ''}`}>
          More on this topic:{' '}
          <Link href={hub.href} className="text-[#2367EE] font-bold hover:underline">
            {hub.label}&nbsp;&rarr;
          </Link>
        </p>
      )}
    </div>
  );
}
