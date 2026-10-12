"use client";

// ---------------------------------------------------------------------------
// Main menu, in the style of Persona 3 Reload's pause menu: huge slanted
// italic options stacked in a staircase. The selected one gets the white and
// cyan highlight bars. Your name sits faintly in the background, and a help
// bar at the bottom describes the selected option.
// ---------------------------------------------------------------------------

import Prompts from "@/components/Prompts";
import { profile } from "@/lib/data";
import { useListNav } from "@/lib/useListNav";
import type { Screen } from "@/app/page";

const ITEMS: { id: Screen; label: string; desc: string }[] = [
  { id: "projects", label: "Projects", desc: "Browse the things I've built." },
  { id: "social", label: "Social Link", desc: "Forge a bond. Find me on other platforms." },
  { id: "stats", label: "Stats", desc: "Who I am and what I'm good at." },
];

type Props = {
  active: boolean;
  initial: number; // remembered selection, so coming back lands on the item you left from
  onSelect: (s: Screen, index: number) => void;
};

export default function MainMenu({ active, initial, onSelect }: Props) {
  const { sel, hover } = useListNav({ count: ITEMS.length, active, initial, onConfirm: (i) => onSelect(ITEMS[i].id, i) });

  return (
    <div className="relative h-full w-full">

      {/* Name + role, readable version, bottom right, sitting just above the help bar */}
      <div className="absolute bottom-28 right-[5vw] hidden text-right md:block">
        <div className="strip">{profile.role}</div>
        <h1 className="name-in mt-3 font-display text-5xl font-black uppercase italic leading-none">
          {profile.firstName} <span className="text-cyan">{profile.lastName}</span>
        </h1>
      </div>

      {/* The menu, on the left: slanted, each option shifted further right (staircase) */}
      {/* (vertical centering + tilt are both in the .menu class) */}
      <nav className="menu absolute left-[6vw] top-1/2">
        {ITEMS.map((item, i) => (
          <button
            key={item.id}
            onMouseEnter={() => hover(i)}
            onClick={() => onSelect(item.id, i)}
            className={`menu-item ${sel === i ? "is-sel" : ""}`}
            style={{ marginLeft: `${i * 2.2}rem`, animationDelay: `${0.08 * i + 0.1}s` }}
          >
            {/* The button is the fixed hit area. The label inside carries the highlight and the slide */}
            <span className="menu-label">
              <span className="menu-text">{item.label}</span>
            </span>
          </button>
        ))}
      </nav>

      {/* Help bar: describes the selected option. Runs off the right edge, level with the prompts */}
      <div className="help-bar absolute bottom-5 right-0">
        <span key={sel} className="help-text">{ITEMS[sel].desc}</span>
      </div>

      {/* Prompts on the left here, since the help bar takes the bottom right */}
      <Prompts confirmLabel="Confirm" side="left" />
    </div>
  );
}
