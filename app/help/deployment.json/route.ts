import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export function GET() {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA;
  const environment = process.env.VERCEL_ENV;
  const headers = { 'Cache-Control': 'no-store' };
  if (!commit || !/^[a-f0-9]{40}$/.test(commit) ||
      (environment !== 'production' && environment !== 'preview')) {
    return NextResponse.json({ error: 'Deployment identity unavailable' }, { status: 503, headers });
  }
  return NextResponse.json({ commit, environment }, { headers });
}
