/** Native, keyboard-accessible disclosures answer practical product questions. */
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { homepageFaqs } from '../data';
import styles from '../homepage.module.css';

export function HomepageFaq() {
  return (
    <section className={styles.faq} aria-labelledby="faq-heading">
      <div className={`${styles.container} ${styles.faqGrid}`}>
        <div><p className={styles.eyebrow}>A few things you might be wondering</p><h2 id="faq-heading">Get to know<br />your call coach.</h2><p className={styles.faqIntro}>Have a question about your setup?<br /><Link href="/demo" className={styles.textLink}>Talk it through with us.</Link></p></div>
        <div className={styles.questions}>
          {homepageFaqs.map(faq => <details key={faq.question}>
            <summary>{faq.question}<Plus size={18} aria-hidden="true" /></summary>
            <p>{faq.answer}{faq.href && <> <Link href={faq.href}>{faq.linkLabel}.</Link></>}</p>
          </details>)}
        </div>
      </div>
    </section>
  );
}
