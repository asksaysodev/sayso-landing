// Write the interface-only changes between two production commits to .docs-sync/release/.
// Usage: node diff.mjs <product> <from> <to>
import fs from 'node:fs';
import { readJson } from './releases.mjs';
import { PRODUCTS, isInterfaceFile } from './products.mjs';

const [repo, from, to] = process.argv.slice(2);
const token = process.env.DOCS_SYNC_READ_TOKEN;
if (!PRODUCTS[repo]) throw Error('Unknown product');
const base = `https://api.github.com/repos/asksaysodev/${repo}`;
const cmp = await readJson(`${base}/compare/${from}...${to}?per_page=100`, token);
if (cmp.status === 'behind' || cmp.status === 'diverged') console.log(`Note: ${to.slice(0, 8)} is ${cmp.status} ${from.slice(0, 8)}`);

// The compare API returns at most 300 files across pages; fetch the rest of the pages.
let files = cmp.files || [];
for (let page = 2; files.length < 300 && files.length === (page - 1) * 100; page++) {
  const more = await readJson(`${base}/compare/${from}...${to}?per_page=100&page=${page}`, token);
  if (!more.files?.length) break;
  files = files.concat(more.files);
}

const ui = files.filter((f) => isInterfaceFile(repo, f.filename) || (f.previous_filename && isInterfaceFile(repo, f.previous_filename)));
const LIMIT = 180_000;
let size = 0;
const parts = [];
const noPatch = [];
for (const f of ui) {
  const head = `diff -- ${f.previous_filename ? f.previous_filename + ' -> ' : ''}${f.filename} (${f.status}, +${f.additions}/-${f.deletions})\n`;
  if (!f.patch) { noPatch.push(f.filename); parts.push(head + '(binary or too large to show)\n'); continue; }
  if (size + f.patch.length > LIMIT) { noPatch.push(f.filename); parts.push(head + '(left out: release diff over the size limit)\n'); continue; }
  size += f.patch.length;
  parts.push(head + f.patch + '\n');
}

fs.mkdirSync('.docs-sync/release', { recursive: true });
const summary = {
  product: repo,
  productName: PRODUCTS[repo].name,
  from, to,
  totalChangedFiles: files.length,
  interfaceFiles: ui.map((f) => f.filename),
  leftOut: noPatch,
  commits: (cmp.commits || []).map((c) => c.commit.message.split('\n')[0]).slice(-60),
};
fs.writeFileSync('.docs-sync/release/release.json', JSON.stringify(summary, null, 2));
fs.writeFileSync('.docs-sync/release/interface.diff', parts.join('\n'));
console.log(`${repo} ${from.slice(0, 8)}...${to.slice(0, 8)}: ${files.length} files changed, ${ui.length} interface files`);
fs.appendFileSync(process.env.GITHUB_OUTPUT || '/dev/null', `has_ui=${ui.length ? 'true' : 'false'}\n`);
