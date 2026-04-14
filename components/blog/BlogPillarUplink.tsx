import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog';

interface BlogPillarUplinkProps {
  pillar: BlogPostMeta;
}

export function BlogPillarUplink({ pillar }: BlogPillarUplinkProps) {
  return (
    <div className="bg-[#1D4871]/5 border-l-4 border-[#2367EE] px-5 py-3 mb-8 rounded-r-lg">
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
