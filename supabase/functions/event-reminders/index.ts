// supabase/functions/event-reminders/index.ts
import { createClient } from "npm:@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Service client (bypasses RLS, as intended for backend jobs)
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

Deno.serve(async () => {
  try {
    const now = new Date();

    // Window: events in ~24h (24h ± 15 minutes).
    // This tolerance helps avoid missing events if the cron runs a few minutes late/early.
    const target = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const from = new Date(target.getTime() - 15 * 60 * 1000);
    const to = new Date(target.getTime() + 15 * 60 * 1000);

    const fromIso = from.toISOString();
    const toIso = to.toISOString();

    // 1) Find events starting in that window that haven't had a reminder yet
    const { data: events, error: eventsErr } = await supabase
      .from("events")
      .select("id, title, slug, club_id, created_by, date, reminder_24h_sent")
      .gte("date", fromIso)
      .lt("date", toIso)
      .or("reminder_24h_sent.is.false,reminder_24h_sent.is.null");

    if (eventsErr) throw eventsErr;
    if (!events || events.length === 0) {
      return new Response(JSON.stringify({ ok: true, events: 0 }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2) Load RSVPs for those events (notify attendees + creator)
    const eventIds = events.map((e) => e.id);
    const eventById = new Map(events.map((e) => [String(e.id), e]));

    let rsvps: Array<{ event_id: string; user_id: string; status?: string | null }> = [];
    const { data: rsvpRows, error: rsvpErr } = await supabase
      .from("event_rsvps")
      .select("event_id, user_id, status")
      .in("event_id", eventIds);

    if (rsvpErr) throw rsvpErr;
    rsvps = (rsvpRows || []).filter(Boolean);

    const recipientsByEvent = new Map<string, Set<string>>();
    for (const e of events) {
      const id = String(e.id);
      const set = new Set<string>();
      if (e.created_by) set.add(String(e.created_by));
      recipientsByEvent.set(id, set);
    }

    for (const r of rsvps) {
      const eventId = String(r.event_id);
      if (!recipientsByEvent.has(eventId)) continue;
      const status = (r.status || "going").toLowerCase();
      if (status !== "going") continue;
      if (r.user_id) recipientsByEvent.get(eventId)?.add(String(r.user_id));
    }

    // 3) Build notifications payload
    const notifications: Array<{
      user_id: string;
      type: string;
      actor_id: null;
      club_id: string | null;
      data: Record<string, unknown>;
    }> = [];

    for (const [eventId, recipients] of recipientsByEvent.entries()) {
      const e = eventById.get(eventId);
      if (!e) continue;
      const href = e.slug ? `/events/${e.slug}` : "/events";
      const title = String(e.title || "Event");
      const message = `Reminder: "${title}" starts in 24 hours.`;

      for (const userId of recipients) {
        notifications.push({
          user_id: userId,
          type: "event_24h_reminder",
          actor_id: null,
          club_id: e.club_id ?? null,
          data: {
            title,
            message,
            href,
            event_id: e.id,
            event_slug: e.slug,
            event_title: e.title,
            event_date: e.date,
          },
        });
      }
    }

    if (notifications.length > 0) {
      const { error: notifErr } = await supabase
        .from("notifications")
        .insert(notifications);

      if (notifErr) throw notifErr;
    }

    // 4) Mark events as notified
    const { error: updateErr } = await supabase
      .from("events")
      .update({ reminder_24h_sent: true })
      .in("id", eventIds);

    if (updateErr) throw updateErr;

    return new Response(
      JSON.stringify({
        ok: true,
        events_notified: events.length,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[event-reminders] error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
