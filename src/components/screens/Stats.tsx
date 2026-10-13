"use client";

// ---------------------------------------------------------------------------
// TECHNICAL SKILLS screen. Every category is a box, in two 2×2 grids: the web
// stack, then everything beyond it. When the window is too small for both,
// the grids split into two tabs (switch with ← → or a click).
// ---------------------------------------------------------------------------

import { useSyncExternalStore } from "react";
import FitScreen from "@/components/FitScreen";
import Prompts from "@/components/Prompts";
import ScreenTitle from "@/components/ScreenTitle";
import { skills } from "@/lib/data";
import { useListNav } from "@/lib/useListNav";

// Below this size the full layout doesn't fit without scrolling, so it switches to tabs
const FITS_QUERY = "(min-width: 1400px) and (min-height: 940px)"; // measured: needs ~925px tall at full width
const MAIN = skills.slice(0, 4);
const EXTRA = skills.slice(4);
const TABS = ["Web Stack", "Beyond the Web"];

function useFits() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(FITS_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(FITS_QUERY).matches,
    () => true,
  );
}

function SkillBox({ cat, delay }: { cat: (typeof skills)[number]; delay: number }) {
  return (
    <div className="panel skill-box p-5" style={{ animationDelay: `${delay}s` }}>
      <h2 className="font-display text-2xl font-black uppercase italic leading-none">{cat.name}</h2>
      <p className="mt-2 text-sm text-ice/75">{cat.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {cat.items.map((s) => (
          <span key={s} className="chip skill-chip">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Stats({ active, onBack }: { active: boolean; onBack: () => void }) {
  const fits = useFits();
  const { sel, setSel, hover } = useListNav({ count: fits ? 1 : TABS.length, active, onBack });

  // First four categories in a 2×2 grid
  const main = (
    <div className="grid gap-5 md:grid-cols-2">
      {MAIN.map((c, i) => (
        <SkillBox key={c.name} cat={c} delay={0.06 * i + 0.1} />
      ))}
    </div>
  );
  // The rest, also in a 2×2 grid
  const extra = (
    <div className="grid gap-5 md:grid-cols-2">
      {EXTRA.map((c, i) => (
        <SkillBox key={c.name} cat={c} delay={0.06 * (i + 4) + 0.1} />
      ))}
    </div>
  );

  return (
    <div className="screen-pad">
      <FitScreen touchZoom={0.85}>
        <ScreenTitle title="Technical Skills" subtitle="Always learning and improving" />

        {fits ? (
          // Full layout: both 2×2 grids, one under the other
          <div className="mt-8 flex flex-col gap-5">
            {main}
            {extra}
          </div>
        ) : (
          <>
            {/* Tabs: only shown when everything doesn't fit at once */}
            <nav className="mt-6 flex flex-wrap gap-2">
              {TABS.map((label, i) => (
                <button
                  key={label}
                  onMouseEnter={() => hover(i)}
                  onClick={() => setSel(i)}
                  className={`tab ${sel === i ? "is-sel" : ""}`}
                >
                  <span className="tab-index">{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </button>
              ))}
            </nav>
            <div key={sel} className="mt-5">
              {sel === 0 ? main : extra}
            </div>
          </>
        )}
      </FitScreen>

      <Prompts onBack={onBack} />
    </div>
  );
}
