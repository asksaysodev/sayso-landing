// Publish gates. Every check must pass for Docs Sync to publish on its own; otherwise it holds.
// Usage: node check.mjs <base-ref>   (run in the landing repo with the agent's changes applied)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createProcessor } from '@mdx-js/mdx';
import matter from 'gray-matter';
import sharp from 'sharp';

const base = process.argv[2] || 'HEAD';
const git = (...a) => execFileSync('git', a, { encoding: 'utf8' });
const problems = [];
const fail = (m) => problems.push(m);

// What the agent changed (tracked edits plus new files).
const changed = [...new Set([
  ...git('diff', '--name-only', base).split('\n'),
  ...git('ls-files', '--others', '--exclude-standard').split('\n'),
].filter(Boolean))].filter((f) => !f.startsWith('.docs-sync/'));

let result;
try { result = JSON.parse(fs.readFileSync('.docs-sync/result.json', 'utf8')); } catch { fail('The agent left no valid result.json.'); result = {}; }
const decision = result.decision;
if (!['publish', 'skip', 'hold'].includes(decision)) fail('Unknown decision: ' + decision);
if (decision !== 'publish' && changed.length) fail(`Decision is ${decision} but files changed: ${changed.join(', ')}`);
if (decision === 'publish' && !changed.length) fail('Decision is publish but nothing changed.');
if (decision === 'publish' && !result.summary) fail('Missing summary.');

// 1. Scope.
for (const f of changed) {
  if (!/^content\/help\/[a-z0-9-]+\/[a-z0-9-]+\.mdx$/.test(f) && !/^public\/help\/[a-z0-9/_-]+\.(?:webp|png|mp4)$/.test(f)) fail('Out-of-scope file: ' + f);
}
const articles = changed.filter((f) => f.endsWith('.mdx'));
const images = changed.filter((f) => f.startsWith('public/help/'));
if (articles.filter((f) => !f.endsWith('/whats-new.mdx')).length > 5) fail(`Too many articles changed (${articles.length}).`);
if (images.length > 10) fail(`Too many images changed (${images.length}).`);
for (const f of git('diff', '--name-only', '--diff-filter=D', base).split('\n').filter(Boolean)) fail('Deleted file: ' + f);

// 2. Article structure, components, links and media.
const sections = fs.readFileSync('lib/help-sections.ts', 'utf8');
const groups = new Set([...sections.matchAll(/\{\s*id:\s*'([a-z0-9-]+)',\s*title:/g)].map((m) => m[1]));
const allRoutes = new Set();
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const f of walk('content/help').filter((f) => f.endsWith('.mdx'))) allRoutes.add('/' + f.slice('content/'.length, -4) + '/');
const props = { Screenshot: ['src', 'width', 'alt', 'caption'], Clip: ['src', 'poster', 'width', 'alt', 'caption'], Phone: ['src', 'alt', 'caption'], PhoneSteps: [], Tabs: [], Tab: ['label'], Ui: [], Kbd: [], Callout: ['type', 'title'], Faq: ['q'] };
const today = new Date().toISOString().slice(0, 10);

