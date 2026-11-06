import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog';

interface BlogClusterNavProps {
  posts: BlogPostMeta[];
}

export function BlogClusterNav({ posts }: BlogClusterNavProps) {
  if (posts.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-16px_rgba(16,35,58,0.25)] mt-6">
      <h4 className="font-hero text-sm text-[#1D4871] mb-3 uppercase tracking-wide">
        In This Guide
      </h4>
      <hr className="border-[#D7DEE1] mb-3" />
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm text-[#1D4871]/70 hover:text-[#2367EE] font-sans transition-colors"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
