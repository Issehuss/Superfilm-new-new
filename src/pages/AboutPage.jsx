// src/pages/AboutPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FooterMoreMenu from "../components/FooterMoreMenu";

/* -------------------------------------------------------------------------- */
/*                             About Page Component                           */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | SuperFilm</title>
        <meta
          name="description"
          content="Learn about SuperFilm and our global film club network."
        />
        <link rel="canonical" href="https://superfilm.uk/about" />
      </Helmet>

      <div className="min-h-screen w-full bg-black text-zinc-200 py-20 px-6 flex justify-center">
        {/* Glass panel card */}
        <div className="max-w-3xl w-full bg-zinc-900/80 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-zinc-700/40">
          {/* Title */}
          <h1 className="text-4xl font-semibold text-superfilm-yellow mb-8">
            About Us
          </h1>

        {/* Paragraphs */}
        <p className="text-lg leading-relaxed mb-4 text-zinc-200 drop-shadow-md">
          SuperFilm was built with the film community in mind. Each individual
          taste, experience, and idea about films in one place, for all to
          indulge in.
        </p>

        

        <p className="text-lg leading-relaxed mb-4 text-zinc-200 drop-shadow-md">
          To make it clear, we champion the lone cinema experience. In fact,
          this was how SuperFilm came about. We both love
          going solo, but seeing groups of other people watch the same film and
          revel in joy about it, from the outside, does get quite lonely.
        </p>

        <p className="text-lg leading-relaxed mb-4 text-zinc-200 drop-shadow-md">
          The difficulty of going up to someone and talking to them cannot be
          understated, but the relief from conversing with others about these films
          is encouraging.
        </p>

        <p className="text-lg leading-relaxed mb-8 text-zinc-200 drop-shadow-md">
          So, SuperFilm, despite being created with many goals in mind, will
          always come back to one: prioritising human connection. Because what
          can be greater than experiencing an incredible film alone?  Doing it together.
        </p>

        {/* Dramatic final line (no animation) */}
        <p className="text-2xl leading-relaxed mt-6 text-superfilm-yellow font-extrabold tracking-wider text-center">
          <strong></strong>
        </p>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

export function SuperFilmFooter() {
  return (
    <footer className="w-full border-t border-zinc-800 text-xs text-zinc-500 py-4 mt-10 bg-black">
      <div className="mx-auto max-w-6xl w-full px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left side: links */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-x-4">
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-x-4 md:gap-y-0">
            <Link to="/about" className="hover:text-superfilm-yellow">
              About Us
            </Link>
            <Link to="/socials" className="hover:text-superfilm-yellow">
              Our Socials
            </Link>
            <Link to="/help" className="hover:text-superfilm-yellow">
              Help
            </Link>
          </div>

          <div className="hidden md:block h-3 w-px bg-white/10" aria-hidden="true" />

          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-x-4 md:gap-y-0">
            <Link to="/terms" className="hover:text-superfilm-yellow">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="hover:text-superfilm-yellow">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className="hover:text-superfilm-yellow">
              Cookie Policy
            </Link>
            <FooterMoreMenu />
          </div>
        </div>

        {/* Right side: copyright */}
        <div className="text-zinc-600">
          © {new Date().getFullYear()} SuperFilm. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
