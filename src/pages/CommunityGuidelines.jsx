// src/pages/CommunityGuidelines.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "Hussein@superfilm.info";
const LAST_UPDATED = "February 11, 2026";

const SECTION_LINKS = [
  { id: "film-passion", label: "1. A Platform Built on Film Passion" },
  { id: "debate-discussion", label: "2. Debate & Discussion" },
  { id: "respect-human", label: "3. Respect the Human Behind the Opinion" },
  { id: "spoiler-etiquette", label: "4. Spoiler Etiquette" },
  { id: "political-cultural", label: "5. Political & Cultural Discussion" },
  { id: "off-topic", label: "6. Off-Topic Conversation" },
  { id: "language-profanity", label: "7. Language & Profanity" },
  { id: "humour-memes", label: "8. Humour & Meme Culture" },
  { id: "club-culture", label: "9. Club Culture & Conduct" },
  { id: "reporting", label: "10. Reporting Concerns" },
  { id: "enforcement", label: "11. Enforcement Relationship" },
  { id: "shared-responsibility", label: "12. A Shared Responsibility" },
  { id: "updates", label: "13. Updates" },
  { id: "contact", label: "14. Contact" },
];

const LEGAL_ARTICLE_CLASSNAME = [
  "text-zinc-200 leading-relaxed",
  "[&_h2]:mt-10 [&_h2]:scroll-mt-28 [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white",
  "[&_h3]:mt-6 [&_h3]:scroll-mt-28 [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-zinc-100",
  "[&_p]:mt-3 [&_p]:text-sm sm:[&_p]:text-base [&_p]:text-zinc-200",
  "[&_h2:first-child]:mt-0",
  "[&_p:first-child]:mt-0",
  "[&_ul]:mt-3 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5",
  "[&_ol]:mt-3 [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-1.5",
  "[&_li]:text-zinc-200",
  "[&_strong]:text-white",
  "[&_code]:rounded-md [&_code]:bg-black/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:text-zinc-100 [&_code]:ring-1 [&_code]:ring-white/10",
  "[&_a]:text-yellow-400 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-yellow-300",
  "[&_hr]:my-8 [&_hr]:border-white/10",
].join(" ");

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Community Guidelines | SuperFilm</title>
        <meta name="description" content="Read the SuperFilm Community Guidelines." />
        <link rel="canonical" href="https://www.superfilm.uk/community-guidelines" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/40 backdrop-blur p-6 sm:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <header>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              SUPERFILM COMMUNITY GUIDELINES
            </h1>
            <p className="mt-2 text-sm text-zinc-400">Last Updated: {LAST_UPDATED}</p>
          </header>

          <details className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <summary className="cursor-pointer select-none text-sm font-medium text-zinc-200">
              On this page
            </summary>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {SECTION_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-200 ring-1 ring-white/10 hover:bg-white/5 hover:text-white transition"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </details>

          <article className={LEGAL_ARTICLE_CLASSNAME}>
            <p>
              SuperFilm is a global social platform built around cinema, conversation, and
              community. These Community Guidelines outline the cultural standards and
              behavioural expectations for all users.
            </p>
            <p>
              They are designed to foster thoughtful discussion, passionate debate, and
              respectful interaction across clubs and the wider platform.
            </p>
            <p>
              These Guidelines operate alongside our{" "}
              <Link to="/acceptable-use">Acceptable Use Policy</Link> and{" "}
              <Link to="/terms">Terms &amp; Conditions</Link>.
            </p>

            <h2 id="film-passion">1. A Platform Built on Film Passion</h2>
            <p>SuperFilm exists to celebrate film culture.</p>
            <p>We encourage:</p>
            <ul>
              <li>Deep analysis</li>
              <li>Diverse opinions</li>
              <li>Cultural perspectives</li>
              <li>Critical debate</li>
              <li>Artistic appreciation</li>
            </ul>
            <p>Disagreement is natural — and often essential — in film discourse.</p>

            <h2 id="debate-discussion">2. Debate &amp; Discussion</h2>
            <p>Film debate can be passionate.</p>
            <p>Heated discussion is permitted where it remains:</p>
            <ul>
              <li>Respectful</li>
              <li>Constructive</li>
              <li>Focused on film or ideas</li>
            </ul>
            <p>Users should challenge opinions — not attack individuals.</p>

            <h2 id="respect-human">3. Respect the Human Behind the Opinion</h2>
            <p>Every account represents a real person.</p>
            <p>Always:</p>
            <ul>
              <li>Engage respectfully</li>
              <li>Avoid personal insults</li>
              <li>Debate viewpoints, not identities</li>
            </ul>
            <p>
              Harassment or demeaning behaviour may escalate to moderation action under our{" "}
              <Link to="/acceptable-use">Acceptable Use Policy</Link>.
            </p>

            <h2 id="spoiler-etiquette">4. Spoiler Etiquette</h2>
            <p>Spoilers are sometimes unavoidable in film discussions.</p>
            <p>We recommend:</p>
            <ul>
              <li>Using spoiler warnings where possible</li>
              <li>Respecting newly released films</li>
              <li>Being mindful in public club threads</li>
            </ul>
            <p>Spoiler management may vary by club culture.</p>

            <h2 id="political-cultural">5. Political &amp; Cultural Discussion</h2>
            <p>Film often intersects with politics and society.</p>
            <p>Political discussion is allowed where it remains:</p>
            <ul>
              <li>Relevant to film</li>
              <li>Respectful</li>
              <li>Non-extremist</li>
            </ul>
            <p>
              Extremism, hate speech, or propaganda remain prohibited under our{" "}
              <Link to="/acceptable-use">Acceptable Use Policy</Link>.
            </p>

            <h2 id="off-topic">6. Off-Topic Conversation</h2>
            <p>Clubs may host off-topic conversation where appropriate.</p>
            <p>However:</p>
            <ul>
              <li>Film should remain the platform’s core focus</li>
              <li>
                Excessive off-topic posting may be moderated at club or platform level
              </li>
            </ul>
            <p>Club administrators may set their own boundaries.</p>

            <h2 id="language-profanity">7. Language &amp; Profanity</h2>
            <p>Expressive language is part of film culture.</p>
            <p>Profanity is permitted where it is:</p>
            <ul>
              <li>Non-targeted</li>
              <li>Non-abusive</li>
              <li>Contextual to discussion</li>
            </ul>
            <p>Directed abuse or harassment is not permitted.</p>

            <h2 id="humour-memes">8. Humour &amp; Meme Culture</h2>
            <p>Humour, satire, and film memes are welcome across SuperFilm.</p>
            <p>We encourage:</p>
            <ul>
              <li>Creative expression</li>
              <li>Film parody</li>
              <li>Inside jokes</li>
              <li>Cultural commentary</li>
            </ul>
            <p>Content must still comply with platform safety rules.</p>

            <h2 id="club-culture">9. Club Culture &amp; Conduct</h2>
            <p>Each club develops its own tone and etiquette.</p>
            <p>Members should:</p>
            <ul>
              <li>Respect club guidelines</li>
              <li>Follow admin direction</li>
              <li>Contribute constructively</li>
            </ul>
            <p>Admins are expected to moderate responsibly and fairly.</p>

            <h2 id="reporting">10. Reporting Concerns</h2>
            <p>
              If you encounter behaviour that violates platform standards, you may report
              it through SuperFilm’s reporting systems.
            </p>
            <p>Reports are reviewed by human moderators.</p>

            <h2 id="enforcement">11. Enforcement Relationship</h2>
            <p>Community Guidelines define cultural expectations.</p>
            <p>Serious or repeated violations may escalate under:</p>
            <ul>
              <li>
                <Link to="/acceptable-use">Acceptable Use Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms &amp; Conditions</Link>
              </li>
            </ul>
            <p>Which may result in warnings, suspensions, or bans.</p>

            <h2 id="shared-responsibility">12. A Shared Responsibility</h2>
            <p>SuperFilm thrives when users:</p>
            <ul>
              <li>Engage thoughtfully</li>
              <li>Respect diversity of taste</li>
              <li>Debate in good faith</li>
              <li>Support inclusive film culture</li>
            </ul>
            <p>We are building a global cinema community together.</p>

            <h2 id="updates">13. Updates</h2>
            <p>We may update these Guidelines to reflect:</p>
            <ul>
              <li>Community evolution</li>
              <li>Platform features</li>
              <li>Safety needs</li>
            </ul>
            <p>Continued use indicates acceptance.</p>

            <h2 id="contact">14. Contact</h2>
            <p>
              SUPRFILM LTD
              <br />
              Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <br />
              Website: <a href="https://www.superfilm.uk">www.superfilm.uk</a>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}

