/** "What Agents Are Saying" quote block for a product page. */
import { column, h2, quote } from '@/components/pages/contentStyles';

export function SocialProof({ text }: { text: string }) {
  return (
    <section className={`${column} pb-10`}>
      <h2 className={`${h2} mb-4 mt-10`}>What Agents Are Saying</h2>
      <blockquote className={quote}>
        <p className="font-sans text-base italic leading-relaxed text-[#10233A]">{text}</p>
      </blockquote>
    </section>
  );
}
