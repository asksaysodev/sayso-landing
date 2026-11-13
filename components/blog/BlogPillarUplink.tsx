import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog';

interface BlogPillarUplinkProps {
  pillar: BlogPostMeta;
}

export function BlogPillarUplink({ pillar }: BlogPillarUplinkProps) {
  return (
    <div className="bg-white px-5 py-3.5 mb-8 rounded-2xl shadow-card">
      <p className="text-center text-sm font-sans text-[#1D4871]/80 text-balance">
        This is part of our complete guide:{' '}
        <Link
          href={`/blog/${pillar.slug}`}
          className="text-[#2367EE] font-bold hover:underline"
        >
          {pillar.title}&nbsp;&rarr;
        </Link>
      </p>
    </div>
  );
}
