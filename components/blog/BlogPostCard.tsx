import Link from 'next/link';
import Image from 'next/image';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { BlogPostMeta, formatCategoryName } from '@/lib/blog';

interface BlogPostCardProps {
  post: BlogPostMeta;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl border-2 border-[#1D4871] v2-comic-shadow-sm overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_#1D4871]">
        {/* Cover Image */}
        <div className="relative aspect-video bg-[#D7DEE1] overflow-hidden">
          {post.coverImage && post.coverImage !== '/blog/covers/default.jpg' ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1D4871] to-[#2367EE]">
              <LightningIcon size={48} className="text-white/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category pill */}
          <span className="inline-block px-3 py-1 mb-3 rounded-full bg-[#FFDE59] text-[#1D4871] font-comic text-xs uppercase tracking-wide">
            {formatCategoryName(post.category)}
          </span>

          {/* Title */}
          <h3 className="font-hero text-lg text-[#1D4871] mb-2 line-clamp-2 group-hover:text-[#2367EE] transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#1D4871]/70 line-clamp-2 mb-4 font-sans">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-[#1D4871]/50 font-sans">
            <div className="w-6 h-6 rounded-full bg-[#D7DEE1] overflow-hidden shrink-0">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="font-bold text-[#1D4871]/70">{post.author.name}</span>
            <span>&middot;</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>&middot;</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
