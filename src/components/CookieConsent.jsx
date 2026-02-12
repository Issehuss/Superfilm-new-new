import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { trackPageView } from "../lib/analytics";
import {
  clearConsent,
  CURRENT_VERSION,
  DEFAULT_REGION,
  CONSENT_EXPIRY_MS,
  getConsent,
  hasAnalyticsConsent,
  setConsent,
} from "../lib/consent";

const CookieConsentModal = lazy(() => import("./CookieConsentModal.jsx"));

const GA_MEASUREMENT_ID = "G-31DENXY7Z3";
const GA_SCRIPT_ID = "sf-ga-gtag";

function normalizeConsent(raw) {
  if (!raw || typeof raw !== "object") return null;
  if (typeof raw.timestamp !== "number") return null;

  return {
    essential: true,
    functional: raw.functional === true,
    analytics: raw.analytics === true,
    marketing: raw.marketing === true,
    personalization: raw.personalization === true,
    region: typeof raw.region === "string" ? raw.region : null,
    timestamp: raw.timestamp,
    version: typeof raw.version === "string" ? raw.version : null,
  };
}

function isExpired(consent, now = Date.now()) {
  if (!consent?.timestamp) return true;
  return now - consent.timestamp > CONSENT_EXPIRY_MS;
}

function getValidStoredConsent() {
  const stored = normalizeConsent(getConsent());
  if (!stored) return null;

  // Version mismatch triggers re-consent (policy update / legal requirement).
  if (stored.version !== CURRENT_VERSION || isExpired(stored)) {
    clearConsent();
    return null;
  }

  return stored;
}

function buildConsent(next, now = Date.now()) {
  return {
    essential: true,
    functional: next.functional === true,
    analytics: next.analytics === true,
    marketing: next.marketing === true,
    personalization: next.personalization === true,
    region: typeof next.region === "string" ? next.region : DEFAULT_REGION,
    timestamp: now,
    version: CURRENT_VERSION,
  };
}

function ensureGtagStub() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
}

function enableGoogleAnalytics() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  ensureGtagStub();

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  if (document.getElementById(GA_SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = GA_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function deleteCookie(name, domain) {
  const base = `${encodeURIComponent(name)}=; Max-Age=0; path=/; SameSite=Lax`;
  document.cookie = domain ? `${base}; domain=${domain}` : base;
}

function disableGoogleAnalytics({ clearCookies = false } = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

  if (!clearCookies) return;
  const host = window.location?.hostname;
  const root =
    typeof host === "string" ? `.${host.replace(/^www\\./i, "")}` : null;

  ["_ga", "_gid", "_gat"].forEach((cookie) => {
    deleteCookie(cookie);
    if (host) deleteCookie(cookie, host);
    if (root) deleteCookie(cookie, root);
  });
}

export default function CookieConsent() {
  const [consent, setConsentState] = useState(() => getValidStoredConsent());
  const [modalOpen, setModalOpen] = useState(false);
  const initialPageViewSentRef = useRef(false);

  const [draft, setDraft] = useState(() => ({
    essential: true,
    functional: consent?.functional === true,
    analytics: consent?.analytics === true,
  }));

  const showBanner = useMemo(() => consent === null && !modalOpen, [consent, modalOpen]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.info("[Consent]", consent);
    }
  }, [consent]);

  useEffect(() => {
    if (consent?.analytics === true) {
      enableGoogleAnalytics();
      if (!initialPageViewSentRef.current && typeof window !== "undefined") {
        const path = `${window.location.pathname}${window.location.search || ""}`;
        trackPageView(path);
        initialPageViewSentRef.current = true;
      }
      return;
    }

    initialPageViewSentRef.current = false;
    disableGoogleAnalytics({ clearCookies: true });
  }, [consent?.analytics]);

  useEffect(() => {
    function onOpenSettings() {
      setDraft({
        essential: true,
        functional: consent?.functional === true,
        analytics: consent?.analytics === true,
      });
      setModalOpen(true);
    }

    window.addEventListener("open-cookie-settings", onOpenSettings);
    return () => window.removeEventListener("open-cookie-settings", onOpenSettings);
  }, [consent]);

  const persist = useCallback((next) => {
    const payload = buildConsent(next);
    setConsent(payload);
    setConsentState(payload);
    setModalOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ functional: true, analytics: true, marketing: false, personalization: false });
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({ functional: false, analytics: false, marketing: false, personalization: false });
  }, [persist]);

  const openSettings = useCallback(() => {
    setDraft({
      essential: true,
      functional: consent?.functional === true,
      analytics: consent?.analytics === true,
    });
    setModalOpen(true);
  }, [consent]);

  const savePreferences = useCallback(
    (value) => {
      persist({
        functional: value?.functional === true,
        analytics: value?.analytics === true,
        marketing: false,
        personalization: false,
      });
    },
    [persist]
  );

  if (!showBanner && !modalOpen) return null;

  return (
    <>
      {showBanner ? (
        <div
          className="fixed inset-x-0 bottom-16 sm:bottom-0 z-[110]"
          role="region"
          aria-label="Cookie consent banner"
        >
          <div className="mx-auto max-w-5xl px-4 pb-4 sm:pb-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/90 backdrop-blur p-4 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <p className="text-sm leading-relaxed text-zinc-200">
                  We use cookies to run SuperFilm, improve performance, and analyse usage. Essential
                  cookies are always active. You can accept all cookies or manage your preferences.{" "}
                  Learn more in our <Link to="/cookie-policy" className="underline underline-offset-4 hover:text-white">Cookie Policy</Link>.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 sm:shrink-0">
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
                  >
                    Accept All
                  </button>
                  <button
                    type="button"
                    onClick={rejectNonEssential}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
                  >
                    Reject Non-Essential
                  </button>
                  <button
                    type="button"
                    onClick={openSettings}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
                  >
                    Manage Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {modalOpen ? (
        <Suspense fallback={null}>
          <CookieConsentModal
            open={modalOpen}
            value={draft}
            onClose={() => setModalOpen(false)}
            onChange={setDraft}
            onSave={savePreferences}
            onAcceptAll={acceptAll}
            onRejectAll={rejectNonEssential}
          />
        </Suspense>
      ) : null}
    </>
  );
}
