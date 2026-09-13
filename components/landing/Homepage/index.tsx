/** Compose the homepage narrative from product definition through customer proof. */
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { HomepageHero } from './components/HomepageHero';
import { WorkflowSection } from './components/WorkflowSection';
import { ProductBenefits } from './components/ProductBenefits';
import { HomepageFaq } from './components/HomepageFaq';
import { ClosingSection } from './components/ClosingSection';
import styles from './homepage.module.css';

export function Homepage() {
  return (
    <main id="main-content" className={styles.homepage}>
      <HomepageHero />
      <WorkflowSection />
      <ProductBenefits />
      <TestimonialsSection />
      <HomepageFaq />
      <ClosingSection />
    </main>
  );
}
