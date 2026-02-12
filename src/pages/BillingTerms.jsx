// src/pages/BillingTerms.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "Hussein@superfilm.info";
const LAST_UPDATED = "February 11, 2026";

const SECTION_LINKS = [
  { id: "subscription-plan", label: "1. Subscription Plan" },
  { id: "pricing", label: "2. Pricing" },
  { id: "billing-cycle", label: "3. Billing Cycle" },
  { id: "free-trial", label: "4. Free Trial" },
  { id: "auto-renewal", label: "5. Auto-Renewal" },
  { id: "cancellation", label: "6. Cancellation" },
  { id: "refund-policy", label: "7. Refund Policy" },
  { id: "failed-payments", label: "8. Failed Payments" },
  { id: "plan-changes", label: "9. Plan Changes" },
  { id: "taxes", label: "10. Taxes" },
  { id: "geographic-availability", label: "11. Geographic Availability" },
  { id: "account-termination", label: "12. Account Termination" },
  { id: "price-changes", label: "13. Price Changes" },
  { id: "payment-processing", label: "14. Payment Processing" },
  { id: "contact", label: "15. Contact" },
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

export default function BillingTermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Subscription &amp; Billing Terms | SuperFilm</title>
        <meta
          name="description"
          content="Read the SuperFilm Subscription & Billing Terms."
        />
        <link rel="canonical" href="https://www.superfilm.uk/billing-terms" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur p-6 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              SUPERFILM SUBSCRIPTION &amp; BILLING TERMS
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
              These Subscription &amp; Billing Terms govern paid features on SuperFilm,
              operated by <strong>SUPRFILM LTD</strong>.
            </p>
            <p>
              By purchasing a subscription, you agree to these terms in addition to our{" "}
              <Link to="/terms">Terms &amp; Conditions</Link>.
            </p>

            <h2 id="subscription-plan">1. Subscription Plan</h2>
            <p>SuperFilm currently offers one premium subscription tier:</p>
            <ul>
              <li>
                <strong>Director’s Cut</strong>
              </li>
            </ul>
            <p>
              This subscription provides access to enhanced platform features and premium
              functionality.
            </p>

            <h2 id="pricing">2. Pricing</h2>
            <p>The Director’s Cut subscription is priced at:</p>
            <ul>
              <li>
                <strong>£3 per month</strong>
              </li>
            </ul>
            <p>Prices are displayed in GBP and include applicable VAT where required.</p>

            <h2 id="billing-cycle">3. Billing Cycle</h2>
            <p>Subscriptions are billed on a recurring monthly basis.</p>
            <p>
              Billing occurs on the same calendar day each cycle, based on the original
              subscription date.
            </p>

            <h2 id="free-trial">4. Free Trial</h2>
            <p>New subscribers may receive a:</p>
            <ul>
              <li>
                <strong>14-day free trial</strong>
              </li>
            </ul>
            <p>
              If not cancelled before the trial ends, billing begins automatically at the
              standard monthly rate.
            </p>

            <h2 id="auto-renewal">5. Auto-Renewal</h2>
            <p>Subscriptions renew automatically each billing cycle unless cancelled.</p>
            <p>
              By subscribing, you authorise recurring charges via your selected payment
              method.
            </p>

            <h2 id="cancellation">6. Cancellation</h2>
            <p>Users may cancel their subscription at any time.</p>
            <p>Cancellation takes effect immediately and prevents future billing.</p>
            <p>
              However, users will continue to enjoy premium benefits until the end of the
              billing period already paid for.
            </p>

            <h2 id="refund-policy">7. Refund Policy</h2>
            <p>
              All subscription payments are non-refundable except where required by law.
            </p>
            <p>No refunds are issued for:</p>
            <ul>
              <li>Partial billing periods</li>
              <li>Unused time</li>
              <li>Accidental renewals</li>
            </ul>

            <h2 id="failed-payments">8. Failed Payments</h2>
            <p>If a payment fails:</p>
            <ul>
              <li>Premium access may be revoked immediately</li>
              <li>The account will revert to the free tier</li>
              <li>Access may be restored upon successful payment</li>
            </ul>

            <h2 id="plan-changes">9. Plan Changes</h2>
            <p>SuperFilm currently offers a single subscription plan.</p>
            <p>Upgrades or downgrades are not applicable at this time.</p>

            <h2 id="taxes">10. Taxes</h2>
            <p>Subscription pricing includes VAT where applicable.</p>
            <p>
              Tax treatment may vary depending on user location and legal requirements.
            </p>

            <h2 id="geographic-availability">11. Geographic Availability</h2>
            <p>Subscriptions are available globally.</p>
            <p>
              Users are responsible for complying with local payment regulations where
              applicable.
            </p>

            <h2 id="account-termination">12. Account Termination</h2>
            <p>If a subscription account is terminated for policy violations:</p>
            <ul>
              <li>Premium access may be revoked immediately</li>
              <li>No refunds will be issued</li>
            </ul>

            <h2 id="price-changes">13. Price Changes</h2>
            <p>SuperFilm may update subscription pricing.</p>
            <p>
              Users will receive at least 30 days’ notice prior to any pricing change
              affecting their subscription.
            </p>

            <h2 id="payment-processing">14. Payment Processing</h2>
            <p>Payments are processed securely via:</p>
            <ul>
              <li>Stripe</li>
            </ul>
            <p>SuperFilm does not store full payment card details.</p>
            <p>
              Stripe’s terms and privacy policies apply to payment processing.
            </p>

            <h2 id="contact">15. Contact</h2>
            <p>Billing enquiries may be directed to:</p>
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

