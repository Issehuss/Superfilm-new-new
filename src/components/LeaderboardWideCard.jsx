// src/components/LeaderboardWideCard.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";
import supabase from "lib/supabaseClient";
import { useUser } from "../context/UserContext";
import useHydratedSupabaseFetch from "../hooks/useHydratedSupabaseFetch";
import { readCache, writeCache } from "../lib/cache";

const PREVIEW_CACHE_PREFIX = "cache:leaderboard:preview:v1:";
const PREVIEW_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const SUMMARY_CACHE_PREFIX = "cache:leaderboard:clubSummary:v1:";
const SUMMARY_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const LEADERBOARD_PREVIEW_LIMIT = 10;
const FEATURED_POINTS_TARGET = 30;

export default function LeaderboardWideCard({
  className = "",
  shouldLoad = true, // allow callers to defer data fetching until in-view
  refreshEpoch = 0,
  homeClub = null, // club shown in Home "Load club" section
  homeClubImage = "", // sanitized URL from Home (optional)
  homeClubLoading = false,
  isStandalonePwa = false,
}) {
  const navigate = useNavigate();
  const { user, sessionLoaded } = useUser();
  const userId = user?.id || null;
  const homeClubId = homeClub?.id ? String(homeClub.id) : null;

  const cacheKey = useMemo(
    () => (userId ? `${PREVIEW_CACHE_PREFIX}${userId}` : null),
    [userId]
  );
  const cachedRows = useMemo(() => {
    if (!cacheKey) return null;
    const cached = readCache(cacheKey, PREVIEW_CACHE_TTL_MS);
    return Array.isArray(cached) ? cached : null;
  }, [cacheKey]);
  const lastGoodRowsRef = useRef(cachedRows);
  const [err, setErr] = useState("");

  useEffect(() => {
    lastGoodRowsRef.current = cachedRows;
  }, [cachedRows]);

  const fetcher = useCallback(async () => {
    if (typeof document !== "undefined" && document.visibilityState !== "visible") {
      return lastGoodRowsRef.current;
    }

    const { data, error } = await supabase.rpc(
      "get_leaderboard_with_user_club_preview",
      { limit_count: LEADERBOARD_PREVIEW_LIMIT }
    );
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  }, []);

  const previewEnabled = Boolean(
    shouldLoad && sessionLoaded && refreshEpoch > 0 && (homeClubLoading || homeClubId)
  );

  const {
    data: leaderboardRows,
    showSkeleton: rowsSkeleton,
    hasHydrated: rowsHydrated,
    error: leaderboardError,
  } = useHydratedSupabaseFetch(
    fetcher,
    [userId, refreshEpoch],
    {
      sessionLoaded,
      userId,
      initialData: cachedRows || null,
      timeoutMs: 8000,
      enabled: previewEnabled,
    }
  );

  useEffect(() => {
    if (!cacheKey || !Array.isArray(leaderboardRows)) return;
    lastGoodRowsRef.current = leaderboardRows;
    writeCache(cacheKey, leaderboardRows);
    setErr("");
  }, [cacheKey, leaderboardRows]);

  useEffect(() => {
    if (!leaderboardError || leaderboardError.message === "no-user") return;
    console.warn("[LeaderboardWideCard] leaderboard RPC failed:", leaderboardError);
    setErr(leaderboardError.message || "Failed to load leaderboard info.");
  }, [leaderboardError]);

  const rows = useMemo(
    () => (Array.isArray(leaderboardRows) ? leaderboardRows : []),
    [leaderboardRows]
  );

  const normalizedRows = useMemo(() => {
    if (!rows.length) return [];
    return rows.map((row) => ({
      ...row,
      points_this_week: row?.points_this_week ?? row?.total_points ?? 0,
    }));
  }, [rows]);

  const previewRow = useMemo(() => {
    if (!homeClubId) return null;
    return normalizedRows.find((r) => String(r?.club_id) === homeClubId) || null;
  }, [homeClubId, normalizedRows]);

  const summaryCacheKey = useMemo(
    () => (homeClubId ? `${SUMMARY_CACHE_PREFIX}${homeClubId}` : null),
    [homeClubId]
  );
  const cachedSummary = useMemo(() => {
    if (!summaryCacheKey) return null;
    return readCache(summaryCacheKey, SUMMARY_CACHE_TTL_MS);
  }, [summaryCacheKey]);

  const summaryFetcher = useCallback(async () => {
    if (!homeClubId) return null;
    if (typeof document !== "undefined" && document.visibilityState !== "visible") {
      return cachedSummary || null;
    }
    const { data, error } = await supabase.rpc("get_club_leaderboard_summary", {
      p_club_key: String(homeClubId),
    });
    if (error) throw error;
    return Array.isArray(data) ? data[0] : data;
  }, [homeClubId, cachedSummary]);

  const needsSummary = Boolean(homeClubId && !previewRow);
  const {
    data: summaryRow,
    showSkeleton: summarySkeleton,
    error: summaryError,
  } = useHydratedSupabaseFetch(
    summaryFetcher,
    [homeClubId, refreshEpoch],
    {
      sessionLoaded,
      userId,
      initialData: cachedSummary || null,
      timeoutMs: 8000,
      enabled: Boolean(previewEnabled && needsSummary),
    }
  );

  useEffect(() => {
    if (!summaryCacheKey || !summaryRow) return;
    writeCache(summaryCacheKey, summaryRow);
  }, [summaryCacheKey, summaryRow]);

  useEffect(() => {
    if (summaryRow) setErr("");
  }, [summaryRow]);

  const showCta = !homeClubLoading && !homeClubId;

  // No rows at all → CTA (do not treat as error)
  if (showCta) {
    return (
      <div className={`rounded-2xl border border-zinc-800 bg-black/40 p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-900 ring-1 ring-zinc-800 grid place-items-center text-zinc-600">
              <Crown size={18} />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Join a club to see your rank</div>
              <div className="text-[12px] text-zinc-400">Your club’s playoff path starts here.</div>
            </div>
          </div>
          <button
            onClick={() => navigate("/clubs")}
            className="rounded-lg bg-yellow-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-yellow-400"
          >
            Browse clubs
          </button>
        </div>
      </div>
    );
  }

  const statsRow = previewRow || summaryRow || null;
  const showFeaturedSkeleton =
    homeClubLoading ||
    (!statsRow && (rowsSkeleton || summarySkeleton || !rowsHydrated) && !err);
  const displayPoints = statsRow
    ? Number(statsRow?.points_this_week ?? statsRow?.total_points ?? 0)
    : null;
  const displayRank = statsRow?.club_rank ?? null;
  const progressPct = Math.min(
    100,
    FEATURED_POINTS_TARGET > 0 && Number.isFinite(displayPoints)
      ? (displayPoints / FEATURED_POINTS_TARGET) * 100
      : 0
  );

  const clubHref = homeClub?.slug
    ? `/clubs/${homeClub.slug}`
    : homeClubId
    ? `/clubs/${homeClubId}`
    : "#";
  const clubName = homeClub?.name || statsRow?.club_name || "Club";
  const clubAvatarUrl =
    homeClubImage || statsRow?.club_avatar || homeClub?.profile_image_url || "";
  const subtitle = err
    ? err
    : summaryError && summaryError.message !== "no-user"
    ? summaryError.message || "Failed to load leaderboard info."
    : "Tap for full leaderboard & playoffs";
  const cardPaddingClass = isStandalonePwa ? "px-5 py-[18px]" : "px-5 py-4";
  const layoutClass = isStandalonePwa
    ? "grid-cols-[minmax(0,1.45fr)_auto_auto] gap-3"
    : "grid-cols-3";
  const featuredGapClass = isStandalonePwa ? "gap-4" : "gap-3";
  const featuredAvatarSizeClass = isStandalonePwa ? "h-12 w-12" : "h-10 w-10";

  return (
    <button
      type="button"
      onClick={() => navigate("/leaderboard")}
      className={`w-full rounded-2xl border border-zinc-800 bg-black/40 text-left hover:border-zinc-700 transition ${cardPaddingClass} ${className}`}
      title="Open Leaderboard & Playoffs"
    >
      <div className={`grid items-center ${layoutClass}`}>
        {/* Left: featured club */}
        <div className={`flex items-center ${featuredGapClass}`}>
          <a
            href={clubHref}
            onClick={(e) => e.stopPropagation()}
            title="Open club profile"
            className={`relative ${featuredAvatarSizeClass} overflow-hidden rounded-full bg-zinc-900 ring-1 ring-zinc-800 block`}
          >
            {showFeaturedSkeleton ? (
              <div className="h-full w-full animate-pulse bg-zinc-900" />
            ) : clubAvatarUrl ? (
              <img
                src={clubAvatarUrl}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-zinc-600">
                <Crown size={18} />
              </div>
            )}
          </a>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-white">
              {showFeaturedSkeleton ? "—" : clubName}
              {homeClubId ? <span className="ml-2 text-[11px] text-yellow-300">You</span> : null}
            </div>
            <div className="truncate text-[11px] text-zinc-400">
              {showFeaturedSkeleton ? (
                "—"
              ) : err || (summaryError && summaryError.message !== "no-user") ? (
                <span className="text-red-400">{subtitle}</span>
              ) : (
                subtitle
              )}
            </div>
          </div>
        </div>

        {/* Middle: rank */}
        <div className="flex items-center justify-center">
          {showFeaturedSkeleton ? (
            <div className="h-7 w-16 animate-pulse rounded bg-zinc-900" />
          ) : (
            <div className="text-3xl font-bold leading-none text-white">{displayRank ?? "—"}</div>
          )}
        </div>

        {/* Right: points */}
        <div className="flex items-center justify-end">
          {showFeaturedSkeleton ? (
            <div className="h-7 w-24 animate-pulse rounded bg-zinc-900" />
          ) : (
            <div className="text-right">
              <div className="text-xs uppercase tracking-wide text-zinc-400">This Week (club)</div>
              <div className="text-lg font-semibold text-white">{Number.isFinite(displayPoints) ? displayPoints : "—"}</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1 w-20 rounded bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="text-[11px] text-zinc-400">{Number.isFinite(displayPoints) ? displayPoints : "—"}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
