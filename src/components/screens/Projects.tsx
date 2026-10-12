"use client";

// ---------------------------------------------------------------------------
// PROJECTS screen: a game-style list on the left and a details panel for the
// selected project on the right (like the skill or item description boxes).
// Enter (or the button) opens the project.
// ---------------------------------------------------------------------------

import Prompts from "@/components/Prompts";
import ScreenTitle from "@/components/ScreenTitle";
import { projects } from "@/lib/data";
import { useListNav } from "@/lib/useListNav";

const open = (url: string) => window.open(url, "_blank");

export default function Projects({ active, onBack }: { active: boolean; onBack: () => void }) {
  const { sel, hover } = useListNav({ count: projects.length, active, onBack, onConfirm: (i) => open(projects[i].url) });
  const p = projects[sel];

  return (
    <div className="screen-pad">
      <ScreenTitle title="Projects" subtitle={`${projects.length} entries recorded`} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
        {/* List */}
        <div className="flex flex-col gap-2.5">
          {projects.map((proj, i) => (
            <button
              key={proj.name}
              onMouseEnter={() => hover(i)}
              onClick={() => hover(i)}
              className={`row ${sel === i ? "is-sel" : ""}`}
              style={{ animationDelay: `${0.05 * i + 0.15}s` }}
            >
              <span className="row-index">{String(i + 1).padStart(2, "0")}</span>
              {proj.name}
            </button>
          ))}
        </div>

        {/* Details panel. key={sel} replays the entrance animation on every change */}
        <div key={sel} className="panel self-start p-7 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="panel-label">Details</span>
            <span className="font-display text-lg font-bold italic text-ice/70">{p.year}</span>
          </div>
          <h2 className="mt-2 font-display text-4xl font-black uppercase italic leading-none md:text-5xl">{p.name}</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ice/90">{p.desc}</p>

          <p className="panel-label mt-6">Attributes</p>
          <div className="mt-2.5 flex flex-wrap gap-2.5">
            {p.tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <button onClick={() => open(p.url)} className="p3-btn mt-7">
            Open project <span className="text-base">⏎</span>
          </button>
        </div>
      </div>

      <Prompts confirmLabel="Open" onBack={onBack} />
    </div>
  );
}
