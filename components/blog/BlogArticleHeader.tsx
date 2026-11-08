import Image from 'next/image';
import { BlogPost, formatCategoryName } from '@/lib/blog';
import { PageHeader } from '@/components/pages/PageHeader';

interface BlogArticleHeaderProps {
  post: BlogPost;
}

/** Blog post header on the shared PageHeader: category, centered title, author and meta. */
export function BlogArticleHeader({ post }: BlogArticleHeaderProps) {
  return (
    <PageHeader
      eyebrow={
        <span className="inline-block rounded-md bg-[#FFDE59] px-3 py-1 font-comic text-[15px] tracking-[0.06em] text-[#1D4871]">
          {formatCategoryName(post.category)}
        </span>
      }
      title={post.title}
    >
      <div className="flex items-center justify-center gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#D7DEE1]">
          {post.author.avatar && (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="text-left font-sans text-sm">
          <div className="font-bold text-[#1D4871]">{post.author.name}</div>
          <div className="text-[#1D4871]/50">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'UTC',
            })}{' '}
            &middot; {post.readingTime} min read
          </div>
        </div>
      </div>
    </PageHeader>
  );
}
