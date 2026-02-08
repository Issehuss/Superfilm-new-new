// src/pages/ResetPassword.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "lib/supabaseClient";

export default function ResetPassword() {
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [linkError, setLinkError] = useState("");
  const [formError, setFormError] = useState("");
  const [checkingLink, setCheckingLink] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const parseAndSetSession = async () => {
      try {
        if (typeof window === "undefined") return;

        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const hashParams = new URLSearchParams(url.hash.replace(/^#/, ""));
        const type = hashParams.get("type");
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (code) {
          const { error: exchangeErr } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeErr) throw exchangeErr;
          url.searchParams.delete("code");
          window.history.replaceState({}, document.title, url.pathname + url.search);
          return;
        }

        if (type === "recovery" && accessToken && refreshToken) {
          const { error: setErr } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (setErr) throw setErr;
          window.history.replaceState({}, document.title, url.pathname + url.search);
        }
      } catch (e) {
        // no-op; we'll surface via getSession below
        console.warn("[ResetPassword] session parse failed", e);
      }
    };

    (async () => {
      setCheckingLink(true);
      setLinkError("");
      try {
        await parseAndSetSession();
        const { data, error: sessErr } = await supabase.auth.getSession();
        if (sessErr) throw sessErr;
        if (!data?.session) {
          throw new Error("Reset link is invalid or has expired. Please request a new one.");
        }
      } catch (e) {
        if (!cancelled) setLinkError(e?.message || "Unable to verify reset link.");
      } finally {
        if (!cancelled) setCheckingLink(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleUpdate = async () => {
    setFormError("");

    if (pw.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }

    if (pw !== confirm) {
      setFormError("Passwords do not match.");
      return;
    }

    setUpdating(true);
    const { error } = await supabase.auth.updateUser({ password: pw });

    if (error) {
      setFormError(error.message);
    } else {
      setDone(true);
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    setUpdating(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(255,230,0,0.15)]">
        {/* Success panel */}
        {done ? (
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">
              Password Updated
            </h1>
            <p className="text-zinc-300 mb-8">
              You can now sign in with your new password.
            </p>
            <a
              href="/auth"
              className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:scale-105 transition"
            >
              Return to Sign In
            </a>
          </div>
        ) : (
          <>
            {/* Header */}
            <h1 className="text-3xl font-bold text-yellow-400 text-center mb-2">
              Set a New Password
            </h1>
            <p className="text-zinc-400 text-center mb-8">
              Choose a strong password for your SuperFilm account.
            </p>

            {checkingLink && (
              <p className="text-sm text-zinc-400 text-center mb-6">
                Verifying reset link…
              </p>
            )}

            {/* Inputs */}
            <div className="space-y-5">
              <div>
                <label className="text-zinc-300 text-sm">New Password</label>
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  className="mt-1 w-full p-3 rounded-lg bg-black/40 border border-yellow-500/40 text-white focus:border-yellow-400 outline-none transition"
                  disabled={checkingLink || updating || !!linkError}
                />
              </div>

              <div>
                <label className="text-zinc-300 text-sm">Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-1 w-full p-3 rounded-lg bg-black/40 border border-yellow-500/40 text-white focus:border-yellow-400 outline-none transition"
                  disabled={checkingLink || updating || !!linkError}
                />
              </div>
            </div>

            {/* Error message */}
            {linkError && (
              <div className="mt-4 text-red-400 text-sm font-medium">
                <div>{linkError}</div>
                <div className="mt-2 text-zinc-300 font-normal">
                  <Link to="/auth/forgot" className="text-yellow-400 hover:underline">
                    Request a new reset link
                  </Link>
                </div>
              </div>
            )}

            {formError && !linkError && (
              <p className="mt-4 text-red-400 text-sm font-medium">{formError}</p>
            )}

            {/* Button */}
            <button
              onClick={handleUpdate}
              disabled={checkingLink || !!linkError || updating}
              className="mt-8 w-full py-3 bg-yellow-400 text-black rounded-lg font-bold hover:scale-105 active:scale-95 transition disabled:opacity-60"
            >
              {updating ? "Updating…" : "Update Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
