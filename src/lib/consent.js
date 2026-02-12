const STORAGE_KEY = "sf_cookie_consent_v1";

export const CURRENT_VERSION = "1.0";
export const CONSENT_EXPIRY_MS = 365 * 24 * 60 * 60 * 1000;
export const DEFAULT_REGION = "UK";

export function getConsent() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent() {
  const consent = getConsent();
  if (!consent || typeof consent !== "object") return false;
  if (consent.version !== CURRENT_VERSION) return false;
  if (typeof consent.timestamp !== "number") return false;
  if (Date.now() - consent.timestamp > CONSENT_EXPIRY_MS) return false;
  return consent.analytics === true;
}

export function setConsent(consent) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore storage failures (private mode, full quota, etc.)
  }
}

export function clearConsent() {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
