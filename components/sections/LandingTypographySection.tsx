import { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';

// Helper component for consistent type row layout
function TypeRow({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 py-2.5 border-b border-[#D7DEE1]/30 last:border-0">
      <div className="w-24 flex-shrink-0">
        <p className="text-xs font-sans font-bold text-[#1D4871] mb-0.5">
          {label}
        </p>
        {meta && (
          <p className="text-[10px] font-sans text-[#1D4871]/50 leading-tight">
            {meta}
          </p>
        )}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

// Arrow icon for links
function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// Main Typography Section Component
export function LandingTypographySection() {
  return (
    <Section variant="default" className="pt-6 pb-8">
      <Container>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Section Header */}
          <div className="text-center space-y-1">
            <Heading variant="h2">Typography</Heading>
            <Text variant="body" className="text-sm">
              Type scale and text styles used across the Sayso landing page.
            </Text>
          </div>

          {/* Main Content: 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Headings & Labels */}
            <div className="bg-white rounded-lg border border-[#D7DEE1]/50 p-4 shadow-sm">
              <h3 className="text-sm font-sans font-bold text-[#1D4871] mb-3">
                Headings & Labels
              </h3>
              <div className="space-y-0">
                <TypeRow
                  label="Hero"
                  meta="30px • Bold • 1.2"
                >
                  <p className="text-hero font-hero text-[#1D4871]">
                    Your Real-Time Sales Coach
                  </p>
                </TypeRow>

                <TypeRow
                  label="H1"
                  meta="24px • Bold • 1.3"
                >
                  <h1 className="text-2xl font-sans font-bold text-[#1D4871] leading-tight">
                    Never miss the moment that wins the deal.
                  </h1>
                </TypeRow>

                <TypeRow
                  label="H2"
                  meta="20px • Bold • 1.4"
                >
                  <h2 className="text-xl font-sans font-bold text-[#1D4871] leading-tight">
                    How it works
                  </h2>
                </TypeRow>

                <TypeRow
                  label="H3"
                  meta="18px • Semibold • 1.4"
                >
                  <h3 className="text-lg font-sans font-semibold text-[#1D4871] leading-tight">
                    Real-time prompts during the call
                  </h3>
                </TypeRow>

                <TypeRow
                  label="Eyebrow"
                  meta="12px • Medium • Uppercase"
                >
                  <p className="text-xs font-sans font-medium text-[#1D4871]/70 uppercase tracking-wider">
                    REAL-TIME SALES COACHING
                  </p>
                </TypeRow>
              </div>
            </div>

            {/* Right Column: Body, Links & Inline */}
            <div className="bg-white rounded-lg border border-[#D7DEE1]/50 p-4 shadow-sm">
              <h3 className="text-sm font-sans font-bold text-[#1D4871] mb-3">
                Body, Links & Inline
              </h3>
              <div className="space-y-0">
                <TypeRow
                  label="Body"
                  meta="16px • Regular • 1.5"
                >
                  <p className="text-base font-sans font-normal text-[#1D4871] leading-relaxed">
                    AI-powered coaching that whispers exactly what to say, right
                    when it matters.
                  </p>
                </TypeRow>

                <TypeRow
                  label="Body (Muted)"
                  meta="16px • Regular • 70% opacity"
                >
                  <p className="text-base font-sans font-normal text-[#1D4871]/70 leading-relaxed">
                    Works with your workflow. Stays out of your way.
                  </p>
                </TypeRow>

                <TypeRow
                  label="Small"
                  meta="12px • Regular • 1.4"
                >
                  <p className="text-xs font-sans font-normal text-[#1D4871] leading-relaxed">
                    No clutter. Just the next best thing to say.
                  </p>
                </TypeRow>

                <TypeRow
                  label="Caption"
                  meta="12px • Regular • Muted"
                >
                  <p className="text-xs font-sans font-normal text-[#1D4871]/60 leading-relaxed">
                    Privacy-forward. Built for real calls.
                  </p>
                </TypeRow>

                <TypeRow
                  label="Link"
                  meta="16px • #2367EE"
                >
                  <div className="flex flex-col gap-2">
                    <a
                      href="#"
                      className="text-base font-sans text-[#2367EE] hover:underline inline-flex items-center gap-1 w-fit"
                    >
                      Learn more
                    </a>
                    <a
                      href="#"
                      className="text-base font-sans text-[#2367EE] hover:underline inline-flex items-center gap-1 w-fit"
                    >
                      Watch demo
                      <ArrowIcon className="w-4 h-4" />
                    </a>
                  </div>
                </TypeRow>

                <TypeRow
                  label="Inline Emphasis"
                  meta="Bold + Highlight"
                >
                  <p className="text-base font-sans font-normal text-[#1D4871] leading-relaxed">
                    Win the{' '}
                    <span className="font-bold">moment</span> with{' '}
                    <span className="relative inline-block">
                      real-time
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFDE59]/30"
                        style={{ transform: 'translateY(1px)' }}
                      />
                    </span>{' '}
                    guidance.
                  </p>
                </TypeRow>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// Default export preview wrapper
export default function TypographyPreview() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F4F5' }}>
      <LandingTypographySection />
    </div>
  );
}
