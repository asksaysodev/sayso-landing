// Publish (or hold) one release's Help Center changes, then tell Dash.
// Env: GITHUB_TOKEN (landing, write), DASH_SLACK_BOT_TOKEN, DASH_SLACK_CHANNEL_ID, DOCS_SYNC_MODE (live | dry-run)
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { client, LANDING, writeLedger } from './github.mjs';

const mode = process.env.DOCS_SYNC_MODE === 'live' ? 'live' : 'dry-run';
const gh = client(process.env.GITHUB_TOKEN);
const release = JSON.parse(fs.readFileSync('.docs-sync/release/release.json', 'utf8'));
const gates = JSON.parse(fs.readFileSync('.docs-sync/gates.json', 'utf8'));
let result = {};
try { result = JSON.parse(fs.readFileSync('.docs-sync/result.json', 'utf8')); } catch {}
const { product, productName, to } = release;
const short = to.slice(0, 7);
const runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
const SITE = 'https://www.asksayso.com';
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const url = (f) => SITE + '/' + f.slice('content/'.length, -'.mdx'.length) + '/';
const titleOf = (f) => (fs.readFileSync(f, 'utf8').match(/^title:\s*(.+)$/m)?.[1] || f).trim();

async function slack(text) {
  if (mode !== 'live') { console.log('[dry-run] Slack message:\n' + text); return; }
  const r = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.DASH_SLACK_BOT_TOKEN, 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ channel: process.env.DASH_SLACK_CHANNEL_ID, text, unfurl_links: false, unfurl_media: false }),
  }).then((x) => x.json());
  if (!r.ok) console.log('Slack post failed: ' + r.error);
}
async function ledger(status, extra = {}) {
  if (mode !== 'live') { console.log(`[dry-run] ledger ${product} -> ${short} (${status})`); return; }
  await writeLedger(gh, (l) => { l.products[product] = { sha: to, status, at: new Date().toISOString(), ...extra }; }, `docs-sync: ${product} ${short} ${status}`);
}
async function waitForVercel(sha, label) {
  for (let i = 0; i < 80; i++) {
    const s = await gh(`/repos/${LANDING}/commits/${sha}/status`);
    const v = s.statuses.find((x) => x.context === 'Vercel');
    if (v?.state === 'success') return;
    if (v && ['failure', 'error'].includes(v.state)) throw Error(`Vercel build failed for ${label}`);
    await sleep(15000);
  }
  throw Error(`Vercel did not finish for ${label} within 20 minutes`);
}
async function waitForProduction(sha) {
  for (let i = 0; i < 80; i++) {
    const deps = await gh(`/repos/${LANDING}/deployments?sha=${sha}&environment=Production`);
    for (const d of deps) {
      const [st] = await gh(`/repos/${LANDING}/deployments/${d.id}/statuses?per_page=1`);
      if (st?.state === 'success') return;
      if (st && ['failure', 'error'].includes(st.state)) throw Error('Production deploy failed');
    }
    await sleep(15000);
  }
  throw Error('Production deploy did not finish within 20 minutes');
}

// Nothing for customers in this release.
if (gates.pass && gates.decision === 'skip') {
  console.log(`${productName} ${short}: no Help Center change needed. ${result.summary || ''}`);
  await ledger('skipped', { note: result.summary || '' });
  process.exit(0);
}

const held = !gates.pass || gates.decision === 'hold';
const reasons = !gates.pass ? gates.problems : [result.hold_reason || 'The agent held this release.'];
const articles = gates.articles || [];
const images = gates.images || [];

// No file changes to show (agent held without editing): report and stop.
if (!gates.changed?.length) {
  await slack(`Help Center update held · ${productName} \`${short}\`\n${reasons.map((r) => '• ' + r).join('\n')}\n<${runUrl}|Run details>`);
  await ledger('held', { reason: reasons.join(' | ').slice(0, 500) });
  process.exit(0);
}

// Test runs from a feature branch stop here: no branch, PR, Slack or ledger changes.
if (mode !== 'live' && process.env.GITHUB_REF_NAME !== 'development') {
  console.log(`[test] ${held ? 'Would hold' : 'Would publish'} ${productName} ${short}: ${result.summary || ''}`);
  if (held) console.log('Reasons:\n- ' + reasons.join('\n- '));
  console.log('Articles: ' + articles.join(', ') + '\nImages: ' + images.join(', '));
  process.exit(0);
}

// Commit the changes to a docs-sync branch and open the PR.
const branch = `docs-sync/${product}-${short}`;
git('config', 'user.name', 'Sayso Docs Sync');
git('config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com');
git('checkout', '-B', branch);
git('add', '--', ...gates.changed);
git('commit', '-q', '-m', `docs(help): ${result.summary || productName + ' release'} (${product} ${short})`);
git('push', '-q', '-f', `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${LANDING}.git`, branch);
const head = git('rev-parse', 'HEAD');

