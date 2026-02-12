// src/pages/DataRetention.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "Hussein@superfilm.info";
const LAST_UPDATED = "February 11, 2026";

const SECTION_LINKS = [
  { id: "retention-principles", label: "1. Retention Principles" },
  { id: "account-data", label: "2. Account Data" },
  { id: "user-generated-content", label: "3. User-Generated Content" },
  { id: "messages-club-content", label: "4. Messages & Club Content" },
  { id: "moderation-safety-enforcement", label: "5. Moderation, Safety & Enforcement Records" },
  { id: "technical-logs-security", label: "6. Technical Logs & Security Data" },
  { id: "subscription-billing-records", label: "7. Subscription & Billing Records" },
  { id: "analytics-data", label: "8. Analytics Data" },
  { id: "backups", label: "9. Backups" },
  { id: "legal-holds", label: "10. Legal Holds" },
  { id: "retention-summary", label: "11. Retention Summary" },
  { id: "contact", label: "12. Contact" },
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

export default function DataRetentionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Data Retention Policy | SuperFilm</title>
        <meta name="description" content="Read the SuperFilm Data Retention Policy." />
        <link rel="canonical" href="https://www.superfilm.uk/data-retention" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur p-6 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              SUPERFILM DATA RETENTION POLICY
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
              This Data Retention Policy explains how long SuperFilm, operated by{" "}
              <strong>SUPRFILM LTD</strong> (“SuperFilm”, “we”, “us”, “our”), retains
              different categories of data.
            </p>
            <p>
              This policy should be read alongside our <Link to="/privacy">Privacy Policy</Link>{" "}
              and <Link to="/terms">Terms &amp; Conditions</Link>.
            </p>

            <h2 id="retention-principles">1. Retention Principles</h2>
            <p>We retain personal data only for as long as necessary to:</p>
            <ul>
              <li>Provide and operate the Services</li>
              <li>Maintain security and prevent abuse</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce policies</li>
            </ul>
            <p>Where appropriate, we may anonymise data instead of deleting it.</p>

            <h2 id="account-data">2. Account Data</h2>
            <p>We retain account and profile data while your account remains active.</p>
            <p>If you delete your account:</p>
            <ul>
              <li>Account access is terminated</li>
              <li>Your personal profile data is deleted or anonymised where appropriate</li>
              <li>
                Certain records may be retained for security, legal compliance, and policy
                enforcement
              </li>
            </ul>
            <p>SuperFilm does not provide a grace period for account deletion.</p>

            <h2 id="user-generated-content">3. User-Generated Content</h2>
            <p>
              We may retain user-generated content (such as posts, comments, club
              discussions, messages, and event content) to preserve platform continuity.
            </p>
            <p>
              Where accounts are deleted, we may anonymise content rather than remove it
              entirely.
            </p>

            <h2 id="messages-club-content">4. Messages &amp; Club Content</h2>
            <p>SuperFilm may retain:</p>
            <ul>
              <li>Club messages</li>
              <li>Direct messages (where applicable)</li>
              <li>Discussion threads</li>
            </ul>
            <p>
              These may be stored indefinitely unless removed by moderation, required by
              law, or deleted under future product controls.
            </p>

            <h2 id="moderation-safety-enforcement">
              5. Moderation, Safety &amp; Enforcement Records
            </h2>
            <p>
              We retain moderation and enforcement records permanently where necessary to:
            </p>
            <ul>
              <li>Prevent repeat abuse</li>
              <li>Enforce bans</li>
              <li>Maintain platform safety</li>
              <li>Respond to legal or regulatory inquiries</li>
            </ul>
            <p>This may include:</p>
            <ul>
              <li>Reports</li>
              <li>Moderator actions</li>
              <li>Suspension and ban history</li>
              <li>Repeat infringer records</li>
            </ul>

            <h2 id="technical-logs-security">6. Technical Logs &amp; Security Data</h2>
            <p>We retain technical data to maintain platform security and reliability.</p>
            <p>This may include:</p>
            <ul>
              <li>IP addresses</li>
              <li>Login timestamps</li>
              <li>Device/browser identifiers (e.g., User-Agent)</li>
              <li>Session metadata</li>
              <li>Access logs and system logs</li>
            </ul>
            <p>
              Technical log retention may be governed in part by infrastructure provider
              policies.
            </p>

            <h2 id="subscription-billing-records">
              7. Subscription &amp; Billing Records
            </h2>
            <p>We retain billing-related records necessary for:</p>
            <ul>
              <li>Payment processing</li>
              <li>Fraud prevention</li>
              <li>Accounting and tax compliance</li>
            </ul>
            <p>
              Payment processing is handled by Stripe. SuperFilm does not store full
              payment card details.
            </p>
            <p>
              Retention of payment records may be governed by Stripe’s policies and
              applicable legal obligations.
            </p>

            <h2 id="analytics-data">8. Analytics Data</h2>
            <p>
              Where enabled by user consent, we process analytics data via Google
              Analytics to understand platform usage and performance.
            </p>
            <p>
              Analytics data retention may be governed by Google’s configuration and
              policies.
            </p>
            <p>
              Users can withdraw analytics consent at any time via Cookie Settings.
            </p>

            <h2 id="backups">9. Backups</h2>
            <p>
              SuperFilm may maintain backups for security and disaster recovery.
            </p>
            <p>
              Backup retention periods may vary based on infrastructure provider
              capabilities and plan constraints.
            </p>
            <p>
              Deleted data may persist in backups for a limited period until backup
              cycles expire.
            </p>

            <h2 id="legal-holds">10. Legal Holds</h2>
            <p>
              We may preserve data beyond standard retention periods where required to:
            </p>
            <ul>
              <li>Comply with legal obligations</li>
              <li>Respond to law enforcement requests</li>
              <li>Support legal claims or investigations</li>
            </ul>

            <h2 id="retention-summary">11. Retention Summary</h2>
            <p>This table provides a high-level retention summary.</p>
            <p>
              <strong>Data Category — Typical Retention</strong>
            </p>
            <ul>
              <li>
                <strong>Account &amp; profile data</strong> — While account is active
              </li>
              <li>
                <strong>Deleted accounts</strong> — No grace period (deleted on request),
                with limited retention of required records
              </li>
              <li>
                <strong>User-generated content</strong> — Retained and/or anonymised to
                preserve continuity
              </li>
              <li>
                <strong>Messages &amp; club discussions</strong> — Indefinite (unless
                removed)
              </li>
              <li>
                <strong>Moderation &amp; enforcement records</strong> — Permanent
              </li>
              <li>
                <strong>Technical logs (IP, access logs, auth logs)</strong> — Per
                infrastructure provider policies
              </li>
              <li>
                <strong>Subscription/billing records</strong> — Per legal/accounting
                needs and Stripe policies
              </li>
              <li>
                <strong>Analytics data</strong> — Per Google Analytics settings and user
                consent
              </li>
              <li>
                <strong>Backups</strong> — Per infrastructure backup retention windows
              </li>
              <li>
                <strong>Legal hold data</strong> — As required
              </li>
            </ul>

            <h2 id="contact">12. Contact</h2>
            <p>For retention-related requests:</p>
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

