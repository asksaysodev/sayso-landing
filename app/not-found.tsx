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
          <h1 className="mt-6 font-hero font-extrabold tracking-[-0.035em] text-[#10233A] text-[38px] sm:text-5xl lg:text-6xl leading-[1.08]">
            This page took a <span className="text-[#2367EE]">wrong turn.</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-[#1D4871]/75 leading-relaxed max-w-[640px] mx-auto">
            The link you followed might be broken, or the page may have moved. Here are a few good places to pick things back up.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold transition duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 bg-[#2367EE] text-white shadow-[0_1px_2px_rgba(16,35,58,0.18),0_8px_20px_-8px_rgba(35,103,238,0.55)] hover:bg-[#1F5AD6]"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold transition duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_1px_2px_rgba(16,35,58,0.06)] hover:shadow-[0_0_0_1px_rgba(16,35,58,0.22),0_4px_12px_-4px_rgba(16,35,58,0.15)]"
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
                className="group block rounded-[20px] bg-white p-6 shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-16px_rgba(16,35,58,0.25)] hover:shadow-[0_0_0_1px_rgba(16,35,58,0.2),0_20px_40px_-18px_rgba(16,35,58,0.32)] hover:-translate-y-0.5 transition duration-200"
              >
                <h2 className="font-hero text-lg font-extrabold tracking-[-0.01em] text-[#10233A] group-hover:text-[#2367EE] transition-colors">
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
