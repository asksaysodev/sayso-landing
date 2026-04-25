export interface NavLink {
  label: string;
  href: string;
  /** If true, this is an external link (opens in new tab) */
  external?: boolean;
  /** Optional subtitle displayed below the label (e.g. feature description) */
  subtitle?: string;
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
// Header navigation - 4 dropdown sections
// ---------------------------------------------------------------------------

export const headerNav: NavSection[] = [
  {
    label: 'Home',
    href: '/',
    links: [],
  },
  {
    label: 'Features',
    href: '/features',
    links: [
      { label: 'Cue', href: '/features/cue', subtitle: 'Real time context based coaching' },
      { label: 'Smart Capture', href: '/features/smart-capture', subtitle: 'Structured call notes' },
      { label: 'Pulse', href: '/features/pulse', subtitle: 'Live market analysis mid-call' },
      { label: 'Playbook', href: '/features/playbook', subtitle: 'Custom scripts for every scenario' },
      // { label: '& More', href: '/feedback', subtitle: 'Submit a feature request' }, // TODO: re-enable when feedback page is ready
      { label: 'Pricing', href: '/pricing' },
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
      // { label: 'Integrations', href: '/integrations' }, // TODO: re-enable when integrations article is published
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Objection Library', href: '/objections' },
      { label: 'Glossary', href: '/glossary' },
    ],
  },
  {
    label: 'Compare',
    href: '/compare',
    links: [
      { label: 'Sayso vs Shilo', href: '/compare/sayso-vs-shilo' },
      { label: 'Sayso vs MaverickRE', href: '/compare/sayso-vs-maverickre' },
      { label: 'Sayso vs Manual Coaching', href: '/compare/sayso-vs-manual-coaching' },
      { label: 'Why Sayso', href: '/why-sayso' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    links: [],
  },
];

// ---------------------------------------------------------------------------
// Footer navigation - 6 sections
// ---------------------------------------------------------------------------

export const footerNav: NavSection[] = [
  {
    label: 'Features',
    links: [
      { label: 'Cue', href: '/features/cue' },
      { label: 'Smart Capture', href: '/features/smart-capture' },
      { label: 'Pulse', href: '/features/pulse' },
      { label: 'Playbook', href: '/features/playbook' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    label: 'Solutions',
    links: [
      { label: 'Solo Agents', href: '/for/solo-agents' },
      { label: 'Team Leaders', href: '/for/team-leaders' },
      { label: 'New Agents', href: '/for/new-agents' },
      { label: 'ISAs', href: '/for/isas' },
      // { label: 'Integrations', href: '/integrations' }, // TODO: re-enable when integrations article is published
    ],
  },
  {
    label: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Objection Library', href: '/objections' },
      { label: 'Glossary', href: '/glossary' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Security', href: '/security' },
      { label: 'Contact', href: '/contact' },
      { label: 'Help Center', href: 'https://alert-tartan-008.notion.site/Sayso-Help-Center-34c4de40046881b4a4f5d48299b4d784', external: true, dataAnalyticsId: 'help-center' },
      { label: 'Email Support', href: 'mailto:support@asksayso.com', external: true, dataAnalyticsId: 'contact-email' },
    ],
  },
  {
    label: 'Programs',
    links: [
      { label: 'Referral Program', href: '/referral' },
      { label: 'Affiliate Program', href: '/affiliate' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper: extract all unique hrefs from nav sections (for sitemap, etc.)
// ---------------------------------------------------------------------------

export function getAllNavHrefs(): string[] {
  const allSections = [...headerNav, ...footerNav];
  const hrefs = new Set<string>();

  for (const section of allSections) {
    if (section.href?.startsWith('/')) {
      hrefs.add(section.href);
    }
    for (const link of section.links) {
      if (!link.external && link.href.startsWith('/')) {
        hrefs.add(link.href);
      }
    }
  }

  return Array.from(hrefs);
}
