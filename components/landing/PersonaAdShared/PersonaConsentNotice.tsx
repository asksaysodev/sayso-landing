/**
 * PersonaConsentNotice: fine-print messaging consent shown above the footer on the
 * persona ad landing pages, which collect phone numbers and emails through the demo form.
 */
import Link from 'next/link';

export function PersonaConsentNotice() {
  return (
    <p className="max-w-xl mx-auto px-6 pb-8 text-center text-[11px] leading-relaxed text-[#1D4871]/50">
      By providing your phone number &amp; email, you agree to receive text messages, calls, and/or
      emails from AskSayso, Inc. Message frequency varies. Message and data rates may apply. You can
      reply STOP to unsubscribe and START to resubscribe at any time. Review the{' '}
      <Link href="/terms" className="underline underline-offset-2">Terms</Link> &amp;{' '}
      <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
    </p>
  );
}
