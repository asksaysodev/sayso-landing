import Image from 'next/image';
import { BlogPost, formatCategoryName } from '@/lib/blog';
import { BlogHeroBackground } from './BlogHeroBackground';

interface BlogArticleHeaderProps {
  post: BlogPost;
}

export function BlogArticleHeader({ post }: BlogArticleHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-[#F4F4F5]">
      {/* Background hero image (faded) */}
      <BlogHeroBackground src={post.heroImage} />

      {/* Content on top */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 pt-10 pb-10 md:pt-14 md:pb-14">
        {/* Category pill */}
        <span className="inline-block px-3 py-1 mb-4 rounded-md bg-[#FFDE59] text-[#1D4871] font-comic text-[15px] tracking-[0.06em]">
          {formatCategoryName(post.category)}
        </span>

        {/* Title */}
        <h1 className="font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-3xl md:text-4xl lg:text-[44px] mb-5 leading-[1.1]">
          {post.title}
        </h1>

        {/* Author & meta */}
        <div className="flex items-center gap-3">
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
      </div>
    </header>
  );
}
