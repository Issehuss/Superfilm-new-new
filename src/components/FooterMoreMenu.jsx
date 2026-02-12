import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    if (typeof mql.addEventListener === "function") mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    setMatches(mql.matches);
    return () => {
      if (typeof mql.removeEventListener === "function") mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);

  return matches;
}

function getFocusableElements(root) {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll(
      [
        "a[href]",
        "button:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ].join(",")
    )
  );
}

function MenuItem({ children, onClick, disabled, right, as = "button", to }) {
  const classes = [
    "w-full text-left rounded-xl px-3 py-2 text-xs text-zinc-200",
    "hover:bg-yellow-400/10 hover:ring-1 hover:ring-yellow-400/20",
    "focus:outline-none focus:ring-2 focus:ring-yellow-400/60",
    "transition",
    disabled ? "opacity-60 cursor-not-allowed hover:bg-transparent hover:ring-0" : "",
  ].join(" ");

  if (as === "link") {
    return (
      <Link
        to={to}
        role="menuitem"
        className={classes}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        aria-disabled={disabled ? "true" : "false"}
        tabIndex={disabled ? -1 : 0}
      >
        <span className="flex items-center justify-between gap-3">
          <span className="min-w-0 truncate">{children}</span>
          {right ? <span className="shrink-0">{right}</span> : null}
        </span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      <span className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate">{children}</span>
        {right ? <span className="shrink-0">{right}</span> : null}
      </span>
    </button>
  );
}

export default function FooterMoreMenu() {
  const isDesktopLayout = useMediaQuery("(min-width: 768px)");
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastActiveRef = useRef(null);
  const closeTimerRef = useRef(null);
  const hoverEnabled = isDesktopLayout && canHover;

  const items = useMemo(
    () => [
      { type: "link", label: "Acceptable Use Policy", to: "/acceptable-use" },
      { type: "link", label: "Community Guidelines", to: "/community-guidelines" },
      { type: "link", label: "Subscription & Billing Terms", to: "/billing-terms" },
      { type: "link", label: "Data Retention Policy", to: "/data-retention" },
      { type: "link", label: "Subprocessors & Data Partners", to: "/subprocessors" },
      { type: "link", label: "Copyright Policy", to: "/copyright-policy", disabled: true, badge: "Soon" },
      { type: "divider" },
      {
        type: "action",
        label: "Cookie Settings",
        onSelect: () => window.dispatchEvent(new Event("open-cookie-settings")),
      },
      { type: "text", label: "Accessibility", disabled: true, badge: "Future" },
      { type: "text", label: "Ads Info", disabled: true, badge: "Future" },
    ],
    []
  );

  useEffect(() => {
    if (!open) return;
    function onDocClick(e) {
      const inWrapper = wrapperRef.current?.contains?.(e.target);
      const inModal = modalRef.current?.contains?.(e.target);
      if (!inWrapper && !inModal) setOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open || isDesktopLayout) return;
    lastActiveRef.current = document.activeElement;
    const t = window.setTimeout(() => {
      closeButtonRef.current?.focus?.();
    }, 0);

    function onKeyDown(e) {
      if (e.key !== "Tab") return;
      const focusables = getFocusableElements(modalRef.current);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || !modalRef.current.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !modalRef.current.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown, true);
      const lastActive = lastActiveRef.current;
      if (lastActive && typeof lastActive.focus === "function") lastActive.focus();
    };
  }, [open, isDesktopLayout]);

  const cancelClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      const active = typeof document !== "undefined" ? document.activeElement : null;
      if (active && wrapperRef.current?.contains?.(active)) return;
      setOpen(false);
    }, 150);
  };

  const selectAndClose = (fn) => {
    try {
      fn?.();
    } finally {
      setOpen(false);
    }
  };

  return (
    <div
      className="relative"
      ref={wrapperRef}
      onMouseEnter={() => {
        if (!hoverEnabled) return;
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (!hoverEnabled) return;
        scheduleClose();
      }}
      onFocusCapture={() => {
        cancelClose();
      }}
      onBlurCapture={(e) => {
        if (!isDesktopLayout) return;
        const next = e.relatedTarget;
        if (!next || !wrapperRef.current?.contains?.(next)) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        className="inline-flex items-center gap-1 hover:text-superfilm-yellow focus:outline-none focus:ring-2 focus:ring-yellow-400/60 rounded"
      >
        More <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
      </button>

      {open && isDesktopLayout ? (
        <div
          role="menu"
          aria-label="More legal & policy links"
          className="absolute left-0 bottom-full w-60 rounded-2xl bg-black/95 backdrop-blur ring-1 ring-white/10 shadow-2xl p-2"
        >
          {items.map((item, idx) => {
            if (item.type === "divider") {
              return <div key={`div-${idx}`} className="my-2 h-px bg-white/10" aria-hidden="true" />;
            }
            const badge = item.badge ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-300">
                {item.badge}
              </span>
            ) : null;

            if (item.type === "link") {
              return (
                <MenuItem
                  key={item.label}
                  as="link"
                  to={item.to}
                  disabled={item.disabled}
                  right={badge}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </MenuItem>
              );
            }

            if (item.type === "action") {
              return (
                <MenuItem
                  key={item.label}
                  onClick={() => selectAndClose(item.onSelect)}
                  disabled={item.disabled}
                  right={badge}
                >
                  {item.label}
                </MenuItem>
              );
            }

            return (
              <MenuItem key={item.label} disabled={true} right={badge}>
                {item.label}
              </MenuItem>
            );
          })}
        </div>
      ) : null}

      {open && !isDesktopLayout ? (
        <div className="fixed inset-0 z-[130] flex items-end justify-center p-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
          />
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950/95 text-white shadow-2xl ring-1 ring-white/10"
          >
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-white">More</div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close dialog"
                  className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-3 grid gap-1">
                {items.map((item, idx) => {
                  if (item.type === "divider") {
                    return <div key={`div-m-${idx}`} className="my-1 h-px bg-white/10" aria-hidden="true" />;
                  }
                  const badge = item.badge ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-300">
                      {item.badge}
                    </span>
                  ) : null;

                  if (item.type === "link") {
                    return (
                      <MenuItem
                        key={item.label}
                        as="link"
                        to={item.to}
                        disabled={item.disabled}
                        right={badge}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </MenuItem>
                    );
                  }

                  if (item.type === "action") {
                    return (
                      <MenuItem
                        key={item.label}
                        onClick={() => selectAndClose(item.onSelect)}
                        disabled={item.disabled}
                        right={badge}
                      >
                        {item.label}
                      </MenuItem>
                    );
                  }

                  return (
                    <MenuItem key={item.label} disabled={true} right={badge}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
