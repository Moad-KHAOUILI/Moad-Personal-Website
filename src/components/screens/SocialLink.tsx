"use client";

// ---------------------------------------------------------------------------
// SOCIAL LINK screen ("connect with me"). In Persona, Social Links are bonds
// with people, each tied to a tarot arcana. Here each social is a tarot card
// with its arcana, a spinning emblem and a maxed-out rank. Enter opens it.
// ---------------------------------------------------------------------------

import Prompts from "@/components/Prompts";
import ScreenTitle from "@/components/ScreenTitle";
import { socials } from "@/lib/data";
import { useListNav } from "@/lib/useListNav";

const RANKS = 10; // Social Links max out at rank 10

const open = (url: string) => (url.startsWith("mailto:") ? (location.href = url) : window.open(url, "_blank"));

export default function SocialLink({ active, onBack }: { active: boolean; onBack: () => void }) {
  const { sel, hover } = useListNav({ count: socials.length, active, onBack, onConfirm: (i) => open(socials[i].url) });

  return (
    <div className="screen-pad">
      <ScreenTitle title="Social Link" subtitle="Thou art I... and I am thou." />
      <p className="mt-5 max-w-xl text-lg text-ice/80">
        Every bond makes us stronger. Reach out on any of these and the link begins.
      </p>

      <div className="mt-10 flex flex-wrap gap-8">
        {socials.map((s, i) => (
          <button
            key={s.name}
            onMouseEnter={() => hover(i)}
            onClick={() => open(s.url)}
            className={`tarot ${sel === i ? "is-sel" : ""}`}
            style={{ animationDelay: `${0.08 * i + 0.15}s` }}
          >
            {/* Tarot number */}
            <span className="font-display text-4xl font-black italic">{s.numeral}</span>

            {/* Emblem: the platform's glyph inside a slowly spinning dashed ring */}
            <span className="tarot-emblem relative flex items-center justify-center">
              <span className="tarot-ring absolute inset-0" />
              <span className="font-display text-4xl font-black italic">{s.glyph}</span>
            </span>

            <span className="flex w-full flex-col items-center gap-1">
              <span className="font-display text-sm font-bold uppercase italic tracking-[0.2em] text-cyan">{s.arcana}</span>
              <span className="font-display text-3xl font-black uppercase italic leading-none">{s.name}</span>
              <span className="w-full truncate text-xs text-ice/70">{s.handle}</span>

              {/* Rank: 10 pips, all filled, MAX */}
              <span className="mt-3 flex items-center gap-1">
                {Array.from({ length: RANKS }, (_, r) => (
                  <span key={r} className="pip pip-sm on" />
                ))}
                <span className="ml-2 font-display text-xs font-black italic text-cyan">MAX</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <Prompts confirmLabel="Visit" onBack={onBack} />
    </div>
  );
}
