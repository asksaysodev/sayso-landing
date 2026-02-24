import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { BlogPostMeta, formatCategoryName } from '@/lib/blog';

interface BlogFeaturedPostProps {
  post: BlogPostMeta;
}

export function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 mb-10">
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="bg-white rounded-2xl border-2 border-[#1D4871] v2-comic-shadow-sm overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_#1D4871]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Cover Image */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[320px] bg-[#D7DEE1] overflow-hidden">
              {post.coverImage && post.coverImage !== '/blog/covers/default.jpg' ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1D4871] to-[#2367EE]">
                  <LightningIcon size={80} className="text-white/30" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="mb-4">
                <span className="font-comic text-sm text-[#FFDE59] uppercase tracking-wider">
                  Featured
                </span>
              </div>

              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-[#FFDE59] text-[#1D4871] font-comic text-xs uppercase tracking-wide w-fit">
                {formatCategoryName(post.category)}
              </span>

              <h2 className="font-hero text-2xl md:text-3xl text-[#1D4871] mb-3 group-hover:text-[#2367EE] transition-colors">
                {post.title}
              </h2>

              <p className="text-base text-[#1D4871]/70 mb-6 line-clamp-3 font-sans">
                {post.description}
              </p>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#D7DEE1] overflow-hidden shrink-0">
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="text-sm font-sans">
                  <span className="font-bold text-[#1D4871]">{post.author.name}</span>
                  <span className="text-[#1D4871]/50 ml-2">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {' '}&middot; {post.readingTime} min read
                  </span>
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-2 text-[#2367EE] font-bold text-sm group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
