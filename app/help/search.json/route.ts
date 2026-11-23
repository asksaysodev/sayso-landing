import { NextResponse } from 'next/server';
import { getHelpSearchIndex } from '@/lib/help';

// Built once at build time; the search dialog fetches it on first open.
export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(getHelpSearchIndex());
}
