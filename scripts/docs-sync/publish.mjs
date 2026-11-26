// Publish (or hold) one release's Help Center changes.
// Channel posts: the update list, or "no help center updates needed". Holds and failures: a DM to Kuvaal only.
// Env: GITHUB_TOKEN (landing, write), DASH_SLACK_BOT_TOKEN, DASH_SLACK_CHANNEL_ID, DOCS_SYNC_DM_USER, DOCS_SYNC_MODE
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { client, LANDING, writeLedger } from './github.mjs';
import { updateMessage, noUpdates, releaseMetadata, cleanPlain } from './slack-format.mjs';

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
const pageUrl = (f) => SITE + '/' + f.slice('content/'.length, -'.mdx'.length) + '/';
const titleOf = (f) => (fs.readFileSync(f, 'utf8').match(/^title:\s*(.+)$/m)?.[1] || f).trim().replace(/^["']|["']$/g, '');

// ---------- Slack ----------
async function slackPost(channel, payload) {
  if (mode !== 'live') { console.log(`[dry-run] Slack to ${channel === process.env.DOCS_SYNC_DM_USER ? 'Kuvaal (DM)' : 'channel'}:\n` + JSON.stringify(payload, null, 2)); return; }
  const r = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.DASH_SLACK_BOT_TOKEN, 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ channel, unfurl_links: false, unfurl_media: false, ...payload }),
  }).then((x) => x.json());
  if (!r.ok) throw Error('Slack post failed: ' + r.error);
}
const toChannel = (payload) => slackPost(process.env.DASH_SLACK_CHANNEL_ID, payload);
const toKuvaal = async (payload) => { await slackPost(process.env.DOCS_SYNC_DM_USER, payload); fs.writeFileSync('.docs-sync/dm-sent', ''); };

function dm(title, what, fix, links = []) {
  const tail = links.length ? '\n' + links.map(([u, l]) => `<${u}|${l}>`).join(' · ') : '';
  return { text: `*${title}*\nWhat happened: ${what}\nHow to fix it: ${fix}${tail}` };
}

// Turn a check problem into a sentence Kuvaal can act on.
function plain(problem) {
  const quote = problem.match(/"(.+)"$/)?.[1];
  const file = problem.split(':')[0];
  const page = file.endsWith('.mdx') ? `"${fs.existsSync(file) ? titleOf(file) : file}"` : file;
  if (/: (em or en dash|filler word|soft verb|signposting|purpose tail|padding|banned term|product spelling|generic heading|rhetorical question|exclamation mark|headphones claim)/.test(problem)) {
    return [`a sentence on ${page} breaks the writing rules: "${quote}"`, `edit that sentence in the draft PR, then merge it.`];
  }
  if (/broken link/.test(problem)) return [`${page} links to a page that doesn't exist (${problem.split('broken link ')[1]})`, 'fix or remove that link in the draft PR, then merge it.'];
  if (/missing image/.test(problem)) return [`${page} points to a screenshot that isn't there`, 'add the screenshot or remove it from the article in the draft PR, then merge it.'];
  if (/Too many/.test(problem)) return ['the release changed more pages or screenshots than Docs Sync is allowed to publish on its own', 'look over the draft PR. If it looks right, merge it.'];
  if (/Out-of-scope|outside the Help Center/.test(problem)) return ['the draft tried to change files outside the Help Center, so it was stopped', 'close the draft PR. Nothing was published.'];
  if (/site build/.test(problem)) return ['the website would not build with the new pages', 'open the run details to see the error, fix it in the draft PR, then merge it.'];
  return [problem, 'look over the draft PR and merge it if it looks right.'];
}

async function ledger(status, extra = {}) {
  if (mode !== 'live') { console.log(`[dry-run] ledger ${product} -> ${short} (${status})`); return; }
  await writeLedger(gh, (l) => { l.products[product] = { sha: to, status, at: new Date().toISOString(), ...extra }; }, `docs-sync: ${product} ${short} ${status}`);
}

// ---------- Retries: most failures fix themselves on a second try ----------
async function retry(label, fn, tries = 3) {
  for (let i = 1; ; i++) {
    try { return await fn(i); } catch (e) {
      if (i >= tries) throw e;
      console.log(`${label} failed (try ${i}/${tries}): ${e.message}. Retrying.`);
      await sleep(60000 * i);
    }
  }
}
async function vercelState(sha) {
  const s = await gh(`/repos/${LANDING}/commits/${sha}/status`);
  return s.statuses.find((x) => x.context === 'Vercel')?.state;
}
async function waitForVercel(sha, label) {
  for (let i = 0; i < 80; i++) {
    const st = await vercelState(sha);
    if (st === 'success') return;
    if (st === 'failure' || st === 'error') throw Error(`the Vercel build failed for ${label}`);
    await sleep(15000);
  }
  throw Error(`Vercel didn't finish building ${label} within 20 minutes`);
}
async function waitForProduction(sha) {
  for (let i = 0; i < 80; i++) {
    const deps = await gh(`/repos/${LANDING}/deployments?sha=${sha}&environment=Production`);
    for (const d of deps) {
      const [st] = await gh(`/repos/${LANDING}/deployments/${d.id}/statuses?per_page=1`);
      if (st?.state === 'success') return;
      if (st && ['failure', 'error'].includes(st.state)) throw Error('the production deploy of asksayso.com failed');
    }
    await sleep(15000);
  }
  throw Error("the production deploy of asksayso.com didn't finish within 20 minutes");
}

