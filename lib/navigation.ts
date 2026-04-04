export interface NavLink {
  label: string;
  href: string;
  /** If true, this is an external link (opens in new tab) */
  external?: boolean;
}

export interface NavSection {
  label: string;
  links: NavLink[];
}

// ---------------------------------------------------------------------------
// Header navigation — 4 dropdown sections
// ---------------------------------------------------------------------------

export const headerNav: NavSection[] = [
  {
    label: 'Product',
    links: [
      { label: 'Real-Time Coaching', href: '/features/real-time-coaching' },
      { label: 'Objection Handling', href: '/features/objection-handling' },
      { label: 'Call Notes', href: '/features/call-notes' },
      { label: 'Call Grading', href: '/features/call-grading' },
      { label: 'Role Play', href: '/features/role-play' },
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
      { label: 'Integrations', href: '/integrations' },
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
    label: 'Compare',
    links: [
      { label: 'Sayso vs Shilo', href: '/compare/sayso-vs-shilo' },
      { label: 'Sayso vs MaverickRE', href: '/compare/sayso-vs-maverickre' },
      { label: 'AI vs Manual Coaching', href: '/compare/ai-coaching-vs-manual' },
      { label: 'Why Sayso', href: '/why-sayso' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Footer navigation — 6 sections
// ---------------------------------------------------------------------------

export const footerNav: NavSection[] = [
  {
    label: 'Product',
    links: [
      { label: 'Real-Time Coaching', href: '/features/real-time-coaching' },
      { label: 'Objection Handling', href: '/features/objection-handling' },
      { label: 'Call Notes', href: '/features/call-notes' },
      { label: 'Call Grading', href: '/features/call-grading' },
      { label: 'Role Play', href: '/features/role-play' },
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
      { label: 'Integrations', href: '/integrations' },
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
    for (const link of section.links) {
      if (!link.external && link.href.startsWith('/')) {
        hrefs.add(link.href);
      }
    }
  }

  return Array.from(hrefs);
}
