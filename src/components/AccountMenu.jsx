// src/components/AccountMenu.jsx
import { useEffect, useRef, useState, useMemo } from "react";
import {
  LogOut,
  Settings,
  User as UserIcon,
  ChevronDown,
  ChevronLeft,
  KeySquare,
  BarChart3,
  Lock,
  Crown,
  CreditCard,
  Users,
  Download,
  Info,
  FileText,
  HelpCircle,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import PartnerBadge from "./PartnerBadge.jsx";
import useEntitlements from "../hooks/useEntitlements";
import DirectorsCutBadge from "./DirectorsCutBadge";
import FeedbackButton from "./FeedbackButton.jsx";

function isStandalonePwa() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true
  );
}

export default function AccountMenu({ className = "" }) {
  // get auth + profile from context
  const { user, profile, avatar, logout, isPremium, isPartner } = useUser();
  const { presidentsClubs } = useEntitlements();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const ref = useRef(null);
  const btnRef = useRef(null);
  const [signingOut, setSigningOut] = useState(false);
  const standalonePwa = useMemo(() => isStandalonePwa(), []);

  const displayName = useMemo(
    () => profile?.display_name || "Me",
    [profile?.display_name]
  );

  // choose an “active” president club (from localStorage, else first)
  const activeClubSlug =
    typeof window !== "undefined" ? localStorage.getItem("activeClubSlug") : null;
  const activeClubId =
    typeof window !== "undefined" ? localStorage.getItem("activeClubId") : null;

  const presidentClub =
    presidentsClubs.find(
      (c) =>
        (activeClubSlug && c.slug === activeClubSlug) ||
        (activeClubId && String(c.id) === String(activeClubId))
    ) || presidentsClubs[0] || null;

  // close on outside / esc
  useEffect(() => {
    function onDocClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) setLegalOpen(false);
  }, [open]);

  // if no user, don't show menu
  if (!user) return null;

  /* ------- actions ------- */
  const goProfile = () => {
    setOpen(false);
    const slug = profile?.slug || user?.id;
    if (slug) navigate(`/u/${slug}`);
  };

  const goProfileSettings = () => {
    setOpen(false);
    navigate("/settings/profile");
  };

  const goClubSettings = () => {
    setOpen(false);
    if (!isPremium || !presidentClub) {
      navigate("/premium");
      return;
    }
    const path = presidentClub.slug
      ? `/clubs/${presidentClub.slug}/settings`
      : `/clubs/${presidentClub.id}/settings`;
    navigate(path);
  };

  const goManageInvites = () => {
    setOpen(false);
    if (!presidentClub) {
      navigate("/clubs");
      return;
    }
    const path = presidentClub.slug
      ? `/clubs/${presidentClub.slug}/invites`
      : `/clubs/${presidentClub.id}/invites`;
    navigate(path);
  };

  const goAnalytics = () => {
    const enabled = isPremium && !!presidentClub;
    if (!enabled) return;
    setOpen(false);
    const path = presidentClub.slug
      ? `/clubs/${presidentClub.slug}/analytics`
      : `/clubs/${presidentClub.id}/analytics`;
    navigate(path);
  };

  const goPremiumManage = () => {
    setOpen(false);
    navigate(isPremium ? "/settings/premium" : "/premium");
  };

  const goClubRequests = () => {
    if (!presidentClub) return;
    setOpen(false);
    const path = presidentClub.slug
      ? `/clubs/${presidentClub.slug}/requests`
      : `/clubs/${presidentClub.id}/requests`;
    navigate(path);
  };

  const goPwaInstall = () => {
    setOpen(false);
    navigate("/pwa");
  };

  const goAbout = () => {
    setOpen(false);
    navigate("/about");
  };

  const goTerms = () => {
    setOpen(false);
    navigate("/terms");
  };

  const goPrivacy = () => {
    setOpen(false);
    navigate("/privacy");
  };

  const goHelp = () => {
    setOpen(false);
    navigate("/help");
  };

  const goSocials = () => {
    setOpen(false);
    navigate("/socials");
  };

  // ✅ REAL sign-out handler
  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await logout();
      setOpen(false);
      navigate("/", { replace: true });
      // Hard fallback in case routing is blocked
      setTimeout(() => {
        try {
          window.location.assign("/");
        } catch {}
      }, 200);
    } catch (err) {
      console.error("Sign out failed:", err);
      setOpen(false);
      setSigningOut(false);
    }
  };

  const premiumEnabled = isPremium && !!presidentClub;
  const invitesEnabled = !!presidentClub;
  const requestsEnabled = !!presidentClub;

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        className="inline-flex items-center gap-2 rounded-full ring-1 ring-white/10 bg-white/10 hover:bg-white/15 px-2 py-1 transition"
      >
        <img
          src={profile?.avatar_url || avatar || "/default-avatar.svg"}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
          draggable={false}
        />
        <ChevronDown className="h-4 w-4 opacity-70" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account"
          className="absolute right-0 mt-2 w-64 rounded-2xl bg-black/90 backdrop-blur ring-1 ring-white/10 shadow-2xl origin-top-right"
          style={{ transformOrigin: "top right" }}
        >
          {legalOpen ? (
            <>
              <div className="px-3 py-2 flex items-center gap-2">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => setLegalOpen(false)}
                  className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs text-zinc-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
                <div className="text-sm font-semibold text-white">Legal &amp; Policies</div>
              </div>

              <div className="h-px bg-white/10" />

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/cookie-policy");
                }}
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
              >
                <FileText className="h-4 w-4" />
                <span>Cookie Policy</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/billing-terms");
                }}
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
              >
                <FileText className="h-4 w-4" />
                <span>Subscription &amp; Billing Terms</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/data-retention");
                }}
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
              >
                <FileText className="h-4 w-4" />
                <span>Data Retention Policy</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/subprocessors");
                }}
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
              >
                <FileText className="h-4 w-4" />
                <span>Subprocessors &amp; Data Partners</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/acceptable-use");
                }}
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
              >
                <FileText className="h-4 w-4" />
                <span>Acceptable Use Policy</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/community-guidelines");
                }}
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
              >
                <FileText className="h-4 w-4" />
                <span>Community Guidelines</span>
              </button>

              <button
                type="button"
                disabled
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-2xl opacity-60 cursor-not-allowed"
                aria-disabled="true"
              >
                <FileText className="h-4 w-4" />
                <span>Copyright Policy</span>
                <span className="ml-auto text-[10px] uppercase tracking-wide text-zinc-400">
                  Soon
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(new Event("open-cookie-settings"));
                }}
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
              >
                <Lock className="h-4 w-4" />
                <span>Cookie Settings</span>
              </button>

              <div className="h-px bg-white/10 my-1" />
            </>
          ) : (
            <>
          {/* header */}
          <div className="px-3 py-2">
            <div className="text-sm font-semibold truncate flex items-center gap-2">
              <span className="truncate">{displayName}</span>
            </div>
            <div className="text-xs text-zinc-400 truncate">
              {profile?.slug ? `@${profile.slug}` : "Account"}
            </div>
            {(isPartner || isPremium) && (
              <div className="flex items-center gap-2 mt-1">
                {isPartner && <PartnerBadge className="!px-2 !py-0.5 !text-[10px]" />}
                {isPremium && <DirectorsCutBadge className="ml-0" size="xxs" />}
              </div>
            )}
          </div>

          <div className="h-px bg-white/10" />

          {/* Profile */}
          <button
            type="button"
            onClick={goProfile}
            role="menuitem"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
          >
            <UserIcon className="h-4 w-4" />
            <span>My Profile</span>
          </button>

          <button
            type="button"
            onClick={goProfileSettings}
            role="menuitem"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
          >
            <Settings className="h-4 w-4" />
            <span>Profile Settings</span>
          </button>

          {/* Premium entry */}
          <button
            type="button"
            onClick={goPremiumManage}
            role="menuitem"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
            aria-label={isPremium ? "Manage Premium subscription" : "Go Premium"}
          >
            {isPremium ? (
              <>
                <CreditCard className="h-4 w-4" />
                <span>Manage Premium</span>
                <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-yellow-300/90">
                  <Crown className="h-3 w-3" />
                  Director’s Cut
                </span>
              </>
            ) : (
              <>
                <Crown className="h-4 w-4" />
                <span>Go Premium</span>
                <span className="ml-auto text-[11px] text-zinc-400">Director’s Cut</span>
              </>
            )}
          </button>

          <div className="h-px bg-white/10 my-1" />

          {/* President tools */}
          <button
            type="button"
            onClick={goClubSettings}
            role="menuitem"
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-2xl ${
              premiumEnabled ? "hover:bg-white/10" : "opacity-60 hover:bg-white/5"
            }`}
            title={
              premiumEnabled
                ? "Club Settings"
                : "Director’s Cut required (or not a club president)"
            }
          >
            <Settings className="h-4 w-4" />
            <span>Club Settings</span>
          </button>

          <button
            type="button"
            onClick={goManageInvites}
            role="menuitem"
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-2xl ${
              invitesEnabled ? "hover:bg-white/10" : "opacity-60 hover:bg-white/5"
            }`}
            title={
              invitesEnabled ? "Create & manage invites" : "Club president required"
            }
          >
            <KeySquare className="h-4 w-4" />
            <span>Manage Invites</span>
          </button>

          <button
            type="button"
            onClick={goClubRequests}
            role="menuitem"
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-2xl ${
              requestsEnabled ? "hover:bg-white/10" : "opacity-60 hover:bg-white/5"
            }`}
            title={requestsEnabled ? "Review membership requests" : "Club president required"}
          >
            <Users className="h-4 w-4" />
            <span>Club Requests</span>
          </button>

          <div className="h-px bg-white/10 my-1" />

          <button
            type="button"
            onClick={goPwaInstall}
            role="menuitem"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
          >
            <Download className="h-4 w-4" />
            <span>Install SuperFilm PWA</span>
          </button>

{/* View Tutorial Again */}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              navigate("/onboarding?replay=1");
            }}
            role="menuitem"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
          >
            <span>View tutorial again</span>
          </button>

{/* Feedback */}
<FeedbackButton variant="menu" />

<div className="h-px bg-white/10 my-1" />

          {/* Footer pages (useful in PWA where footer may be harder to reach) */}
          {standalonePwa && (
            <>
              <button
                type="button"
                onClick={goPrivacy}
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
              >
                <FileText className="h-4 w-4" />
                <span>Privacy Policy</span>
              </button>

              <button
                type="button"
                onClick={goTerms}
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
              >
                <FileText className="h-4 w-4" />
                <span>Terms &amp; Conditions</span>
              </button>

              <button
                type="button"
                onClick={() => setLegalOpen(true)}
                role="menuitem"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-2xl"
              >
                <FileText className="h-4 w-4" />
                <span>More Legal &amp; Policies</span>
              </button>

              <div className="h-px bg-white/10 my-1" />
            </>
          )}

{/* ✅ Sign out */}
          <button
            type="button"
            onClick={handleSignOut}
            role="menuitem"
            disabled={signingOut}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-2xl transition ${
              signingOut
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-white/10"
            }`}
          >
            <LogOut className="h-4 w-4" />
            <span>{signingOut ? "Signing out..." : "Sign out"}</span>
          </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
