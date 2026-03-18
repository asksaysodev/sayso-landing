export function SecurityPage() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#1D4871]/60 mb-3">
            Company
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D4871] leading-tight mb-3">
            Sayso Security
          </h1>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Sayso protects your data, your conversations, and your account access at every level.
            Security is built into how the product works, not added after.
          </p>
          <div className="mt-6 border-t-2 border-[#FFDE59]" />
        </div>

        {/* 1. Infrastructure & Encryption */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            1. Infrastructure &amp; Encryption
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Sayso runs on secure, managed infrastructure designed for reliability and protection.
          </p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>Hosted on Heroku (US region)</li>
            <li>Database powered by Supabase (PostgreSQL)</li>
            <li>HTTPS enforced across the platform</li>
            <li>TLS 1.2+ for all connections</li>
            <li>Data encrypted in transit and at rest</li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Your data is protected both while being sent and while stored.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* 2. Authentication & Access */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            2. Authentication &amp; Access
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Access is tightly controlled across the system so only the right users can see the right data.
          </p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>Secure login with Supabase (JWT-based)</li>
            <li>Short-lived session tokens</li>
            <li>Two-factor authentication (2FA) supported</li>
            <li>Server-side validation on every request</li>
            <li>Role-based access controls</li>
            <li>Database-level protection (Row Level Security)</li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            This ensures each account is isolated and protected.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* 3. Application Security */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            3. Application Security
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We actively protect against common vulnerabilities and attacks.
          </p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>Strict security headers (CSP, HSTS, X-Frame-Options)</li>
            <li>Protection against cross-site scripting (XSS)</li>
            <li>Secure API validation and routing</li>
            <li>
              Electron app protections:
              <ul className="mt-2 space-y-1 pl-5 list-disc">
                <li>Context isolation enabled</li>
                <li>Node integration disabled</li>
                <li>Controlled microphone permissions</li>
              </ul>
            </li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            These safeguards reduce risk across both web and desktop environments.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* 4. Call Data */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            4. Call Data
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Sayso processes conversations in real time to provide guidance during calls.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We may store:
          </p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>Transcripts</li>
            <li>Conversation signals</li>
            <li>Notes</li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            This data is encrypted and access-controlled at all times. Call recordings are never
            stored. We only store what is necessary to support the product and improve performance.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* 5. Payments */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            5. Payments
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            All payments are handled through Stripe, a trusted and secure payment provider.
          </p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>Stripe is PCI-compliant</li>
            <li>All transactions are encrypted</li>
            <li>Your billing information is never stored inside Sayso</li>
          </ul>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* 6. Monitoring & Backups */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            6. Monitoring &amp; Backups
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We continuously monitor systems and maintain backups to keep data safe and available.
          </p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>Application and infrastructure logging</li>
            <li>Alerts for unusual activity</li>
            <li>Database backups</li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            These systems help us detect issues early and recover quickly if needed.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* 7. Incident Response */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            7. Incident Response
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            If a security issue occurs, we follow a clear process to resolve it quickly.
          </p>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>Detect and contain the issue</li>
            <li>Fix the root cause</li>
            <li>Restore systems</li>
            <li>Review and improve</li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            If users are impacted, we will notify you within 48 hours.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Contact */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Questions?
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            If you have any questions about security, contact:{' '}
            <a href="mailto:support@asksayso.com" className="text-[#2367EE] hover:underline">
              support@asksayso.com
            </a>
          </p>
        </section>

        {/* Bottom spacing */}
        <div className="mt-16" />
      </div>
    </main>
  );
}
