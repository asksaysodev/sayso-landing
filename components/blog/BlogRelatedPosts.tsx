import Link from 'next/link';
import Image from 'next/image';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { BlogPostMeta, formatCategoryName } from '@/lib/blog';

interface BlogRelatedPostsProps {
  posts: BlogPostMeta[];
  variant?: 'grid' | 'compact';
}

export function BlogRelatedPosts({ posts, variant = 'grid' }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  if (variant === 'compact') {
    return (
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group flex items-start gap-3">
              <div className="w-16 h-12 rounded-lg bg-[#F4F4F5] overflow-hidden shrink-0">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#E3E8EC] flex items-center justify-center">
                    <LightningIcon size={16} className="text-[#1D4871]/20" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-bold text-[#1D4871] line-clamp-2 group-hover:text-[#2367EE] transition-colors">
                  {post.title}
                </h5>
                <span className="text-xs text-[#1D4871]/50 font-sans">{post.readingTime} min read</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-10">
      <h3 className="font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-2xl md:text-3xl mb-6">Related Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="h-full bg-white rounded-[20px] overflow-hidden shadow-card transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-card-hover">
              <div className="relative aspect-video bg-[#F4F4F5] overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#E3E8EC]">
                    <LightningIcon size={32} className="text-[#1D4871]/20" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="inline-block px-2 py-0.5 mb-2 rounded-md bg-[#FFDE59] text-[#1D4871] font-comic text-sm tracking-[0.06em]">
                  {formatCategoryName(post.category)}
                </span>
                <h4 className="font-hero font-extrabold text-base leading-snug text-[#10233A] line-clamp-2 group-hover:text-[#2367EE] transition-colors">
                  {post.title}
                </h4>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
