// src/pages/Terms.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "Kacper@superfilm.info";
const LAST_UPDATED = "February 11, 2026";

const SECTION_LINKS = [
  { id: "introduction", label: "1. Introduction" },
  { id: "eligibility-accounts", label: "2. Eligibility & Accounts" },
  { id: "user-generated-content", label: "3. User-Generated Content" },
  { id: "content-standards", label: "4. Content Standards" },
  { id: "events-meetups", label: "5. Events & Meetups" },
  { id: "verification-safety", label: "6. Verification & Safety" },
  { id: "intellectual-property", label: "7. Intellectual Property" },
  { id: "payments-fees", label: "8. Payments & Fees" },
  { id: "advertising-sponsorship", label: "9. Advertising & Sponsorship" },
  { id: "logo-use", label: "10. Logo Use" },
  { id: "moderation", label: "11. Moderation" },
  { id: "data-privacy", label: "12. Data & Privacy" },
  { id: "third-party-links", label: "13. Third-Party Links" },
  { id: "liability-disclaimers", label: "14. Liability & Disclaimers" },
  { id: "indemnity", label: "15. Indemnity" },
  { id: "governing-law", label: "16. Governing Law" },
  { id: "changes-to-terms", label: "17. Changes To Terms" },
  { id: "accessibility", label: "18. Accessibility" },
  { id: "export-sanctions", label: "19. Export & Sanctions" },
  { id: "platform-role", label: "20. Platform Role Disclaimer" },
  { id: "contact", label: "21. Contact" },
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

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Terms | SuperFilm</title>
        <meta
          name="description"
          content="Read the SuperFilm Terms & Conditions."
        />
        <link rel="canonical" href="https://superfilm.uk/terms" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur p-6 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              SUPERFILM TERMS &amp; CONDITIONS
            </h1>
            <p className="mt-2 text-sm text-zinc-400">Last Updated: {LAST_UPDATED}</p>
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
          <h2 id="introduction">1. INTRODUCTION</h2>
          <h3>1.1 Agreement</h3>
          <p>Welcome to SuperFilm’s User Agreement (“Terms”).</p>
          <p>
            By accessing or using SuperFilm.uk and any application, API, website,
            product, or service operated by <strong>SUPRFILM LTD</strong>{" "}
            (“SUPRFILM LTD”, “SuperFilm”, “we”, “us”, “our”), you agree to be
            bound by these Terms.
          </p>
          <p>
            All platforms, features, and related services are collectively
            referred to as the <strong>“Services.”</strong>
          </p>
          <p>If you do not agree to these Terms, you must not access or use the Services.</p>

          <h3>1.2 Access &amp; Age Requirement</h3>
          <p>
            No individual under the age of <strong>18</strong> is permitted to
            create an Account or use the Services.
          </p>
          <p>By using the Services, you represent and warrant that:</p>
          <ul>
            <li>You are at least 18 years of age;</li>
            <li>You have the legal capacity and competence to form a binding contract;</li>
            <li>You are not barred from using the Services under applicable law;</li>
            <li>You have not been permanently suspended or removed previously.</li>
          </ul>
          <p>
            If accepting these Terms on behalf of an organisation, you confirm
            authority to bind that entity.
          </p>

          <h2 id="eligibility-accounts">2. ELIGIBILITY &amp; ACCOUNTS</h2>
          <p>You are responsible for all activity conducted through your Account.</p>
          <p>You agree to:</p>
          <ul>
            <li>Maintain account confidentiality;</li>
            <li>Use a strong password;</li>
            <li>Notify us immediately of unauthorised access.</li>
          </ul>
          <p>
            Accounts may not be sold, transferred, or licensed without written
            consent.
          </p>

          <h3>2.1 Roles</h3>
          <p>Users may hold roles including:</p>
          <ul>
            <li>Club President</li>
            <li>Club Vice President</li>
            <li>Member</li>
          </ul>
          <p>Roles grant feature permissions only and confer no ownership rights.</p>

          <h2 id="user-generated-content">3. USER-GENERATED CONTENT</h2>
          <p>You may post text, media, links, and communications (“User Content”).</p>
          <p>You:</p>
          <ul>
            <li>Retain ownership of your content;</li>
            <li>Grant SuperFilm a worldwide, royalty-free licence to display it;</li>
            <li>Confirm you hold all rights to post it.</li>
          </ul>
          <p>SuperFilm may remove content that violates Terms or law.</p>

          <h2 id="content-standards">4. CONTENT STANDARDS &amp; PROHIBITED CONDUCT</h2>
          <p>You agree not to post content that is:</p>
          <ul>
            <li>Illegal, defamatory, hateful, or abusive;</li>
            <li>Sexually explicit;</li>
            <li>Violent or harmful;</li>
            <li>Infringing intellectual property rights;</li>
            <li>Malware or malicious code.</li>
          </ul>
          <p>Prohibited conduct includes:</p>
          <ul>
            <li>Account hacking;</li>
            <li>Scraping;</li>
            <li>Impersonation;</li>
            <li>Spam;</li>
            <li>Fraud;</li>
            <li>Exploiting minors.</li>
          </ul>

          <h2 id="events-meetups">5. EVENTS &amp; MEETUPS</h2>
          <p>SuperFilm provides event-listing tools only.</p>
          <p>
            We do <strong>not organise or supervise events</strong> unless
            explicitly stated.
          </p>
          <p>Hosts must:</p>
          <ul>
            <li>Provide accurate event details;</li>
            <li>Comply with laws;</li>
            <li>Ensure attendee safety;</li>
            <li>Protect attendee data.</li>
          </ul>
          <p>Attendees assume all risks.</p>
          <p>
            To the fullest extent permitted by English law, SuperFilm is not
            liable for event-related injury, loss, or damage except where caused
            by our negligence or fraud.
          </p>
          <p>Force majeure includes:</p>
          <ul>
            <li>Severe weather</li>
            <li>Venue closure</li>
            <li>Platform outages</li>
            <li>Hosting failures</li>
            <li>API disruptions</li>
          </ul>

          <h2 id="verification-safety">6. VERIFICATION &amp; SAFETY</h2>
          <p>We may require identity verification via third-party providers.</p>
          <p>Verification data is processed per Section 12.</p>
          <p>SuperFilm does not conduct background checks.</p>
          <p>Users assume risks when interacting online or offline.</p>

          <h2 id="intellectual-property">7. INTELLECTUAL PROPERTY</h2>
          <p>All platform IP belongs to <strong>SUPRFILM LTD</strong>.</p>
          <p>You receive a limited licence to use the Services.</p>
          <p>You may not:</p>
          <ul>
            <li>Reproduce platform assets;</li>
            <li>Scrape databases;</li>
            <li>Mirror pages;</li>
            <li>Use branding commercially.</li>
          </ul>
          <p>
            Film metadata and imagery are provided by third-party licensors
            including <strong>The Movie Database (TMDB)</strong> and remain their
            property.
          </p>

          <h2 id="payments-fees">8. PAYMENTS &amp; FEES</h2>
          <p>Premium membership (“Director’s Cut”) is optional.</p>
          <p>Payments are processed by Stripe.</p>
          <p>We do not store card data.</p>
          <p>Subscriptions:</p>
          <ul>
            <li>Bill monthly;</li>
            <li>Auto-renew;</li>
            <li>May change pricing with notice.</li>
          </ul>
          <p>Free trial: 14 days.</p>
          <p>Refunds: Not provided except where legally required.</p>

          <h2 id="advertising-sponsorship">9. ADVERTISING &amp; SPONSORSHIP</h2>
          <p>SuperFilm may display ads and sponsored content.</p>
          <p>Premium users see no third-party ads.</p>
          <p>We may share anonymised analytics with sponsors.</p>
          <p>We do not share personal data without consent.</p>

          <h2 id="logo-use">10. LOGO USE</h2>
          <p>SuperFilm branding is owned by SUPRFILM LTD.</p>
          <p>Permitted uses:</p>
          <ul>
            <li>Club promotion;</li>
            <li>Linking to platform pages.</li>
          </ul>
          <p>Prohibited uses:</p>
          <ul>
            <li>Merchandise;</li>
            <li>Domain names;</li>
            <li>Misleading endorsements.</li>
          </ul>

          <h2 id="moderation">11. MODERATION</h2>
          <p>
            We do not actively monitor all communications but may review content
            when:
          </p>
          <ul>
            <li>Reported;</li>
            <li>Legally required;</li>
            <li>Safety concerns arise.</li>
          </ul>
          <p>Moderation actions include:</p>
          <ul>
            <li>Content removal;</li>
            <li>Warnings;</li>
            <li>Suspension;</li>
            <li>Termination.</li>
          </ul>
          <p>
            Moderation decisions are final; however, users may submit additional
            context for review. SuperFilm is not obligated to reverse decisions.
          </p>
          <p>
            Illegal content may be reported via platform tools or{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <p>
            Automated systems may be used to detect harmful or unlawful content,
            subject to human review where appropriate.
          </p>

          <h2 id="data-privacy">12. DATA &amp; PRIVACY</h2>
          <p>SuperFilm complies with UK GDPR and the Data Protection Act 2018.</p>
          <p>
            For full details, see our standalone Privacy Policy at{" "}
            <Link to="/privacy">/privacy</Link>.
          </p>

          <h3>12.1 Data Collected</h3>
          <p>Includes:</p>
          <ul>
            <li>Account data;</li>
            <li>User content;</li>
            <li>Technical cookies;</li>
            <li>Payment metadata;</li>
            <li>Moderation reports.</li>
          </ul>
          <p>We do not sell, rent, or trade personal data.</p>

          <h3>12.2 Cookies</h3>
          <p>We use cookies for:</p>
          <ul>
            <li>Authentication;</li>
            <li>Preferences;</li>
            <li>Analytics.</li>
          </ul>
          <p>
            Where required by law, we obtain consent before placing non-essential
            cookies. Consent may be withdrawn anytime.
          </p>

          <h3>12.3 Deletion Rights</h3>
          <p>
            You may request permanent account deletion at any time via settings
            or by contacting{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          <h3>12.4 Data Transfers</h3>
          <p>
            Data may be processed outside the UK via Supabase or Stripe with
            appropriate safeguards.
          </p>

          <h2 id="third-party-links">13. THIRD-PARTY LINKS</h2>
          <p>We are not responsible for external sites or services.</p>
          <p>Use third-party integrations at your own risk.</p>

          <h2 id="liability-disclaimers">14. LIABILITY &amp; DISCLAIMERS</h2>
          <p>Services are provided “as is.”</p>
          <p>
            We do not guarantee uninterrupted availability or jurisdictional
            accessibility.
          </p>
          <p>We are not liable for:</p>
          <ul>
            <li>Indirect damages;</li>
            <li>Data loss;</li>
            <li>Third-party actions.</li>
          </ul>
          <p>Liability cap: Greater of fees paid in 12 months or £100.</p>
          <p>Nothing excludes liability for death, injury, or fraud.</p>

          <h2 id="indemnity">15. INDEMNITY</h2>
          <p>You agree to indemnify SUPRFILM LTD against claims arising from:</p>
          <ul>
            <li>Your content;</li>
            <li>Your conduct;</li>
            <li>Events you host;</li>
            <li>IP misuse.</li>
          </ul>
          <p>These obligations survive account termination.</p>

          <h2 id="governing-law">16. GOVERNING LAW</h2>
          <p>Governed by the laws of England and Wales.</p>
          <p>Consumers abroad retain mandatory local rights.</p>

          <h2 id="changes-to-terms">17. CHANGES TO TERMS</h2>
          <p>We may amend Terms anytime.</p>
          <p>Material changes will be notified.</p>
          <p>Continued use constitutes acceptance.</p>

          <h2 id="accessibility">18. ACCESSIBILITY</h2>
          <p>
            SuperFilm is committed to improving accessibility and usability in
            line with recognised standards.
          </p>

          <h2 id="export-sanctions">19. EXPORT &amp; SANCTIONS COMPLIANCE</h2>
          <p>
            You may not use the Services in violation of UK export laws,
            sanctions regulations, or trade restrictions.
          </p>

          <h2 id="platform-role">20. PLATFORM ROLE DISCLAIMER</h2>
          <p>
            SuperFilm operates solely as a platform provider and does not
            control user conduct, clubs, or events unless expressly stated.
          </p>

          <h2 id="contact">21. CONTACT</h2>
          <p>Legal, safety, or compliance enquiries:</p>
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <br />
            SUPRFILM LTD
            <br />
            London, United Kingdom
          </p>
        </article>
        </div>
      </div>
    </div>
  );
}
