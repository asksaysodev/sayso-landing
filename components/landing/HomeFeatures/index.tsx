/**
 * Features: an app-style panel that walks through Cue, Smart Capture, Pulse
 * and Playbook, each shown with the real widget.
 */
import { SectionHead } from '../HomeShared/SectionHead';
import { section, soft, wash, wrap } from '../HomeShared/styles';
import { FeatureApp } from './components/FeatureApp';

export function HomeFeatures() {
  return (
    <section id="features" className={`${section} ${wash}`} aria-labelledby="features-title">
      <div className={wrap}>
        <SectionHead
          id="features-title"
          title={
            <>
              Everything you need, <span className={soft}>one glance away.</span>
            </>
          }
        />
        <FeatureApp />
      </div>
    </section>
  );
}
