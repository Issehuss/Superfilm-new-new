// src/pages/OurSocials.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/superfilm_official/",
    handle: "@superfilm_official",
    description: "Announcements, highlights, and behind-the-scenes updates.",
  },
  {
    name: "Twitter",
    href: "https://x.com/SuperFilmHub",
    handle: "@SuperFilmHub",
    description: "Quick updates, reminders, and everything happening in real time.",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@superfilm_official",
    handle: "@superfilm_official",
    description: "Clips, community moments, and the fun stuff.",
  },
];

export default function OurSocialsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Our Socials | SuperFilm</title>
        <meta
          name="description"
          content="Follow SuperFilm on Instagram, Twitter, and TikTok to stay up to date."
        />
        <link rel="canonical" href="https://superfilm.uk/socials" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zinc-400">
            Stay up to date
          </p>
          <h1 className="text-3xl font-semibold text-white">Our Socials</h1>
        </div>

        <p className="text-base text-zinc-200 leading-relaxed">
          Follow SuperFilm on our socials to stay in the loop on announcements,
          new features, and community highlights. We’d love
          to have you with us.
        </p>

        <div className="grid gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-sm transition hover:bg-zinc-900/80"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-2">
                  <div className="space-y-0.5">
                    <div className="text-lg font-semibold text-superfilm-yellow group-hover:text-yellow-300">
                      {social.name}
                    </div>
                    <div className="text-sm text-zinc-400">{social.handle}</div>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {social.description}
                  </p>
                </div>

                <div className="shrink-0 text-sm text-zinc-400 group-hover:text-zinc-200">
                  Open ↗
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="text-sm text-zinc-500">
          Thanks for supporting SuperFilm — following along helps you catch new
          drops and updates as soon as they land.
        </p>
      </div>
    </div>
  );
}
