"use client";

// ---------------------------------------------------------------------------
// PROJECT DETAIL screen, opened from the Projects list. The full case file
// for one project: a fixed-size dossier panel whose sections are tabs (arrow
// keys to switch). Overview shows a media viewer (screenshots and videos,
// with placeholders until they are added) beside the summary. Everything fits
// on one screen, so nothing scrolls. Esc goes back to the list.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import FitBox from "@/components/FitBox";
import Prompts from "@/components/Prompts";
import ScreenTitle from "@/components/ScreenTitle";
import { type Project } from "@/lib/data";
import { sfx } from "@/lib/sfx";
import { useListNav } from "@/lib/useListNav";

const SECTIONS = ["Overview", "Features", "Tech Stack", "Architecture", "What I Learned"] as const;
const pad = (n: number) => String(n + 1).padStart(2, "0");

type Props = { project: Project; active: boolean; onBack: () => void };

export default function ProjectDetail({ project: p, active, onBack }: Props) {
  const [zoom, setZoom] = useState<string | null>(null); // screenshot shown full screen
  // Menu keys are paused while a screenshot is enlarged, so Esc closes it instead of leaving
  const { sel, setSel, hover } = useListNav({ count: SECTIONS.length, active: active && !zoom, onBack });
  const [shot, setShot] = useState(0);

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
    <div className="screen-pad flex h-full flex-col">
      <ScreenTitle title={p.name} subtitle="Project file" />

      {/* Dossier: one fixed-size panel with the section tabs and the selected section */}
      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div className="panel dossier flex min-h-0 flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-x-1 gap-y-2">
            {SECTIONS.map((s, i) => (
              <button
                key={s}
                onMouseEnter={() => hover(i)}
                onClick={() => setSel(i)}
                className={`sec-tab ${sel === i ? "is-sel" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
          {/* key={sel} replays the entrance animation. The section shrinks to fit the panel (FitBox),
              and only scrolls as a last resort on very small windows */}
          <div key={sel} className="sec-body no-scrollbar mt-5 min-h-0 flex-1 overflow-y-auto">
            <FitBox stretch={sel === 0}>
              {sel === 0 && <Overview p={p} shot={shot} setShot={setShot} onZoom={setZoom} />}
              {sel === 1 && <Features p={p} />}
              {sel === 2 && <Stack p={p} />}
              {sel === 3 && <Architecture p={p} />}
              {sel === 4 && <Learned p={p} />}
            </FitBox>
          </div>
        </div>
      </div>

      <Prompts onBack={onBack} />

      {/* Enlarged screenshot: the whole image, as big as the window allows. Click or Esc closes it */}
      {zoom && (
        <button onClick={() => setZoom(null)} className="zoom-overlay" aria-label="Close screenshot">
          {/* eslint-disable-next-line @next/next/no-img-element -- any size from /public */}
          <img src={zoom} alt="" className="max-h-full max-w-full object-contain" />
        </button>
      )}
    </div>
  );
}

function Media({ item, onZoom }: { item?: Project["media"][number]; onZoom: (src: string) => void }) {
  // The media fills the frame absolutely, so the frame's size never depends on the media's own
  // (otherwise shrinking the section to fit would make a video wider, so taller, and never fit)
  // Portrait or square images would be mostly cropped away if they filled the wide frame,
  // so those are shown whole, over a blurred copy of themselves
  const [tall, setTall] = useState(false);

  if (!item?.src) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
        <span className="font-display text-5xl text-cyan/60">{item?.type === "video" ? "▶" : "▣"}</span>
        <span className="font-display text-xl font-black uppercase italic">{item?.caption ?? "Media"}</span>
        <span className="text-sm text-ice/60">{item?.type === "video" ? "Video" : "Screenshot"} coming soon</span>
      </div>
    );
  }
  return item.type === "video" ? (
    <video src={item.src} controls muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-contain" />
  ) : (
    // Landscape images fill the frame (cropped from the top down if the shape differs); click to see the whole thing
    <button onClick={() => onZoom(item.src)} className="group absolute inset-0 block cursor-zoom-in overflow-hidden">
      {tall && (
        // eslint-disable-next-line @next/next/no-img-element -- blurred backdrop
        <img src={item.src} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-xl" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element -- any size from /public */}
      <img
        src={item.src}
        alt={item.caption}
        onLoad={(e) => setTall(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight < 1.3)}
        className={`relative h-full w-full ${tall ? "object-contain" : "object-cover object-top"}`}
      />
      <span className="absolute bottom-3 left-3 bg-abyss/80 px-2 py-0.5 text-xs text-ice opacity-0 transition-opacity group-hover:opacity-100">
        Click to enlarge
      </span>
    </button>
  );
}

// Overview: the media viewer (selected item big, the rest as thumbnails underneath) beside the summary
type OverviewProps = { p: Project; shot: number; setShot: (i: number) => void; onZoom: (src: string) => void };
function Overview({ p, shot, setShot, onZoom }: OverviewProps) {
  return (
    <div className="grid gap-6 wide:h-full wide:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
      <div className="flex min-h-0 flex-col gap-3">
        <div className="media-frame min-h-[12rem] flex-1">
          {/* key resets the portrait check when switching items */}
          <Media key={shot} item={p.media[shot]} onZoom={onZoom} />
        </div>
        {p.media.length > 1 && (
          <div className="flex gap-3">
            {p.media.map((m, i) => (
              <button key={i} onClick={() => setShot(i)} className={`media-thumb ${shot === i ? "is-sel" : ""}`}>
                {m.type === "video" ? "▶ " : ""}
                {m.caption}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="strip">{p.tagline}</div>
        <p className="mt-3 text-sm text-cyan">{p.context}</p>
        {p.summary.map((s) => (
          <p key={s} className="mt-2.5 text-[0.95rem] leading-relaxed text-ice/90">{s}</p>
        ))}
        {p.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="p3-btn">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Features({ p }: { p: Project }) {
  return (
    <div className="grid grid-cols-2 gap-3 wide:grid-cols-4">
      {p.features.map((f, i) => (
        <div key={f.title} className="feature" style={{ animationDelay: `${0.03 * i}s` }}>
          <div className="flex items-baseline gap-2">
            <span className="tab-index">{pad(i)}</span>
            <span className="font-display text-lg font-black uppercase italic leading-none">{f.title}</span>
          </div>
          <p className="mt-1 text-sm leading-snug text-ice/80">{f.text}</p>
        </div>
      ))}
    </div>
  );
}

function Stack({ p }: { p: Project }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 wide:grid-cols-4">
      {p.stack.map((g) => (
        // Long groups take two columns, with their items split across both
        <div key={g.group} className={g.items.length > 5 ? "wide:col-span-2" : ""}>
          <span className="panel-label">{g.group}</span>
          <ul className={`mt-2 grid gap-1.5 max-sm:grid-cols-2 ${g.items.length > 5 ? "wide:grid-cols-2" : ""}`}>
            {g.items.map((it) => (
              <li key={it.name} className="stack-item">
                <span className="block font-bold leading-tight">{it.name}</span>
                <span className="block text-xs leading-tight text-ice/65">{it.purpose}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Architecture({ p }: { p: Project }) {
  const { nodes, notes } = p.architecture;
  return (
    <div>
      {/* Diagram: the nodes in a row with arrows between them */}
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {nodes.map((n, i) => (
          <div key={n.title} className="contents">
            {i > 0 && <span className="arch-arrow">{n.via}</span>}
            <div className="arch-node flex-1">
              <span className="font-display text-base font-black uppercase italic leading-none text-cyan">{n.title}</span>
              <ul className="mt-2 flex flex-col gap-1">
                {n.lines.map((l) => (
                  <li key={l} className="text-xs leading-snug text-ice/85">{l}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-5 flex flex-col gap-2">
        {notes.map((n) => (
          <li key={n} className="flex gap-2 text-sm leading-relaxed text-ice/90">
            <span className="text-cyan">▸</span>
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Learned({ p }: { p: Project }) {
  return (
    <ul className="grid gap-2 wide:grid-cols-2">
      {p.learned.map((l, i) => (
        <li key={l} className="learned" style={{ animationDelay: `${0.04 * i}s` }}>
          <svg viewBox="0 0 24 24" aria-hidden className="learned-icon">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          {l}
        </li>
      ))}
    </ul>
  );
}
