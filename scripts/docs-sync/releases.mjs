// Verified production evidence only. Callers retain event identities as well as SHAs.
export const products = ['sayso-desktop-app', 'sayso-web-app', 'sayso-backend', 'sayso-map', 'sayso-composer'];
export const mapProject = 'prj_eW2ksMU5h3MWQCal18fIEILOoBUd';
export const mapTeam = 'team_xB1qUuGI103ezs0hoOHOEWBg';
const shaPattern = /^[0-9a-f]{40}$/;

export function stableRelease(release) {
  const assets = new Set(release.assets.filter(a => a.state === 'uploaded' && a.size > 0).map(a => a.name));
  return !release.draft && !release.prerelease && release.published_at &&
    /^v\d+\.\d+\.\d+$/.test(release.tag_name) && assets.has('latest.yml') &&
    assets.has('latest-mac.yml') && [...assets].some(x => x.endsWith('.exe')) &&
    [...assets].some(x => x.endsWith('.dmg'));
}

export function productionStatus(repo, deploy, status) {
  if (!shaPattern.test(deploy.sha) || status?.state !== 'success') return false;
  if (repo === 'sayso-backend') {
    return deploy.environment === 'sayso-server' &&
      status.environment_url === 'https://sayso-server-5b0876782ec2.herokuapp.com/' &&
      /^https:\/\/dashboard\.heroku\.com\/apps\/sayso-server\/activity\//.test(status.log_url);
  }
  return deploy.environment === 'Production' && deploy.creator?.login === 'vercel[bot]' &&
    status.creator?.login === 'vercel[bot]' && new URL(status.environment_url).hostname.endsWith('.vercel.app');
}

export function verifiedMap(deploy) {
  return (deploy.projectId || deploy.project?.id) === mapProject &&
    deploy.target === 'production' && (deploy.readyState || deploy.state) === 'READY' &&
    deploy.meta?.githubOrg === 'asksaysodev' && deploy.meta?.githubRepo === 'sayso-map' &&
    shaPattern.test(deploy.meta.githubCommitSha);
}

export async function readJson(url, token) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(url, { headers: {Authorization: 'Bearer ' + token},
      signal: AbortSignal.timeout(30000), redirect: 'error' });
    if (response.ok) return response.json();
    if (attempt === 2 || ![429,502,503,504].includes(response.status))
      throw Error('Provider request failed (' + response.status + ')');
    await new Promise(r => setTimeout(r, 1000 * 2 ** attempt));
  }
}

// A full page budget is an error, never an implicit checkpoint across an unknown gap.
export async function* pages(get, path, limit = 20) {
  for (let page = 1; page <= limit; page++) {
    const rows = await get(path + (path.includes('?') ? '&' : '?') + 'per_page=100&page=' + page);
    yield* rows;
    if (rows.length < 100) return;
  }
  throw Error('Reconciliation window exceeds pagination budget');
}

export async function discoverProduct(repo, since, gh, vercel) {
  const events = [];
  if (repo === 'sayso-map') {
    let until = '';
    for (let page = 0; page < 20; page++) {
      const data = await vercel('/v6/deployments?projectId=' + mapProject + '&target=production&state=READY&limit=100&since=' + Date.parse(since) + until);
      for (const d of data.deployments) {
        const detail = await vercel('/v13/deployments/' + encodeURIComponent(d.uid || d.id) + '?');
        if (!verifiedMap(detail)) throw Error('Unexpected Map deployment metadata');
        events.push({id:detail.id, sha:detail.meta.githubCommitSha, time:new Date(d.ready || d.created).toISOString()});
      }
      if (!data.pagination?.next) break;
      if (page === 19) throw Error('Map reconciliation window exceeds pagination budget');
      until = '&until=' + data.pagination.next;
    }
    const live = await vercel('/v13/deployments/sayso-map.vercel.app?');
    if (!verifiedMap(live)) throw Error('Map alias could not be verified');
    return {events, liveSha:live.meta.githubCommitSha};
  }
  if (!products.includes(repo)) throw Error('Unknown product');
  if (repo === 'sayso-desktop-app') {
    for await (const d of pages(gh, '/releases')) {
      if (!stableRelease(d)) continue;
      if (d.published_at < since && events.length) continue;
      const {sha} = await gh('/commits/' + encodeURIComponent(d.tag_name));
      if (!shaPattern.test(sha)) throw Error('Unresolved tag');
      events.push({id:String(d.id),sha,time:d.published_at,version:d.tag_name});
    }
  } else {
    const environment = repo === 'sayso-backend' ? 'sayso-server' : 'Production';
    for await (const d of pages(gh, '/deployments?environment=' + environment)) {
      if (d.created_at < since && events.length) break;
      const statuses = await gh('/deployments/' + d.id + '/statuses?per_page=100');
      for (const s of statuses.filter(s => productionStatus(repo,d,s)))
        events.push({id:d.id + '-' + s.id,sha:d.sha,time:s.created_at});
    }
  }
  events.sort((a,b) => b.time.localeCompare(a.time));
  if (!events.length) throw Error('No successful production evidence for ' + repo);
  return {events, liveSha:events[0].sha};
}
