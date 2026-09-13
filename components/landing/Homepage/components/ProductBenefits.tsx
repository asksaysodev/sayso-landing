/** Connect live guidance and structured notes to practical customer benefits. */
import Link from 'next/link';
import { ArrowRight, Check, FileText, MessageCircle, Monitor } from 'lucide-react';
import styles from '../homepage.module.css';

export function ProductBenefits() {
  return (
    <section className={styles.benefits} aria-labelledby="benefits-heading">
      <div className={styles.container}>
        <div className={styles.benefitsHeading}>
          <div><p className={styles.eyebrow}>Support where you feel the friction</p><h2 id="benefits-heading">More room for<br />a real conversation.</h2></div>
          <p>Whether you’re finding your confidence or making calls every day, Sayso helps you turn a good conversation into a clear next step.</p>
        </div>
        <div className={styles.benefitGrid}>
          <article className={styles.guidanceCard}>
            <MessageCircle size={26} aria-hidden="true" />
            <p className={styles.featureLabel}>Live call guidance</p>
            <h3>Find your next words<br />without losing your place.</h3>
            <p>When a question or objection catches you off guard, Sayso suggests a response based on the conversation. Take a glance, make it your own, and keep listening.</p>
            <div className={styles.guidanceExample}><span>A prompt to help you go deeper</span><p>“What would make a move worthwhile for you?”</p></div>
            <Link href="/products/cue" className={styles.textLink}>Explore live guidance <ArrowRight size={17} aria-hidden="true" /></Link>
          </article>
          <article className={styles.notesCard}>
            <FileText size={26} aria-hidden="true" />
            <p className={styles.featureLabel}>Smart Capture</p>
            <h3>Remember what matters<br />without writing it all down.</h3>
            <p>Sayso organizes motivations, concerns, and next steps as you talk. When you hang up, review the notes and bring the context into your CRM.</p>
            <div className={styles.notesExample} aria-label="Illustrative captured notes">
              <span>Example call notes</span>
              <p><Check size={15} aria-hidden="true" /><strong>Priority</strong> More room, same school area</p>
              <p><Check size={15} aria-hidden="true" /><strong>Next step</strong> Confirm a time for Thursday</p>
            </div>
            <Link href="/products/smart-capture" className={styles.textLink}>Explore Smart Capture <ArrowRight size={17} aria-hidden="true" /></Link>
          </article>
        </div>
        <div className={styles.integrationNote}><Monitor size={22} aria-hidden="true" className={styles.integrationIcon} /><p><strong>Keep the tools you already know.</strong> Sayso works alongside your dialer, with structured notes ready for your CRM.</p><Link href="/integrations" className={styles.textLink}>See integrations <ArrowRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
