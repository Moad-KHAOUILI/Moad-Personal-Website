"use client";

// ---------------------------------------------------------------------------
// OTHER PROJECTS screen, reached from the bottom of the Projects list: the
// smaller projects as a grid of cards, each with its picture(s), a short text
// and its tags. Arrow keys move the highlight, clicking a picture enlarges it.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import FitScreen from "@/components/FitScreen";
import Prompts from "@/components/Prompts";
import ScreenTitle from "@/components/ScreenTitle";
import SocialIcon from "@/components/SocialIcon";
import { otherProjects } from "@/lib/data";
import { sfx } from "@/lib/sfx";
import { useListNav } from "@/lib/useListNav";

export default function OtherProjects({ active, onBack }: { active: boolean; onBack: () => void }) {
  const [zoom, setZoom] = useState<string | null>(null);
  // Which picture each card is showing
  const [shots, setShots] = useState<number[]>(() => otherProjects.map(() => 0));
  const shown = (i: number) => otherProjects[i].images[shots[i]];
  const showShot = (i: number, j: number) => {
    if (j === shots[i]) return;
    setShots(shots.map((s, k) => (k === i ? j : s)));
    sfx.move();
  };

  const { sel, hover } = useListNav({
    count: otherProjects.length,
    active: active && !zoom,
    onBack,
    onConfirm: (i) => shown(i).src && setZoom(shown(i).src),
  });

  // Esc closes the enlarged image (the list navigation is paused while it's open)
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" && e.key !== "Backspace") return;
      e.preventDefault();
      sfx.back();
      setZoom(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <div className="screen-pad">
      <FitScreen>
        <ScreenTitle title="Other Projects" subtitle="Side quests" />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 wide:grid-cols-3">
          {otherProjects.map((p, i) => (
            <div
              key={p.name}
              onMouseEnter={() => hover(i)}
              className={`panel side-card flex flex-col ${sel === i ? "is-sel" : ""}`}
              style={{ animationDelay: `${0.06 * i + 0.1}s` }}
            >
              {/* The picture (click to enlarge), or a placeholder until it's added. With several
                  pictures, slanted tabs over the bottom-left corner switch between them */}
              <div className="side-card-media relative">
                {shown(i).src ? (
                  <button onClick={() => setZoom(shown(i).src)} className="absolute inset-0 block cursor-zoom-in">
                    {/* eslint-disable-next-line @next/next/no-img-element -- any size from /public */}
                    <img
                      key={shots[i]}
                      src={shown(i).src}
                      alt={shown(i).caption}
                      className="side-card-img h-full w-full object-cover object-top"
                    />
                  </button>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
                    <span className="font-display text-4xl text-cyan/60">▣</span>
                    <span className="text-sm text-ice/60">Image coming soon</span>
                  </div>
                )}
                {p.images.length > 1 && (
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {p.images.map((img, j) => (
                      <button
                        key={img.src}
                        onClick={() => showShot(i, j)}
                        className={`shot-tab ${shots[i] === j ? "is-sel" : ""}`}
                      >
                        {img.caption}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl font-black uppercase italic leading-none">{p.name}</h2>
                  <span className="font-display text-base font-bold italic text-ice/70">{p.year}</span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-ice/90">{p.short}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {p.tags.map((t) => (
                    <span key={t} className="chip skill-chip">{t}</span>
                  ))}
                </div>
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="p3-btn repo-btn mt-4 self-start">
                    <SocialIcon icon="github" className="h-5 w-5" />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </FitScreen>

      <Prompts confirmLabel={shown(sel)?.src ? "Enlarge" : undefined} onBack={onBack} />

      {/* Enlarged image over everything; click anywhere to close */}
      {zoom && (
        <button onClick={() => setZoom(null)} className="zoom-overlay" aria-label="Close image">
          {/* eslint-disable-next-line @next/next/no-img-element -- any size from /public */}
          <img src={zoom} alt="" className="max-h-full max-w-full object-contain" />
        </button>
      )}
    </div>
  );
}
