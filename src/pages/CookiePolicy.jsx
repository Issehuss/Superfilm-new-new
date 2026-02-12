// src/pages/CookiePolicy.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "Hussein@superfilm.info";
const LAST_UPDATED = "February 11, 2026";

const SECTION_LINKS = [
  { id: "what-are-cookies", label: "1. What Are Cookies?" },
  { id: "why-we-use-cookies", label: "2. Why We Use Cookies" },
  { id: "cookie-categories", label: "3. Cookie Categories" },
  { id: "cookie-inventory", label: "4. Cookie Inventory" },
  { id: "similar-technologies", label: "5. Similar Technologies" },
  { id: "third-party-cookies", label: "6. Third-Party Cookies" },
  { id: "consent-control", label: "7. Consent & Control" },
  { id: "managing-via-browser", label: "8. Managing Cookies via Browser" },
  { id: "international-users", label: "9. International Users" },
  { id: "policy-updates", label: "10. Policy Updates" },
  { id: "contact", label: "11. Contact" },
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

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Cookie Policy | SuperFilm</title>
        <meta name="description" content="Read the SuperFilm Cookie Policy." />
        <link rel="canonical" href="https://www.superfilm.uk/cookie-policy" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur p-6 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              SUPERFILM COOKIE POLICY
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
              This Cookie Policy explains how SUPRFILM LTD (“SuperFilm”, “we”, “us”, “our”)
              uses cookies and similar technologies when you visit{" "}
              <a href="https://www.superfilm.uk">www.superfilm.uk</a>.
            </p>
            <p>
              This policy should be read alongside our <Link to="/privacy">Privacy Policy</Link>.
            </p>

            <h2 id="what-are-cookies">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website.
              They help websites function, remember preferences, and analyse usage.
            </p>
            <p>Cookies may be:</p>
            <ul>
              <li>Session cookies — deleted when you close your browser</li>
              <li>Persistent cookies — stored until expiry or deletion</li>
            </ul>

            <h2 id="why-we-use-cookies">2. Why We Use Cookies</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Operate the SuperFilm platform</li>
              <li>Authenticate users</li>
              <li>Maintain security</li>
              <li>Remember preferences</li>
              <li>Analyse platform performance</li>
              <li>Support subscription and payment flows</li>
            </ul>
            <p>Some cookies are essential and cannot be disabled.</p>

            <h2 id="cookie-categories">3. Cookie Categories</h2>

            <h3>3.1 Essential Cookies</h3>
            <p>These are required for core functionality.</p>
            <p>Used for:</p>
            <ul>
              <li>Login authentication</li>
              <li>Session management</li>
              <li>Security protection</li>
              <li>Fraud prevention</li>
              <li>Platform infrastructure</li>
            </ul>
            <p>Disabling these will break platform functionality.</p>
            <p>Legal basis: Legitimate interest / contractual necessity.</p>

            <h3>3.2 Functional Cookies</h3>
            <p>Used to enhance user experience.</p>
            <p>Examples:</p>
            <ul>
              <li>UI preferences</li>
              <li>Theme settings</li>
              <li>Saved interface configurations</li>
            </ul>
            <p>Legal basis: Consent.</p>

            <h3>3.3 Analytics Cookies</h3>
            <p>We use analytics cookies to understand how users interact with SuperFilm.</p>
            <p>Provider: Google Analytics</p>
            <p>Used to measure:</p>
            <ul>
              <li>Page visits</li>
              <li>Feature usage</li>
              <li>Performance metrics</li>
              <li>Navigation behaviour</li>
            </ul>
            <p>
              These cookies help us improve the platform. Consent is required before
              activation.
            </p>

            <h3>3.4 Payment &amp; Fraud Prevention Cookies</h3>
            <p>Used during billing and checkout flows.</p>
            <p>Provider: Stripe</p>
            <p>Purpose:</p>
            <ul>
              <li>Fraud detection</li>
              <li>Payment security</li>
              <li>Transaction integrity</li>
            </ul>
            <p>These are considered essential for secure payments.</p>

            <h3>3.5 Advertising Cookies (Future)</h3>
            <p>SuperFilm does not currently use advertising or marketing cookies.</p>
            <p>If introduced, they will:</p>
            <ul>
              <li>Require user consent</li>
              <li>Be disclosed in this policy</li>
              <li>Be manageable via cookie settings</li>
            </ul>

            <h2 id="cookie-inventory">4. Cookie Inventory</h2>
            <p>Below is a representative list of cookies used on SuperFilm.</p>
            <p>
              <strong>Cookie Name — Provider — Purpose — Duration — Category</strong>
            </p>
            <ul>
              <li>
                <strong>sb-access-token</strong> — Supabase — Auth session — Session — Essential
              </li>
              <li>
                <strong>sb-refresh-token</strong> — Supabase — Session renewal — Persistent — Essential
              </li>
              <li>
                <strong>__stripe_mid</strong> — Stripe — Fraud prevention — 1 year — Essential
              </li>
              <li>
                <strong>__stripe_sid</strong> — Stripe — Payment session — Session — Essential
              </li>
              <li>
                <strong>_ga</strong> — Google Analytics — Usage analytics — 2 years — Analytics
              </li>
              <li>
                <strong>_gid</strong> — Google Analytics — Session analytics — 24 hours — Analytics
              </li>
            </ul>
            <p>Cookies may change as infrastructure evolves.</p>

            <h2 id="similar-technologies">5. Similar Technologies</h2>
            <p>We also use storage technologies beyond cookies.</p>
            <p>These may include:</p>
            <ul>
              <li>localStorage</li>
              <li>sessionStorage</li>
              <li>IndexedDB</li>
              <li>Cached application assets</li>
            </ul>
            <p>Used for:</p>
            <ul>
              <li>Watchlist caching</li>
              <li>Session persistence</li>
              <li>Performance optimisation</li>
              <li>Offline support</li>
            </ul>
            <p>
              Storage technologies fall under the same regulatory scope as cookies.
            </p>

            <h2 id="third-party-cookies">6. Third-Party Cookies</h2>
            <p>Some cookies are set by external providers integrated into SuperFilm:</p>
            <ul>
              <li>Supabase — authentication infrastructure</li>
              <li>Stripe — payments</li>
              <li>Google Analytics — analytics</li>
              <li>Vercel — hosting &amp; security</li>
            </ul>
            <p>
              These providers may process limited technical data in accordance with their
              own privacy policies.
            </p>

            <h2 id="consent-control">7. Consent &amp; Control</h2>
            <p>
              Where legally required, we obtain consent before placing non-essential
              cookies.
            </p>
            <p>Users can:</p>
            <ul>
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Manage preferences</li>
            </ul>
            <p>Consent can be withdrawn at any time via:</p>
            <ul>
              <li>Cookie Settings (footer link)</li>
            </ul>
            <p>Consent must be freely given, informed, and revocable.</p>

            <h2 id="managing-via-browser">8. Managing Cookies via Browser</h2>
            <p>Users may also control cookies through browser settings.</p>
            <p>Common controls include:</p>
            <ul>
              <li>Deleting cookies</li>
              <li>Blocking cookies</li>
              <li>Restricting third-party cookies</li>
            </ul>
            <p>Disabling essential cookies may impact functionality.</p>

            <h2 id="international-users">9. International Users</h2>
            <p>Cookie practices comply with:</p>
            <ul>
              <li>UK PECR</li>
              <li>UK GDPR</li>
              <li>EU ePrivacy Directive</li>
            </ul>
            <p>Consent is required before non-essential cookies are activated.</p>

            <h2 id="policy-updates">10. Policy Updates</h2>
            <p>We may update this Cookie Policy to reflect:</p>
            <ul>
              <li>Infrastructure changes</li>
              <li>Legal updates</li>
              <li>New tracking technologies</li>
            </ul>
            <p>
              Material changes will trigger renewed consent requests where required.
            </p>

            <h2 id="contact">11. Contact</h2>
            <p>For cookie or privacy enquiries:</p>
            <p>
              SUPRFILM LTD
              <br />
              Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <br />
              Website: <a href="https://www.superfilm.uk">www.superfilm.uk</a>
            </p>
            <p>
              You may also lodge complaints with the UK Information Commissioner’s Office:{" "}
              <a href="https://ico.org.uk">https://ico.org.uk</a>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
