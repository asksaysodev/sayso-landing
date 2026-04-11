import type { ObjectionEntry } from './types';
import { alreadyHaveAnAgent } from './already-have-an-agent';
import { alreadyListed } from './already-listed';
import { badExperienceWithAgents } from './bad-experience-with-agents';
import { callMeLater } from './call-me-later';
import { howMuchIsYourCommission } from './how-much-is-your-commission';
import { justLooking } from './just-looking';
import { justSendListings } from './just-send-listings';
import { marketIsBad } from './market-is-bad';
import { mySpouseNeedsToDecide } from './my-spouse-needs-to-decide';
import { needToThinkAboutIt } from './need-to-think-about-it';
import { notInterested } from './not-interested';
import { notReadyYet } from './not-ready-yet';
import { priceTooHigh } from './price-too-high';
import { wantToSellOurselves } from './want-to-sell-ourselves';

const entries: ObjectionEntry[] = [alreadyHaveAnAgent, alreadyListed, badExperienceWithAgents, callMeLater, howMuchIsYourCommission, justLooking, justSendListings, marketIsBad, mySpouseNeedsToDecide, needToThinkAboutIt, notInterested, notReadyYet, priceTooHigh, wantToSellOurselves];

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
