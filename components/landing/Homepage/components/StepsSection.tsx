/**
 * "Easy to Use" section: the two steps to get started.
 */

import { steps } from '../data';
import { Card } from './Card';
import { Section } from './Section';

export function StepsSection() {
  return (
    <Section id="how-it-works" title="Easy to Use">
      <ol className="grid grid-cols-2 gap-4 md:gap-6 max-w-[860px] mx-auto">
        {steps.map((step, i) => (
          <li key={step}>
            <Card>
              <span className="self-start mb-4 rounded-md bg-primary px-2.5 py-1.5 text-xs font-extrabold tracking-[0.1em] uppercase text-white">
                Step {i + 1}
              </span>
              <h3 className="text-lg md:text-xl font-extrabold text-primary">{step}</h3>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
