"use client";

// ---------------------------------------------------------------------------
// OTHER PROJECTS screen, reached from the bottom of the Projects list: the
// smaller projects as a grid of cards, each with one image, a short text and
// its tags. Arrow keys move the highlight, clicking an image enlarges it.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import FitScreen from "@/components/FitScreen";
import Prompts from "@/components/Prompts";
import ScreenTitle from "@/components/ScreenTitle";
import { otherProjects } from "@/lib/data";
import { sfx } from "@/lib/sfx";
import { useListNav } from "@/lib/useListNav";

export default function OtherProjects({ active, onBack }: { active: boolean; onBack: () => void }) {
  const [zoom, setZoom] = useState<string | null>(null);
  const { sel, hover } = useListNav({
    count: otherProjects.length,
    active: active && !zoom,
    onBack,
    onConfirm: (i) => otherProjects[i].image.src && setZoom(otherProjects[i].image.src),
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
              {/* The one image (click to enlarge), or a placeholder until it's added */}
              <div className="side-card-media">
                {p.image.src ? (
                  <button onClick={() => setZoom(p.image.src)} className="block h-full w-full cursor-zoom-in">
                    {/* eslint-disable-next-line @next/next/no-img-element -- any size from /public */}
                    <img src={p.image.src} alt={p.image.caption} className="h-full w-full object-cover object-top" />
                  </button>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 text-center">
                    <span className="font-display text-4xl text-cyan/60">▣</span>
                    <span className="text-sm text-ice/60">Image coming soon</span>
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
              </div>
            </div>
          ))}
        </div>
      </FitScreen>

      <Prompts confirmLabel={otherProjects[sel]?.image.src ? "Enlarge" : undefined} onBack={onBack} />

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
