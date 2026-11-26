import test from 'node:test';
import assert from 'node:assert/strict';
import { productionRelease } from './index.js';

const vercel = (repo, environment, state = 'success') => ({ repository: { name: repo }, deployment: { environment, sha: 'abc', creator: { login: 'vercel[bot]' } }, deployment_status: { state } });
test('production deploys start Docs Sync', () => {
  assert.deepEqual(productionRelease('deployment_status', vercel('sayso-map', 'Production')), { product: 'sayso-map', sha: 'abc' });
  assert.deepEqual(productionRelease('deployment_status', { repository: { name: 'sayso-backend' }, deployment: { environment: 'sayso-server', sha: 'b' }, deployment_status: { state: 'success' } }), { product: 'sayso-backend', sha: 'b' });
  assert.equal(productionRelease('release', { action: 'published', repository: { name: 'sayso-desktop-app' }, release: { tag_name: 'v1.3.9', draft: false, prerelease: false } }).product, 'sayso-desktop-app');
});
test('staging, previews, failures and pre-releases are ignored', () => {
  assert.equal(productionRelease('deployment_status', vercel('sayso-map', 'Preview')), null);
  assert.equal(productionRelease('deployment_status', vercel('sayso-web-app', 'Production', 'failure')), null);
  assert.equal(productionRelease('deployment_status', vercel('sayso-landing', 'Production')), null);
  assert.equal(productionRelease('deployment_status', { repository: { name: 'sayso-backend' }, deployment: { environment: 'sayso-server-staging', sha: 'b' }, deployment_status: { state: 'success' } }), null);
  assert.equal(productionRelease('release', { action: 'published', repository: { name: 'sayso-desktop-app' }, release: { tag_name: 'v1.4.0-beta.1', draft: false, prerelease: true } }), null);
});
