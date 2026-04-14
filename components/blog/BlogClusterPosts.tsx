import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog';

interface BlogClusterPostsProps {
  currentSlug: string;
  pillar: BlogPostMeta | null;
  supportingPosts: BlogPostMeta[];
  postType: 'pillar' | 'supporting' | 'standalone';
}

export function BlogClusterPosts({
  currentSlug,
  pillar,
  supportingPosts,
  postType,
}: BlogClusterPostsProps) {
  const otherSupporting = supportingPosts.filter((p) => p.slug !== currentSlug);
  const showPillarLink = postType === 'supporting' && pillar && pillar.slug !== currentSlug;
  const hasContent = showPillarLink || otherSupporting.length > 0;

  if (!hasContent) return null;

  return (
    <section className="max-w-[800px] mx-auto px-6 py-8">
      <div className="bg-white rounded-xl border-2 border-[#1D4871] p-6">
        <h3 className="font-hero text-lg text-[#1D4871] mb-4">
          {postType === 'pillar' ? 'Posts in This Guide' : 'More in This Series'}
        </h3>
        <ul className="space-y-3">
          {showPillarLink && pillar && (
            <li>
              <Link
                href={`/blog/${pillar.slug}`}
                className="text-[#2367EE] font-bold hover:underline text-sm"
              >
                &larr; {pillar.title} (Complete Guide)
              </Link>
            </li>
          )}
          {otherSupporting.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-[#1D4871]/80 hover:text-[#2367EE] text-sm font-sans transition-colors"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
