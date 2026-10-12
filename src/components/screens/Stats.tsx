"use client";

// ---------------------------------------------------------------------------
// STATS screen ("about me"). The left panel is a short profile. The right is
// a list of skills shown like Persona's social stats: a rank title plus level
// pips out of 6.
// ---------------------------------------------------------------------------

import Prompts from "@/components/Prompts";
import ScreenTitle from "@/components/ScreenTitle";
import { profile, stats } from "@/lib/data";
import { useListNav } from "@/lib/useListNav";

const MAX_LEVEL = 6;

export default function Stats({ active, onBack }: { active: boolean; onBack: () => void }) {
  const { sel, hover } = useListNav({ count: stats.length, active, onBack });

  return (
    <div className="screen-pad">
      <ScreenTitle title="Stats" subtitle="Status check" />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
        {/* Profile panel */}
        <div className="panel p-8 md:p-10">
          <span className="panel-label">Profile</span>
          <h2 className="mt-3 font-display text-5xl font-black uppercase italic leading-[0.9]">
            {profile.firstName}
            <br />
            <span className="text-cyan">{profile.lastName}</span>
          </h2>
          <div className="strip mt-5">{profile.role}</div>
          <p className="mt-6 text-lg leading-relaxed text-ice/90">{profile.about}</p>
        </div>

        {/* Skills, styled like social stats */}
        <div className="flex flex-col gap-2.5">
          {stats.map((s, i) => (
            <div
              key={s.name}
              onMouseEnter={() => hover(i)}
              className={`stat-row ${sel === i ? "is-sel" : ""}`}
              style={{ animationDelay: `${0.06 * i + 0.15}s` }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-sm font-bold uppercase italic tracking-[0.18em] opacity-75">{s.name}</span>
                <span className="font-display text-sm font-black italic">
                  Lv.{s.level === MAX_LEVEL ? "MAX" : s.level}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-4">
                <span className="font-display text-2xl font-black uppercase italic leading-none">{s.rank}</span>
                <span className="flex gap-1.5">
                  {Array.from({ length: MAX_LEVEL }, (_, l) => (
                    <span key={l} className={`pip ${l < s.level ? "on" : ""}`} />
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Prompts onBack={onBack} />
    </div>
  );
}
