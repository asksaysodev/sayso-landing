export interface NavLink {
  label: string;
  href: string;
  /** If true, this is an external link (opens in new tab) */
  external?: boolean;
  /** Optional subtitle displayed below the label (e.g. feature description) */
  subtitle?: string;
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
    label: 'Features',
    href: '/features',
    links: [
      { label: 'Cue', href: '/features/cue', subtitle: 'Real time context based coaching' },
      { label: 'Smart Capture', href: '/features/smart-capture', subtitle: 'Structured call notes' },
      { label: 'Pulse', href: '/features/pulse', subtitle: 'Live market analysis mid-call' },
      { label: 'Playbook', href: '/features/playbook', subtitle: 'Custom scripts for every scenario' },
      { label: '& More', href: '/feedback', subtitle: 'Submit a feature request' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    label: 'Solutions',
    href: '/for',
    links: [
      { label: 'Solo Agents', href: '/for/solo-agents' },
      // { label: 'Team Leaders', href: '/for/team-leaders' }, // TODO: re-enable when page is ready
      // { label: 'New Agents', href: '/for/new-agents' }, // TODO: re-enable when page is ready
      // { label: 'ISAs', href: '/for/isas' }, // TODO: re-enable when page is ready
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
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    label: 'Compare',
    href: '/compare',
    links: [
      { label: 'Sayso vs Shilo', href: '/compare/sayso-vs-shilo' },
      { label: 'Sayso vs MaverickRE', href: '/compare/sayso-vs-maverickre' },
      // { label: 'Sayso vs Manual Coaching', href: '/compare/sayso-vs-manual-coaching' }, // TODO: re-enable when page is ready
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
      // { label: 'Team Leaders', href: '/for/team-leaders' }, // TODO: re-enable when page is ready
      // { label: 'New Agents', href: '/for/new-agents' }, // TODO: re-enable when page is ready
      // { label: 'ISAs', href: '/for/isas' }, // TODO: re-enable when page is ready
      // { label: 'Integrations', href: '/integrations' }, // TODO: re-enable when integrations article is published
    ],
  },
  {
    label: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Objection Library', href: '/objections' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Security', href: '/security' },
      { label: 'Contact', href: '/contact' },
      { label: 'Help', href: 'mailto:support@asksayso.com', external: true },
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
