// ---------------------------------------------------------------------------
// The calendar in the top-left corner, like the game's date display:
// a big date, the weekday, the time of day and the current moon phase.
// Clicking the moon toggles the Dark Hour.
// ---------------------------------------------------------------------------

import type { DayInfo } from "@/lib/calendar";

type Props = {
  day: DayInfo | null; // null until the page has loaded (the date comes from the visitor's clock)
  darkHour: boolean;
  onMoonClick: () => void;
  compact?: boolean; // smaller version for the inner screens
};

export default function DateDisplay({ day, darkHour, onMoonClick, compact }: Props) {
  if (!day) return null;
  // Persona colours Saturday blue and Sunday red
  const weekdayColor = day.weekday === "SAT" ? "text-azure" : day.weekday === "SUN" ? "text-[#ff4d6d]" : "text-deep";

  // Main menu: half size. The sizes are inline styles (not CSS classes) so they
  // apply even when the dev server is slow to pick up stylesheet changes.
  // Inner screens: the full-size version scaled to 75%.
  const small = !compact;

  return (
    <div className={`date-in flex items-center ${compact ? "origin-top-right scale-75 gap-4" : "gap-2.5"}`}>
      <div>
        <div className={`flex items-end ${small ? "gap-1.5" : "gap-3"}`}>
          <span className="date-num" style={small ? { fontSize: "2.25rem" } : undefined}>{day.date}</span>
          <span
            className={`date-weekday ${weekdayColor}`}
            style={small ? { fontSize: "0.75rem", padding: "0.05rem 0.35rem" } : undefined}
          >
            {day.weekday}
          </span>
        </div>
        {/* Time of day strip. Turns green and says DARK HOUR during the Dark Hour */}
        {/* (if the visitor switched the Dark Hour off during the real one, call it "Late Night" instead) */}
        <div
          className="strip mt-2"
          style={small ? { fontSize: "0.7rem", marginTop: "0.3rem", padding: "0.15rem 0.8rem 0.15rem 0.45rem" } : undefined}
        >
          {darkHour ? "Dark Hour" : day.period === "Dark Hour" ? "Late Night" : day.period}
        </div>
      </div>
      <button onClick={onMoonClick} title={`${day.moonName}. Click me.`} className="moon-btn">
        <Moon phase={day.moonPhase} size={compact ? 58 : 30} />
        <span
          className="mt-1 block font-display font-bold uppercase italic tracking-wider text-ice/80"
          style={{ fontSize: small ? "8px" : "11px" }}
        >
          {day.moonName}
        </span>
      </button>
    </div>
  );
}

// The moon, drawn with its real current phase.
// The lit part is a half circle on one side (right while waxing, left while
// waning) closed off by an ellipse, the "terminator" line between light and
// shadow. The ellipse's width (rx) shrinks to 0 at the quarters, which makes
// the lit part exactly half the moon.
function Moon({ phase, size = 58 }: { phase: number; size?: number }) {
  const c = size / 2;
  const r = c - 3;
  const k = Math.cos(2 * Math.PI * phase); // 1 at new moon, 0 at the quarters, -1 at full moon
  const rx = Math.abs(k) * r;
  const waxing = phase < 0.5;
  // SVG arc flags: the first arc draws the lit half, the second arc draws the
  // terminator back to the top, bulging outward (crescent) or inward (gibbous).
  const d = waxing
    ? `M ${c} ${c - r} A ${r} ${r} 0 0 1 ${c} ${c + r} A ${rx} ${r} 0 0 ${k > 0 ? 0 : 1} ${c} ${c - r}`
    : `M ${c} ${c - r} A ${r} ${r} 0 0 0 ${c} ${c + r} A ${rx} ${r} 0 0 ${k > 0 ? 1 : 0} ${c} ${c - r}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto drop-shadow-[0_0_14px_rgba(253,246,216,0.45)]">
      <circle cx={c} cy={c} r={r} fill="#06155c" stroke="rgba(214,246,255,0.35)" strokeWidth={1.5} />
      <path d={d} fill="#fdf6d8" />
    </svg>
  );
}
