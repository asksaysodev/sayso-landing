// Minimal GitHub REST helper with retries.
export const ORG = 'asksaysodev';
export const LANDING = 'asksaysodev/sayso-landing';

export function client(token) {
  if (!token) throw Error('Missing GitHub token');
  return async function gh(path, { method = 'GET', body, allow404 = false } = {}) {
    for (let attempt = 0; attempt < 4; attempt++) {
      const r = await fetch('https://api.github.com' + path, {
        method,
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(30000),
      });
      if (r.status === 404 && allow404) return null;
      if (r.ok) return r.status === 204 ? null : r.json();
      if (attempt < 3 && [429, 500, 502, 503, 504].includes(r.status)) {
        await new Promise((d) => setTimeout(d, 1500 * 2 ** attempt));
        continue;
      }
      const text = await r.text().catch(() => '');
      throw Error(`GitHub ${method} ${path} failed: ${r.status} ${text.slice(0, 300)}`);
    }
  };
}

// The ledger records, per product, the last production commit Docs Sync has handled.
const LEDGER_BRANCH = 'docs-sync-ledger';
const LEDGER_FILE = 'ledger.json';

export async function readLedger(gh) {
  const file = await gh(`/repos/${LANDING}/contents/${LEDGER_FILE}?ref=${LEDGER_BRANCH}`, { allow404: true });
  if (!file) return { ledger: { version: 1, products: {} }, sha: null };
  return { ledger: JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')), sha: file.sha };
}

export async function writeLedger(gh, update, message) {
  // Re-read right before writing so concurrent product jobs never overwrite each other.
  for (let attempt = 0; attempt < 4; attempt++) {
    const branch = await gh(`/repos/${LANDING}/branches/${LEDGER_BRANCH}`, { allow404: true });
    if (!branch) {
      const dev = await gh(`/repos/${LANDING}/git/ref/heads/development`);
      await gh(`/repos/${LANDING}/git/refs`, { method: 'POST', body: { ref: 'refs/heads/' + LEDGER_BRANCH, sha: dev.object.sha } });
    }
    const { ledger, sha } = await readLedger(gh);
    update(ledger);
    try {
      await gh(`/repos/${LANDING}/contents/${LEDGER_FILE}`, {
        method: 'PUT',
        body: { message, branch: LEDGER_BRANCH, content: Buffer.from(JSON.stringify(ledger, null, 2) + '\n').toString('base64'), ...(sha ? { sha } : {}) },
      });
      return ledger;
    } catch (e) {
      if (!/ 409 | 422 /.test(e.message) || attempt === 3) throw e;
    }
  }
}
