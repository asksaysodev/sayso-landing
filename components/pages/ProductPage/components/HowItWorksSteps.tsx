/** Numbered "How it works" steps for a product page. */
import { body, column, h2 } from '@/components/pages/contentStyles';
import type { ProductEntry } from '@/lib/content/products/types';

interface HowItWorksStepsProps {
  heading?: string;
  steps: ProductEntry['howItWorks'];
}

export function HowItWorksSteps({ heading, steps }: HowItWorksStepsProps) {
  return (
    <section className={`${column} pb-10`}>
      <h2 className={`${h2} mb-6 mt-10`}>{heading ?? 'How It Works'}</h2>
      <ol className="space-y-5">
        {steps.map((step, index) => (
          <li key={step.step} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2367EE] text-sm font-bold text-white"
            >
              {index + 1}
            </span>
            <div>
              <p className="font-sans text-base font-bold text-[#10233A]">{step.step}</p>
              <p className={`${body} mt-1 !text-[#1D4871]/70`}>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
