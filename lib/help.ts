import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { cache } from 'react';
import { HELP_SECTIONS, getHelpSection } from '@/lib/help-sections';

const HELP_DIR = path.join(process.cwd(), 'content', 'help');

export interface HelpHeading {
  depth: 2 | 3;
  text: string;
  /** Matches the id rehype-slug gives the rendered heading. */
  id: string;
}

export interface HelpArticleMeta {
  section: string;
  slug: string;
  title: string;
  /** Short search-result title; the H1 stays `title`. */
  seoTitle?: string;
  description: string;
  group: string;
  order: number;
  /** YYYY-MM-DD, shown as "Updated" and used in the sitemap. */
  updated: string;
  /** Extra words people might search for (not shown). */
  keywords: string[];
  headings: HelpHeading[];
  url: string;
}

export interface HelpArticle extends HelpArticleMeta {
  content: string;
}

/** Strips inline markdown and JSX so headings and search text read cleanly. */
function plain(text: string): string {
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractHeadings(content: string): HelpHeading[] {
  const slugger = new GithubSlugger();
  const headings: HelpHeading[] = [];
  let inFence = false;
  for (const line of content.split('\n')) {
    if (line.trim().startsWith('```')) inFence = !inFence;
    if (inFence) continue;
    const m = line.match(/^(##|###)\s+(.+?)\s*$/);
    if (!m) continue;
    const text = plain(m[2]);
    headings.push({ depth: m[1].length as 2 | 3, text, id: slugger.slug(text) });
  }
  return headings;
}

function parseArticle(section: string, file: string): HelpArticle {
  const filePath = path.join(HELP_DIR, section, file);
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'));
  const slug = path.basename(file, '.mdx');
  const sec = getHelpSection(section);
  if (!sec) throw new Error(`Help: unknown section folder "${section}". Add it to lib/help-sections.ts.`);
  if (!data.title || !data.description) throw new Error(`Help: ${filePath} needs a title and a description.`);
  if (!sec.groups.some((g) => g.id === data.group)) {
    throw new Error(`Help: ${filePath} has group "${data.group}", which is not a group of "${section}" in lib/help-sections.ts.`);
  }
  // YAML reads an unquoted date as a Date object.
  const updated = data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : String(data.updated ?? '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(updated)) {
    throw new Error(`Help: ${filePath} needs updated: YYYY-MM-DD.`);
  }
  return {
    section,
    slug,
    title: data.title,
    seoTitle: data.seoTitle,
    description: data.description,
    group: data.group,
    order: typeof data.order === 'number' ? data.order : 100,
    updated,
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    headings: extractHeadings(content),
    url: `/help/${section}/${slug}/`,
    content,
  };
}

const loadAll = cache((): HelpArticle[] => {
  const articles: HelpArticle[] = [];
  for (const sec of HELP_SECTIONS) {
    const dir = path.join(HELP_DIR, sec.id);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.mdx')) articles.push(parseArticle(sec.id, file));
    }
  }
  return articles;
});

function sortInSection(a: HelpArticleMeta, b: HelpArticleMeta): number {
  const sec = getHelpSection(a.section)!;
  const ga = sec.groups.findIndex((g) => g.id === a.group);
  const gb = sec.groups.findIndex((g) => g.id === b.group);
  return ga - gb || a.order - b.order || a.title.localeCompare(b.title);
}

function toMeta({ content: _content, ...meta }: HelpArticle): HelpArticleMeta {
  return meta;
}

export function getAllHelpArticles(): HelpArticleMeta[] {
  return loadAll().map(toMeta);
}

export function getSectionArticles(section: string): HelpArticleMeta[] {
  return getAllHelpArticles().filter((a) => a.section === section).sort(sortInSection);
}

export function getHelpArticle(section: string, slug: string): HelpArticle | undefined {
  return loadAll().find((a) => a.section === section && a.slug === slug);
}

/** Previous and next article in reading order within the section. */
export function getAdjacentArticles(section: string, slug: string) {
  const list = getSectionArticles(section);
  const i = list.findIndex((a) => a.slug === slug);
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined };
}

/** Sidebar tree: sections > groups > articles (titles and urls only). */
export function getHelpNav() {
  return HELP_SECTIONS.map((sec) => {
    const articles = getSectionArticles(sec.id);
    return {
      id: sec.id,
      title: sec.title,
      groups: sec.groups
        .map((g) => ({
          id: g.id,
          title: g.title,
          articles: articles.filter((a) => a.group === g.id).map((a) => ({ title: a.title, url: a.url })),
        }))
        .filter((g) => g.articles.length > 0),
    };
  });
}
export type HelpNav = ReturnType<typeof getHelpNav>;

export interface HelpSearchEntry {
  title: string;
  description: string;
  url: string;
  section: string;
  headings: { text: string; id: string }[];
  keywords: string[];
  text: string;
}

/** Compact index for the client-side search dialog. */
export function getHelpSearchIndex(): HelpSearchEntry[] {
  return loadAll().map((a) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    section: getHelpSection(a.section)!.title,
    headings: a.headings.map(({ text, id }) => ({ text, id })),
    keywords: a.keywords,
    text: plain(a.content.replace(/^import .*$/gm, '')).slice(0, 1500),
  }));
}