// ---------- Decide ----------
const articles = (gates.articles || []).filter((f) => !f.endsWith('/whats-new.mdx'));
const images = gates.images || [];
const held = !gates.pass || gates.decision === 'hold';

if (gates.pass && gates.decision === 'skip') {
  console.log(`${productName} ${short}: no Help Center change needed. ${result.summary || ''}`);
  await toChannel({ ...noUpdates(productName, result.plain), metadata: releaseMetadata(release, result, 'skip') });
  await ledger('skipped', { note: (result.summary || '').slice(0, 300), plain: cleanPlain(result.plain) });
  process.exit(0);
}

const holdWhat = !gates.pass ? plain(gates.problems[0])[0] + (gates.problems.length > 1 ? ` (and ${gates.problems.length - 1} more)` : '') : (result.hold_reason || 'Claude could not tell for sure what changed for customers.');
const holdFix = !gates.pass ? plain(gates.problems[0])[1] : (result.hold_fix || 'look over the draft PR. If it looks right, merge it. If not, close it.');

if (!gates.changed?.length) {
  // Held with no edits to show.
  if (mode !== 'live' && process.env.GITHUB_REF_NAME !== 'development') { console.log(`[test] Would hold ${productName} ${short}: ${holdWhat}`); process.exit(0); }
  await toKuvaal(dm(`The ${productName} Help Center update is waiting on you.`, holdWhat, holdFix.replace(/draft PR/g, 'run details').replace(/, then merge it\.|merge it.*$/, 'decide whether the Help Center needs a change.'), [[runUrl, 'Run details']]));
  await ledger('held', { reason: holdWhat.slice(0, 300) });
  process.exit(0);
}

// Test runs from a feature branch stop here: no branch, PR, Slack or ledger changes.
if (mode !== 'live' && process.env.GITHUB_REF_NAME !== 'development') {
  console.log(`[test] ${held ? 'Would hold' : 'Would publish'} ${productName} ${short}: ${result.summary || ''}`);
  if (held) console.log(`DM: ${holdWhat} / ${holdFix}\nProblems:\n- ` + gates.problems.join('\n- '));
  else {
    const byPath = Object.fromEntries((result.articles || []).map((a) => [a.path, a]));
    const isNew = (f) => byPath[f]?.action === 'new';
    console.log(JSON.stringify(updateMessage(
      articles.filter(isNew).map((f) => ({ url: pageUrl(f), title: titleOf(f) })),
      articles.filter((f) => !isNew(f)).map((f) => ({ url: pageUrl(f), title: titleOf(f), change: byPath[f]?.change })),
    ).text));
  }
  console.log('Images: ' + images.join(', '));
  process.exit(0);
}

// ---------- Branch and PR ----------
const branch = `docs-sync/${product}-${short}`;
git('config', 'user.name', 'Sayso Docs Sync');
git('config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com');
git('checkout', '-B', branch);
git('add', '--', ...gates.changed);
git('commit', '-q', '-m', `docs(help): ${result.summary || productName + ' release'} (${product} ${short})`);
const remote = `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${LANDING}.git`;
git('push', '-q', '-f', remote, branch);
let head = git('rev-parse', 'HEAD');

const byPath = Object.fromEntries((result.articles || []).map((a) => [a.path, a]));
const isNew = (f) => byPath[f]?.action === 'new' || !git('ls-tree', '--name-only', 'HEAD~1', '--', f);
const newPages = articles.filter(isNew).map((f) => ({ url: pageUrl(f), title: titleOf(f) }));
const updated = articles.filter((f) => !isNew(f)).map((f) => ({ url: pageUrl(f), title: titleOf(f), change: byPath[f]?.change }));

const body = [
  `Docs Sync for the ${productName} production release \`${to}\`.`,
  result.summary ? `\n**What changed for customers:** ${result.summary}` : '',
  newPages.length ? '\n**New pages**\n' + newPages.map((p) => `- ${p.title}`).join('\n') : '',
  updated.length ? '\n**Updated**\n' + updated.map((p) => `- ${p.title}${p.change ? `: ${p.change}` : ''}`).join('\n') : '',
  images.length ? '\n**Images**\n' + images.map((f) => `- \`${f}\``).join('\n') : '',
  held ? '\n**Held:** ' + holdWhat + (gates.problems?.length ? '\n' + gates.problems.map((r) => '- ' + r).join('\n') : '') : '\nAll Docs Sync checks passed.',
  `\nDocs-Sync-Release: ${product}@${to}`,
  `[Run](${runUrl})`,
].filter(Boolean).join('\n');

