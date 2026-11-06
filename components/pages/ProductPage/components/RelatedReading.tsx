/** Related products and related blog posts at the foot of a product page. */
import Link from 'next/link';
import { column, h2, h2Small, textLink } from '@/components/pages/contentStyles';
import type { ProductEntry } from '@/lib/content/products/types';

interface RelatedReadingProps {
  products: ProductEntry['relatedProducts'];
  posts: ProductEntry['relatedBlogPosts'];
}

export function RelatedReading({ products, posts }: RelatedReadingProps) {
  return (
    <>
      <section className={`${column} pb-6`}>
        <h2 className={`${h2} mb-4 mt-6`}>Related Products</h2>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.slug}>
              <Link href={`/products/${product.slug}`} className={`${textLink} font-bold`}>
                {product.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/products" className={textLink}>
              See all products &rarr;
            </Link>
          </li>
        </ul>
      </section>

      {posts.length > 0 && (
        <section className={`${column} pb-10`}>
          <h2 className={`${h2Small} mb-3`}>From the Blog</h2>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.href}>
                <Link href={post.href} className={textLink}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
