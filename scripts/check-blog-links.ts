/**
 * Blog internal link checker.
 * Scans all MDX files in content/blog/ for internal links and verifies
 * they point to known routes. Run with: npm run check-links
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');

// ── Collect known routes ────────────────────────────────────────────

function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

function getContentSlugs(dir: string): string[] {
  const indexPath = path.join(ROOT, 'lib', 'content', dir, 'index.ts');
  if (!fs.existsSync(indexPath)) return [];
  // Parse slugs from the index file by finding import paths
  const content = fs.readFileSync(indexPath, 'utf-8');
  const slugs: string[] = [];
  const importMatches = content.matchAll(/from\s+['"]\.\/([\w-]+)['"]/g);
  for (const match of importMatches) {
    if (match[1] !== 'types') slugs.push(match[1]);
  }
  return slugs;
}

function getStaticPages(): string[] {
  const appDir = path.join(ROOT, 'app');
  const pages: string[] = ['/demo', '/pricing', '/contact', '/blog', '/about'];
  // Scan top-level app directories for page.tsx
  if (fs.existsSync(appDir)) {
    for (const entry of fs.readdirSync(appDir, { withFileTypes: true })) {
      if (entry.isDirectory() && !entry.name.startsWith('(') && !entry.name.startsWith('[')) {
        const pagePath = path.join(appDir, entry.name, 'page.tsx');
        if (fs.existsSync(pagePath)) {
          pages.push(`/${entry.name}`);
        }
      }
    }
  }
  return [...new Set(pages)];
}

function buildKnownRoutes(): Set<string> {
  const routes = new Set<string>();

  // Homepage
  routes.add('/');

  // Static pages
  for (const page of getStaticPages()) {
    routes.add(page);
    routes.add(`${page}/`);
  }

  // Blog posts
  for (const slug of getBlogSlugs()) {
    routes.add(`/blog/${slug}`);
    routes.add(`/blog/${slug}/`);
  }

  // Content sections
  const sections: { dir: string; prefix: string }[] = [
    { dir: 'glossary', prefix: '/glossary' },
    { dir: 'objections', prefix: '/objections' },
    { dir: 'products', prefix: '/products' },
    { dir: 'integrations', prefix: '/integrations' },
    { dir: 'for', prefix: '/for' },
    { dir: 'comparisons', prefix: '/compare' },
    { dir: 'case-studies', prefix: '/case-studies' },
  ];

  for (const { dir, prefix } of sections) {
    routes.add(prefix);
    routes.add(`${prefix}/`);
    for (const slug of getContentSlugs(dir)) {
      routes.add(`${prefix}/${slug}`);
      routes.add(`${prefix}/${slug}/`);
    }
  }

  return routes;
}

// ── Scan MDX files ──────────────────────────────────────────────────

interface LinkResult {
  file: string;
  line: number;
  url: string;
  status: 'valid' | 'broken';
}

function scanFile(filePath: string, knownRoutes: Set<string>): LinkResult[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const results: LinkResult[] = [];
  const linkRegex = /\[.*?\]\((\/[^)]+)\)/g;
  const fileName = path.relative(ROOT, filePath);

  for (let i = 0; i < lines.length; i++) {
    let match;
    while ((match = linkRegex.exec(lines[i])) !== null) {
      const url = match[1];
      // Strip anchor fragments for route checking
      const urlWithoutHash = url.split('#')[0];
      const isKnown = knownRoutes.has(urlWithoutHash);
      results.push({
        file: fileName,
        line: i + 1,
        url,
        status: isKnown ? 'valid' : 'broken',
      });
    }
  }

  return results;
}

// ── Main ────────────────────────────────────────────────────────────

function main() {
  console.log('Checking blog internal links...\n');

  const knownRoutes = buildKnownRoutes();
  const mdxFiles = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))
    : [];

  if (mdxFiles.length === 0) {
    console.log('No MDX files found in content/blog/');
    process.exit(0);
  }

  let totalLinks = 0;
  let brokenLinks = 0;
  const allResults: LinkResult[] = [];

  for (const file of mdxFiles) {
    const results = scanFile(path.join(BLOG_DIR, file), knownRoutes);
    allResults.push(...results);
    totalLinks += results.length;
    brokenLinks += results.filter((r) => r.status === 'broken').length;
  }

  // Print results
  const broken = allResults.filter((r) => r.status === 'broken');
  const valid = allResults.filter((r) => r.status === 'valid');

  if (valid.length > 0) {
    console.log(`Valid links (${valid.length}):`);
    for (const r of valid) {
      console.log(`  \u2705 ${r.file}:${r.line} \u2192 ${r.url}`);
    }
    console.log('');
  }

  if (broken.length > 0) {
    console.log(`Broken links (${broken.length}):`);
    for (const r of broken) {
      console.log(`  \u274C ${r.file}:${r.line} \u2192 ${r.url}`);
    }
    console.log('');
  }

  console.log(`Summary: ${totalLinks} total links, ${valid.length} valid, ${broken.length} broken`);

  if (broken.length > 0) {
    process.exit(1);
  }
}

main();
