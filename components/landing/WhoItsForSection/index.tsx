import { LightningIcon } from '@/components/icons/LightningIcon';

const personas = [
  {
    label: 'Just getting started',
    body: 'You want to prospect more but every call feels like starting from scratch. You know you could book more appointments if you just had more confidence on the call.',
  },
  {
    label: 'Tried scripts before',
    body: "You've tried scripts. You've taken courses. Nothing sticks when you're live with a seller. The pressure makes everything you learned disappear.",
  },
  {
    label: 'Already making calls',
    body: "You're already making calls every day and booking some appointments. But you know you're leaving opportunities on the table because a few objections still trip you up.",
  },
];

export function WhoItsForSection() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] mb-4 tracking-wide">
            <LightningIcon size={24} color="#2367EE" className="inline-block mr-2 -mt-1" />
            Sound Like You?
          </h2>
          <p className="text-[1.2rem] text-[#1D4871]/70 max-w-2xl mx-auto leading-relaxed">
            Sayso is built for agents at every stage of their prospecting journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {personas.map((persona) => (
            <div
              key={persona.label}
              className="bg-[#F8F8FA] rounded-2xl v2-comic-border v2-comic-shadow-sm p-6 flex flex-col gap-3"
            >
              <span className="inline-block bg-[#FFDE59] text-[#1D4871] text-sm font-bold px-3 py-1 rounded-full border-2 border-[#1D4871] self-start">
                {persona.label}
              </span>
              <p className="text-[#1D4871] text-base leading-relaxed">{persona.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
