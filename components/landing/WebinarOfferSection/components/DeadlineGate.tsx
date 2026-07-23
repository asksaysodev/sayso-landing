'use client';

/**
 * Gates the whole offer behind the deadline. Once the client evaluates the
 * deadline (from ?d=), a live session sees the offer and an expired one sees the
 * expired state instead. Before mount it renders the offer, so live visitors
 * (the common case) never flash.
 */

import type { ReactNode } from 'react';
import { useDeadline } from './DeadlineProvider';
import { ExpiredState } from './ExpiredState';

export function DeadlineGate({ children }: { children: ReactNode }) {
  const { mounted, expired } = useDeadline();

  if (mounted && expired) return <ExpiredState />;
  return <>{children}</>;
}
