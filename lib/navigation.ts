export interface NavLink {
  label: string;
  href: string;
  /** If true, this is an external link (opens in new tab) */
  external?: boolean;
  /** Optional subtitle displayed below the label (e.g. feature description) */
  subtitle?: string;
  /** Decorative glyph on featured Resources cards. */
  mark?: string;
  /** Optional data-analytics-id rendered on the link for GTM trigger targeting */
  dataAnalyticsId?: string;
}

export interface NavSection {
  label: string;
  links: NavLink[];
  /** Optional hub page URL - clicking the section label navigates here. */
  href?: string;
}

// ---------------------------------------------------------------------------
// Header navigation
// ---------------------------------------------------------------------------

/** Top-level links shown directly in the navbar. */
export const primaryNav: NavLink[] = [
  { label: 'How it works', href: '/#how' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/#faq' },
];

/** Highlighted links at the top of the Resources menu. */
export const resourcesFeatured: NavLink[] = [
  { label: 'Blog', href: '/blog', subtitle: 'Scripts and call guides', mark: 'B' },
  { label: 'Prospecting Calculator', href: '/tools/prospecting-calculator', subtitle: 'The calls behind your goal', mark: '$' },
  {
    label: 'Free script generator',
    href: 'https://composer.asksayso.com',
    subtitle: 'Custom call scripts',
    mark: 'S',
    external: true,
    dataAnalyticsId: 'nav-composer',
  },
];

/** Columns inside the Resources menu. */
export const headerNav: NavSection[] = [
  {
    label: 'Products',
    href: '/products',
    links: [
      { label: 'Cue', href: '/products/cue', subtitle: 'Real-time context based guidance' },
      { label: 'Smart Capture', href: '/products/smart-capture', subtitle: 'Structured call notes' },
      { label: 'Pulse', href: '/products/pulse', subtitle: 'Live market analysis mid-call' },
      { label: 'Playbook', href: '/products/playbook', subtitle: 'Custom scripts for every scenario' },
    ],
  },
  {
    label: 'Solutions',
    href: '/for',
    links: [
      { label: 'Solo Agents', href: '/for/solo-agents' },
      { label: 'Team Leaders', href: '/for/team-leaders' },
      { label: 'New Agents', href: '/for/new-agents' },
      { label: 'ISAs', href: '/for/isas' },
      { label: 'Integrations', href: '/integrations' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    links: [
      { label: 'About Sayso', href: '/about' },
      { label: 'Why Sayso', href: '/why-sayso' },
      { label: 'How Sayso Compares', href: '/differences' },
      { label: 'Objection Library', href: '/objections' },
      { label: 'Glossary', href: '/glossary' },
    ],
  },
];

/** Hub page linked from the bottom of the Resources menu. */
export const resourcesHubHref = '/resources';

export const loginHref = 'https://app.asksayso.com/login';

// ---------------------------------------------------------------------------
// Footer navigation - 3 columns
// ---------------------------------------------------------------------------

export const footerNav: NavSection[] = [
  {
    label: 'Programs',
    links: [
      { label: 'Early Access Pricing', href: '/founderpricing' },
      { label: 'Referral Program', href: '/referral' },
      { label: 'Affiliate Program', href: '/affiliate' },
    ],
  },
  {
    label: 'Get in Touch',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Request a Demo', href: '/request-demo', dataAnalyticsId: 'request-demo-footer' },
      { label: 'Help Center', href: 'https://asksayso.notion.site/helpcenter', external: true, dataAnalyticsId: 'help-center' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Security', href: '/security' },
    ],
  },
];

export function getAllNavHrefs(): string[] {
  const allSections: NavSection[] = [...headerNav, ...footerNav, { label: 'Primary', href: resourcesHubHref, links: [...primaryNav, ...resourcesFeatured] }];
  const hrefs = new Set<string>();

  for (const section of allSections) {
    if (section.href?.startsWith('/') && !section.href.includes('#')) {
      hrefs.add(section.href);
    }
    for (const link of section.links) {
      if (!link.external && link.href.startsWith('/') && !link.href.includes('#')) {
        hrefs.add(link.href);
      }
    }
  }

  return Array.from(hrefs);
}
