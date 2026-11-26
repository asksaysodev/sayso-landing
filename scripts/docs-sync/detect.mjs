// Find production releases Docs Sync hasn't handled yet. Prints a job matrix to GITHUB_OUTPUT.
// First sighting of a product only records its current production commit (no backfill).
import fs from 'node:fs';
import { discoverProduct, readJson } from './releases.mjs';
import { PRODUCTS } from './products.mjs';
import { client, readLedger, writeLedger } from './github.mjs';

const reader = process.env.DOCS_SYNC_READ_TOKEN;
const gh = client(process.env.GITHUB_TOKEN);
const manual = process.env.DOCS_SYNC_JOBS?.trim();
const sha40 = /^[0-9a-f]{40}$/;

let jobs = [];
if (manual) {
  // Replay or test: explicit {product, from, to} list.
  jobs = JSON.parse(manual);
  for (const j of jobs) {
    if (!PRODUCTS[j.product] || !sha40.test(j.from) || !sha40.test(j.to) || (j.help_ref && !sha40.test(j.help_ref))) throw Error('Bad manual job ' + JSON.stringify(j));
  }
} else {
  const { ledger } = await readLedger(gh);
  const since = new Date(Date.now() - 14 * 864e5).toISOString();
  const baselines = {};
  for (const repo of Object.keys(PRODUCTS)) {
    const get = (p) => readJson(`https://api.github.com/repos/asksaysodev/${repo}${p}`, reader);
    let live;
    try {
      const found = await discoverProduct(repo, since, get);
      live = found.liveSha;
      // A burst of merges: wait until the product has been quiet for 30 minutes, then cover them all at once.
      const latest = found.events[0]?.time;
      if (latest && Date.now() - Date.parse(latest) < 30 * 60e3) {
        console.log(`${repo}: released ${Math.round((Date.now() - Date.parse(latest)) / 60e3)} min ago, waiting for 30 quiet minutes`);
        continue;
      }
    } catch (e) {
      console.log(`${repo}: skipped this run (${e.message})`);
      continue;
    }
    const last = ledger.products[repo]?.sha;
    if (!last) baselines[repo] = live;
    else if (last !== live) jobs.push({ product: repo, from: last, to: live });
    console.log(`${repo}: production ${live.slice(0, 8)}${last ? ', last handled ' + last.slice(0, 8) : ', recording baseline'}`);
  }
  if (Object.keys(baselines).length) {
    await writeLedger(gh, (l) => {
      for (const [repo, sha] of Object.entries(baselines)) {
        l.products[repo] ??= { sha, status: 'baseline', at: new Date().toISOString() };
      }
    }, 'docs-sync: record baselines');
  }
}

console.log('Jobs:', JSON.stringify(jobs));
fs.appendFileSync(process.env.GITHUB_OUTPUT, `matrix=${JSON.stringify({ include: jobs })}\nany=${jobs.length ? 'true' : 'false'}\n`);
