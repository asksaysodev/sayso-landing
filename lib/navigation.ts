export interface NavLink {
  label: string;
  href: string;
  /** If true, this is an external link (opens in new tab) */
  external?: boolean;
  /** Optional subtitle displayed below the label (e.g. feature description) */
  subtitle?: string;
  /** If true, render indented as a child of the item above (e.g. an integration partner under "Integrations"). */
  indent?: boolean;
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
    label: 'Products',
    href: '/products',
    links: [
      { label: 'Cue', href: '/products/cue', subtitle: 'Real time context based coaching' },
      { label: 'Smart Capture', href: '/products/smart-capture', subtitle: 'Structured call notes' },
      { label: 'Pulse', href: '/products/pulse', subtitle: 'Live market analysis mid-call' },
      { label: 'Playbook', href: '/products/playbook', subtitle: 'Custom scripts for every scenario' },
      // { label: '& More', href: '/feedback', subtitle: 'Submit a feature request' }, // TODO: re-enable when feedback page is ready
      { label: 'Why Sayso', href: '/why-sayso' },
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
      { label: 'Integrations', href: '/integrations' },
      { label: 'Follow Up Boss', href: '/integrations/partners/follow-up-boss', indent: true },
      { label: 'SureSend', href: '/integrations/partners/suresend', indent: true },
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
    label: 'About',
    href: '/about',
    links: [],
  },
  {
    label: 'Log In',
    href: 'https://app.asksayso.com/login',
    links: [],
  },
];

// ---------------------------------------------------------------------------
// Footer navigation - 6 sections
// ---------------------------------------------------------------------------

export const footerNav: NavSection[] = [
  {
    label: 'Products',
    links: [
      { label: 'Cue', href: '/products/cue' },
      { label: 'Smart Capture', href: '/products/smart-capture' },
      { label: 'Pulse', href: '/products/pulse' },
      { label: 'Playbook', href: '/products/playbook' },
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
      { label: 'Follow Up Boss', href: '/integrations/partners/follow-up-boss', indent: true },
      { label: 'SureSend', href: '/integrations/partners/suresend', indent: true },
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
      { label: 'Request a Demo', href: '/request-demo', dataAnalyticsId: 'request-demo-footer' },
      { label: 'Help Center', href: 'https://asksayso.notion.site/helpcenter', external: true, dataAnalyticsId: 'help-center' },
      { label: 'Email Support', href: 'mailto:support@asksayso.com', external: true, dataAnalyticsId: 'contact-email' },
    ],
  },
  {
    label: 'Programs',
    links: [
      { label: 'Early Access Pricing', href: '/founderpricing' },
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
