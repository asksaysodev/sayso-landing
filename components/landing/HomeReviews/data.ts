/** Agent reviews (each links to the agent's video story) and the team logos under them. */

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

export const TEAM_LOGOS = [
  { src: '/social-proof/anderson-group.png', alt: 'Anderson Real Estate Group', width: 930, height: 316 },
  { src: '/social-proof/exp-realty.png', alt: 'eXp Realty', width: 988, height: 513 },
  { src: '/social-proof/coldwell-banker.png', alt: 'Coldwell Banker', width: 196, height: 199 },
  { src: '/social-proof/kw-executive.png', alt: 'KW Executive', width: 360, height: 103 },
  { src: '/social-proof/obsidian-group.png', alt: 'The Obsidian Group', width: 1335, height: 278 },
  { src: '/social-proof/exit-realty.png', alt: 'EXIT Realty', width: 839, height: 349 },
  { src: '/social-proof/real-people-realty.png', alt: 'Real People Realty', width: 318, height: 208 },
  { src: '/social-proof/team-borham.png', alt: 'Team Borham', width: 447, height: 355 },
];
