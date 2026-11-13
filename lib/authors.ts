/**
 * Blog authors. Posts name their author by key in frontmatter (`author: "kuvaal-patel"`),
 * so the byline, the Article schema and the author page all read from here.
 */

export interface Author {
  key: string;
  name: string;
  /** Short line under the name in bylines. */
  role: string;
  avatar: string;
  /** Site path of the author page. */
  path: string;
  linkedin?: string;
  /** Profile URLs for the Person schema `sameAs`. */
  sameAs: string[];
}

export const AUTHORS: Record<string, Author> = {
  'kuvaal-patel': {
    key: 'kuvaal-patel',
    name: 'Kuvaal Patel',
    role: 'Founder of Sayso',
    avatar: '/images/founder-kuvaal-patel.png',
    path: '/author/kuvaal-patel/',
    linkedin: 'https://www.linkedin.com/in/kuvaal/',
    sameAs: ['https://www.linkedin.com/in/kuvaal/', 'https://andersonreg.com/kuvaal-patel/'],
  },
};

export function getAuthor(key: string): Author | undefined {
  return AUTHORS[key];
}
