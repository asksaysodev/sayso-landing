'use client';

/**
 * Team logo marquee: two rows moving in opposite directions, paused on hover,
 * on keyboard focus, or with the pause button (WCAG 2.2.2).
 * The second copy of each row is decorative and hidden from assistive tech.
 * With reduced motion the rows sit still and wrap.
 */
import { useState } from 'react';
import Image from 'next/image';
import type { TeamLogo } from '../data';
import styles from './LogoMarquee.module.css';

/** Optical sizing: square badges render taller and long wordmarks shorter, so every logo reads at a similar weight. */
function sizeClass({ width, height }: TeamLogo) {
  const ratio = width / height;
  if (ratio < 1.7) return styles.square;
  if (ratio > 4) return styles.wide;
  return '';
}

function LogoRow({ logos, reverse }: { logos: TeamLogo[]; reverse?: boolean }) {
  return (
    <div className={`${styles.track} ${reverse ? styles.reverse : ''}`}>
      {[0, 1].map((copy) => (
        <ul key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
          {logos.map((logo) => (
            <li key={logo.src}>
              <Image
                src={logo.src}
                alt={copy === 1 ? '' : logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="190px"
                className={`${styles.logo} ${sizeClass(logo)}`}
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function LogoMarquee({ rows, label }: { rows: TeamLogo[][]; label: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <div role="region" aria-label={label} className="mt-12">
      <div className={`${styles.marquee} ${paused ? styles.paused : ''}`}>
        {rows.map((logos, i) => (
          <LogoRow key={i} logos={logos} reverse={i % 2 === 1} />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className={styles.pause}
      >
        {paused ? 'Play logos' : 'Pause logos'}
      </button>
    </div>
  );
}
