import Link from 'next/link';

export function BlogEarlyCTA() {
  return (
    <div className="bg-white rounded-2xl px-6 py-4 mb-8 shadow-card">
      <p className="text-sm font-sans text-[#1D4871]">
        <strong>Want real-time guidance on every call?</strong>{' '}
        <Link href="/demo/" className="text-[#2367EE] font-bold hover:underline">
          See how Sayso works &rarr;
        </Link>
      </p>
    </div>
  );
}
