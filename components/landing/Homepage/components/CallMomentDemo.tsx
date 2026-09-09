'use client';

/** A visitor-controlled illustration of a prospect statement, cue, and captured note. */
import { useState } from 'react';
import Image from 'next/image';
import { ArrowDown, Check, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { callMoments } from '../data';
import styles from '../homepage.module.css';

export function CallMomentDemo() {
  const [activeMoment, setActiveMoment] = useState(0);

  return (
    <figure className={styles.demo} aria-label="An example of Sayso helping during a call">
      <div className={styles.demoTopline}>
        <span><Phone size={14} aria-hidden="true" /> During your call</span>
        <span className={styles.exampleLabel}>Illustrative example</span>
      </div>
      <div className={styles.momentButtons} role="group" aria-label="Choose a call moment">
        {callMoments.map((item, index) => (
          <button key={item.label} type="button" aria-pressed={index === activeMoment} aria-controls="call-moment-example" onClick={() => setActiveMoment(index)} data-analytics-id={`homepage-call-moment-${index + 1}`}>
            <span className={styles.momentNumber}>{index + 1}</span>{item.label}
          </button>
        ))}
      </div>
      <div id="call-moment-example" className={styles.sceneStack} aria-live="polite" aria-atomic="true">
        {callMoments.map((moment, index) => (
        <div key={moment.label} className={`${styles.scene} ${index !== activeMoment ? styles.inactiveScene : ''}`} aria-hidden={index !== activeMoment}>
        <div className={styles.prospect}>
          <span className={styles.demoLabel}><MessageCircle size={14} aria-hidden="true" /> Your prospect says</span>
          <p>“{moment.prospect}”</p>
        </div>
        <div className={styles.demoConnector}><ArrowDown size={18} aria-hidden="true" /><span>Sayso helps you respond</span></div>
        <div className={styles.coach}>
          <div className={styles.coachHeader}>
            <Image src="/logos/logo-neg-transparent-horizontal.png" alt="Sayso" width={72} height={29} />
            <span><Sparkles size={12} aria-hidden="true" /> Live guidance</span>
          </div>
          <div className={styles.cue}>
            <span className={styles.cueLabel}>{moment.signal}</span>
            <p>“{moment.cue}”</p>
          </div>
          <p className={styles.coachHint}>Use the suggestion in your own words.</p>
        </div>
        <div className={styles.capture}>
          <span className={styles.captureIcon}><Check size={17} aria-hidden="true" /></span>
          <div><span className={styles.demoLabel}>Smart Capture · {moment.noteLabel}</span><p>{moment.note}</p></div>
        </div>
        <p className={styles.demoCaption}>{moment.explanation}</p>
        </div>
        ))}
      </div>
    </figure>
  );
}
