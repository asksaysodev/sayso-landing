/**
 * Shared types for the TestimonialsSection feature.
 */

export type Testimonial = {
  number: number;
  name: string;
  attribution: string;
  badge: string;
  badgeSubtext?: string;
  videoId: string;
  stat: {
    value: string;
    label: string;
  };
  quote: string;
};
