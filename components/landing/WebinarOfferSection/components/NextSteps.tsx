/**
 * "What happens next." Three quick steps so people know the flow before they
 * click: claim, create their account, then book onboarding. Keeps the CTA from
 * feeling like a mystery box.
 */

const STEPS: { title: string; body: string }[] = [
  {
    title: 'Claim your offer',
    body: 'Tap the button to lock in the webinar price forever.',
  },
  {
    title: 'Create your account',
    body: "We'll get to work on getting you leads.",
  },
  {
    title: 'Book your onboarding',
    body: "You'll get the full setup and your curated leads list.",
  },
];

export function NextSteps() {
  return (
    <section>
      <h2 className="font-comic text-2xl md:text-3xl text-[#1D4871] tracking-wide text-center mb-7">
        What happens next
      </h2>
      <ol className="grid gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="bg-white v2-comic-border v2-comic-shadow-sm rounded-2xl p-6"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#FFDE59] text-[#1D4871] font-comic text-lg v2-comic-border mb-4">
              {i + 1}
            </span>
            <p className="font-bold text-[#1D4871] text-base md:text-lg mb-1.5">
              {step.title}
            </p>
            <p className="text-sm text-[#1D4871]/65 leading-relaxed">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
