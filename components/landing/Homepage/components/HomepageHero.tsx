/** Product definition, human promise, and an immediately readable call example. */
import Image from 'next/image';
import { ArrowDown, Check } from 'lucide-react';
import { HomepageActions } from './HomepageActions';
import { CallMomentDemo } from './CallMomentDemo';
import { customerLogos } from '../data';
import styles from '../homepage.module.css';

export function HomepageHero() {
  return (
    <section className={styles.hero} aria-labelledby="homepage-heading">
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.eyebrowDot} /> AI call coaching for real estate agents</p>
            <h1 id="homepage-heading">Stay in the call<br />when the moment<br /><span className={styles.highlight}>matters most.</span></h1>
            <p className={styles.heroDescription}>Sayso listens alongside you, suggests what to say next, and captures the details. You stay focused on the person, with less to juggle during every call.</p>
            <HomepageActions />
            <p className={styles.availability}>Available for Mac <span aria-hidden="true">·</span> Windows waitlist open</p>
            <div className={styles.heroBenefits}>
              <span><Check size={15} aria-hidden="true" /> You lead the conversation</span>
              <span><Check size={15} aria-hidden="true" /> Sayso supports you live</span>
            </div>
          </div>
          <CallMomentDemo />
        </div>
        <div className={styles.trust}>
          <p>Helping agents at teams and brokerages like these</p>
          <div className={styles.logos}>
            {customerLogos.map(logo => <Image key={logo.name} src={logo.src} alt={logo.name} width={150} height={56} className={styles.logo} />)}
          </div>
        </div>
        <a href="#how-it-works" className={styles.explore}>See how Sayso takes the friction out of calling <ArrowDown size={15} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
