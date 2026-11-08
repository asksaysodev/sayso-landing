import type { Metadata } from 'next';
import Link from 'next/link';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/Button';
import Carousel from '@/components/ui/Carousel';
import { PageHeader } from '@/components/pages/PageHeader';

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
        <PageHeader
          standalone
          eyebrow={
            <p className="font-comic text-7xl sm:text-8xl text-[#2367EE] leading-none tracking-wide">
              404
            </p>
          }
          title={
            <>
              This page took a <span className="text-[#2367EE]">wrong turn.</span>
            </>
          }
          intro="The link you followed might be broken, or the page may have moved. Here are a few good places to pick things back up."
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/">
              Back to Home
            </Button>
            <Button href="/contact" variant="secondary">
              Report a Broken Link
            </Button>
          </div>
        </PageHeader>

        <section className="w-full px-4 md:px-6 pb-20">
          <Carousel label="Popular pages" itemName="page" className="max-w-[900px] mx-auto" trackClassName="grid grid-cols-2 gap-4">
            {destinations.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group block rounded-[20px] bg-white p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition duration-200"
              >
                <h2 className="font-hero text-lg font-extrabold tracking-[-0.01em] text-[#10233A] group-hover:text-[#2367EE] transition-colors">
                  {d.label}
                </h2>
                <p className="mt-2 text-sm text-[#1D4871]/70 leading-relaxed">
                  {d.description}
                </p>
              </Link>
            ))}
          </Carousel>
        </section>
      </main>
      <Footer />
    </div>
  );
}
