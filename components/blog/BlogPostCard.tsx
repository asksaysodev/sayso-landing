import Link from 'next/link';

/** The fields a blog card needs. Plain data, so client components can render cards too. */
export interface BlogCardPost {
  slug: string;
  title: string;
  description: string;
  categoryName: string;
  publishedAt: string;
  readingTime: number;
}

interface BlogPostCardProps {
  post: BlogCardPost;
}

/** Text-only blog card: category, title, excerpt, date and read time. */
export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-[20px] bg-white p-6 shadow-card transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-card-hover">
        <span className="mb-3 inline-block self-start rounded-md bg-[#FFDE59] px-3 py-1 font-comic text-sm tracking-[0.06em] text-[#1D4871]">
          {post.categoryName}
        </span>

        <h3 className="mb-2 font-hero text-lg font-extrabold leading-snug tracking-[-0.01em] text-[#10233A] transition-colors group-hover:text-[#2367EE]">
          {post.title}
        </h3>

        <p className="mb-5 line-clamp-3 font-sans text-sm leading-relaxed text-[#1D4871]/70">{post.description}</p>

        <p className="mt-auto flex items-center gap-2 font-sans text-xs text-[#1D4871]/50">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'UTC',
            })}
          </time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime} min read</span>
        </p>
      </article>
    </Link>
  );
}
