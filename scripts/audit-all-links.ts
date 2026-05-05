/**
 * Site-wide internal link audit.
 * Scans MDX, TSX, and TS files for internal links and reports broken ones.
 * Temporary one-off; does not replace check-blog-links.ts.
 * Run with: npx tsx scripts/audit-all-links.ts
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '..');

// ── Known routes (mirrors check-blog-links.ts) ──────────────────────

function getBlogSlugs(): string[] {
  const dir = path.join(ROOT, 'content', 'blog');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace('.mdx', ''));
}

function getContentSlugs(dir: string): string[] {
  const indexPath = path.join(ROOT, 'lib', 'content', dir, 'index.ts');
  if (!fs.existsSync(indexPath)) return [];
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
  if (fs.existsSync(appDir)) {
    for (const entry of fs.readdirSync(appDir, { withFileTypes: true })) {
      if (entry.isDirectory() && !entry.name.startsWith('(') && !entry.name.startsWith('[') && !entry.name.startsWith('_')) {
        const pagePath = path.join(appDir, entry.name, 'page.tsx');
        if (fs.existsSync(pagePath)) pages.push(`/${entry.name}`);
      }
    }
  }
  return [...new Set(pages)];
}

function buildKnownRoutes(): Set<string> {
  const routes = new Set<string>();
  routes.add('/');

  for (const page of getStaticPages()) {
    routes.add(page);
    routes.add(`${page}/`);
  }

  for (const slug of getBlogSlugs()) {
    routes.add(`/blog/${slug}`);
    routes.add(`/blog/${slug}/`);
  }

  const sections = [
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

  // Hub routes that exist as pages
  routes.add('/resources');
  routes.add('/resources/');
  routes.add('/why-sayso');
  routes.add('/why-sayso/');

  return routes;
}

// ── File scanning ───────────────────────────────────────────────────

interface LinkResult {
  file: string;
  line: number;
  url: string;
}

function walk(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full, exts));
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      out.push(full);
    }
  }
  return out;
}

function scanFile(filePath: string, knownRoutes: Set<string>): LinkResult[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const results: LinkResult[] = [];
  const fileName = path.relative(ROOT, filePath);

  // Patterns: markdown [text](/path), href="/path", href='/path', href: '/path', href: "/path"
  const patterns: RegExp[] = [
    /\[[^\]]*\]\((\/[^)\s#]+)(?:#[^)]*)?\)/g,
    /href\s*=\s*["'](\/[^"']+)["']/g,
    /href\s*:\s*["'](\/[^"']+)["']/g,
  ];

  for (let i = 0; i < lines.length; i++) {
    for (const re of patterns) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(lines[i])) !== null) {
        let url = m[1].split('#')[0].split('?')[0];
        // Skip API routes, image/asset paths, anchor-only
        if (url.startsWith('/api/') || url.startsWith('/_next/') || url === '/') continue;
        if (/\.(png|jpe?g|webp|svg|gif|ico|pdf|mp4|webm|mp3|css|js|json|xml|txt)$/i.test(url)) continue;
        if (!knownRoutes.has(url)) {
          results.push({ file: fileName, line: i + 1, url });
        }
      }
    }
  }
  return results;
}

// ── Main ────────────────────────────────────────────────────────────

function main() {
  const knownRoutes = buildKnownRoutes();

  const targets = [
    ...walk(path.join(ROOT, 'app'), ['.tsx', '.ts']),
    ...walk(path.join(ROOT, 'components'), ['.tsx', '.ts']),
    ...walk(path.join(ROOT, 'lib'), ['.tsx', '.ts']),
    ...walk(path.join(ROOT, 'content'), ['.mdx', '.md']),
  ];

  const broken: LinkResult[] = [];
  for (const f of targets) {
    broken.push(...scanFile(f, knownRoutes));
  }

  // Group by URL
  const byUrl = new Map<string, LinkResult[]>();
  for (const b of broken) {
    if (!byUrl.has(b.url)) byUrl.set(b.url, []);
    byUrl.get(b.url)!.push(b);
  }

  console.log(`\nBroken internal links across the site\n`);
  console.log(`Files scanned: ${targets.length}`);
  console.log(`Unique broken URLs: ${byUrl.size}`);
  console.log(`Total broken occurrences: ${broken.length}\n`);

  const sorted = [...byUrl.entries()].sort((a, b) => b[1].length - a[1].length);
  for (const [url, hits] of sorted) {
    console.log(`\n  ${url}  (${hits.length} reference${hits.length === 1 ? '' : 's'})`);
    for (const h of hits) {
      console.log(`    - ${h.file}:${h.line}`);
    }
  }
}

main();
