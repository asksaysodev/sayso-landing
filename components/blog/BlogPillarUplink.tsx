import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog';

interface BlogPillarUplinkProps {
  pillar: BlogPostMeta;
}

export function BlogPillarUplink({ pillar }: BlogPillarUplinkProps) {
  return (
    <div className="bg-white px-5 py-3.5 mb-8 rounded-2xl shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-16px_rgba(16,35,58,0.25)]">
      <p className="text-sm font-sans text-[#1D4871]/80">
        This post is part of our complete guide:{' '}
        <Link
          href={`/blog/${pillar.slug}`}
          className="text-[#2367EE] font-bold hover:underline"
        >
          {pillar.title} &rarr;
        </Link>
      </p>
    </div>
  );
}
