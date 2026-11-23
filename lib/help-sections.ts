/**
 * Help Center structure: the four hub boxes (sections), the folders (groups)
 * inside each, plus the "support" section behind the hub's top strip.
 *
 * Articles live in content/help/<section>/<slug>.mdx. Their frontmatter
 * `group` must be one of the group ids below, or the build fails.
 * Client-safe: no fs imports here.
 */

export interface HelpGroup {
  id: string;
  title: string;
}

export interface HelpSection {
  id: string;
  title: string;
  /** One line under the title on the hub card and the section page. */
  description: string;
  /** Show this section as one of the four hub boxes. */
  hubBox: boolean;
  groups: HelpGroup[];
}

export const HELP_SECTIONS: HelpSection[] = [
  {
    id: 'desktop-app',
    title: 'Desktop app',
    description: 'Install Sayso on Mac or Windows, find it in your menu bar or taskbar, and use the Coach on calls.',
    hubBox: true,
    groups: [
      { id: 'install', title: 'Download and install' },
      { id: 'find-and-open', title: 'Find and open Sayso' },
      { id: 'coach', title: 'The Coach window' },
      { id: 'features', title: 'Cue, Smart Capture, Pulse and Playbooks' },
      { id: 'settings', title: 'Desktop settings' },
      { id: 'troubleshooting', title: 'Desktop troubleshooting' },
    ],
  },
  {
    id: 'web-app',
    title: 'Web app',
    description: 'Your account, Dashboard, Conversations, CRM connections and subscription at app.asksayso.com.',
    hubBox: true,
    groups: [
      { id: 'account', title: 'Account and sign-in' },
      { id: 'dashboard', title: 'Dashboard' },
      { id: 'conversations', title: 'Conversations' },
      { id: 'integrations', title: 'CRM connections' },
      { id: 'billing', title: 'Subscription and billing' },
      { id: 'settings', title: 'Settings' },
    ],
  },
  {
    id: 'agents',
    title: 'For agents',
    description: 'Set up your calls, get the most from live coaching, and follow up after every conversation.',
    hubBox: true,
    groups: [
      { id: 'getting-started', title: 'Getting started' },
      { id: 'on-a-call', title: 'On a call' },
      { id: 'after-a-call', title: 'After a call' },
      { id: 'use-cases', title: 'Coaching by lead type' },
      { id: 'faq', title: 'Agent questions' },
    ],
  },
  {
    id: 'admins',
    title: 'For admins and owners',
    description: 'Invite agents, build teams, set hour caps, read team reports and manage billing.',
    hubBox: true,
    groups: [
      { id: 'roles', title: 'Roles and permissions' },
      { id: 'members', title: 'Agents and invitations' },
      { id: 'teams', title: 'Teams and hours' },
      { id: 'reports', title: 'Reports and team insights' },
      { id: 'company-billing', title: 'Company and billing' },
      { id: 'faq', title: 'Admin questions' },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    description: 'Office hours, bug reports, logs, privacy and what is new in Sayso.',
    hubBox: false,
    groups: [
      { id: 'contact', title: 'Get help' },
      { id: 'privacy', title: 'Privacy and security' },
      { id: 'reference', title: 'Reference' },
      { id: 'whats-new', title: "What's new" },
    ],
  },
];

export function getHelpSection(id: string): HelpSection | undefined {
  return HELP_SECTIONS.find((s) => s.id === id);
}

/** Office hours and support contact shown on the hub and in articles. */
export const HELP_SUPPORT = {
  email: 'support@asksayso.com',
  officeHoursSchedule: 'Every Wednesday at 11am PT / 2pm ET',
  officeHoursUrl: 'https://meet.google.com/nyf-nfyz-okr',
};
