import { BlogPostMeta } from '@/lib/blog';
import { BlogRelatedPosts } from './BlogRelatedPosts';

interface BlogSidebarProps {
  relatedPosts: BlogPostMeta[];
}

export function BlogSidebar({ relatedPosts }: BlogSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white rounded-xl border-2 border-[#1D4871] p-5">
          <h4 className="font-hero text-sm text-[#1D4871] mb-3 uppercase tracking-wide">
            Related Posts
          </h4>
          <hr className="border-[#D7DEE1] mb-3" />
          <BlogRelatedPosts posts={relatedPosts} variant="compact" />
        </div>
      )}
    </aside>
  );
}
