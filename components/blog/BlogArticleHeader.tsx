import Image from 'next/image';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { BlogPost, formatCategoryName } from '@/lib/blog';

interface BlogArticleHeaderProps {
  post: BlogPost;
}

export function BlogArticleHeader({ post }: BlogArticleHeaderProps) {
  return (
    <header className="max-w-[800px] mx-auto px-6 pt-8 pb-6">
      {/* Category pill */}
      <span className="inline-block px-3 py-1 mb-4 rounded-full bg-[#FFDE59] text-[#1D4871] font-comic text-xs uppercase tracking-wide">
        {formatCategoryName(post.category)}
      </span>

      {/* Title */}
      <h1 className="font-hero text-3xl md:text-4xl lg:text-[42px] text-[#1D4871] mb-5 leading-tight">
        {post.title}
      </h1>

      {/* Author & meta */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#D7DEE1] overflow-hidden shrink-0">
          {post.author.avatar && (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="text-sm font-sans">
          <div className="font-bold text-[#1D4871]">{post.author.name}</div>
          <div className="text-[#1D4871]/50">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            {' '}&middot; {post.readingTime} min read
          </div>
        </div>
      </div>

      {/* Cover image */}
      <div className="relative aspect-video bg-[#D7DEE1] rounded-xl border-2 border-[#1D4871] overflow-hidden">
        {post.coverImage && post.coverImage !== '/blog/covers/default.jpg' ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1D4871] to-[#2367EE]">
            <LightningIcon size={80} className="text-white/30" />
          </div>
        )}
      </div>
    </header>
  );
}
