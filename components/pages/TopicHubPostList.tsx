import Link from 'next/link';
import { getAllPostsMeta } from '@/lib/blog';
import { postsForHub, type TopicHubId } from '@/lib/content/topic-hubs';

/**
 * Every live post in a topic hub: the title as a link and the post's own
 * summary as a short intro. Pillar guides come first, then newest first.
 * Scheduled posts are left out until their publish date (getAllPostsMeta).
 */
export function TopicHubPostList({ hub, heading }: { hub: TopicHubId; heading: string }) {
  const posts = postsForHub(getAllPostsMeta(), hub).sort((a, b) => {
    if (a.type === 'pillar' && b.type !== 'pillar') return -1;
    if (b.type === 'pillar' && a.type !== 'pillar') return 1;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
  if (posts.length === 0) return null;
  return (
    <section className="max-w-[800px] mx-auto px-6 pb-10">
      <h2 className="font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[28px] md:text-4xl leading-[1.1] mb-6">
        {heading}
      </h2>
      <ul className="space-y-5">
        {posts.map((post) => (
          <li key={post.slug} className="bg-white rounded-2xl p-5 shadow-card">
            <h3 className="font-hero font-bold text-lg text-[#10233A] leading-snug">
              <Link href={`/blog/${post.slug}/`} className="hover:text-[#2367EE] hover:underline">
                {post.title}
              </Link>
            </h3>
            <p className="mt-1.5 text-[#1D4871]/70 text-base leading-relaxed font-sans">{post.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
