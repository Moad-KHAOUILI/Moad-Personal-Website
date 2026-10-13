"use client";

// ---------------------------------------------------------------------------
// PROJECTS screen: a game-style list on the left and a quick-view panel for
// the selected project on the right, for visitors in a hurry. Enter (or the
// button) opens the project's full file on the Project Detail screen.
// The last row, "Other projects", leads to the smaller projects instead.
// On phones the list is an accordion instead: nothing is open at first, and
// tapping a row drops its quick view down under it (closing any other).
// ---------------------------------------------------------------------------

import { useState } from "react";
import FitScreen from "@/components/FitScreen";
import Prompts from "@/components/Prompts";
import ScreenTitle from "@/components/ScreenTitle";
import { otherProjects, projects } from "@/lib/data";
import { sfx } from "@/lib/sfx";
import { useListNav } from "@/lib/useListNav";
import { useTouch } from "@/lib/useTouch";

type Props = {
  active: boolean;
  initial: number; // remembered selection, so coming back from a project lands on it
  onOpen: (index: number) => void;
  onOthers: () => void;
  onBack: () => void;
};

// The "Other projects" row comes right after the main projects (only if there are any)
const OTHERS = projects.length;
const COUNT = projects.length + (otherProjects.length ? 1 : 0);

export default function Projects({ active, initial, onOpen, onOthers, onBack }: Props) {
  const touch = useTouch();
  const open = (i: number) => (i === OTHERS ? onOthers() : onOpen(i));
  const { sel, setSel, hover } = useListNav({ count: COUNT, active, initial, onBack, onConfirm: open });
  // Mouse: hovering a row selects it, so a click opens it
  const point = (i: number) => (e: React.PointerEvent) => e.pointerType === "mouse" && hover(i);
  const tap = (i: number) => (sel === i ? open(i) : setSel(i));

  // Phones: which row's quick view is dropped down (none at first)
  const [dropped, setDropped] = useState<number | null>(null);
  const toggle = (i: number) => {
    setDropped(dropped === i ? null : i);
    setSel(i);
    sfx.move();
  };

  const row = (i: number) => {
    const isOthers = i === OTHERS;
    const isSel = touch ? dropped === i : sel === i;
    return (
      <button
        key={i}
        onPointerEnter={touch ? undefined : point(i)}
        onClick={() => (touch ? toggle(i) : tap(i))}
        aria-expanded={touch ? dropped === i : undefined}
        className={`row ${isOthers ? "row-others" : ""} ${isSel ? "is-sel" : ""}`}
        style={{ animationDelay: `${0.05 * i + 0.15}s` }}
      >
        <span className="row-index">{isOthers ? "+" : i + 1}</span>
        {isOthers ? "Other projects" : projects[i].name}
        {isOthers && <span className="row-count">{otherProjects.length}</span>}
      </button>
    );
  };
  const rows = Array.from({ length: COUNT }, (_, i) => i);

  return (
    <div className="screen-pad">
      <FitScreen touchZoom={0.75}>
        <ScreenTitle title="Projects" subtitle={`${projects.length} ${projects.length === 1 ? "entry" : "entries"} recorded`} />

        {touch ? (
          // Phones: one column, each row with its quick view dropping down under it when tapped
          <div className="mt-5 flex flex-col gap-5 pl-6">
            {rows.map((i) => (
              <div key={i} className="flex flex-col">
                {row(i)}
                {dropped === i && (
                  <div className="quick-drop mt-3">
                    <QuickView i={i} onOpen={onOpen} onOthers={onOthers} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid gap-10 wide:grid-cols-[minmax(0,0.65fr)_minmax(0,1.6fr)] wide:gap-12">
            {/* List. pl-6 leaves room for the numbers popping out on the left */}
            <div className="flex flex-col gap-5 pl-6">{rows.map(row)}</div>
            {/* Quick view. key={sel} replays the entrance animation on every change */}
            <QuickView key={sel} i={sel} onOpen={onOpen} onOthers={onOthers} />
          </div>
        )}
      </FitScreen>

      <Prompts confirmLabel={sel === OTHERS ? "Browse" : "Open"} onBack={onBack} />
    </div>
  );
}

type QuickViewProps = { i: number; onOpen: (index: number) => void; onOthers: () => void };

// The quick view of one project (or the teaser for the other projects), with the button into it
function QuickView({ i, onOpen, onOthers }: QuickViewProps) {
  const p = projects[i];
  if (!p) {
    return (
      <div className="panel self-start p-6">
        <span className="panel-label">Side quests</span>
        <h2 className="mt-2 font-display text-4xl font-black uppercase italic leading-none">Other projects</h2>
        <p className="mt-3 leading-relaxed text-ice/90">
          Smaller projects, experiments and coursework. A quick look at each one, with a short description and a screenshot.
        </p>

        <p className="panel-label mt-4">Inside</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {otherProjects.map((o) => (
            <span key={o.name} className="chip skill-chip">{o.name}</span>
          ))}
        </div>

        <div className="mt-5">
          <button onClick={onOthers} className="p3-btn">
            Browse other projects <span className="text-4xl">⏎</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="panel self-start p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="panel-label">Quick view</span>
        <span className="font-display text-lg font-bold italic text-ice/70">{p.year}</span>
      </div>
      <h2 className="mt-2 font-display text-4xl font-black uppercase italic leading-none">{p.name}</h2>
      <p className="mt-3 leading-relaxed text-ice/90">{p.short}</p>

      <p className="panel-label mt-4">Built with</p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="chip skill-chip">{t}</span>
        ))}
      </div>

      {/* Open button, bottom left, with a hint of what's inside. It bobs, glows and
          shines so first-time visitors notice it (see .cta in globals.css) */}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <span className="cta-wrap">
          <button onClick={() => onOpen(i)} className="p3-btn cta">
            Full project file <span className="text-4xl">⏎</span>
          </button>
        </span>
        <span className="text-sm italic text-ice/70">
          {p.media.some((m) => m.type === "video" && m.src) ? "Demo video, screenshots" : "Screenshots"}, features, architecture and more
          inside.
        </span>
      </div>
    </div>
  );
}
