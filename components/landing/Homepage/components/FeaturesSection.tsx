/**
 * Product feature cards, each linking to its product page.
 */

import { features } from '../data';
import { ArrowLink } from './ArrowLink';
import { Card } from './Card';
import { PeekCarousel } from './PeekCarousel';
import { Section } from './Section';

export function FeaturesSection() {
  return (
    <Section id="features" title="With Sayso, You're Unstoppable" alt>
      <PeekCarousel gridClassName="md:grid-cols-2 lg:grid-cols-4" itemLabel="feature">
        {features.map((feature) => (
          <Card key={feature.name}>
            <h3 className="mb-2.5 text-lg md:text-xl font-extrabold text-primary">{feature.name}</h3>
            <p className="-mt-1 mb-2.5 text-xs font-extrabold tracking-[0.08em] uppercase text-cta">
              {feature.tag}
            </p>
            <p className="text-[#515C6C]">{feature.body}</p>
            <ArrowLink href={feature.href} label={`Explore ${feature.name}`} />
          </Card>
        ))}
      </PeekCarousel>
    </Section>
  );
}
