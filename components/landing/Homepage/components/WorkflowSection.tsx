/** Explain the workflow and connect product features to attention on the call. */
import Link from 'next/link';
import { ArrowRight, FileText, MessageCircle, Monitor } from 'lucide-react';
import { workflowSteps } from '../data';
import styles from '../homepage.module.css';

const icons = [Monitor, MessageCircle, FileText];

export function WorkflowSection() {
  return (
    <section id="how-it-works" className={styles.workflow} aria-labelledby="workflow-heading">
      <div className={styles.container}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>How Sayso fits into your day</p>
          <h2 id="workflow-heading">There’s a person to listen to.<br />Let Sayso help with the rest.</h2>
          <p>Remembering a script, writing notes, and thinking ahead can pull you out of the conversation. Sayso helps you stay with it.</p>
        </div>
        <ol className={styles.steps}>
          {workflowSteps.map((step, index) => {
            const Icon = icons[index];
            return <li key={step.title}>
              <div className={styles.stepTop}><Icon size={23} aria-hidden="true" /><span>0{index + 1}</span></div>
              <h3>{step.title}</h3><p>{step.description}</p>
            </li>;
          })}
        </ol>
        <Link href="/product-tour" className={styles.textLink} data-analytics-id="cta-product-tour-workflow">Walk through a call with Sayso <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
