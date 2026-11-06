/** Agent reviews (each links to the agent's video story) and the team logo marquee under them. */

export interface Review {
  badge: string;
  quote: string;
  name: string;
  team: string;
  firstName: string;
  videoUrl: string;
}

export const REVIEWS: Review[] = [
  {
    badge: 'TOP 250 EXP TEAM',
    quote: 'I felt more confident about where I was going with the conversation.',
    name: 'Alejandro Barrera',
    firstName: 'Alejandro',
    team: 'Anderson Group',
    videoUrl: 'https://www.youtube.com/watch?v=Vcxo-Gp2iOk',
  },
  {
    badge: '#1 EXP TEAM WORLDWIDE',
    quote: 'Sayso has accelerated me by 6 months or more in skills on the phone.',
    name: 'David Simpson',
    firstName: 'David',
    team: 'Whissel-Beer Group',
    videoUrl: 'https://www.youtube.com/watch?v=ktBXjEoyvUc',
  },
  {
    badge: 'TOP 250 EXP TEAM',
    quote: 'Sayso has helped me stay on track and book more appointments.',
    name: 'Cynthia Mejia',
    firstName: 'Cynthia',
    team: 'Anderson Group',
    videoUrl: 'https://www.youtube.com/watch?v=kdEouaQCWLY',
  },
  {
    badge: '2025 ROOKIE OF THE YEAR',
    quote: 'Sayso instills more confidence in my calls.',
    name: 'Nicholas West',
    firstName: 'Nicholas',
    team: 'eXp California and eXp Arizona',
    videoUrl: 'https://www.youtube.com/watch?v=cErlCTC4Li4',
  },
];

export interface TeamLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Team and brokerage logos, as black silhouettes, split across the two marquee rows. */
export const TEAM_LOGO_ROWS: TeamLogo[][] = [
  [
    { src: '/team-logos/anderson-real-estate-group.png', alt: 'Anderson Real Estate Group', width: 191, height: 66 },
    { src: '/team-logos/exp-realty.png', alt: 'eXp Realty', width: 231, height: 120 },
    { src: '/team-logos/every-door-real-estate.png', alt: 'Every Door Real Estate', width: 730, height: 120 },
    { src: '/team-logos/keller-williams.png', alt: 'Keller Williams', width: 265, height: 120 },
    { src: '/team-logos/obsidian-group.png', alt: 'The Obsidian Group', width: 754, height: 120 },
    { src: '/team-logos/real-broker.png', alt: 'Real Broker', width: 189, height: 120 },
    { src: '/team-logos/team-borham.png', alt: 'Team Borham', width: 128, height: 120 },
    { src: '/team-logos/smallegan-real-estate.png', alt: 'Smallegan Real Estate', width: 378, height: 120 },
  ],
  [
    { src: '/team-logos/kw-executive.png', alt: 'KW Executive', width: 360, height: 103 },
    { src: '/team-logos/coldwell-banker.png', alt: 'Coldwell Banker', width: 118, height: 120 },
    { src: '/team-logos/realty-of-america.png', alt: 'Realty of America', width: 262, height: 120 },
    { src: '/team-logos/team-integrity.png', alt: 'Team Integrity', width: 497, height: 118 },
    { src: '/team-logos/dan-chin-homes.png', alt: 'Dan Chin Homes', width: 131, height: 120 },
    { src: '/team-logos/k2-omni-group.png', alt: 'K2 Omni Group', width: 291, height: 120 },
    { src: '/team-logos/team-minik.png', alt: 'Team Minik', width: 168, height: 120 },
    { src: '/team-logos/real-people-realty.png', alt: 'Real People Realty', width: 183, height: 120 },
  ],
];
