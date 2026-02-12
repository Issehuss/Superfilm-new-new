// src/pages/AcceptableUse.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "Hussein@superfilm.info";
const LAST_UPDATED = "February 11, 2026";

const SECTION_LINKS = [
  { id: "platform-purpose", label: "1. Platform Purpose" },
  { id: "user-generated-content", label: "2. User-Generated Content" },
  { id: "prohibited-conduct", label: "3. Prohibited Conduct" },
  { id: "copyright-piracy", label: "4. Copyright & Piracy" },
  { id: "illegal-screenings", label: "5. Illegal Screenings & Watch Parties" },
  { id: "commercial-activity", label: "6. Commercial Activity" },
  { id: "impersonation", label: "7. Impersonation" },
  { id: "platform-safety", label: "8. Platform Safety" },
  { id: "moderation-reporting", label: "9. Moderation & Reporting" },
  { id: "enforcement-actions", label: "10. Enforcement Actions" },
  { id: "automated-moderation", label: "11. Automated Moderation" },
  { id: "age-requirements", label: "12. Age Requirements" },
  { id: "global-use", label: "13. Global Use" },
  { id: "club-governance", label: "14. Club Governance" },
  { id: "appeals-process", label: "15. Appeals Process" },
  { id: "law-enforcement", label: "16. Law Enforcement Cooperation" },
  { id: "policy-updates", label: "17. Policy Updates" },
  { id: "contact", label: "18. Contact" },
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

export default function AcceptableUsePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Acceptable Use Policy | SuperFilm</title>
        <meta name="description" content="Read the SuperFilm Acceptable Use Policy." />
        <link rel="canonical" href="https://www.superfilm.uk/acceptable-use" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur p-6 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              SUPERFILM ACCEPTABLE USE POLICY
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
              This Acceptable Use Policy (“Policy”) governs the use of SuperFilm, operated
              by SUPRFILM LTD (“SuperFilm”, “we”, “us”, “our”).
            </p>
            <p>
              By using SuperFilm, you agree to comply with this Policy in addition to our{" "}
              <Link to="/terms">Terms &amp; Conditions</Link>.
            </p>

            <h2 id="platform-purpose">1. Platform Purpose</h2>
            <p>SuperFilm is a social film platform designed for:</p>
            <ul>
              <li>Film discussions</li>
              <li>Cinema clubs</li>
              <li>Screening events</li>
              <li>Film reviews and takes</li>
              <li>Community engagement</li>
            </ul>
            <p>Users must use the platform responsibly and lawfully.</p>

            <h2 id="user-generated-content">2. User-Generated Content</h2>
            <p>Users may create and share:</p>
            <ul>
              <li>Text posts</li>
              <li>Comments</li>
              <li>Club discussions</li>
              <li>Film takes / reviews</li>
              <li>Event listings</li>
              <li>Polls</li>
              <li>Images (club banners, screening posters)</li>
            </ul>
            <p>
              You retain ownership of your content but grant SuperFilm rights necessary to
              operate the service.
            </p>

            <h2 id="prohibited-conduct">3. Prohibited Conduct</h2>
            <p>Users must not engage in harmful, unlawful, or abusive behaviour.</p>

            <h3>3.1 Hate Speech &amp; Harassment</h3>
            <p>Zero tolerance.</p>
            <p>Prohibited:</p>
            <ul>
              <li>Hate speech</li>
              <li>Slurs</li>
              <li>Discrimination</li>
              <li>Targeted harassment</li>
              <li>Threats of violence</li>
            </ul>
            <p>
              Content or behaviour targeting protected characteristics will result in
              enforcement action.
            </p>

            <h3>3.2 Extremism &amp; Dangerous Organisations</h3>
            <p>Strictly prohibited:</p>
            <ul>
              <li>Extremist propaganda</li>
              <li>Terrorist organisations support</li>
              <li>Radicalisation content</li>
              <li>Extremist symbols or imagery</li>
            </ul>
            <p>Accounts will be permanently banned.</p>

            <h3>3.3 Sexual Content</h3>
            <p>Allowed:</p>
            <ul>
              <li>Film discussion involving sexual themes</li>
            </ul>
            <p>Prohibited:</p>
            <ul>
              <li>Pornographic imagery</li>
              <li>Explicit sexual content uploads</li>
              <li>Exploitative material</li>
            </ul>

            <h3>3.4 Violence &amp; Graphic Content</h3>
            <p>Allowed:</p>
            <ul>
              <li>Discussion of violent film scenes</li>
            </ul>
            <p>Prohibited:</p>
            <ul>
              <li>Real-world graphic violence</li>
              <li>Gore imagery uploads</li>
              <li>Shock content</li>
            </ul>

            <h2 id="copyright-piracy">4. Copyright &amp; Piracy</h2>
            <p>SuperFilm enforces strict anti-piracy rules.</p>
            <p>Prohibited:</p>
            <ul>
              <li>Torrent links</li>
              <li>Illegal streaming links</li>
              <li>Download links</li>
              <li>Pirated film distribution</li>
              <li>Sharing copyrighted material without rights</li>
            </ul>
            <p>Repeat infringers may be banned.</p>

            <h2 id="illegal-screenings">5. Illegal Screenings &amp; Watch Parties</h2>
            <p>Users may not use SuperFilm to:</p>
            <ul>
              <li>Promote illegal watch parties</li>
              <li>Host unlicensed screenings</li>
              <li>Sell tickets to unauthorised exhibitions</li>
              <li>Facilitate pirated group streams</li>
            </ul>
            <p>
              SuperFilm reserves the right to remove such content and suspend organisers.
            </p>

            <h2 id="commercial-activity">6. Commercial Activity</h2>
            <p>Not permitted without approval.</p>
            <p>Prohibited:</p>
            <ul>
              <li>Selling goods</li>
              <li>Business promotion</li>
              <li>Referral links</li>
              <li>Affiliate marketing</li>
              <li>Unauthorised advertising</li>
            </ul>

            <h2 id="impersonation">7. Impersonation</h2>
            <p>Users must not impersonate:</p>
            <ul>
              <li>Other individuals</li>
              <li>Public figures</li>
              <li>Cinema clubs</li>
              <li>SuperFilm staff</li>
            </ul>
            <p>Fake or misleading accounts will be removed.</p>

            <h2 id="platform-safety">8. Platform Safety</h2>
            <p>Users must not:</p>
            <ul>
              <li>Spread malware</li>
              <li>Attempt hacking</li>
              <li>Scrape data</li>
              <li>Abuse APIs</li>
              <li>Interfere with infrastructure</li>
            </ul>
            <p>
              Security violations may result in permanent bans and legal action.
            </p>

            <h2 id="moderation-reporting">9. Moderation &amp; Reporting</h2>
            <p>SuperFilm operates a platform-wide moderation system.</p>
            <p>Users can report:</p>
            <ul>
              <li>Harmful content</li>
              <li>Abuse</li>
              <li>Copyright violations</li>
              <li>Policy breaches</li>
            </ul>
            <p>Reports are reviewed by human moderators.</p>

            <h2 id="enforcement-actions">10. Enforcement Actions</h2>
            <p>We may take action including:</p>
            <ul>
              <li>Content removal</li>
              <li>Warnings</li>
              <li>Temporary suspension</li>
              <li>Permanent bans</li>
            </ul>
            <p>Severity depends on violation type and history.</p>

            <h2 id="automated-moderation">11. Automated Moderation</h2>
            <p>SuperFilm does not rely on automated enforcement.</p>
            <p>
              Moderation decisions are reviewed and enacted by human moderators.
              Automation tools may assist detection workflows only.
            </p>

            <h2 id="age-requirements">12. Age Requirements</h2>
            <p>SuperFilm is strictly 18+.</p>
            <ul>
              <li>No minors permitted</li>
              <li>No parental accounts</li>
              <li>Accounts found violating this rule will be removed</li>
            </ul>

            <h2 id="global-use">13. Global Use</h2>
            <p>
              SuperFilm is accessible worldwide. Users must comply with local laws when
              using the platform.
            </p>

            <h2 id="club-governance">14. Club Governance</h2>
            <p>Club administrators must not:</p>
            <ul>
              <li>Abuse moderation powers</li>
              <li>Harass members</li>
              <li>Misrepresent events</li>
              <li>Promote unlawful screenings</li>
            </ul>
            <p>SuperFilm may intervene in club governance where necessary.</p>

            <h2 id="appeals-process">15. Appeals Process</h2>
            <p>Users may appeal enforcement decisions by contacting:</p>
            <p>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
            <p>Appeals are reviewed by moderators.</p>

            <h2 id="law-enforcement">16. Law Enforcement Cooperation</h2>
            <p>
              SuperFilm may cooperate with lawful requests from authorities, including:
            </p>
            <ul>
              <li>Court orders</li>
              <li>Subpoenas</li>
              <li>Criminal investigations</li>
            </ul>

            <h2 id="policy-updates">17. Policy Updates</h2>
            <p>We may update this Policy to reflect:</p>
            <ul>
              <li>Platform changes</li>
              <li>Legal requirements</li>
              <li>Safety improvements</li>
            </ul>
            <p>Continued use constitutes acceptance.</p>

            <h2 id="contact">18. Contact</h2>
            <p>
              SUPRFILM LTD
              <br />
              Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <br />
              Website: <a href="https://www.superfilm.uk">www.superfilm.uk</a>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}

