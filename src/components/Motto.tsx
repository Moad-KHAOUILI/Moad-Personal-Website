// ---------------------------------------------------------------------------
// The motto (about.motto in data.ts) as ransom-note slabs: one row per line,
// one slab per word, slammed on one after the other. Used on the About Me card
// and the mini card on the main menu (which passes a smaller size class).
// ---------------------------------------------------------------------------

import { about } from "@/lib/data";

// Words numbered across the whole motto, for the slam-in delay and the white / cyan / outlined cycle
const lines = (() => {
  let i = 0;
  return about.motto.map((line) => line.split(" ").map((word) => ({ word, i: i++ })));
})();

export default function Motto({ className = "" }: { className?: string }) {
  return (
    <p className={`motto ${className}`} aria-label={about.motto.join(" ")}>
      {lines.map((line, l) => (
        <span key={l} aria-hidden className="motto-line">
          {line.map(({ word, i }) => (
            <span key={i} className={`motto-word v${i % 3}`} style={{ animationDelay: `${0.09 * i + 0.3}s` }}>
              {word}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}
