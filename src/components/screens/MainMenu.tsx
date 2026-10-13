"use client";

// ---------------------------------------------------------------------------
// Main menu, in the style of Persona 3 Reload's pause menu: huge slanted
// italic options stacked in a staircase. The selected one gets the white and
// cyan highlight bars. Your name sits faintly in the background, a mini
// "Who I Am" card sits on the right, and a help bar at the bottom describes
// the selected option.
// ---------------------------------------------------------------------------

import Motto from "@/components/Motto";
import Prompts from "@/components/Prompts";
import { profile } from "@/lib/data";
import { useListNav } from "@/lib/useListNav";
import type { Screen } from "@/app/page";

const ITEMS: { id: Screen; label: string; desc: string }[] = [
  { id: "about", label: "About Me", desc: "The story so far. Who I am, told my way." },
  { id: "projects", label: "Projects", desc: "Browse the things I've built." },
  { id: "stats", label: "Technical Skills", desc: "The technologies and tools I work with." },
  { id: "social", label: "Contact Me", desc: "Forge a bond. Reach out or find me on other platforms." },
];

type Props = {
  active: boolean;
  initial: number; // remembered selection, so coming back lands on the item you left from
  onSelect: (s: Screen, index: number) => void;
};

export default function MainMenu({ active, initial, onSelect }: Props) {
  const { sel, hover } = useListNav({ count: ITEMS.length, active, initial, onConfirm: (i) => onSelect(ITEMS[i].id, i) });

  return (
    <div className="menu-screen relative h-full w-full">

      {/* Mini "Who I Am" card, on the right, a little above the middle:
          name, role and motto on the left, the photo on the right.
          Positioned by a wrapper, since .panel sets its own position */}
      <div className="mini-wrap absolute right-[5vw] top-[22vh] hidden md:block">
        <div className="panel intro-card mini-card flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="font-display text-4xl font-black uppercase italic leading-none">
              {profile.firstName} <span className="text-cyan">{profile.lastName}</span>
            </h1>
            <div className="strip mt-3 self-start">{profile.role}</div>
            <Motto className="motto-sm mt-5" />
          </div>
          <div className="portrait portrait-sm">
            <div className="portrait-frame">
              <img src={profile.photo} alt={`${profile.firstName} ${profile.lastName}`} />
            </div>
          </div>
        </div>
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
