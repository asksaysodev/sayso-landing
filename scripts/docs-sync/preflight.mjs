import { discoverProduct, products, readJson } from './releases.mjs';

const githubToken = process.env.DOCS_SYNC_READ_TOKEN;
if (!githubToken) throw Error('GitHub App reader credential is required');

const github = (route) => readJson('https://api.github.com' + route, githubToken);
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
  const release = await discoverProduct(repo, since, get);
  const commit = await get('/commits/' + release.liveSha);
  if (commit.sha !== release.liveSha) throw Error('Cannot read the verified product commit for ' + repo);
  console.log(repo + ': verified production deployment and source access.');
}
