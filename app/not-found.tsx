import type { Metadata } from 'next';
import Link from 'next/link';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    "We couldn't find the page you were looking for. Head back to the Sayso homepage or pick one of the popular destinations below.",
  robots: { index: false, follow: false },
};

const destinations = [
  {
    label: 'Browse the Blog',
    description: 'Real estate scripts, prospecting playbooks, and call coaching guides.',
    href: '/blog',
  },
  {
    label: 'See the Products',
    description: 'Cue, Smart Capture, Pulse, and Playbook walked through end to end.',
    href: '/products',
  },
  {
    label: 'Objection Library',
    description: 'How to respond when prospects push back on a call.',
    href: '/objections',
  },
  {
    label: 'Book a Demo',
    description: 'See how Sayso fits into your call workflow in about 20 minutes.',
    href: '/demo',
  },
];

export default function NotFound() {
  return (
    <div className="relative bg-[#F4F4F5] min-h-screen">
      <SaysoNavbar />
      <main>
        <section className="max-w-[900px] mx-auto px-6 pt-32 pb-10 text-center">
          <p className="font-comic text-7xl sm:text-8xl text-[#2367EE] leading-none tracking-wide">
            404
          </p>
          <h1 className="mt-6 font-comic text-4xl sm:text-5xl lg:text-6xl text-[#1D4871] leading-[1.1] tracking-wide">
            This page took a <span className="text-[#2367EE]">wrong turn.</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-[#1D4871]/75 leading-relaxed max-w-[640px] mx-auto">
            The link you followed might be broken, or the page may have moved. Here are a few good places to pick things back up.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-6 py-3 text-white font-semibold hover:bg-[#1a52c2] transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#1D4871]/20 bg-white px-6 py-3 text-[#1D4871] font-semibold hover:border-[#1D4871]/40 transition-colors"
            >
              Report a Broken Link
            </Link>
          </div>
        </section>

        <section className="w-full px-4 md:px-6 pb-20">
          <div className="max-w-[900px] mx-auto grid gap-4 sm:grid-cols-2">
            {destinations.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#2367EE]/40 transition-all"
              >
                <h2 className="text-lg font-semibold text-[#1D4871] group-hover:text-[#2367EE] transition-colors">
                  {d.label}
                </h2>
                <p className="mt-2 text-sm text-[#1D4871]/70 leading-relaxed">
                  {d.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
