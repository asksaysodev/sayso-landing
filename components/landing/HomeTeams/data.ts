/** Copy for the teams section: three value props and the AREG proof card. */
import { AREG_PACE } from '@/lib/content/case-studies/anderson-real-estate-group';

export interface TeamValueProp {
  title: string;
  body: string;
}

export const TEAM_VALUE_PROPS: TeamValueProp[] = [
  {
    title: 'Ramp new agents faster',
    body: 'New agents see the next question on screen during live calls, so they book appointments before they have every script memorized.',
  },
  {
    title: 'Coach every call',
    body: 'Every agent gets guidance on every conversation. Leaders spend their time on the calls that need them.',
  },
  {
    title: 'More from the leads you already pay for',
    body: 'Better conversations turn more of the leads you already buy into booked appointments.',
  },
];

export const TEAM_PROOF = {
  label: 'Case study',
  team: 'Anderson Real Estate Group',
  detail: '50-agent mega team across Long Beach, the Inland Empire and Arizona.',
  statLabel: '2026 pace',
  stat: AREG_PACE.appointments,
  statUnit: 'appointments',
  sub: `${AREG_PACE.moreThan2025} more than 2025.`,
  href: '/case-studies/anderson-real-estate-group/',
  linkText: 'Read the case study',
};
