import fs from 'node:fs';
import {products, discoverProduct, readJson} from './releases.mjs';

const token = process.env.DOCS_SYNC_READ_TOKEN;
if (!token) throw Error('Missing read-only installation token');
const since = process.env.DOCS_SYNC_SINCE || new Date(Date.now() - 7 * 86400000).toISOString();
const results = {};
let failed = false;
for (const repo of products) {
  try {
    results[repo] = await discoverProduct(repo, since,
      path => readJson('https://api.github.com/repos/asksaysodev/' + repo + path, token));
    console.log(repo + ': ' + results[repo].events.length + ' verified events');
  } catch (error) {
    failed = true;
    console.error(repo + ': ' + error.message);
  }
}
fs.mkdirSync('.docs-sync', {recursive:true});
fs.writeFileSync('.docs-sync/releases.json', JSON.stringify({since,products:results}, null, 2));
if (failed) process.exitCode = 1;
