// src/pages/Privacy.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const CONTACT_EMAIL = "Kacper@superfilm.info";

const SECTION_LINKS = [
  { id: "data-controller", label: "1. Data Controller" },
  { id: "eligibility", label: "2. Eligibility" },
  { id: "personal-data", label: "3. Personal Data We Collect" },
  { id: "payments", label: "4. Payments & Subscription Data" },
  { id: "analytics", label: "5. Analytics & Usage Tracking" },
  { id: "advertising", label: "6. Advertising (Future)" },
  { id: "cookies", label: "7. Cookies & Tracking Technologies" },
  { id: "use-of-data", label: "8. How We Use Personal Data" },
  { id: "lawful-bases", label: "9. Lawful Bases for Processing" },
  { id: "automated-decisions", label: "10. Automated Decision-Making" },
  { id: "data-sharing", label: "11. Data Sharing & Third Parties" },
  { id: "international-transfers", label: "12. International Data Transfers" },
  { id: "retention", label: "13. Data Retention" },
  { id: "rights", label: "14. Your Data Rights" },
  { id: "security", label: "15. Security Measures" },
  { id: "childrens-privacy", label: "16. Children’s Privacy" },
  { id: "changes", label: "17. Changes To This Policy" },
  { id: "contact", label: "18. Contact & Complaints" },
];

