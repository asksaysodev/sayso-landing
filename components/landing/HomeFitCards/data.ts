/** The six Made to fit cards. `art` picks what sits in the gray box at the top of each card. */

export type FitArt =
  | { kind: 'logos'; logos: { src: string; alt: string; width: number; height: number }[] }
  | { kind: 'pills'; items: string[]; small?: boolean }
  | { kind: 'widget' }
  | { kind: 'big'; text: string };

export interface FitCard {
  title: string;
  body: string;
  art: FitArt;
  link?: { label: string; href: string; external?: boolean };
}

export const FIT_CARDS: FitCard[] = [
  {
    title: 'Your CRM stays your CRM',
    body: 'Notes from the call sync to your CRM, so the record is done when you hang up.',
    art: {
      kind: 'logos',
      logos: [
        { src: '/integrations/follow-up-boss-logo.png', alt: 'Follow Up Boss', width: 489, height: 187 },
        { src: '/integrations/suresend-logo-horizontal-blue.png', alt: 'SureSend', width: 1980, height: 391 },
      ],
    },
    link: { label: 'See integrations', href: '/integrations/' },
  },
  {
    title: 'Beside the dialer you use',
    body: 'Sayso floats on top of your existing tools. There is nothing to switch and nothing to migrate.',
    art: {
      kind: 'pills',
      small: true,
      items: ['Mojo Dialer', 'Vulcan7', 'REDX', 'PhoneBurner', 'BatchDialer', 'Kixie', 'Landvoice', 'SureSend'],
    },
    link: { label: 'Dialer guides on the blog', href: '/blog/' },
  },
  {
    title: 'Any lead type',
    body: 'Pick the lead type before you dial and the cues follow the conversation you’re having.',
    art: { kind: 'pills', items: ['Buyers', 'Sellers', 'Investors', 'Renters', 'Expireds', 'FSBOs', 'Sphere'] },
    link: { label: 'Objection library', href: '/objections/' },
  },
  {
    title: 'Your scripts, on screen',
    body: 'Playbook keeps the scripts you already use one click away. Composer helps you write new ones.',
    art: { kind: 'pills', items: ['Introduction', 'Transition', 'Objections'] },
    link: { label: 'About Playbook', href: '/products/playbook/' },
  },
  {
    title: 'Small and out of the way',
    body: 'Drag it anywhere, and minimize or hide it at any point during a call.',
    art: { kind: 'widget' },
  },
  {
    title: 'Set up in minutes',
    body: 'Many agents are set up in less than 5 minutes, with a launch guide, a help center and weekly office hours.',
    art: { kind: 'big', text: '5 MIN' },
    link: { label: 'Help center', href: 'https://asksayso.notion.site/helpcenter', external: true },
  },
];
