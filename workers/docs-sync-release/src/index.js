// Receives the asksaysodev organization webhook and starts Docs Sync for production releases only.
// Staging and preview deploys, failed deploys and pre-releases are ignored.
const VERCEL_PRODUCTS = new Set(['sayso-web-app', 'sayso-map', 'sayso-composer']);

export function productionRelease(event, p) {
  const repo = p.repository?.name;
  if (event === 'deployment_status') {
    if (p.deployment_status?.state !== 'success') return null;
    const env = p.deployment?.environment;
    if (VERCEL_PRODUCTS.has(repo) && env === 'Production' && p.deployment?.creator?.login === 'vercel[bot]') return { product: repo, sha: p.deployment.sha };
    if (repo === 'sayso-backend' && env === 'sayso-server') return { product: repo, sha: p.deployment.sha };
    return null;
  }
  if (event === 'release' && repo === 'sayso-desktop-app') {
    const r = p.release;
    if (['published', 'released'].includes(p.action) && r && !r.draft && !r.prerelease && /^v\d+\.\d+\.\d+$/.test(r.tag_name)) return { product: repo, sha: r.tag_name };
  }
  return null;
}

async function validSignature(secret, body, header) {
  if (!secret || !header?.startsWith('sha256=')) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body)));
  const hex = [...mac].map((b) => b.toString(16).padStart(2, '0')).join('');
  const given = header.slice(7);
  if (given.length !== hex.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/github') return new Response('Not found', { status: 404 });
    const body = await request.text();
    if (!(await validSignature(env.GITHUB_WEBHOOK_SECRET, body, request.headers.get('x-hub-signature-256')))) {
      return new Response('Bad signature', { status: 401 });
    }
    const event = request.headers.get('x-github-event');
    if (event === 'ping') return new Response('pong');
    const release = productionRelease(event, JSON.parse(body));
    if (!release) return new Response('Ignored', { status: 202 });
    const r = await fetch(`https://api.github.com/repos/${env.LANDING_REPO}/dispatches`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.DISPATCH_TOKEN,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'sayso-docs-sync',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_type: 'production-release', client_payload: release }),
    });
    if (!r.ok) return new Response('Dispatch failed: ' + r.status, { status: 502 });
    return new Response(`Started Docs Sync timer for ${release.product}`);
  },
};
