import SaysoNavbar from '@/components/ui/SaysoNavbar';
import { SocialProofStrip } from '@/components/landing/SocialProofStrip';
import { ProductShowcaseSection } from '@/components/landing/ProductShowcaseSection';
import { ThreeStepsSection } from '@/components/landing/ThreeStepsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { Footer } from '@/components/landing/Footer';
import { SearchSuggestionPill } from '@/components/ui/SearchSuggestionPill';

export default function UIPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Page Header - Sticky Navbar */}
      <div className="pt-4">
        <SaysoNavbar />
      </div>

      {/* Page Title Section */}
      <main className="max-w-[1200px] mx-auto px-6 pt-16 md:pt-20 lg:pt-24 pb-10 md:pb-12">
        <div className="max-w-[52rem] mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-[#1D4871]">
            UI Component Catalog
          </h1>
          <p className="mt-4 text-base md:text-lg lg:text-xl leading-relaxed text-[#1D4871]/80 mx-auto">
            This page showcases all the components used on the Sayso landing page.
          </p>
        </div>
      </main>

      {/* Component: Navbar */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-3">
              SaysoNavbar
            </h2>
            <p className="text-base text-[#1D4871]/70 mb-2">
              <strong>File:</strong> <code className="text-sm bg-[#F4F4F5] px-2 py-1 rounded">components/ui/SaysoNavbar.tsx</code>
            </p>
            <p className="text-base text-[#1D4871]/70">
              Sticky pill-style navigation bar with logo, nav links, and CTA button. Includes mobile menu drawer.
            </p>
          </div>
          <div className="bg-[#F4F4F5] p-8 rounded-2xl">
            <SaysoNavbar />
          </div>
        </div>
      </section>

      {/* Component: Hero Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-3">
              Hero Section
            </h2>
            <p className="text-base text-[#1D4871]/70 mb-2">
              <strong>Location:</strong> Inline in <code className="text-sm bg-[#F4F4F5] px-2 py-1 rounded">app/page.tsx</code>
            </p>
            <p className="text-base text-[#1D4871]/70 mb-4">
              Main hero section with large headline, subhead, and primary/secondary CTAs. Uses custom typography classes.
            </p>
            <div className="bg-[#F4F4F5] p-8 rounded-2xl">
              <div className="max-w-[52rem] mx-auto text-center">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-[#1D4871]">
                  Win the Moment
                </h1>
                <p className="mt-4 text-base md:text-lg lg:text-xl leading-relaxed text-[#1D4871]/80 mx-auto">
                  Guidance that shows up during the call, before the moment passes.
                </p>
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-[42rem] mx-auto">
                  <a
                    href="#book-demo"
                    className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-6 py-3 text-sm md:text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1F5FE0] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2"
                  >
                    Book a demo
                  </a>
                  <a
                    href="#learn-more"
                    className="inline-flex items-center justify-center rounded-full border border-[#1D4871]/20 bg-transparent px-6 py-3 text-sm md:text-base font-semibold text-[#1D4871] transition-all duration-200 hover:bg-[#1D4871]/5 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2"
                  >
                    Learn more about Sayso
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component: SocialProofStrip */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-3">
              SocialProofStrip
            </h2>
            <p className="text-base text-[#1D4871]/70 mb-2">
              <strong>File:</strong> <code className="text-sm bg-[#F4F4F5] px-2 py-1 rounded">components/landing/SocialProofStrip.tsx</code>
            </p>
            <p className="text-base text-[#1D4871]/70">
              Animated marquee component displaying company logos in pill format. Includes smooth scrolling animation with fade edges.
            </p>
          </div>
          <div className="bg-white border border-[#1D4871]/10 rounded-2xl p-4">
            <SocialProofStrip />
          </div>
        </div>
      </section>

      {/* Component: ProductShowcaseSection */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-3">
              ProductShowcaseSection
            </h2>
            <p className="text-base text-[#1D4871]/70 mb-2">
              <strong>File:</strong> <code className="text-sm bg-[#F4F4F5] px-2 py-1 rounded">components/landing/ProductShowcaseSection.tsx</code>
            </p>
            <p className="text-base text-[#1D4871]/70">
              Product mockup section showing a video call interface with overlay UI elements (control pill, suggestion bubble, speaking indicator).
            </p>
          </div>
          <ProductShowcaseSection />
        </div>
      </section>

      {/* Component: ThreeStepsSection */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-3">
              ThreeStepsSection
            </h2>
            <p className="text-base text-[#1D4871]/70 mb-2">
              <strong>File:</strong> <code className="text-sm bg-[#F4F4F5] px-2 py-1 rounded">components/landing/ThreeStepsSection.tsx</code>
            </p>
            <p className="text-base text-[#1D4871]/70">
              Three-step process section with visual cards showing the workflow. Includes curved arrows connecting steps on desktop.
            </p>
          </div>
          <ThreeStepsSection />
        </div>
      </section>

      {/* Component: PricingSection */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-3">
              PricingSection
            </h2>
            <p className="text-base text-[#1D4871]/70 mb-2">
              <strong>File:</strong> <code className="text-sm bg-[#F4F4F5] px-2 py-1 rounded">components/landing/PricingSection.tsx</code>
            </p>
            <p className="text-base text-[#1D4871]/70">
              Pricing cards with three tiers (Free Trial, Standard, Enterprise). Includes &quot;Most Popular&quot; badge and feature lists.
            </p>
          </div>
          <PricingSection />
        </div>
      </section>

      {/* Typography Reference */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-8">
            Typography Reference
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-[#1D4871] mb-3">Hero Headline</h3>
              <div className="bg-[#F4F4F5] p-6 rounded-xl">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-[#1D4871]">
                  Win the Moment
                </h1>
                <p className="mt-4 text-sm text-[#1D4871]/60 font-mono">
                  Classes: <code>text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-[#1D4871]</code>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1D4871] mb-3">Section Headline</h3>
              <div className="bg-[#F4F4F5] p-6 rounded-xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1D4871] mb-4">
                  See the moment before it passes.
                </h2>
                <p className="text-sm text-[#1D4871]/60 font-mono">
                  Classes: <code>text-2xl md:text-3xl lg:text-4xl font-bold text-[#1D4871]</code>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1D4871] mb-3">Body Text</h3>
              <div className="bg-[#F4F4F5] p-6 rounded-xl">
                <p className="text-base md:text-lg text-[#1D4871]/80 max-w-2xl">
                  Guidance that shows up during the call, before the moment passes.
                </p>
                <p className="mt-2 text-sm text-[#1D4871]/60 font-mono">
                  Classes: <code>text-base md:text-lg text-[#1D4871]/80</code>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1D4871] mb-3">Small Text / Eyebrow</h3>
              <div className="bg-[#F4F4F5] p-6 rounded-xl">
                <p className="text-xs md:text-sm tracking-wide text-[#1D4871]/60 uppercase">
                  LIVE DURING THE CALL
                </p>
                <p className="mt-2 text-sm text-[#1D4871]/60 font-mono">
                  Classes: <code>text-xs md:text-sm tracking-wide text-[#1D4871]/60 uppercase</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Button Reference */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-8">
            Button Reference
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-[#1D4871] mb-4">Primary Button</h3>
              <div className="bg-[#F4F4F5] p-6 rounded-xl">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-6 py-3 text-sm md:text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1F5FE0] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2"
                >
                  Book a demo
                </a>
                <p className="mt-4 text-sm text-[#1D4871]/60 font-mono break-all">
                  Classes: <code>inline-flex items-center justify-center rounded-full bg-[#2367EE] px-6 py-3 text-sm md:text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1F5FE0] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2</code>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1D4871] mb-4">Secondary Button</h3>
              <div className="bg-[#F4F4F5] p-6 rounded-xl">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-[#1D4871]/20 bg-transparent px-6 py-3 text-sm md:text-base font-semibold text-[#1D4871] transition-all duration-200 hover:bg-[#1D4871]/5 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2"
                >
                  Learn more about Sayso
                </a>
                <p className="mt-4 text-sm text-[#1D4871]/60 font-mono break-all">
                  Classes: <code>inline-flex items-center justify-center rounded-full border border-[#1D4871]/20 bg-transparent px-6 py-3 text-sm md:text-base font-semibold text-[#1D4871] transition-all duration-200 hover:bg-[#1D4871]/5 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component: SearchSuggestionPill */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-3">
              SearchSuggestionPill
            </h2>
            <p className="text-base text-[#1D4871]/70 mb-2">
              <strong>File:</strong> <code className="text-sm bg-[#F4F4F5] px-2 py-1 rounded">components/ui/SearchSuggestionPill.tsx</code>
            </p>
            <p className="text-base text-[#1D4871]/70">
              Google-style search suggestion pill with blue lightning bolt icon and &quot;sayso&quot; text. Matches the style of Google search suggestions.
            </p>
          </div>
          <div className="bg-[#F4F4F5] p-8 rounded-2xl flex items-center justify-center">
            <SearchSuggestionPill />
          </div>
        </div>
      </section>

      {/* Color Reference */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-8">
            Color Reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#F4F4F5] p-6 rounded-xl border border-[#1D4871]/10">
              <div className="w-full h-16 bg-[#F4F4F5] rounded-lg mb-3 border border-[#1D4871]/10"></div>
              <h3 className="font-semibold text-[#1D4871] mb-1">Background</h3>
              <p className="text-sm text-[#1D4871]/70 font-mono">#F4F4F5</p>
            </div>
            <div className="bg-[#F4F4F5] p-6 rounded-xl border border-[#1D4871]/10">
              <div className="w-full h-16 bg-[#D7DEE1] rounded-lg mb-3 border border-[#1D4871]/10"></div>
              <h3 className="font-semibold text-[#1D4871] mb-1">Accent Background</h3>
              <p className="text-sm text-[#1D4871]/70 font-mono">#D7DEE1</p>
            </div>
            <div className="bg-[#F4F4F5] p-6 rounded-xl border border-[#1D4871]/10">
              <div className="w-full h-16 bg-[#1D4871] rounded-lg mb-3"></div>
              <h3 className="font-semibold text-[#1D4871] mb-1">Primary</h3>
              <p className="text-sm text-[#1D4871]/70 font-mono">#1D4871</p>
            </div>
            <div className="bg-[#F4F4F5] p-6 rounded-xl border border-[#1D4871]/10">
              <div className="w-full h-16 bg-[#2367EE] rounded-lg mb-3"></div>
              <h3 className="font-semibold text-[#1D4871] mb-1">CTA</h3>
              <p className="text-sm text-[#1D4871]/70 font-mono">#2367EE</p>
            </div>
            <div className="bg-[#F4F4F5] p-6 rounded-xl border border-[#1D4871]/10">
              <div className="w-full h-16 bg-[#FFDE59] rounded-lg mb-3 border border-[#1D4871]/10"></div>
              <h3 className="font-semibold text-[#1D4871] mb-1">Accent (Yellow)</h3>
              <p className="text-sm text-[#1D4871]/70 font-mono">#FFDE59</p>
            </div>
            <div className="bg-[#F4F4F5] p-6 rounded-xl border border-[#1D4871]/10">
              <div className="w-full h-16 bg-white rounded-lg mb-3 border border-[#1D4871]/10"></div>
              <h3 className="font-semibold text-[#1D4871] mb-1">White</h3>
              <p className="text-sm text-[#1D4871]/70 font-mono">#FFFFFF</p>
            </div>
          </div>
        </div>
      </section>

      {/* Component: Footer */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871] mb-3">
              Footer
            </h2>
            <p className="text-base text-[#1D4871]/70 mb-2">
              <strong>File:</strong> <code className="text-sm bg-[#F4F4F5] px-2 py-1 rounded">components/landing/Footer.tsx</code>
            </p>
            <p className="text-base text-[#1D4871]/70">
              Minimal footer with logo, description, and organized link columns (Product, Company, Legal). Includes copyright and bottom navigation links.
            </p>
          </div>
          <div className="bg-white border border-[#1D4871]/10 rounded-2xl overflow-hidden">
            <Footer />
          </div>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="py-16"></div>
    </div>
  );
}
