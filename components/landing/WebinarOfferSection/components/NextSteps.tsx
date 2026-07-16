/**
 * "What happens after you claim." Three quick steps so people know the flow
 * before they click: claim, book a time, create their account. Keeps the CTA
 * from feeling like a mystery box.
 */

const STEPS: { title: string; body: string }[] = [
  {
    title: 'Claim your offer',
    body: 'Tap the button above to lock in the webinar price for the full year.',
  },
  {
    title: 'Book your time',
    body: 'Pick a slot in the next two days to get on a call and get set up.',
  },
  {
    title: 'Create your account',
    body: 'Once your time is confirmed, you go straight to setting up Sayso.',
  },
];

export function NextSteps() {
  return (
    <section>
      <h2 className="font-comic text-2xl md:text-3xl text-[#1D4871] tracking-wide text-center mb-7">
        What happens after you claim
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
