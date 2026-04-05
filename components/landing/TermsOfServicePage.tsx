export function TermsOfServicePage() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#1D4871]/60 mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D4871] leading-tight mb-3">
            Terms and Conditions
          </h1>
          <p className="text-sm text-[#1D4871]/50">Last updated: November 19, 2025</p>
          <div className="mt-6 border-t-2 border-[#FFDE59]" />
        </div>

        {/* Agreement to Terms */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Agreement to Terms
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            These Terms of Use ("Terms") form a legally binding agreement between you ("you") and
            AskSayso, Inc. ("Sayso," "we," "us," or "our") concerning your access to and use of{' '}
            <a href="https://www.asksayso.com" className="text-[#2367EE] hover:underline">
              www.asksayso.com
            </a>{' '}
            and any related applications, browser extensions, integrations, or services we provide
            (collectively, the "Service").
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            By accessing or using the Service, you agree to be bound by these Terms. If you do not
            agree, you must stop using the Service immediately.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We may update these Terms from time to time. Changes take effect when posted, and your
            continued use means you accept the updated Terms.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            The Service is intended for users 18 years of age or older. Persons under 18 are not
            permitted to use the Service.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Intellectual Property Rights */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Intellectual Property Rights
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Unless otherwise noted, the Service, including software, code, design, text, graphics,
            and other content, along with the "Sayso" name, logo, and related marks are the
            property of AskSayso, Inc. or our licensors.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            You may not copy, modify, distribute, display, or create derivative works from our
            content without written permission. We grant you a limited, revocable license to access
            and use the Service for its intended business purposes.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Privacy & Security */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Privacy &amp; Security
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We care about your data privacy and security. Our practices include:
          </p>
          <ul className="space-y-3 text-base text-[#1D4871]/80 leading-relaxed list-none">
            <li>
              <span className="font-semibold text-[#1D4871]">Authentication:</span> Supabase
              Authentication with email/password and row-level security.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Encryption:</span> All data encrypted
              in transit (TLS 1.2+) and at rest (AES-256).
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Access Control:</span> Role-based
              access enforced at the database level.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Compliance Alignment:</span> Designed
              with SOC 2 principles in mind.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Retention:</span> Meeting recordings,
              transcripts, and summaries stored only as long as needed for functionality, then
              securely deleted.
            </li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            By using the Service, you agree to our{' '}
            <a href="/privacy" className="text-[#2367EE] hover:underline">
              Privacy Policy
            </a>
            , which explains how we collect, store, and use your information.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* User Representations */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            User Representations
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            By using the Service, you confirm that:
          </p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>You have the legal authority to agree to these Terms.</li>
            <li>You are at least 18 years old.</li>
            <li>You will not use the Service for any unlawful purpose or in violation of any law.</li>
            <li>
              You will not attempt to access accounts or data you are not authorized to access.
            </li>
            <li>
              You understand the Service is provided "as is" without any guarantee of uninterrupted
              operation.
            </li>
          </ul>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Prohibited Uses */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Prohibited Uses
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">You agree not to:</p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>Use the Service for fraudulent, harmful, or illegal purposes.</li>
            <li>
              Upload malicious code, viruses, or any material that interferes with system security.
            </li>
            <li>
              Attempt to copy, reverse engineer, or extract source code from the Service.
            </li>
            <li>Harass, abuse, or harm other users or Sayso employees.</li>
            <li>
              Use automated tools to collect data from the Service without written permission.
            </li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We may suspend or terminate your account for violations of these Terms. Users are
            expected to follow any rules, laws, or policies that may apply to how they use Sayso,
            including those related to call handling and consent. Sayso does not oversee or verify a
            user's compliance and is not responsible for how the platform is used in practice.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* User Contributions & Feedback */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            User Contributions &amp; Feedback
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            If you submit feedback, suggestions, or other content ("Contributions") to Sayso, you
            grant us a worldwide, royalty-free, perpetual license to use, modify, and distribute
            those Contributions without obligation to you.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            You are solely responsible for the content you provide and for ensuring it does not
            violate the rights of others.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Service Availability */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Service Availability
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We strive to maintain high availability, but the Service may be interrupted for
            maintenance, upgrades, or issues beyond our control. We are not liable for any downtime,
            delays, or data loss that may occur.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Arbitration & Class Action Waiver */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Arbitration &amp; Class Action Waiver
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Any dispute arising out of or relating to these Terms or the Service will be resolved by
            binding arbitration in Delaware before a single arbitrator, under the rules of the
            American Arbitration Association.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            You waive the right to a trial by jury or to participate in a class action. Disputes may
            only be brought on an individual basis. Claims must be filed within one (1) year after
            the cause of action arises.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Limitation of Liability */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Limitation of Liability
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            To the fullest extent permitted by law, AskSayso, Inc., its officers, employees, and
            agents are not liable for indirect, incidental, special, consequential, or punitive
            damages. Our total liability for any claim will not exceed $500 USD or the amount you
            paid us in the 12 months before the claim, whichever is less.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Disclaimer */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">Disclaimer</h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            The Service is provided "as is" and "as available" without warranties of any kind,
            express or implied. We do not guarantee that the Service will be error-free,
            uninterrupted, or free from harmful components.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Governing Law & Jurisdiction */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Governing Law &amp; Jurisdiction
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            These Terms are governed by the laws of the State of Delaware, without regard to
            conflict of law rules. All disputes will be resolved exclusively in the state or federal
            courts located in Delaware, subject to the arbitration terms above.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Contact Information */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Contact Information
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-[#1D4871] mb-2">
                Mailing Address (Customer Inquiries)
              </h3>
              <address className="not-italic text-base text-[#1D4871]/80 leading-relaxed">
                AskSayso, Inc.
                <br />
                PO Box 244
                <br />
                Tolleson, AZ 85353
              </address>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#1D4871] mb-2">
                Registered Agent (Legal Notices)
              </h3>
              <address className="not-italic text-base text-[#1D4871]/80 leading-relaxed">
                Corporation Service Company
                <br />
                251 Little Falls Drive
                <br />
                Wilmington, DE 19808
                <br />
                New Castle County
              </address>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#1D4871] mb-2">Email</h3>
              <a
                href="mailto:support@asksayso.com"
                className="text-[#2367EE] hover:underline text-base"
              >
                support@asksayso.com
              </a>
            </div>
          </div>

          <p className="text-base text-[#1D4871]/80 leading-relaxed pt-4">
            If you violate these Terms, we may suspend or terminate your account without notice and
            pursue any legal remedies available.
          </p>
        </section>

        {/* Bottom spacing */}
        <div className="mt-16" />
      </div>
    </main>
  );
}
