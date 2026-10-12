// ---------------------------------------------------------------------------
// Background name marquee for the main menu.
// Rows of giant "MOAD ◆ KHAOUILI" text cover the whole page, tilted like the
// menu. Every row scrolls from right to left at its own speed, so the rows
// drift past each other, and each row bobs up and down like it's floating on
// water. Odd and even rows swap which word is solid and which is outlined,
// which gives a woven pattern. Styles are in the "Name marquee" section of globals.css.
//
// How the endless scroll works: each row's track holds the same text twice
// in a row. The track slides left by exactly half its width (one copy) and
// then restarts. At that moment the second copy sits exactly where the first
// one started, so the jump is invisible.
// ---------------------------------------------------------------------------

import { profile } from "@/lib/data";

const ROWS = 9; // enough rows to cover the page even after tilting
const REPEATS = 4; // copies of the name per half-track (wider than any screen)

export default function NameMarquee() {
  // One "MOAD ◆ KHAOUILI ◆" unit
  const unit = (key: number) => (
    <span key={key} className="nm-unit">
      <span className="nm-a">{profile.firstName}</span>
      <span className="nm-sep">◆</span>
      <span className="nm-b">{profile.lastName}</span>
      <span className="nm-sep">◆</span>
    </span>
  );

  return (
    <div className="nm-root" aria-hidden>
      <div className="nm-tilt">
        {Array.from({ length: ROWS }, (_, r) => (
          // Outer row: the bobbing. Delays are staggered so the rows ripple like a wave.
          <div key={r} className="nm-row" style={{ animationDelay: `${-r * 0.9}s` }}>
            {/* Inner track: the scrolling. Speeds cycle between 45s, 65s and 85s per loop,
                and negative delays start each row at a different point. */}
            <div className="nm-track" style={{ animationDuration: `${45 + (r % 3) * 20}s`, animationDelay: `${-r * 11}s` }}>
              {[0, 1].map((half) => (
                <span key={half} className="flex">
                  {Array.from({ length: REPEATS }, (_, i) => unit(i))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
