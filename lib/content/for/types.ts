export interface UseCaseEntry {
  slug: string;
  persona: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  openingEmpathy: string;
  theProblem: string;
  whatTheyTry: string;
  betterApproach: string;
  howSaysoWorks: { feature: string; description: string }[];
  faq: { question: string; answer: string }[];
  relatedFeatures: { title: string; href: string }[];
  relatedBlogPosts: { title: string; href: string }[];
  ogImage?: string;
}