for (const f of articles) {
  const src = fs.readFileSync(f, 'utf8');
  let data, content;
  try { ({ data, content } = matter(src)); } catch (e) { fail(`${f}: bad frontmatter (${e.message})`); continue; }
  for (const k of ['title', 'description', 'group', 'updated']) if (!data[k]) fail(`${f}: missing ${k}`);
  if (data.group && !groups.has(data.group)) fail(`${f}: unknown group ${data.group}`);
  const updated = data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : String(data.updated);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(updated) || updated > today) fail(`${f}: bad updated date ${updated}`);
  if (/^(?:The|A|An)\s/.test(data.title || '')) fail(`${f}: title starts with The/A`);
  let tree;
  try { tree = createProcessor().parse(content); } catch (e) { fail(`${f}: MDX does not parse (${e.message.split('\n')[0]})`); continue; }
  const visit = (n) => {
    if (['mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression', 'html'].includes(n.type)) fail(`${f}: code or HTML in MDX`);
    if (n.type?.startsWith('mdxJsx')) {
      if (!props[n.name]) fail(`${f}: unsupported component <${n.name}>`);
      for (const a of n.attributes || []) {
        if (a.type !== 'mdxJsxAttribute' || !(props[n.name] || []).includes(a.name)) { fail(`${f}: unsupported prop ${a.name} on <${n.name}>`); continue; }
        if (typeof a.value !== 'string' && !(a.name === 'width' && /^\d{1,4}$/.test(a.value?.value))) fail(`${f}: non-literal prop ${a.name}`);
        if (['src', 'poster'].includes(a.name) && typeof a.value === 'string') {
          if (!/^\/help\/[a-z0-9/_.-]+$/.test(a.value) || a.value.includes('..')) fail(`${f}: unsafe media path ${a.value}`);
          else if (!fs.existsSync(path.join('public', a.value))) fail(`${f}: missing image ${a.value}`);
        }
      }
    }
    if (n.url) {
      if (!/^(?:https?:\/\/|mailto:|#|\/(?!\/))/.test(n.url)) fail(`${f}: unsafe link ${n.url}`);
      if (n.url.startsWith('/help/')) {
        const route = n.url.split(/[?#]/)[0].replace(/\/?$/, '/');
        if (route !== '/help/' && !allRoutes.has(route) && ![...allRoutes].some((r) => r.startsWith(route))) fail(`${f}: broken link ${n.url}`);
      }
    }
    (n.children || []).forEach(visit);
  };
  visit(tree);
}

// 3. Writing rules on the lines the agent added.
const banned = [
  [/[—–]/, 'em or en dash'],
  [/!(?=\s|$)/, 'exclamation mark'],
  [/\b(?:just|simply|really|actually|quickly|easily|basically)\b/i, 'filler word'],
  [/\b(?:helps you|lets you|allows you to|enables you to)\b/i, 'soft verb'],
  [/\b(?:make sure|note that|here's how|in short|keep in mind)\b/i, 'signposting'],
  [/\bso (?:that )?you can\b/i, 'purpose tail'],
  [/\b(?:right away|it takes seconds|in seconds)\b/i, 'padding'],
  [/\b(?:reps?|team leaders?|phone calls?|free trial|trial)\b/i, 'banned term'],
  [/\bSAYSO\b|\bsayso\b(?!\.com|@| map| composer)|\bSaysoRe\b/, 'product spelling'],
  [/\b(?:headphones? (?:are|is) (?:required|needed|recommended))\b/i, 'headphones claim'],
  [/^#+\s*(?:Good to know|Common questions|Overview|Introduction|Conclusion|Summary)\s*$/i, 'generic heading'],
];
for (const f of articles) {
  // Tracked files: lint only the lines the agent added. New files: lint everything.
  const tracked = git('ls-files', '--', f).trim() !== '';
  const lines = tracked
    ? execFileSync('git', ['diff', '-U0', base, '--', f], { encoding: 'utf8' }).split('\n')
        .filter((l) => l.startsWith('+') && !l.startsWith('+++')).map((l) => l.slice(1))
    : fs.readFileSync(f, 'utf8').split('\n');
  for (const line of lines) {
    if (/^(?:keywords|seoTitle|updated|order):/.test(line) || /^\s*<(?:Screenshot|Clip|Phone)\b/.test(line)) continue;
    // Quoted UI text and on-screen messages are verbatim, so they are exempt.
    const text = line.replace(/\]\([^)]*\)/g, ']').replace(/`[^`]*`/g, '')
      .replace(/<Ui>[^<]*<\/Ui>/g, 'UI').replace(/[“"][^”"]*[”"]/g, 'QUOTE');
    for (const [re, why] of banned) if (re.test(text)) fail(`${f}: ${why}: "${line.trim().slice(0, 120)}"`);
    if (/\?\s*$/.test(text) && !/^\s*<Faq\b|^#{2,}\s/.test(line)) fail(`${f}: rhetorical question: "${line.trim().slice(0, 120)}"`);
  }
}

// 4. Images.
for (const f of images) {
  if (!fs.existsSync(f)) continue;
  if (f.endsWith('.mp4')) continue;
  const { width, height, format } = await sharp(f).metadata();
  if (fs.statSync(f).size > 4 * 1024 * 1024) fail(`${f}: over 4 MB`);
  if (width < 600 || height < 200) fail(`${f}: too small (${width}x${height})`);
  if (!['webp', 'png'].includes(format)) fail(`${f}: unexpected format ${format}`);
}

const report = { pass: problems.length === 0, decision, changed, articles, images, problems };
fs.mkdirSync('.docs-sync', { recursive: true });
fs.writeFileSync('.docs-sync/gates.json', JSON.stringify(report, null, 2));
console.log(problems.length ? 'Checks failed:\n- ' + problems.join('\n- ') : `Checks passed (${decision}, ${changed.length} files).`);
fs.appendFileSync(process.env.GITHUB_OUTPUT || '/dev/null', `pass=${report.pass}\ndecision=${decision}\n`);
