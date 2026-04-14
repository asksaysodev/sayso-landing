export function PrivacyPolicyPage() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#1D4871]/60 mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D4871] leading-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#1D4871]/50">Last updated: November 7, 2025</p>
          <div className="mt-6 border-t-2 border-[#FFDE59]" />
        </div>

        {/* Introduction */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Introduction
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            AskSayso, Inc. ("Sayso," "we," "us," or "our") values your privacy. This Privacy Policy
            explains what personal information we collect, how we use it, who we share it with, and
            how we protect it when you visit{' '}
            <a href="https://www.asksayso.com" className="text-[#2367EE] hover:underline">
              www.asksayso.com
            </a>{' '}
            or use our related applications, browser extensions, integrations, and services
            (collectively, the "Service").
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            By using the Service, you agree to this Privacy Policy. If you do not agree, you should
            stop using the Service.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            This Policy applies to users who are at least 18 years old. We do not knowingly collect
            information from anyone under the age of 18.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Information We Collect */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Information We Collect
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We collect two types of information:
          </p>
          <ul className="space-y-3 text-base text-[#1D4871]/80 leading-relaxed list-none">
            <li>
              <span className="font-semibold text-[#1D4871]">Personal Information</span>:
              Information that identifies you or can reasonably be linked to you, such as name,
              email address, phone number, billing details, or account credentials.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Non-Personal Information</span>:
              Information that does not identify you directly, such as browser type, device
              information, and aggregated usage data.
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#1D4871] pt-2">
            Information You Provide Voluntarily
          </h3>
          <ul className="space-y-3 text-base text-[#1D4871]/80 leading-relaxed list-none">
            <li>
              <span className="font-semibold text-[#1D4871]">Account Registration:</span> Name,
              email address, password, and other details to set up and manage your account.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Communications:</span> Contact details
              and message content when you email us, fill out a form, or chat with support.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Billing &amp; Transactions:</span>{' '}
              Payment information (processed by secure third-party providers), billing address, and
              purchase history.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Events &amp; Webinars:</span>{' '}
              Registration details if you attend a Sayso-hosted event.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Feedback &amp; Contributions:</span>{' '}
              Information you choose to share when giving feedback or using community features.
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#1D4871] pt-2">
            Information Collected Automatically
          </h3>
          <ul className="space-y-3 text-base text-[#1D4871]/80 leading-relaxed list-none">
            <li>
              <span className="font-semibold text-[#1D4871]">Usage Data:</span> Pages visited,
              features used, time spent, and referring URLs.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Device Data:</span> IP address,
              browser type, operating system, and device identifiers.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Cookies &amp; Tracking:</span> Small
              data files stored on your device to enable functionality, improve performance, and
              analyze usage. We use tools like Google Analytics to better understand user behavior.
              You can adjust cookie settings in your browser.
            </li>
          </ul>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* How We Use Your Information */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            How We Use Your Information
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>Provide, maintain, and improve the Service</li>
            <li>Process transactions and manage your account</li>
            <li>Respond to inquiries and provide support</li>
            <li>Send service updates, security alerts, and relevant product communications</li>
            <li>Detect, prevent, and address fraud or security threats</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We do not sell or rent your personal information to third-party marketers.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* When We Share Information */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            When We Share Information
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We may share your information in the following situations:
          </p>
          <ul className="space-y-3 text-base text-[#1D4871]/80 leading-relaxed list-none">
            <li>
              <span className="font-semibold text-[#1D4871]">Vendors &amp; Service Providers:</span>{' '}
              With trusted third parties who perform services for us (e.g., hosting, analytics,
              payment processing) under contractual confidentiality and data protection obligations.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Legal Requirements:</span> When
              required by law, regulation, or valid legal process.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Business Transfers:</span> In
              connection with a merger, acquisition, or sale of assets.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">To Prevent Harm:</span> When we
              believe disclosure is necessary to prevent fraud, security issues, or potential harm.
            </li>
          </ul>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Your Rights & Choices */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Your Rights &amp; Choices
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Depending on your location, you may have rights under laws such as the California
            Consumer Privacy Act (CCPA) or the EU General Data Protection Regulation (GDPR). These
            may include:
          </p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>Accessing, correcting, or deleting your personal information</li>
            <li>Requesting a copy of your data</li>
            <li>Opting out of certain processing activities</li>
            <li>Withdrawing consent where applicable</li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            You can exercise these rights by emailing{' '}
            <a href="mailto:support@asksayso.com" className="text-[#2367EE] hover:underline">
              support@asksayso.com
            </a>
            . We may need to verify your identity before processing requests. You can also opt out
            of marketing emails by clicking "unsubscribe" in the email footer.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            You have the right to request that we delete personal data we've collected from you.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            If you'd like to submit a data deletion request, you can contact us at{' '}
            <a href="mailto:support@asksayso.com" className="text-[#2367EE] hover:underline">
              support@asksayso.com
            </a>{' '}
            with the subject line "Data Deletion Request." Please include your name, email address,
            and a brief description of your request so we can verify your identity and locate your
            data.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Once verified, we'll delete your data from our active systems and confirm completion
            within 30 days, unless we're required to retain certain information for legal, security,
            or contractual reasons (for example, to comply with financial recordkeeping laws or
            resolve disputes).
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Please note that deleting your data may limit or disable your access to certain Sayso
            products or services that rely on that data.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Children's Privacy */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Children's Privacy
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We do not knowingly collect personal information from individuals under 18. If we learn
            we have collected such information without parental consent, we will delete it.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Security Measures */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Security Measures
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We maintain a security program designed to protect your personal information, including:
          </p>
          <ul className="space-y-3 text-base text-[#1D4871]/80 leading-relaxed list-none">
            <li>
              <span className="font-semibold text-[#1D4871]">Authentication:</span> Supabase
              Authentication with email/password and row-level security
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Encryption:</span> TLS 1.2+ in
              transit, AES-256 at rest
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Access Controls:</span> Role-based
              permissions for all data access
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Vendor Oversight:</span> Security
              requirements for third-party providers
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Incident Response:</span> Procedures
              to investigate and respond to suspected security incidents
            </li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            While we take reasonable measures to protect your information, no system can be
            completely secure.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* International Data Transfers */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            International Data Transfers
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            If you access the Service from outside the United States, your information may be
            transferred to and processed in the U.S. By using the Service, you consent to this
            transfer in accordance with applicable laws.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Changes to This Policy */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Changes to This Policy
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We may update this Privacy Policy from time to time. If we make material changes, we
            will post the updated version on this page and update the "Last updated" date. Your
            continued use of the Service after changes means you accept the revised Policy.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Contact Us */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">Contact Us</h2>

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
              <a href="mailto:support@asksayso.com" className="text-[#2367EE] hover:underline text-base">
                support@asksayso.com
              </a>
            </div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="mt-16" />
      </div>
    </main>
  );
}
