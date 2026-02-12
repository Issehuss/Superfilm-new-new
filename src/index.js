import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWrapper from './App'; // ✅ wrapped with <Router> and <UserProvider>
import reportWebVitals from './reportWebVitals';
import BetaGate from "./components/BetaGate";
import AuthGate from "./components/AuthGate";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { env, missingCriticalEnv } from "./lib/env";
if (process.env.NODE_ENV === "development") {
  const missing = missingCriticalEnv();
  if (missing.length) {
    console.warn("[SF] Missing critical env vars:", missing.join(", "));
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthGate>
      <BetaGate>
        <AppWrapper />
      </BetaGate>
    </AuthGate>
  </React.StrictMode>
);

reportWebVitals();

// In development, aggressively unregister any existing Service Worker.
// This prevents stale SW caches (from prior prod builds on the same origin)
// from breaking React lazy chunks with "Loading chunk ... failed" errors.
if (process.env.NODE_ENV === "production") {
  // In production, if a new deploy happens mid-session, a lazy chunk can fail to load.
  // A single hard reload usually fixes it (new index.html + new chunk manifest).
  try {
    const reloadOnceKey = "sf:chunkload_reload_once";
    const maybeReload = (err) => {
      const msg = String(err?.message || err || "");
      if (!msg.includes("Loading chunk")) return;
      try {
        const did = sessionStorage.getItem(reloadOnceKey) === "1";
        if (did) return;
        sessionStorage.setItem(reloadOnceKey, "1");
      } catch {
        // If sessionStorage is unavailable, still attempt a reload once.
      }
      window.location.reload();
    };

    window.addEventListener("unhandledrejection", (e) => maybeReload(e?.reason));
    window.addEventListener("error", (e) => maybeReload(e?.error || e?.message));
  } catch {}

  serviceWorkerRegistration.register({
    onUpdate: (registration) => {
      window.dispatchEvent(
        new CustomEvent("sf:pwa-update", { detail: { registration } })
      );
    },
  });
} else if ("serviceWorker" in navigator) {
  const didReloadKey = "sf:dev_sw_unregistered_reload";
  const wasControlled = Boolean(navigator.serviceWorker.controller);

  try {
    navigator.serviceWorker.getRegistrations?.().then((regs) => {
      regs.forEach((r) => r.unregister());
    });
  } catch {}

  try {
    serviceWorkerRegistration.unregister();
  } catch {}

  // If a SW was controlling this page, one reload is often needed to detach it.
  try {
    const didReload = sessionStorage.getItem(didReloadKey) === "1";
    if (wasControlled && !didReload) {
      sessionStorage.setItem(didReloadKey, "1");
      window.location.reload();
    }
  } catch {}
}
