import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

function getFocusableElements(root) {
  if (!root) return [];
  const nodes = root.querySelectorAll(
    [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",")
  );
  return Array.from(nodes).filter((el) => {
    const isHidden =
      el.getAttribute("aria-hidden") === "true" ||
      (el instanceof HTMLElement && el.offsetParent === null);
    return !isHidden;
  });
}

function ToggleRow({ id, title, description, checked, disabled, onChange, lockedLabel }) {
  const labelId = `${id}-label`;
  const descId = `${id}-desc`;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 id={labelId} className="text-sm font-semibold text-white">
              {title}
            </h3>
            {lockedLabel ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-300">
                {lockedLabel}
              </span>
            ) : null}
          </div>
          <p id={descId} className="mt-1 text-xs leading-relaxed text-zinc-300">
            {description}
          </p>
        </div>

        <label className={`relative inline-flex items-center ${disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}>
          <input
            id={id}
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            aria-labelledby={labelId}
            aria-describedby={descId}
          />
          <span className="h-6 w-11 rounded-full bg-white/15 ring-1 ring-white/10 peer-checked:bg-yellow-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-400/60 transition" />
          <span className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
        </label>
      </div>
    </div>
  );
}

export default function CookieConsentModal({
  open,
  value,
  onClose,
  onChange,
  onSave,
  onAcceptAll,
  onRejectAll,
}) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  const titleId = useMemo(() => "cookie-settings-title", []);
  const descId = useMemo(() => "cookie-settings-desc", []);

  useEffect(() => {
    if (!open) return;

    lastActiveElementRef.current = document.activeElement;
    const t = window.setTimeout(() => {
      closeButtonRef.current?.focus?.();
    }, 0);

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
        return;
      }

      if (e.key !== "Tab") return;
      const focusables = getFocusableElements(dialogRef.current);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !dialogRef.current.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !dialogRef.current.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown, true);
      const lastActive = lastActiveElementRef.current;
      if (lastActive && typeof lastActive.focus === "function") lastActive.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close cookie settings"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950/95 text-white shadow-2xl ring-1 ring-white/10"
      >
        <div className="p-5 sm:p-6">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3 right-3 rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
          >
            <X size={18} />
          </button>

          <h2 id={titleId} className="text-xl sm:text-2xl font-semibold tracking-tight">
            Cookie Settings
          </h2>
          <p id={descId} className="mt-2 text-sm text-zinc-300 leading-relaxed">
            Choose which categories of cookies you allow. Essential cookies are always on.
            You can update your choices at any time. Learn more in our{" "}
            <Link to="/cookie-policy" className="text-yellow-400 underline underline-offset-4 hover:text-yellow-300">
              Cookie Policy
            </Link>
            .
          </p>

          <div className="mt-5 grid gap-3">
            <ToggleRow
              id="cc-essential"
              title="Essential"
              lockedLabel="Always Active"
              description="Required for core platform functionality, security, and session management."
              checked={true}
              disabled={true}
            />

            <ToggleRow
              id="cc-functional"
              title="Functional"
              description="Helps remember preferences and improve your experience."
              checked={value?.functional === true}
              disabled={false}
              onChange={(next) => onChange?.({ ...value, functional: next })}
            />

            <ToggleRow
              id="cc-analytics"
              title="Analytics"
              description="Helps us understand usage so we can improve performance and features."
              checked={value?.analytics === true}
              disabled={false}
              onChange={(next) => onChange?.({ ...value, analytics: next })}
            />
          </div>

          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              type="button"
              onClick={onRejectAll}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
            >
              Reject All
            </button>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={onAcceptAll}
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => onSave?.(value)}
                className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
              >
                Save Preferences
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs text-zinc-400">
            Note: Disabling non-essential cookies may reduce functionality. Your choice is stored
            for up to 12 months.
          </p>
        </div>
      </div>
    </div>
  );
}
