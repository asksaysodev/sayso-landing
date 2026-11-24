/**
 * Topic hubs: one hub page per blog cluster. Each hub links to every live post
 * assigned to it, and every post links back to its hub (BlogPillarUplink).
 *
 * Scheduled posts never appear early: hub lists are built from getAllPostsMeta(),
 * which hides posts whose publishedAt is in the future on production, and the
 * hub pages revalidate hourly like the blog.
 */
import type { BlogPostMeta } from '@/lib/blog';

export type TopicHubId = 'scripts' | 'prospecting' | 'coaching' | 'objections' | 'appointments';

export interface TopicHub {
  id: TopicHubId;
  /** Final URL with trailing slash. */
  href: string;
  /** Short name used in the "part of" link on each post. */
  label: string;
}

export const TOPIC_HUBS: Record<TopicHubId, TopicHub> = {
  scripts: { id: 'scripts', href: '/resources/script-book/', label: 'Real estate script library' },
  prospecting: { id: 'prospecting', href: '/resources/prospecting/', label: 'Prospecting and cold calling resources' },
  coaching: { id: 'coaching', href: '/resources/coaching-and-training/', label: 'Call coaching and training resources' },
  objections: { id: 'objections', href: '/objections/', label: 'Real estate objection library' },
  appointments: { id: 'appointments', href: '/resources/appointments-and-follow-up/', label: 'Appointment setting and follow-up resources' },
};

/** Posts without a cluster, placed by topic. */
const STANDALONE_HUBS: Record<string, TopicHubId> = {
  'do-not-call-rules-real-estate-agents': 'prospecting',
  'i-hate-cold-calling': 'prospecting',
  'how-to-overcome-call-reluctance': 'prospecting',
  'how-to-not-sound-salesy': 'coaching',
  'what-is-live-call-guidance': 'coaching',
};

const CLUSTER_HUBS: Record<string, TopicHubId> = {
  'objection-handling': 'objections',
  'cold-calling': 'prospecting',
  coaching: 'coaching',
  'conversation-skills': 'coaching',
  'appointment-setting': 'appointments',
  'follow-up': 'appointments',
};

/** Script posts that belong with practice and training, not the script library. */
const NOT_SCRIPT_LIBRARY = new Set(['how-to-practice-real-estate-scripts']);

export function hubForPost(post: Pick<BlogPostMeta, 'slug' | 'cluster' | 'type'>): TopicHub {
  if (post.cluster === 'objection-handling') return TOPIC_HUBS.objections;
  if (post.type !== 'pillar' && /script/.test(post.slug) && !NOT_SCRIPT_LIBRARY.has(post.slug)) {
    return TOPIC_HUBS.scripts;
  }
  const id = STANDALONE_HUBS[post.slug] ?? (post.cluster ? CLUSTER_HUBS[post.cluster] : undefined) ?? 'coaching';
  return TOPIC_HUBS[id];
}

export function postsForHub(posts: BlogPostMeta[], id: TopicHubId): BlogPostMeta[] {
  return posts.filter((post) => hubForPost(post).id === id);
}

/**
 * Posts refreshed on Nov 4, 2026 are held until Dec 2 so their 28-day Search
 * Console reading stays clean. Their hub link switches on by itself that day.
 */
const HELD_UNTIL = new Date('2026-12-02T00:00:00-08:00');
const HELD_SLUGS = new Set([
  'expired-listing-scripts',
  'how-to-talk-to-real-estate-leads',
  'circle-prospecting-scripts',
  'real-estate-phone-script-for-leads',
  'fsbo-scripts',
  'how-to-book-appointments-real-estate',
  'how-to-revive-dead-leads',
  'real-estate-cold-calling-guide',
  'appointment-setting-script',
  'real-estate-isa-scripts',
  'real-estate-follow-up-scripts',
  'best-real-estate-call-coaching-software',
]);

export function showHubLink(slug: string, now: Date = new Date()): boolean {
  return !HELD_SLUGS.has(slug) || now >= HELD_UNTIL;
}
