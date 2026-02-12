// src/pages/Subprocessors.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "Hussein@superfilm.info";
const LAST_UPDATED = "February 11, 2026";

const SECTION_LINKS = [
  { id: "infrastructure-hosting", label: "1. Infrastructure & Hosting" },
  { id: "payments-processing", label: "2. Payments Processing" },
  { id: "analytics-usage-data", label: "3. Analytics & Usage Data" },
  { id: "email-communications", label: "4. Email Communications" },
  { id: "film-metadata-provider", label: "5. Film Metadata Provider" },
  { id: "data-processing-safeguards", label: "6. Data Processing Safeguards" },
  { id: "subprocessor-updates", label: "7. Subprocessor Updates" },
  { id: "contact", label: "8. Contact" },
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

export default function SubprocessorsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Subprocessors &amp; Third-Party Processors | SuperFilm</title>
        <meta
          name="description"
          content="Read the SuperFilm Subprocessors & Third-Party Processors disclosure."
        />
        <link rel="canonical" href="https://www.superfilm.uk/subprocessors" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur p-6 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              SUPERFILM SUBPROCESSORS &amp; THIRD-PARTY PROCESSORS
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
            <p>
              This page lists the third-party subprocessors and service providers used by
              SuperFilm, operated by <strong>SUPRFILM LTD</strong> (“SuperFilm”, “we”,
              “us”, “our”).
            </p>
            <p>
              Subprocessors are third parties that process personal data on our behalf to
              support platform operations.
            </p>
            <p>
              This disclosure should be read alongside our{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>

            <h2 id="infrastructure-hosting">1. Infrastructure &amp; Hosting</h2>
            <h3>Supabase</h3>
            <p>Purpose:</p>
            <ul>
              <li>Database hosting</li>
              <li>User authentication</li>
              <li>File storage</li>
              <li>Backend infrastructure</li>
            </ul>
            <p>
              Supabase processes account data, platform content, and system logs as
              necessary to operate SuperFilm.
            </p>

            <h3>Vercel</h3>
            <p>Purpose:</p>
            <ul>
              <li>Application hosting</li>
              <li>Deployment infrastructure</li>
              <li>Edge delivery and performance optimisation</li>
            </ul>
            <p>
              Vercel may process technical request data such as IP addresses and device
              metadata.
            </p>

            <h2 id="payments-processing">2. Payments Processing</h2>
            <h3>Stripe</h3>
            <p>Purpose:</p>
            <ul>
              <li>Subscription billing</li>
              <li>Payment processing</li>
              <li>Fraud prevention</li>
              <li>Financial compliance</li>
            </ul>
            <p>
              Stripe processes payment information directly. SuperFilm does not store full
              card details.
            </p>

            <h2 id="analytics-usage-data">3. Analytics &amp; Usage Data</h2>
            <h3>Google Analytics</h3>
            <p>Purpose:</p>
            <ul>
              <li>Platform usage analytics</li>
              <li>Performance monitoring</li>
              <li>Feature engagement insights</li>
            </ul>
            <p>
              Analytics processing occurs only where user consent has been provided via
              our Cookie Settings.
            </p>

            <h2 id="email-communications">4. Email Communications</h2>
            <h3>Transactional Email Provider: MailJet</h3>
            <p>Purpose:</p>
            <ul>
              <li>Account notifications</li>
              <li>Billing communications</li>
              <li>Platform updates</li>
              <li>Security alerts</li>
            </ul>

            <h2 id="film-metadata-provider">5. Film Metadata Provider</h2>
            <h3>The Movie Database (TMDB)</h3>
            <p>Purpose:</p>
            <ul>
              <li>Film posters</li>
              <li>Film metadata</li>
              <li>Cast and production information</li>
            </ul>
            <p>
              TMDB provides film data and does not process user personal data beyond
              technical request information.
            </p>

            <h2 id="data-processing-safeguards">6. Data Processing Safeguards</h2>
            <p>We implement safeguards when engaging subprocessors, including:</p>
            <ul>
              <li>Data processing agreements (DPAs)</li>
              <li>Contractual confidentiality obligations</li>
              <li>Encryption in transit</li>
              <li>Access controls</li>
            </ul>
            <p>
              Where data is transferred internationally, we rely on legal transfer
              mechanisms such as:
            </p>
            <ul>
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Adequacy decisions</li>
            </ul>

            <h2 id="subprocessor-updates">7. Subprocessor Updates</h2>
            <p>We may update our subprocessors as infrastructure evolves.</p>
            <p>Material changes will be reflected on this page.</p>

            <h2 id="contact">8. Contact</h2>
            <p>For subprocessor or data transfer enquiries:</p>
            <p>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <br />
              SUPRFILM LTD
              <br />
              <a href="https://www.superfilm.uk">www.superfilm.uk</a>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}

