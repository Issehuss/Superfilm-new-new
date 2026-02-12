// src/pages/Events.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Events.css";
import supabase from "lib/supabaseClient";
import useRealtimeResume from "../hooks/useRealtimeResume";
import { useUser } from "../context/UserContext";

const EVENTS_CACHE_KEY = "cache:events:v1";
const EVENTS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const FALLBACK_EVENT_IMAGE = "https://placehold.co/600x800?text=Event";
const EVENTS_SELECT_FULL = [
  "id",
  "slug",
  "title",
  "date",
  "venue",
  "poster_url",
  "tags",
  "summary",
  "club_id",
  "club_name",
  "is_hidden",
  "lat",
  "lon",
  "city_name",
].join(", ");
const EVENTS_SELECT_MIN = [
  "id",
  "slug",
  "title",
  "date",
  "venue",
  "poster_url",
  "club_id",
  "club_name",
  "is_hidden",
].join(", ");
const EVENTS_SELECT_MIN_NO_HIDDEN = [
  "id",
  "slug",
  "title",
  "date",
  "venue",
  "poster_url",
  "club_id",
  "club_name",
].join(", ");

function isStandalonePwaMode() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true
  );
}

function isMissingSelectColumn(err, columnName) {
  const m = (err?.message || "").toLowerCase();
  const c = String(columnName || "").toLowerCase();
  return (
    m.includes(`'${c}' column`) ||
    m.includes(`"${c}"`) ||
    m.includes(`.${c}`) ||
    m.includes(` ${c} `) ||
    m.includes(` ${c}.`) ||
    m.includes(` ${c},`) ||
    m.includes(` ${c})`)
  );
}

