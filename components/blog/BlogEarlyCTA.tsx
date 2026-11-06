import Link from 'next/link';

export function BlogEarlyCTA() {
  return (
    <div className="bg-white rounded-2xl px-6 py-4 mb-8 shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-16px_rgba(16,35,58,0.25)]">
      <p className="text-sm font-sans text-[#1D4871]">
        <strong>Want real-time coaching on every call?</strong>{' '}
        <Link href="/demo/" className="text-[#2367EE] font-bold hover:underline">
          See how Sayso works &rarr;
        </Link>
      </p>
    </div>
  );
}
