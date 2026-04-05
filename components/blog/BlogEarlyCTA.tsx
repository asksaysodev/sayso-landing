import Link from 'next/link';

export function BlogEarlyCTA() {
  return (
    <div className="bg-[#FFDE59]/20 border-2 border-[#FFDE59] rounded-xl px-6 py-4 mb-8">
      <p className="text-sm font-sans text-[#1D4871]">
        <strong>Want real-time coaching on every call?</strong>{' '}
        <Link href="/demo" className="text-[#2367EE] font-bold hover:underline">
          See how Sayso works &rarr;
        </Link>
      </p>
    </div>
  );
}