function readEventsCache() {
  try {
    const raw = sessionStorage.getItem(EVENTS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.at || !Array.isArray(parsed?.data)) return null;
    if (Date.now() - parsed.at > EVENTS_CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeEventsCache(data) {
  try {
    sessionStorage.setItem(
      EVENTS_CACHE_KEY,
      JSON.stringify({ at: Date.now(), data })
    );
  } catch {
    /* ignore cache write errors */
  }
}


// ---------------- Row → UI mapper (tolerant to schema) ----------------
function mapRowToEvent(row) {
  const dateIso = row.date ?? null;

  const club = row.clubs || row.club || {};

  const clubName =
    row.club_name ??
    club.name ??
    row.club?.name ??
    row.clubName ??
    "Club";

  const clubId = String(row.club_id ?? club.id ?? row.clubId ?? "");

  return {
    id: String(row.id),
    slug: row.slug ?? row.event_slug ?? "",
    title: row.title ?? "Untitled Event",
    date: dateIso ? new Date(dateIso).toISOString() : new Date().toISOString(),
    venue: row.venue ?? row.location ?? "Venue",
    is_hidden: Boolean(row.is_hidden),
    posterUrl:
      row.poster_url ?? FALLBACK_EVENT_IMAGE,
    tags: Array.isArray(row.tags)
      ? row.tags
      : typeof row.tags === "string"
      ? row.tags.split(",").map((s) => s.trim())
      : [],
    summary: row.summary ?? row.description ?? "",
    clubId,
    clubName,
    lat: typeof row.lat === "number" ? row.lat : undefined,
    lon: typeof row.lon === "number" ? row.lon : undefined,
    cityName: row.city_name ?? row.city ?? undefined,
  };
}

/* ---------------- Small Card ---------------- */
function PosterCard({ evt, isGoing, moderationView }) {
  const d = new Date(evt.date);
  const month = d.toLocaleString(undefined, { month: "short" });
  const day = d.getDate();

  return (
    <article className="poster-card">
      <Link
        to={`/events/${evt.slug}`}
        state={{ event: evt }}
        className="block"
      >
        <div className="poster-media">
          <img
            src={evt.posterUrl || FALLBACK_EVENT_IMAGE}
            alt={evt.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_EVENT_IMAGE;
            }}
          />
          <div className="poster-date">
            <div className="m">{month}</div>
            <div className="d">{day}</div>
          </div>
          {isGoing && (
            <div className="poster-going-badge" aria-label="You are going to this event">
              <span className="poster-going-dot" aria-hidden="true" />
              Going
            </div>
          )}
          {moderationView && evt.is_hidden && (
            <div className="poster-hidden-badge" aria-label="Hidden event (visible in moderation view)">
              Hidden
            </div>
          )}
        </div>
        <div className="poster-info">
          <h3 className="title">{evt.title}</h3>
          <div className="meta">
            <span className="dot" />
            {evt.clubName} • {evt.venue}
          </div>
          {evt.tags?.length ? (
            <div className="tags">
              {evt.tags.slice(0, 3).map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          ) : null}
          {evt.summary && <p className="summary">{evt.summary}</p>}
        </div>
      </Link>
    </article>
  );
}

/* ---------------- Page ---------------- */
export default function Events() {
  const { user, sessionLoaded } = useUser();
  const cached = readEventsCache();
  const [liveEvents, setLiveEvents] = useState(cached || []);
  const [loadingLive, setLoadingLive] = useState(!cached);
  const [query, setQuery] = useState("");
  const [isStandalonePwa, setIsStandalonePwa] = useState(() =>
    isStandalonePwaMode()
  );
  const resumeTick = useRealtimeResume();
  const [goingEventIds, setGoingEventIds] = useState(() => new Set());
  const [isSiteMod, setIsSiteMod] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const moderationParam = useMemo(() => {
    const params = new URLSearchParams(location.search || "");
    return params.get("moderation");
  }, [location.search]);
  const moderationView = Boolean(isSiteMod && moderationParam === "1");

  // Accept a new event from /events/new via location.state
  useEffect(() => {
    const newEvt = location.state?.newEvent;
    if (newEvt) {
      setLiveEvents((prev) => {
        const id = newEvt.id ? String(newEvt.id) : null;
        if (id && prev.some((e) => String(e.id) === id)) return prev;
        return [newEvt, ...prev];
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Accept a removed event from /events via location.state
  useEffect(() => {
    const removedId = location.state?.removedEventId;
    if (!removedId) return;
    setLiveEvents((prev) => {
      const next = prev.filter((e) => String(e.id) !== String(removedId));
      writeEventsCache(next);
      return next;
    });
    navigate(location.pathname, { replace: true, state: {} });
  }, [location, navigate]);

  // Load from Supabase on mount
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        let mapped = [];

        // Attempt broad select first (most tolerant to schema differences)
        try {
          const { data, error } = await supabase
            .from("events")
            .select(EVENTS_SELECT_FULL)
            .order("date", { ascending: true })
            .limit(300);
          if (error) throw error;
          mapped = (data || []).map(mapRowToEvent);
        } catch (primaryErr) {
          console.warn("[events] primary fetch failed, retrying:", primaryErr?.message || primaryErr);
          // Fallback: conservative column list to avoid 400s on missing columns
          try {
            const { data, error } = await supabase
              .from("events")
              .select(EVENTS_SELECT_MIN)
              .order("date", { ascending: true })
              .limit(300);
            if (error) throw error;
            mapped = (data || []).map(mapRowToEvent);
          } catch (secondaryErr) {
            if (isMissingSelectColumn(secondaryErr, "is_hidden")) {
              const { data, error } = await supabase
                .from("events")
                .select(EVENTS_SELECT_MIN_NO_HIDDEN)
                .order("date", { ascending: true })
                .limit(300);
              if (error) throw error;
              mapped = (data || []).map(mapRowToEvent);
            } else {
              throw secondaryErr;
            }
          }
        }

        const sorted = mapped.sort(
          (a, b) =>
            new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime()
        );

        if (mounted) {
          setLiveEvents(sorted);
          writeEventsCache(sorted);
        }
      } catch {
        if (mounted) setLiveEvents([]); // no fallback to fake data
      } finally {
        if (mounted) setLoadingLive(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Realtime updates
  useEffect(() => {
    const channel = supabase
      .channel("events-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        (payload) => {
          setLiveEvents((prev) => {
            if (payload.eventType === "INSERT") {
              const e = mapRowToEvent(payload.new);
              if (prev.some((x) => String(x.id) === String(e.id)))
                return prev;
              return [e, ...prev];
            }
            if (payload.eventType === "UPDATE") {
              const e = mapRowToEvent(payload.new);
              return prev.map((x) =>
                String(x.id) === String(e.id) ? e : x
              );
            }
            if (payload.eventType === "DELETE") {
              const id = String(payload.old.id);
              return prev.filter((x) => String(x.id) !== id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [resumeTick]);

  useEffect(() => {
    const media = window.matchMedia?.("(display-mode: standalone)");
    const syncStandalone = () => setIsStandalonePwa(isStandalonePwaMode());
    syncStandalone();

    if (media?.addEventListener) media.addEventListener("change", syncStandalone);
    else if (media?.addListener) media.addListener(syncStandalone);

    return () => {
      if (media?.removeEventListener) media.removeEventListener("change", syncStandalone);
      else if (media?.removeListener) media.removeListener(syncStandalone);
    };
  }, []);

  // Determine if the current user is a site moderator (admin/moderator role).
  useEffect(() => {
    if (!sessionLoaded) return;
    let cancelled = false;
    const SITE_ROLES = new Set(["admin", "moderator"]);

    (async () => {
      const { data: auth } = await supabase.auth.getSession();
      const sessionUserId = auth?.session?.user?.id || null;
      const resolvedUserId = user?.id || sessionUserId;
      if (!resolvedUserId) {
        if (!cancelled) setIsSiteMod(false);
        return;
      }

      try {
        const { data: prof, error } = await supabase
          .from("profiles")
          .select("roles")
          .eq("id", resolvedUserId)
          .maybeSingle();
        if (error) throw error;
        const roles = Array.isArray(prof?.roles) ? prof.roles : [];
        const ok = roles.some((r) => SITE_ROLES.has(String(r).toLowerCase()));
        if (!cancelled) setIsSiteMod(ok);
      } catch (e) {
        console.warn("[Events] failed to resolve moderator role:", e?.message || e);
        if (!cancelled) setIsSiteMod(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionLoaded, user?.id]);

  // Load the current user's RSVPs so the list can show "Going" badges.
  useEffect(() => {
    if (!sessionLoaded) return;
    let cancelled = false;

    (async () => {
      const { data: auth } = await supabase.auth.getSession();
      const sessionUserId = auth?.session?.user?.id || null;
      const resolvedUserId = user?.id || sessionUserId;

      if (!resolvedUserId) {
        if (!cancelled) setGoingEventIds(new Set());
        return;
      }

      try {
        const { data, error } = await supabase
          .from("event_rsvps")
          .select("event_id, status")
          .eq("user_id", resolvedUserId);

        if (error) throw error;

        const next = new Set(
          (data || [])
            .filter((r) => (r.status || "going") === "going")
            .map((r) => String(r.event_id))
        );
        if (!cancelled) setGoingEventIds(next);
      } catch (e) {
        console.warn("[Events] failed to load my RSVPs:", e?.message || e);
        if (!cancelled) setGoingEventIds(new Set());
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionLoaded, user?.id, resumeTick]);

  // Only live events — no mock fallback
  const base = moderationView ? liveEvents : liveEvents.filter((event) => !event.is_hidden);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.clubName.toLowerCase().includes(q) ||
        (e.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [base, query]);

  const toggleModerationView = () => {
    if (!isSiteMod) return;
    const params = new URLSearchParams(location.search || "");
    if (moderationView) params.delete("moderation");
    else params.set("moderation", "1");
    const nextSearch = params.toString();
    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      { replace: true }
    );
  };

  return (
    <>
      <Helmet>
        <title>Events | SuperFilm</title>
        <meta
          name="description"
          content="Find screenings, watch parties, and club events."
        />
        <link rel="canonical" href="https://superfilm.uk/events" />
      </Helmet>

      <div className={`events-page ${isStandalonePwa ? "events-page-pwa" : ""}`}>
        <header className="page-head">
          <div className="head-copy">
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-zinc-400 mt-1">
              {loadingLive
                ? "Loading live events…"
                : "Find screenings, watch parties and club meetups."}
            </p>
          </div>

          <div className="head-actions">
            <input
              className="search"
              placeholder="Search events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="head-cta-row">
              {isSiteMod && (
                <button
                  type="button"
                  onClick={toggleModerationView}
                  className="btn ghost"
                  title="Moderation view can see hidden events"
                >
                  {moderationView ? "Exit Mod View" : "Mod View"}
                </button>
              )}
              <Link to="/events/new" className="btn primary">
                List Event
              </Link>
            </div>
          </div>
        </header>

        <section className="poster-grid">
          {filtered.map((evt) => (
            <PosterCard
              key={`${evt.slug}`}
              evt={evt}
              isGoing={goingEventIds.has(String(evt.id))}
              moderationView={moderationView}
            />
          ))}
          {filtered.length === 0 && !loadingLive && (
            <div className="empty">No events found.</div>
          )}
        </section>
      </div>
    </>
  );
}