const body = [
  `Docs Sync for the ${productName} production release \`${to}\`.`,
  '',
  result.summary ? `**What changed for customers:** ${result.summary}` : '',
  '',
  articles.length ? '**Articles**\n' + articles.map((f) => `- ${titleOf(f)} (\`${f}\`)`).join('\n') : '',
  images.length ? '\n**Images**\n' + images.map((f) => `- \`${f}\``).join('\n') : '',
  held ? '\n**Held:**\n' + reasons.map((r) => '- ' + r).join('\n') : '\nAll Docs Sync checks passed.',
  '',
  `Docs-Sync-Release: ${product}@${to}`,
  `[Run](${runUrl})`,
].filter((x) => x !== '').join('\n');

const existing = await gh(`/repos/${LANDING}/pulls?head=asksaysodev:${branch}&state=open`);
const pr = existing[0] || await gh(`/repos/${LANDING}/pulls`, {
  method: 'POST',
  body: { title: `Help Center: ${result.summary || productName + ' release ' + short}`.slice(0, 120), head: branch, base: 'development', body, draft: held || mode !== 'live' },
});
console.log('PR: ' + pr.html_url);
const lines = (prefix) => articles.map((f) => `${prefix}: <${url(f)}|${titleOf(f)}>`);

if (held || mode !== 'live') {
  if (held) {
    await slack(`Help Center update held · ${productName} \`${short}\`\n${reasons.slice(0, 6).map((r) => '• ' + r).join('\n')}\n<${pr.html_url}|Review the draft PR>`);
    await ledger('held', { pr: pr.number });
  } else {
    console.log('[dry-run] would publish:\n' + lines('Updated').join('\n'));
    await ledger('dry-run', { pr: pr.number });
  }
  process.exit(0);
}

// Live publish. Any failure from here on is reported to Dash with where it stopped.
let stage = 'checking for unreleased changes';
try {
  const pending = await gh(`/repos/${LANDING}/compare/main...development`);
  if (pending.files?.length) throw Error('development has unreleased changes, so an automatic release would ship them too');
  stage = 'waiting for the preview build';
  await waitForVercel(head, 'the docs PR');
  stage = 'merging into development';
  const merged = await gh(`/repos/${LANDING}/pulls/${pr.number}/merge`, { method: 'PUT', body: { merge_method: 'merge', sha: head } });
  stage = 'opening the release';
  const rel = await gh(`/repos/${LANDING}/pulls`, {
    method: 'POST',
    body: { title: `Release: Help Center · ${result.summary || productName}`.slice(0, 120), head: 'development', base: 'main', body: `Releases #${pr.number} (Docs Sync, ${product} \`${short}\`).` },
  });
  stage = 'waiting for the release build';
  await waitForVercel(merged.sha, 'the release');
  stage = 'merging the release';
  const shipped = await gh(`/repos/${LANDING}/pulls/${rel.number}/merge`, { method: 'PUT', body: { merge_method: 'merge' } });
  stage = 'waiting for production';
  await waitForProduction(shipped.sha);
  stage = 'checking the live pages';
  for (const f of articles) {
    let ok = false;
    for (let i = 0; i < 20 && !ok; i++) {
      const page = await fetch(url(f), { signal: AbortSignal.timeout(20000) }).then((r) => (r.ok ? r.text() : '')).catch(() => '');
      ok = page.includes(titleOf(f).replace(/&/g, '&amp;'));
      if (!ok) await sleep(15000);
    }
    if (!ok) throw Error(`${url(f)} is not showing the update`);
  }
  const added = new Set(gates.changed.filter((f) => !git('ls-tree', '--name-only', 'HEAD~1', '--', f)));
  const msg = [
    `Help Center updated · ${productName} \`${short}\``,
    result.summary || '',
    ...articles.map((f) => `${added.has(f) ? 'New' : 'Updated'}: <${url(f)}|${titleOf(f)}>`),
    images.length ? `Screenshots: ${images.length} new or retaken` : '',
    `<${pr.html_url}|Docs PR> · <${rel.html_url}|Release>`,
  ].filter(Boolean).join('\n');
  await slack(msg);
  await ledger('published', { pr: pr.number, release: rel.number });
} catch (e) {
  await slack(`Help Center update stopped while ${stage} · ${productName} \`${short}\`\n${e.message}\n<${pr.html_url}|Docs PR> · <${runUrl}|Run details>`);
  await ledger('error', { pr: pr.number, stage, error: e.message.slice(0, 300) });
  throw e;
}
