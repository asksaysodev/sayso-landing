import { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';

// Spinner component for loading state
function Spinner({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Icon components (inline SVGs)
function ArrowRightIcon({ className = '' }: { className?: string }) {
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

function PlayIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function HamburgerIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

// Button size types
type ButtonSize = 'sm' | 'md' | 'lg';

// Primary CTA Button Component
function PrimaryButton({
  size = 'md',
  state = 'default',
  children,
  leftIcon,
  rightIcon,
}: {
  size?: ButtonSize;
  state?: 'default' | 'hover' | 'active' | 'loading' | 'disabled';
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2`;

  const stateClasses = {
    default: 'bg-[#2367EE] text-white hover:bg-[#1e56d4] hover:-translate-y-0.5 hover:shadow-sm',
    hover: 'bg-[#1e56d4] text-white -translate-y-0.5 shadow-sm',
    active: 'bg-[#1a4fc0] text-white translate-y-0',
    loading: 'bg-[#2367EE] text-white opacity-75 cursor-not-allowed',
    disabled: 'bg-[#D7DEE1] text-[#1D4871] opacity-50 cursor-not-allowed',
  };

  const isDisabled = state === 'disabled' || state === 'loading';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${stateClasses[state]}`}
      disabled={isDisabled}
      aria-label={typeof children === 'string' ? children : 'Button'}
    >
      {state === 'loading' ? (
        <>
          <Spinner className="w-4 h-4" />
          {children}
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

// Secondary Button (Outline) Component
function SecondaryButton({
  size = 'md',
  state = 'default',
  children,
}: {
  size?: ButtonSize;
  state?: 'default' | 'hover' | 'active' | 'disabled';
  children: ReactNode;
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = `inline-flex items-center justify-center rounded-full font-sans font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2`;

  const stateClasses = {
    default:
      'bg-transparent border border-[#1D4871]/30 text-[#1D4871] hover:bg-[#1D4871]/5 hover:border-[#1D4871]/50',
    hover: 'bg-[#1D4871]/5 border-[#1D4871]/50 text-[#1D4871]',
    active: 'bg-[#1D4871]/10 border-[#1D4871]/60 text-[#1D4871]',
    disabled: 'bg-transparent border-[#D7DEE1] text-[#D7DEE1] cursor-not-allowed opacity-50',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${stateClasses[state]}`}
      disabled={state === 'disabled'}
      aria-label={typeof children === 'string' ? children : 'Button'}
    >
      {children}
    </button>
  );
}

// Tertiary Button (Ghost) Component
function TertiaryButton({
  size = 'md',
  state = 'default',
  children,
}: {
  size?: ButtonSize;
  state?: 'default' | 'hover' | 'active' | 'disabled';
  children: ReactNode;
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = `inline-flex items-center justify-center rounded-full font-sans font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2`;

  const stateClasses = {
    default: 'bg-transparent text-[#1D4871] hover:bg-[#1D4871]/5',
    hover: 'bg-[#1D4871]/5 text-[#1D4871]',
    active: 'bg-[#1D4871]/10 text-[#1D4871]',
    disabled: 'bg-transparent text-[#D7DEE1] cursor-not-allowed opacity-50',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${stateClasses[state]}`}
      disabled={state === 'disabled'}
      aria-label={typeof children === 'string' ? children : 'Button'}
    >
      {children}
    </button>
  );
}

// Text Link Component
function TextLink({
  state = 'default',
  children,
  withArrow = false,
}: {
  state?: 'default' | 'hover' | 'active';
  children: ReactNode;
  withArrow?: boolean;
}) {
  const baseClasses = `inline-flex items-center gap-1 font-sans text-base text-[#1D4871] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2 rounded bg-transparent border-0 cursor-pointer`;

  const stateClasses = {
    default: 'hover:bg-[#1D4871]/5 hover:underline',
    hover: 'bg-[#1D4871]/5 underline',
    active: 'bg-[#1D4871]/10 underline',
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${stateClasses[state]}`}
      aria-label={typeof children === 'string' ? children : 'Link'}
    >
      {children}
      {withArrow && <ArrowRightIcon className="w-4 h-4" />}
    </button>
  );
}

// Icon Button Component
function IconButton({
  icon,
  state = 'default',
  ariaLabel,
}: {
  icon: ReactNode;
  state?: 'default' | 'hover' | 'focus' | 'disabled';
  ariaLabel: string;
}) {
  const baseClasses = `inline-flex items-center justify-center w-10 h-10 rounded-full font-sans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2`;

  const stateClasses = {
    default: 'bg-transparent text-[#1D4871] hover:bg-[#1D4871]/10',
    hover: 'bg-[#1D4871]/10 text-[#1D4871]',
    focus: 'bg-[#1D4871]/10 text-[#1D4871] ring-2 ring-[#2367EE] ring-offset-2',
    disabled: 'bg-transparent text-[#D7DEE1] cursor-not-allowed opacity-50',
  };

  return (
    <button
      className={`${baseClasses} ${stateClasses[state]}`}
      disabled={state === 'disabled'}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}

// Pill/Chip Component
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-sans font-bold bg-[#FFDE59] text-[#1D4871]">
      {children}
    </span>
  );
}

// Button Category Card Component
function ButtonCategoryCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="p-8 rounded-2xl border border-[#1D4871]/10 bg-white shadow-sm"
      style={{ boxShadow: '0 1px 3px 0 rgba(29, 72, 113, 0.05)' }}
    >
      <Heading variant="h3" className="mb-2">
        {title}
      </Heading>
      {description && (
        <Text variant="muted" className="mb-6 text-sm">
          {description}
        </Text>
      )}
      <div className="space-y-6">{children}</div>
    </div>
  );
}

// State Label Component
function StateLabel({ label }: { label: string }) {
  return (
    <p className="text-xs font-sans text-[#1D4871]/60 mt-2 text-center">
      {label}
    </p>
  );
}

// Main Component
export function LandingButtonsSection() {
  return (
    <Section variant="default" className="pt-8 pb-16">
      <Container>
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <Heading variant="h2">Buttons</Heading>
            <Text variant="body" className="max-w-2xl mx-auto">
              Primary actions, secondary actions, and link treatments used across
              the landing page.
            </Text>
          </div>

          {/* A) Primary CTA Button */}
          <ButtonCategoryCard
            title="Primary CTA Button"
            description="Use for: 'Get Started', 'Download Sayso', 'Book a Demo'"
          >
            {/* Sizes */}
            <div>
              <h4 className="text-sm font-sans font-bold text-[#1D4871] mb-4">
                Sizes
              </h4>
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center">
                  <PrimaryButton size="sm">Get Started</PrimaryButton>
                  <StateLabel label="Small" />
                </div>
                <div className="flex flex-col items-center">
                  <PrimaryButton size="md">Get Started</PrimaryButton>
                  <StateLabel label="Medium" />
                </div>
                <div className="flex flex-col items-center">
                  <PrimaryButton size="lg">Get Started</PrimaryButton>
                  <StateLabel label="Large" />
                </div>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h4 className="text-sm font-sans font-bold text-[#1D4871] mb-4">
                With Icons
              </h4>
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center">
                  <PrimaryButton
                    size="md"
                    leftIcon={
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    }
                  >
                    Get Started
                  </PrimaryButton>
                  <StateLabel label="Left Icon" />
                </div>
                <div className="flex flex-col items-center">
                  <PrimaryButton
                    size="md"
                    rightIcon={<ArrowRightIcon className="w-4 h-4" />}
                  >
                    Get Started
                  </PrimaryButton>
                  <StateLabel label="Right Icon" />
                </div>
              </div>
            </div>

            {/* States */}
            <div>
              <h4 className="text-sm font-sans font-bold text-[#1D4871] mb-4">
                States
              </h4>
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center">
                  <PrimaryButton size="md" state="default">
                    Get Started
                  </PrimaryButton>
                  <StateLabel label="Default" />
                </div>
                <div className="flex flex-col items-center">
                  <PrimaryButton size="md" state="hover">
                    Get Started
                  </PrimaryButton>
                  <StateLabel label="Hover" />
                </div>
                <div className="flex flex-col items-center">
                  <PrimaryButton size="md" state="active">
                    Get Started
                  </PrimaryButton>
                  <StateLabel label="Active" />
                </div>
                <div className="flex flex-col items-center">
                  <PrimaryButton size="md" state="loading">
                    Get Started
                  </PrimaryButton>
                  <StateLabel label="Loading" />
                </div>
                <div className="flex flex-col items-center">
                  <PrimaryButton size="md" state="disabled">
                    Get Started
                  </PrimaryButton>
                  <StateLabel label="Disabled" />
                </div>
              </div>
            </div>
          </ButtonCategoryCard>

          {/* B) Secondary Button (Outline) */}
          <ButtonCategoryCard
            title="Secondary Button (Outline)"
            description="Use for: 'Watch demo', 'See pricing'"
          >
            {/* Sizes */}
            <div>
              <h4 className="text-sm font-sans font-bold text-[#1D4871] mb-4">
                Sizes
              </h4>
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center">
                  <SecondaryButton size="sm">Watch Demo</SecondaryButton>
                  <StateLabel label="Small" />
                </div>
                <div className="flex flex-col items-center">
                  <SecondaryButton size="md">Watch Demo</SecondaryButton>
                  <StateLabel label="Medium" />
                </div>
                <div className="flex flex-col items-center">
                  <SecondaryButton size="lg">Watch Demo</SecondaryButton>
                  <StateLabel label="Large" />
                </div>
              </div>
            </div>

            {/* States */}
            <div>
              <h4 className="text-sm font-sans font-bold text-[#1D4871] mb-4">
                States
              </h4>
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center">
                  <SecondaryButton size="md" state="default">
                    Watch Demo
                  </SecondaryButton>
                  <StateLabel label="Default" />
                </div>
                <div className="flex flex-col items-center">
                  <SecondaryButton size="md" state="hover">
                    Watch Demo
                  </SecondaryButton>
                  <StateLabel label="Hover" />
                </div>
                <div className="flex flex-col items-center">
                  <SecondaryButton size="md" state="active">
                    Watch Demo
                  </SecondaryButton>
                  <StateLabel label="Active" />
                </div>
                <div className="flex flex-col items-center">
                  <SecondaryButton size="md" state="disabled">
                    Watch Demo
                  </SecondaryButton>
                  <StateLabel label="Disabled" />
                </div>
              </div>
            </div>
          </ButtonCategoryCard>

          {/* C) Tertiary Button (Ghost) */}
          <ButtonCategoryCard
            title="Tertiary Button (Ghost)"
            description="Use for: low-priority actions"
          >
            {/* Sizes */}
            <div>
              <h4 className="text-sm font-sans font-bold text-[#1D4871] mb-4">
                Sizes
              </h4>
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center">
                  <TertiaryButton size="sm">Learn More</TertiaryButton>
                  <StateLabel label="Small" />
                </div>
                <div className="flex flex-col items-center">
                  <TertiaryButton size="md">Learn More</TertiaryButton>
                  <StateLabel label="Medium" />
                </div>
                <div className="flex flex-col items-center">
                  <TertiaryButton size="lg">Learn More</TertiaryButton>
                  <StateLabel label="Large" />
                </div>
              </div>
            </div>

            {/* States */}
            <div>
              <h4 className="text-sm font-sans font-bold text-[#1D4871] mb-4">
                States
              </h4>
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center">
                  <TertiaryButton size="md" state="default">
                    Learn More
                  </TertiaryButton>
                  <StateLabel label="Default" />
                </div>
                <div className="flex flex-col items-center">
                  <TertiaryButton size="md" state="hover">
                    Learn More
                  </TertiaryButton>
                  <StateLabel label="Hover" />
                </div>
                <div className="flex flex-col items-center">
                  <TertiaryButton size="md" state="active">
                    Learn More
                  </TertiaryButton>
                  <StateLabel label="Active" />
                </div>
                <div className="flex flex-col items-center">
                  <TertiaryButton size="md" state="disabled">
                    Learn More
                  </TertiaryButton>
                  <StateLabel label="Disabled" />
                </div>
              </div>
            </div>
          </ButtonCategoryCard>

          {/* D) Text Link Style */}
          <ButtonCategoryCard
            title="Text Link Style"
            description="Use for: 'Log in', 'Learn more'"
          >
            <div>
              <h4 className="text-sm font-sans font-bold text-[#1D4871] mb-4">
                Variants
              </h4>
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center">
                  <TextLink state="default">Log in</TextLink>
                  <StateLabel label="Default" />
                </div>
                <div className="flex flex-col items-center">
                  <TextLink state="hover">Log in</TextLink>
                  <StateLabel label="Hover" />
                </div>
                <div className="flex flex-col items-center">
                  <TextLink state="active">Log in</TextLink>
                  <StateLabel label="Active" />
                </div>
                <div className="flex flex-col items-center">
                  <TextLink state="default" withArrow>
                    Learn more
                  </TextLink>
                  <StateLabel label="With Arrow" />
                </div>
              </div>
            </div>
          </ButtonCategoryCard>

          {/* E) Icon Button (Ghost circle) */}
          <ButtonCategoryCard
            title="Icon Button (Ghost Circle)"
            description="Use for: close, menu, play icon"
          >
            <div>
              <h4 className="text-sm font-sans font-bold text-[#1D4871] mb-4">
                Icons & States
              </h4>
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center">
                  <IconButton
                    icon={<HamburgerIcon className="w-5 h-5" />}
                    state="default"
                    ariaLabel="Menu"
                  />
                  <StateLabel label="Menu (Default)" />
                </div>
                <div className="flex flex-col items-center">
                  <IconButton
                    icon={<HamburgerIcon className="w-5 h-5" />}
                    state="hover"
                    ariaLabel="Menu"
                  />
                  <StateLabel label="Menu (Hover)" />
                </div>
                <div className="flex flex-col items-center">
                  <IconButton
                    icon={<CloseIcon className="w-5 h-5" />}
                    state="default"
                    ariaLabel="Close"
                  />
                  <StateLabel label="Close (Default)" />
                </div>
                <div className="flex flex-col items-center">
                  <IconButton
                    icon={<CloseIcon className="w-5 h-5" />}
                    state="focus"
                    ariaLabel="Close"
                  />
                  <StateLabel label="Close (Focus)" />
                </div>
                <div className="flex flex-col items-center">
                  <IconButton
                    icon={<PlayIcon className="w-5 h-5" />}
                    state="default"
                    ariaLabel="Play"
                  />
                  <StateLabel label="Play (Default)" />
                </div>
                <div className="flex flex-col items-center">
                  <IconButton
                    icon={<PlayIcon className="w-5 h-5" />}
                    state="disabled"
                    ariaLabel="Play"
                  />
                  <StateLabel label="Play (Disabled)" />
                </div>
              </div>
            </div>
          </ButtonCategoryCard>

          {/* F) Tiny Pill / Chip */}
          <ButtonCategoryCard
            title="Tiny Pill / Chip"
            description="Use sparingly for tiny emphasis (e.g., 'New' label)"
          >
            <div>
              <h4 className="text-sm font-sans font-bold text-[#1D4871] mb-4">
                Example
              </h4>
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center">
                  <Pill>New</Pill>
                  <StateLabel label="New Label" />
                </div>
              </div>
            </div>
          </ButtonCategoryCard>
        </div>
      </Container>
    </Section>
  );
}

// Demo Page Component
export default function DemoPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F4F5' }}>
      <LandingButtonsSection />
    </div>
  );
}
