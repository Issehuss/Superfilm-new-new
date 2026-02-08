import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import supabase from "lib/supabaseClient";

function isValidInviteCode(code) {
  if (!code) return false;
  // Matches our generator charset: A-Z (minus I/O) + 2-9
  return /^[A-Z2-9]{6,}$/.test(code);
}

export default function JoinClubInvite() {
  const { code: rawCode } = useParams();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const code = useMemo(() => String(rawCode || "").trim().toUpperCase(), [rawCode]);
  const fallbackClubParam = useMemo(() => String(search.get("club") || "").trim(), [search]);

  const [status, setStatus] = useState("loading"); // loading | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!isValidInviteCode(code)) {
        if (alive) {
          setStatus("error");
          setMessage("That invite link doesn’t look right.");
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from("club_invites")
          .select("club_id, code, expires_at, max_uses, used_count, is_revoked")
          .eq("code", code)
          .maybeSingle();

        const fallbackDest = fallbackClubParam
          ? `/clubs/${fallbackClubParam}?invite=${encodeURIComponent(code)}`
          : null;

        if (error) {
          if (fallbackDest) {
            navigate(fallbackDest, { replace: true });
            return;
          }
          throw error;
        }

        if (!data?.club_id) {
          if (fallbackDest) {
            navigate(fallbackDest, { replace: true });
            return;
          }
          if (!alive) return;
          setStatus("error");
          setMessage("This invite link is invalid or has expired.");
          return;
        }

        const expired = data.expires_at ? new Date(data.expires_at) < new Date() : false;
        const maxed =
          typeof data.max_uses === "number" &&
          typeof data.used_count === "number" &&
          data.used_count >= data.max_uses;

        if (data.is_revoked || expired || maxed) {
          if (!alive) return;
          setStatus("error");
          setMessage("This invite link is no longer active.");
          return;
        }

        const dest = `/clubs/${data.club_id}?invite=${encodeURIComponent(code)}`;
        navigate(dest, { replace: true });
      } catch (e) {
        console.warn("[JoinClubInvite] failed:", e?.message || e);
        if (!alive) return;
        setStatus("error");
        setMessage("We couldn’t open that invite link. Try again in a moment.");
      }
    })();

    return () => {
      alive = false;
    };
  }, [code, fallbackClubParam, navigate]);

  if (status === "loading") {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-semibold text-white">Opening invite…</h1>
        <p className="mt-2 text-sm text-zinc-400">Hang tight — redirecting you to the club.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-semibold text-white">Invite link</h1>
      <p className="mt-2 text-sm text-zinc-300">{message}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          to="/clubs"
          className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-400"
        >
          Browse clubs
        </Link>
        <Link
          to="/"
          className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