const existing = await gh(`/repos/${LANDING}/pulls?head=asksaysodev:${branch}&state=open`);
const pr = existing[0] || await gh(`/repos/${LANDING}/pulls`, {
  method: 'POST',
  body: { title: `Help Center: ${result.summary || productName + ' release ' + short}`.slice(0, 120), head: branch, base: 'development', body, draft: held || mode !== 'live' },
});
console.log('PR: ' + pr.html_url);

if (held) {
  await toKuvaal(dm(`The ${productName} Help Center update is waiting on you.`, holdWhat, holdFix, [[pr.html_url, 'Draft PR']]));
  await ledger('held', { pr: pr.number });
  process.exit(0);
}
if (mode !== 'live') {
  console.log('[dry-run] would post:\n' + updateMessage(newPages, updated).text);
  await ledger('dry-run', { pr: pr.number });
  process.exit(0);
}

// ---------- Live publish. Retries first; Kuvaal hears about it only if it still fails. ----------
let stage = 'checking for other unreleased changes';
let rel;
try {
  const pending = await gh(`/repos/${LANDING}/compare/main...development`);
  if (pending.files?.length) {
    const e = Error('the development branch has other changes that aren\'t released yet, and releasing now would ship them too');
    e.fix = 'release or hold those other changes first. Then merge the draft PR and release it as usual.';
    throw e;
  }
  stage = 'building the preview';
  await retry('Preview build', async (i) => {
    if (i > 1 && (await vercelState(head)) !== 'success') {
      // Vercel builds fail now and then for no reason. An empty commit makes it build again.
      git('commit', '-q', '--allow-empty', '-m', 'chore: rebuild preview');
      git('push', '-q', remote, branch);
      head = git('rev-parse', 'HEAD');
    }
    await waitForVercel(head, 'the docs preview');
  });
  stage = 'merging into development';
  const merged = await retry('Merge', () => gh(`/repos/${LANDING}/pulls/${pr.number}/merge`, { method: 'PUT', body: { merge_method: 'merge', sha: head } }));
  stage = 'opening the release';
  rel = await retry('Release PR', () => gh(`/repos/${LANDING}/pulls`, {
    method: 'POST',
    body: { title: `Release: Help Center · ${result.summary || productName}`.slice(0, 120), head: 'development', base: 'main', body: `Releases #${pr.number} (Docs Sync, ${product} \`${short}\`).` },
  }));
  stage = 'building the release';
  await retry('Release build', () => waitForVercel(merged.sha, 'the release'));
  stage = 'releasing to production';
  const shipped = await retry('Release merge', () => gh(`/repos/${LANDING}/pulls/${rel.number}/merge`, { method: 'PUT', body: { merge_method: 'merge' } }));
  stage = 'waiting for asksayso.com to deploy';
  await waitForProduction(shipped.sha);
  stage = 'checking the live pages';
  for (const f of articles) {
    let ok = false;
    for (let i = 0; i < 20 && !ok; i++) {
      const page = await fetch(pageUrl(f), { signal: AbortSignal.timeout(20000) }).then((r) => (r.ok ? r.text() : '')).catch(() => '');
      ok = page.includes(titleOf(f).replace(/&/g, '&amp;'));
      if (!ok) await sleep(15000);
    }
    if (!ok) throw Error(`${pageUrl(f)} isn't showing the update after 5 minutes`);
  }
  await toChannel({ ...updateMessage(newPages, updated), metadata: releaseMetadata(release, result, 'publish') });
  await ledger('published', { pr: pr.number, release: rel.number });
} catch (e) {
  const fixes = {
    'checking for other unreleased changes': e.fix,
    'building the preview': 'open the draft PR, click the failed Vercel check to see the error, fix it, then merge the PR and release it.',
    'building the release': 'open the release PR, click the failed Vercel check, fix the error, then merge it.',
    'releasing to production': 'open the release PR and merge it.',
    'waiting for asksayso.com to deploy': 'open Vercel for sayso-landing and redeploy the latest production deployment.',
    'checking the live pages': 'open the page. If it still shows the old version after a few minutes, redeploy production in Vercel.',
  };
  await toKuvaal(dm(`The ${productName} Help Center update didn't finish.`, `it stopped while ${stage}: ${e.message}. Docs Sync already retried.`, fixes[stage] || 'open the run details and check the error.',
    [[pr.html_url, 'Docs PR'], ...(rel ? [[rel.html_url, 'Release PR']] : []), [runUrl, 'Run details']]));
  await ledger('error', { pr: pr.number, stage, error: e.message.slice(0, 300) });
  process.exit(1);
}
