/**
 * "Can You Relate?" section: the three moments where calls go wrong.
 */

import { painPoints } from '../data';
import { Card } from './Card';
import { PeekCarousel } from './PeekCarousel';
import { Section } from './Section';

export function PainPointsSection() {
  return (
    <Section id="problem" title="Can You Relate?">
      <PeekCarousel gridClassName="md:grid-cols-3" itemLabel="example">
        {painPoints.map((point) => (
          <Card key={point.title} className="items-center text-center">
            <h3 className="mb-2.5 text-lg md:text-xl font-extrabold text-primary">{point.title}</h3>
            <p className="text-[#515C6C]">{point.body}</p>
          </Card>
        ))}
      </PeekCarousel>
    </Section>
  );
}
