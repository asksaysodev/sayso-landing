/**
 * Shared types for the Homepage feature.
 */

export type AudienceLine = {
  label: string;
  text: string;
};

export type PainPoint = {
  title: string;
  body: string;
};

export type Feature = {
  name: string;
  tag: string;
  body: string;
  href: string;
};

export type Role = {
  id: string;
  tab: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
};
