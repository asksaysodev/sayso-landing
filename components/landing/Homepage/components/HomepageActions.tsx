'use client';

/** Shared homepage calls to action, using the existing download flow. */
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import styles from '../homepage.module.css';

export function HomepageActions({ placement = 'hero' }: { placement?: 'hero' | 'closing' }) {
  const { openSystemSelect } = useDemoCalendar();
  return (
    <div className={styles.actions}>
      <button type="button" onClick={openSystemSelect} className={styles.primaryButton} data-analytics-id={`cta-download-${placement}`}>
        Download Sayso <ArrowRight size={18} aria-hidden="true" />
      </button>
      <Link href={placement === 'hero' ? '/product-tour' : '/demo'} className={styles.secondaryButton} data-analytics-id={`cta-${placement === 'hero' ? 'product-tour' : 'book-demo'}-${placement}`}>
        {placement === 'hero' && <Play size={16} aria-hidden="true" />}
        {placement === 'hero' ? 'See it in action' : 'Book a demo'}
      </Link>
    </div>
  );
}
