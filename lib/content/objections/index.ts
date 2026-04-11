import type { ObjectionEntry } from './types';
import { alreadyHaveAnAgent } from './already-have-an-agent';
import { callMeLater } from './call-me-later';
import { justLooking } from './just-looking';
import { marketIsBad } from './market-is-bad';
import { needToThinkAboutIt } from './need-to-think-about-it';
import { notInterested } from './not-interested';
import { notReadyYet } from './not-ready-yet';
import { priceTooHigh } from './price-too-high';
import { wantToSellOurselves } from './want-to-sell-ourselves';

const entries: ObjectionEntry[] = [alreadyHaveAnAgent, callMeLater, justLooking, marketIsBad, needToThinkAboutIt, notInterested, notReadyYet, priceTooHigh, wantToSellOurselves];

export function getAllObjectionEntries(): ObjectionEntry[] {
  return entries;
}

export function getObjectionBySlug(slug: string): ObjectionEntry | null {
  return entries.find((e) => e.slug === slug) ?? null;
}

export function getAllObjectionSlugs(): string[] {
  return entries.map((e) => e.slug);
}

export type { ObjectionEntry } from './types';
