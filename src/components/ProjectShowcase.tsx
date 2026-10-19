"use client";

// ---------------------------------------------------------------------------
// Featured projects on the main menu: a slideshow of the main projects, each
// with its first screenshot, name and tagline. A slanted progress bar fills up
// and, once full, the next project slides in. Hovering pauses it, clicking a
// segment jumps to that project, and clicking the picture opens its project file.
// The timing lives in CSS (.showcase-pip.is-sel animation), so pausing on hover
// is just animation-play-state, and the slide changes when the animation ends.
// ---------------------------------------------------------------------------

import { useState } from "react";
import { projects } from "@/lib/data";
import { sfx } from "@/lib/sfx";

// The picture for each project: its first screenshot (skipping videos)
const slides = projects.map((p) => ({ ...p, image: p.media.find((m) => m.type === "image" && m.src) }));

export default function ProjectShowcase({ onOpen }: { onOpen: (index: number) => void }) {
  const [cur, setCur] = useState(0);
  const p = slides[cur];

  const jump = (i: number) => {
    if (i === cur) return;
    setCur(i);
    sfx.move();
  };

  return (
    <div className="panel showcase">
      <div className="flex items-baseline justify-between gap-4">
        <span className="panel-label">Featured projects</span>
        <span className="showcase-count">
          {String(cur + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* The picture. key={cur} replays the slide-in on every change */}
      <button onClick={() => onOpen(cur)} className="showcase-media" aria-label={`Open ${p.name}`}>
        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element -- any size from /public
          <img key={cur} src={p.image.src} alt={p.image.caption} className="showcase-img" />
        )}
        <span className="showcase-open">Open project file ⏎</span>
      </button>

      <div key={cur} className="showcase-text">
        <h2 className="font-display text-3xl font-black uppercase italic leading-none">{p.name}</h2>
        <p className="mt-1.5 text-sm text-ice/80">{p.tagline}</p>
      </div>

      {/* Progress: one slanted segment per project; the current one fills up, then moves on */}
      <div className="mt-4 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.name}
            onClick={() => jump(i)}
            aria-label={`Show ${s.name}`}
            className={`showcase-pip ${i === cur ? "is-sel" : ""} ${i < cur ? "is-done" : ""}`}
          >
            <span onAnimationEnd={() => setCur((cur + 1) % slides.length)} />
          </button>
        ))}
      </div>
    </div>
  );
}
