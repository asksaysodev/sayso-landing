/** A final invitation after the product explanation and customer evidence. */
import { HomepageActions } from './HomepageActions';
import styles from '../homepage.module.css';

export function ClosingSection() {
  return (
    <section className={styles.closing} aria-labelledby="closing-heading">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Be there for the moment</p>
        <h2 id="closing-heading">Your next call deserves<br />your full attention.</h2>
        <p>Bring Sayso along for the guidance and notes.<br />Bring yourself to the conversation.</p>
        <HomepageActions placement="closing" />
        <p className={styles.availability}>Available for Mac · Windows waitlist open</p>
      </div>
    </section>
  );
}
