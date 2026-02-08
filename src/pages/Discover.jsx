// src/pages/Discover.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const tiles = [
  {
    title: "Clubs",
    description: "Find film communities by location and taste.",
    to: "/clubs",
  },
  {
    title: "Movies",
    description: "Browse what’s playing and explore films with your club.",
    to: "/movies",
  },
  {
    title: "Events",
    description: "Discover screenings, watch parties, and meetups.",
    to: "/events",
  },
  {
    title: "Leaderboard",
    description: "See top clubs and members across SuperFilm.",
    to: "/leaderboard",
  },
];

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Discover | SuperFilm</title>
        <meta
          name="description"
          content="Discover films and communities curated by cinephiles."
        />
        <link rel="canonical" href="https://superfilm.uk/discover" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zinc-400">
            Explore SuperFilm
          </p>
          <h1 className="text-3xl font-semibold text-white">Discover</h1>
        </div>

        <p className="text-base text-zinc-200 leading-relaxed">
          Start here to explore clubs, movies, events, and the leaderboard —
          built for people who love cinema.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tiles.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-sm transition hover:bg-zinc-900/80"
            >
              <div className="text-lg font-semibold text-superfilm-yellow group-hover:text-yellow-300">
                {t.title}
              </div>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                {t.description}
              </p>
              <div className="mt-4 text-sm text-zinc-400 group-hover:text-zinc-200">
                Explore →
              </div>
            </Link>
          ))}
        </div>

        <p className="text-sm text-zinc-500">
          New here?{" "}
          <Link to="/auth?mode=signup" className="text-superfilm-yellow hover:underline">
            Create an account
          </Link>{" "}
          to join clubs and take part in screenings.
        </p>
      </div>
    </div>
  );
}

