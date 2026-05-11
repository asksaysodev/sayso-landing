import { LightningIcon } from '@/components/icons/LightningIcon';

const faqs = [
  {
    question: 'What makes Sayso different from other coaching tools?',
    answer:
      'Sayso coaches you during the call, not after it. Most tools analyze recordings once the conversation ends. Sayso gives you real-time prompts while the prospect is on the phone, so you never have to wonder what to say next.',
  },
  {
    question: 'Does Sayso record my calls?',
    answer:
      'Sayso forwards your call activity and automatically updates your CRM after each conversation. You stay focused on the call while Sayso handles the notes.',
  },
  {
    question: 'Will Sayso distract me while I am on a live call?',
    answer:
      'No. You can minimize or hide the Sayso interface at any point during a call, keeping your focus where it belongs. Agents find that having guidance visible is less stressful than trying to remember scripts on the fly.',
  },
  {
    question: 'Do I need to change my dialer or CRM?',
    answer:
      'No. Sayso works alongside your existing tools. There is nothing to switch, no migration, and no retraining your team on a new platform.',
  },
  {
    question: 'How fast can I get started?',
    answer:
      'Most agents are up and coaching on calls within minutes. There is no long onboarding program, just download Sayso and start your next call.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. Sayso includes a 3-day free trial with no credit card required. Visit the pricing page for full details.',
  },
];

export function FAQSection() {
  return (
    <section className="bg-[#F8F8FA] py-12 md:py-16 lg:py-20 v2-halftone relative">
      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] mb-4 tracking-wide">
            <LightningIcon size={24} color="#2367EE" className="inline-block mr-2 -mt-1" />
            Common Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-white rounded-2xl v2-comic-border v2-comic-shadow-sm p-6"
            >
              <h3 className="font-comic text-[#1D4871] text-lg md:text-xl mb-2 tracking-wide">
                {faq.question}
              </h3>
              <p className="text-[#1D4871]/80 text-base leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
