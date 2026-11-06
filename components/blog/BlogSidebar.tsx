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
        <div className="bg-white rounded-2xl p-5 shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-16px_rgba(16,35,58,0.25)]">
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
