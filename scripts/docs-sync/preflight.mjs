import { discoverProduct, mapTeam, products, readJson } from './releases.mjs';

const githubToken = process.env.DOCS_SYNC_READ_TOKEN;
const vercelToken = process.env.DOCS_SYNC_VERCEL_TOKEN;
if (!githubToken || !vercelToken) throw Error('GitHub App and Vercel reader credentials are required');

const github = (route) => readJson('https://api.github.com' + route, githubToken);
const vercel = (route) => readJson('https://api.vercel.com' + route + '&teamId=' + mapTeam, vercelToken);
const expected = [...products, 'sayso-stills-bot'].map(name => 'asksaysodev/' + name).sort();
const installation = await github('/installation/repositories?per_page=100');
const granted = installation.repositories.map(repo => repo.full_name).sort();
if (installation.total_count !== expected.length || JSON.stringify(granted) !== JSON.stringify(expected)) {
  throw Error('GitHub App token does not have the expected repository scope');
}
console.log('GitHub App token covers the expected six repositories.');

const since = new Date(Date.now() - 7 * 86400000).toISOString();
for (const repo of products) {
  const get = (route) => github('/repos/asksaysodev/' + repo + route);
  const release = await discoverProduct(repo, since, get, vercel);
  const commit = await get('/commits/' + release.liveSha);
  if (commit.sha !== release.liveSha) throw Error('Cannot read the verified product commit for ' + repo);
  console.log(repo + ': verified production deployment and source access.');
}

const landing = await vercel('/v13/deployments/www.asksayso.com?');
if (landing.target !== 'production' || landing.readyState !== 'READY' ||
    landing.meta?.githubOrg !== 'asksaysodev' || landing.meta?.githubRepo !== 'sayso-landing' ||
    !/^[0-9a-f]{40}$/.test(landing.meta.githubCommitSha)) {
  throw Error('Could not verify the live landing alias');
}
console.log('Vercel credential can verify the live landing deployment.');
