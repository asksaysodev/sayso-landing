/**
 * Static testimonial data rendered by TestimonialsSection.
 * Add new agent testimonials by appending to this array.
 */

import type { Testimonial } from './types';

export const testimonials: Testimonial[] = [
  {
    number: 1,
    name: 'Alejandro Barrera',
    attribution: 'Anderson Real Estate Group, eXp Long Beach',
    badge: 'Top 250 eXp team',
    videoId: 'Vcxo-Gp2iOk',
    stat: {
      value: '12×',
      label: 'more efficient at booking appointments from his calls',
    },
    quote:
      'The prompts were really helping me out, giving me more direction toward booking the appointment. I felt more confident about where I was going with the conversation, and I was just coming up with a solution to give the prospect for the next question.',
  },
  {
    number: 2,
    name: 'David Simpson',
    attribution: 'Whissel-Beer Group, eXp San Diego',
    badge: '#1 eXp Team Worldwide',
    badgeSubtext: 'out of 82,980+ agents',
    videoId: 'ktBXjEoyvUc',
    stat: {
      value: '5 stars',
      label: 'more 5-star calls with Sayso',
    },
    quote:
      'Sayso has accelerated me by 6 months or more in skills on the phone.',
  },
  {
    number: 3,
    name: 'Cynthia Mejia',
    attribution: 'Anderson Real Estate Group, eXp Long Beach',
    badge: 'Top 250 eXp team',
    videoId: 'kdEouaQCWLY',
    stat: {
      value: '1.4',
      label: 'conversations per booked appointment',
    },
    quote:
      'Sayso has helped me stay on track [and] book more appointments.',
  },
  {
    number: 4,
    name: 'Nicholas West',
    attribution: 'eXp California & eXp Phoenix',
    badge: '2025 Salesperson Rookie of the Year',
    videoId: 'cErlCTC4Li4',
    stat: {
      value: 'More',
      label: 'confidence in his calls',
    },
    quote: 'Sayso instills more confidence in my calls.',
  },
];
