import type { ReactNode } from 'react';

export interface HeroContent {
  headline: string;
  tagline: string;
  /** Optional secondary tagline paragraph rendered below tagline. */
  taglineSub?: string;
  /** Tailwind font-size classes for the headline. Defaults to the full comic-size. */
  headlineSize?: string;
}

export interface MetricItem {
  icon: ReactNode;
  title: string;
  description: string;
  label?: string;
}

export interface TransformationContent {
  headline: string;
  subheading: string;
  metrics: MetricItem[];
}

export interface StepItem {
  title: string;
  description: string;
}

export interface ThreeStepsContent {
  headline: string;
  subheading: string;
  steps: [StepItem, StepItem, StepItem];
}

export interface PersonaContent {
  hero: HeroContent;
  transformation: TransformationContent;
  threeSteps: ThreeStepsContent;
}
