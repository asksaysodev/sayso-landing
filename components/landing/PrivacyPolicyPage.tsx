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
          <p className="text-sm text-[#1D4871]/50">Last updated: August 7, 2026</p>
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
            <li>
              <span className="font-semibold text-[#1D4871]">Advertising Measurement:</span> We use
              advertising tools, such as the Meta pixel, that collect information about your visit
              and share it with advertising partners to measure and target our advertising. Some
              state laws treat this as "sharing" personal information, and you can opt out as
              described in "Your Rights &amp; Choices" below.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Visitor Identification:</span> We use
              a visitor identification service that may associate your visit with business contact
              information, such as a name, company, or business email, to help us understand who is
              interested in Sayso.
            </li>
          </ul>

          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            When you use Sayso during calls, we also collect and store conversation data. Because
            this is central to how the Service works, we describe it in its own section below.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Conversation Data */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Conversation Data
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            When you use Sayso during a call, the Service processes the conversation in real time to
            surface live cues and capture notes. To provide these features and your session history,
            we create and store a record of each session in your account. A session record may
            include:
          </p>
          <ul className="space-y-3 text-base text-[#1D4871]/80 leading-relaxed list-none">
            <li>
              <span className="font-semibold text-[#1D4871]">Transcripts:</span> A written,
              speaker-labeled transcript of the conversation, with timestamps.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Cues &amp; Insights:</span> The live
              cues Sayso surfaced during the call and the conversation signals that triggered them.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Signal Activity:</span> A log of which
              conversation signals were screened and detected during the call, and when.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Interaction &amp; Reaction Data:</span>{' '}
              The cues and signals Sayso shows during a call, whether they were used, and how call
              participants responded, including timing, sentiment, and shifts in conversation
              signals after a cue. We use this to learn which prompts change conversations.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Notes &amp; Summaries:</span> Notes
              Sayso captured during the conversation and a short summary of the call.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Session Details:</span> Date,
              duration, conversation stages, features used, and, if you connect your CRM, the lead
              the session was linked to.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Outcome Data:</span> Whether an
              appointment was booked, held, signed, or closed, and, where your CRM is connected,
              transaction and commission values plus lead name and record identifiers. We link
              Outcome Data to session records to learn which cues worked.
            </li>
            <li>
              <span className="font-semibold text-[#1D4871]">Market Context:</span> Local market
              statistics for areas discussed during the conversation.
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#1D4871] pt-2">Automated Processing</h3>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Sayso uses automated processing to analyze, in real time, how you and the people you
            speak with respond to prompts and cues, and to score conversation signals. We use this
            to guide the agent and improve our models. This processing does not make legal or
            similarly significant decisions about you.
          </p>

          <h3 className="text-base font-semibold text-[#1D4871] pt-2">
            How We Use Conversation Data
          </h3>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>To provide the Service, including live cues, captured notes, and session history</li>
            <li>To review, test, and improve how Sayso's signals and cues perform</li>
            <li>
              To train, tune, evaluate, and improve Sayso's own proprietary signal, cue, and
              coaching models, using conversation, interaction, reaction, and outcome data
            </li>
            <li>
              To create de-identified and aggregated data, as described in "De-identified &amp;
              Aggregated Data" below
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#1D4871] pt-2">What We Do Not Do</h3>
          <ul className="space-y-2 text-base text-[#1D4871]/80 leading-relaxed pl-5 list-disc">
            <li>We do not sell your identifiable personal information or raw transcripts</li>
            <li>
              We do not use your conversations to train third-party or general-purpose foundation
              models
            </li>
            <li>
              We do not share your transcripts, notes, or session records with anyone outside
              Sayso, except the service providers that help us operate the Service (such as hosting
              and AI processing) under confidentiality and data protection obligations, except
              de-identified and aggregated derivatives as described in "De-identified &amp;
              Aggregated Data" below, or when required by law
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#1D4871] pt-2">
            De-identified &amp; Aggregated Data
          </h3>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We may create, own, license, sell, and disclose de-identified and aggregated data and
            derivatives of conversation, interaction, reaction, and outcome data, including
            cue-and-reaction patterns, benchmarks, and market intelligence, and including in
            industries beyond real estate. We de-identify this data so it can no longer reasonably
            be used to identify you or the people you speak with, and we contractually prohibit
            recipients from attempting to re-identify it.
          </p>

          <h3 className="text-base font-semibold text-[#1D4871] pt-2">People You Speak With</h3>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Transcripts include what the people you speak with say during a conversation. We protect
            that information under this Policy the same way we protect yours.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            By using Sayso, you agree to provide any notice and obtain any consent required by
            applicable law before using Sayso on a call. This covers both the recording or
            transcription of the conversation and the analysis and commercial use of conversation
            data described in this Policy, including in states that require all parties to consent.
            A simple verbal disclosure at the start of a call works, for example: "Just so you
            know, I use software that transcribes and analyzes our conversation so I can serve you
            better. Is that okay with you?"
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            If you spoke with a Sayso user and would like to know what information we hold about
            that conversation, or would like it corrected or deleted, email{' '}
            <a href="mailto:support@asksayso.com" className="text-[#2367EE] hover:underline">
              support@asksayso.com
            </a>
            . We will handle your request under this Policy whether or not you have a Sayso
            account.
          </p>

          <h3 className="text-base font-semibold text-[#1D4871] pt-2">Retention &amp; Deletion</h3>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We retain session records while your account is active. After account closure, we
            delete raw identifiable records within 30 days, except de-identified interaction,
            reaction, signal, and outcome records, and any data already incorporated into trained
            models or aggregates, which we retain. You can request a copy of your conversation
            data, or ask us to delete it, by emailing{' '}
            <a href="mailto:support@asksayso.com" className="text-[#2367EE] hover:underline">
              support@asksayso.com
            </a>
            . See "Your Rights &amp; Choices" below for details.
          </p>
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
            <li>Generate live cues, notes, and session history when you use Sayso on calls</li>
            <li>Process transactions and manage your account</li>
            <li>Respond to inquiries and provide support</li>
            <li>Send service updates, security alerts, and relevant product communications</li>
            <li>Detect, prevent, and address fraud or security threats</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            For how we handle data from your conversations, including de-identified and aggregated
            data, see the "Conversation Data" section above.
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
              <span className="font-semibold text-[#1D4871]">
                Analytics &amp; Advertising Partners:
              </span>{' '}
              With analytics and advertising partners, such as Google and Meta, who collect
              information about your visit through cookies and similar technologies to help us
              analyze site usage and measure and target advertising. You can opt out of this
              sharing as described in "Your Rights &amp; Choices" below.
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
            If you live in a state that gives you the right to opt out of the sale or sharing of
            personal information and you would like to opt out, email your request to{' '}
            <a href="mailto:support@asksayso.com" className="text-[#2367EE] hover:underline">
              support@asksayso.com
            </a>{' '}
            with the subject line "Opt Out Request."
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

        {/* SMS/Text Messaging */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            SMS/Text Messaging
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            From time to time, Sayso may send SMS/text messages to users who have provided consent.
            These messages may include appointment and demo confirmations, scheduling reminders,
            account and service updates, event and webinar reminders, and promotional offers.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Message frequency varies. Message and data rates may apply.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            You may opt out at any time by replying STOP to any message. Reply HELP for assistance
            or contact us at{' '}
            <a href="mailto:support@asksayso.com" className="text-[#2367EE] hover:underline">
              support@asksayso.com
            </a>
            .
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Carriers are not liable for delayed or undelivered messages.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            We do not share SMS opt-in consent data or mobile phone numbers with third parties or
            affiliates for marketing or promotional purposes. Text messaging originator opt-in data
            and consent will not be shared with any third parties, excluding aggregators and
            providers of the Text Message services.
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