const LEGAL_ARTICLE_CLASSNAME = [
  "text-zinc-200 leading-relaxed",
  "[&_h2]:mt-10 [&_h2]:scroll-mt-28 [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white",
  "[&_h3]:mt-6 [&_h3]:scroll-mt-28 [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-zinc-100",
  "[&_p]:mt-3 [&_p]:text-sm sm:[&_p]:text-base [&_p]:text-zinc-200",
  "[&_h2:first-child]:mt-0",
  "[&_p:first-child]:mt-0",
  "[&_ul]:mt-3 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5",
  "[&_ol]:mt-3 [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-1.5",
  "[&_li]:text-zinc-200",
  "[&_strong]:text-white",
  "[&_code]:rounded-md [&_code]:bg-black/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:text-zinc-100 [&_code]:ring-1 [&_code]:ring-white/10",
  "[&_a]:text-yellow-400 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-yellow-300",
  "[&_hr]:my-8 [&_hr]:border-white/10",
].join(" ");

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Privacy Policy | SuperFilm</title>
        <meta
          name="description"
          content="Read the SuperFilm Privacy Policy."
        />
        <link rel="canonical" href="https://superfilm.uk/privacy" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur p-6 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              SUPERFILM PRIVACY POLICY
            </h1>
            <p className="mt-2 text-sm text-zinc-400">Last Updated: February 2026</p>
          </header>

          <details className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <summary className="cursor-pointer select-none text-sm font-medium text-zinc-200">
              On this page
            </summary>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {SECTION_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-200 ring-1 ring-white/10 hover:bg-white/5 hover:text-white transition"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </details>

        <article className={LEGAL_ARTICLE_CLASSNAME}>
          <p>
            This Privacy Policy explains how SUPRFILM LTD (“SuperFilm”, “we”,
            “us”, “our”) collects, uses, stores, and protects personal data when
            you access or use SuperFilm (the “Services”).
          </p>
          <p>
            By using the Services, you acknowledge that you have read and
            understood this Privacy Policy.
          </p>

          <h2 id="data-controller">1. Data Controller</h2>
          <p>The data controller responsible for your personal data is:</p>
          <p>
            SUPRFILM LTD
            <br />
            London, United Kingdom
            <br />
            Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <p>
            We have not appointed a formal Data Protection Officer (DPO). All
            privacy enquiries should be directed to the email above.
          </p>

          <h2 id="eligibility">2. Eligibility</h2>
          <p>The Services are strictly limited to individuals aged 18 or over.</p>
          <p>
            We do not knowingly collect personal data from minors. If we become
            aware that data has been collected from an individual under 18, we
            will delete it promptly.
          </p>
          <p>We rely on user self-attestation to confirm age eligibility.</p>

          <h2 id="personal-data">3. Personal Data We Collect</h2>
          <p>We collect only the data necessary to operate and improve the Services.</p>

          <h3>3.1 Account Information</h3>
          <p>When you create an account, we may collect:</p>
          <ul>
            <li>Username</li>
            <li>Email address</li>
            <li>Password (securely encrypted)</li>
            <li>Profile photo</li>
            <li>Bio/profile text</li>
            <li>Billing name (premium users only)</li>
          </ul>
          <p>We do not store precise home addresses.</p>
          <p>Club locations may include city-level information only.</p>

          <h3>3.2 Social &amp; Community Data</h3>
          <p>Because SuperFilm is a social platform, we process:</p>
          <ul>
            <li>Posts and comments</li>
            <li>Film ratings and written takes</li>
            <li>Event attendance records</li>
            <li>Club memberships</li>
            <li>User interactions within clubs</li>
          </ul>

          <h3>3.3 Messaging Data</h3>
          <p>We store:</p>
          <ul>
            <li>Club chat messages</li>
            <li>Message timestamps</li>
            <li>Associated user IDs</li>
          </ul>
          <p>
            Messages are not actively monitored but may be reviewed following
            reports or legal obligations.
          </p>

          <h3>3.4 Media Uploads</h3>
          <p>At present, SuperFilm does not support user uploads of:</p>
          <ul>
            <li>Photos</li>
            <li>Videos</li>
            <li>Audio files</li>
          </ul>
          <p>If media uploads are introduced in the future, this policy will be updated.</p>

          <h3>3.5 Technical &amp; Log Data</h3>
          <p>
            Through Supabase infrastructure and platform security tooling, we
            process technical data including:
          </p>
          <ul>
            <li>IP addresses</li>
            <li>Device and browser information (User-Agent strings)</li>
            <li>Login timestamps</li>
            <li>Authentication audit logs</li>
            <li>API access logs (PostgREST / Edge logs)</li>
            <li>Session metadata (e.g., session_id)</li>
          </ul>
          <p>We do not log raw JWT tokens.</p>
          <p>Technical data is used strictly for:</p>
          <ul>
            <li>Security</li>
            <li>Abuse prevention</li>
            <li>Fraud detection</li>
            <li>System debugging</li>
          </ul>

          <h3>3.6 Moderation &amp; Safety Data</h3>
          <p>Where reports are submitted, we store:</p>
          <ul>
            <li>Reporting user ID</li>
            <li>Reported content</li>
            <li>Message IDs</li>
            <li>Moderation outcomes</li>
          </ul>
          <p>
            Moderation records and banned user records are retained permanently
            for safety and legal defence purposes.
          </p>

          <h2 id="payments">4. Payments &amp; Subscription Data</h2>
          <p>Premium subscriptions (“Director’s Cut”) are processed by Stripe Payments.</p>
          <p>We may store:</p>
          <ul>
            <li>Billing name</li>
            <li>Subscription status</li>
            <li>Plan tier</li>
            <li>Renewal dates</li>
          </ul>
          <p>We do not store:</p>
          <ul>
            <li>Full card numbers</li>
            <li>CVC codes</li>
            <li>Expiry dates</li>
          </ul>
          <p>
            All payment processing is handled by Stripe in accordance with PCI-DSS
            standards.
          </p>
          <p>A 14-day free trial is offered before billing begins.</p>

          <h2 id="analytics">5. Analytics &amp; Usage Tracking</h2>
          <p>We use analytics tools to understand platform performance and user engagement.</p>
          <p>Current analytics providers include:</p>
          <ul>
            <li>Google Analytics</li>
            <li>Supabase system logs</li>
          </ul>
          <p>Analytics may track:</p>
          <ul>
            <li>Page visits</li>
            <li>Session duration</li>
            <li>Feature usage</li>
            <li>Click/impression metrics</li>
          </ul>
          <p>
            We do not currently run advertising analytics but may introduce them
            in the future.
          </p>

          <h2 id="advertising">6. Advertising (Future)</h2>
          <p>SuperFilm does not currently display third-party advertising.</p>
          <p>If advertising is introduced, we may process:</p>
          <ul>
            <li>Ad impressions</li>
            <li>Click metrics</li>
            <li>Engagement analytics</li>
          </ul>
          <p>
            We will update this policy and obtain required consent before
            enabling behavioural advertising.
          </p>

          <h2 id="cookies">7. Cookies &amp; Tracking Technologies</h2>
          <p>We use cookies and similar technologies to operate the Services.</p>

          <h3>7.1 Essential Cookies</h3>
          <p>Required for:</p>
          <ul>
            <li>Login sessions</li>
            <li>Security authentication</li>
            <li>Platform functionality</li>
          </ul>
          <p>These cannot be disabled without breaking core features.</p>

          <h3>7.2 Functional Cookies</h3>
          <p>Used to:</p>
          <ul>
            <li>Remember preferences</li>
            <li>Store UI settings</li>
          </ul>

          <h3>7.3 Analytics Cookies</h3>
          <p>Used by Google Analytics to measure usage patterns and performance.</p>

          <h3>7.4 Advertising Cookies (Future)</h3>
          <p>If ads are introduced, advertising cookies may be used subject to user consent.</p>

          <p>Users may manage cookies through browser settings.</p>
          <p>A consent banner will be displayed where legally required.</p>

          <h2 id="use-of-data">8. How We Use Personal Data</h2>
          <p>We use personal data to:</p>
          <ul>
            <li>Operate and maintain the platform</li>
            <li>Provide social features</li>
            <li>Manage subscriptions</li>
            <li>Prevent abuse and fraud</li>
            <li>Moderate harmful content</li>
            <li>Improve performance and UX</li>
            <li>Respond to support enquiries</li>
          </ul>
          <p>We do not sell personal data.</p>

          <h2 id="lawful-bases">9. Lawful Bases for Processing</h2>
          <p>Under UK GDPR / EU GDPR, we rely on:</p>
          <ul>
            <li>Contractual necessity — to provide the Services</li>
            <li>Legitimate interests — safety, moderation, platform improvement</li>
            <li>Consent — cookies and analytics</li>
            <li>Legal obligation — compliance with law enforcement requests</li>
          </ul>

          <h2 id="automated-decisions">10. Automated Decision-Making</h2>
          <p>SuperFilm does not use automated decision-making systems.</p>
          <p>
            Moderation actions, suspensions, and bans are reviewed and decided
            by human moderators.
          </p>
          <p>
            Automation tools may assist operational workflows but do not
            independently determine enforcement outcomes.
          </p>

          <h2 id="data-sharing">11. Data Sharing &amp; Third Parties</h2>
          <p>We share data only where necessary.</p>
          <p>Key processors include:</p>
          <ul>
            <li>Supabase — database &amp; storage hosting</li>
            <li>Stripe — payment processing</li>
            <li>Google Analytics — usage analytics</li>
            <li>Vercel — hosting infrastructure</li>
            <li>[Email Service Provider — To Be Confirmed]</li>
          </ul>
          <p>We do not share personally identifiable data with advertisers or sponsors.</p>
          <p>Aggregated, anonymised analytics may be shared for reporting purposes.</p>

          <h2 id="international-transfers">12. International Data Transfers</h2>
          <p>Data may be processed outside the United Kingdom.</p>
          <p>Where transfers occur, we implement safeguards including:</p>
          <ul>
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>Encryption in transit and at rest</li>
            <li>Processor compliance agreements</li>
          </ul>

          <h2 id="retention">13. Data Retention</h2>
          <p>We retain personal data as follows:</p>
          <ul>
            <li>Account data — while account remains active</li>
            <li>Deleted accounts — up to 90 days</li>
            <li>Moderation &amp; ban records — permanent</li>
            <li>Technical logs — retained per infrastructure provider policies</li>
          </ul>
          <p>
            Where possible, deleted user content is anonymised rather than erased
            to preserve platform continuity.
          </p>

          <h2 id="rights">14. Your Data Rights</h2>
          <p>Depending on jurisdiction, you may have rights to:</p>
          <ul>
            <li>Access your data</li>
            <li>Correct inaccuracies</li>
            <li>Delete your account</li>
            <li>Restrict processing</li>
            <li>Object to processing</li>
            <li>Request data portability</li>
          </ul>
          <p>Users may self-serve:</p>
          <ul>
            <li>Account deletion</li>
            <li>Profile edits</li>
            <li>Data exports</li>
          </ul>
          <p>
            Additional requests: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <p>We respond within statutory timeframes.</p>

          <h2 id="security">15. Security Measures</h2>
          <p>We implement safeguards including:</p>
          <ul>
            <li>Encryption in transit</li>
            <li>Secure authentication</li>
            <li>Access controls</li>
            <li>Infrastructure monitoring</li>
          </ul>
          <p>
            No system is 100% secure, but we follow industry best practices.
          </p>

          <h2 id="childrens-privacy">16. Children’s Privacy</h2>
          <p>SuperFilm is strictly 18+.</p>
          <p>We do not knowingly process children’s data.</p>
          <p>If discovered, such data will be deleted.</p>

          <h2 id="changes">17. Changes to This Policy</h2>
          <p>We may update this Privacy Policy to reflect:</p>
          <ul>
            <li>Legal changes</li>
            <li>Platform updates</li>
            <li>Infrastructure changes</li>
          </ul>
          <p>Material changes will be communicated via:</p>
          <ul>
            <li>Email</li>
            <li>In-app notification</li>
            <li>Website notice</li>
          </ul>

          <h2 id="contact">18. Contact &amp; Complaints</h2>
          <p>
            Privacy enquiries:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <p>
            You also have the right to lodge complaints with the UK supervisory
            authority:
          </p>
          <p>
            Information Commissioner&apos;s Office
            <br />
            Website: <a href="https://ico.org.uk">https://ico.org.uk</a>
          </p>
        </article>
        </div>
      </div>
    </div>
  );
}
