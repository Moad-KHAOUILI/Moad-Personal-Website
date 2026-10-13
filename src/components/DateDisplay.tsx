// ---------------------------------------------------------------------------
// The calendar in the top-left corner, like the game's date display:
// a big date, the weekday and the time of day.
// ---------------------------------------------------------------------------

import type { DayInfo } from "@/lib/calendar";

type Props = {
  day: DayInfo | null; // null until the page has loaded (the date comes from the visitor's clock)
  compact?: boolean; // smaller version for the inner screens
};

export default function DateDisplay({ day, compact }: Props) {
  if (!day) return null;
  // Persona colours Saturday blue and Sunday red
  const weekdayColor = day.weekday === "SAT" ? "text-azure" : day.weekday === "SUN" ? "text-[#ff4d6d]" : "text-deep";

  // Main menu: half size. The sizes are inline styles (not CSS classes) so they
  // apply even when the dev server is slow to pick up stylesheet changes.
  // Inner screens: the full-size version scaled to 75%.
  const small = !compact;

  return (
    <div className={`date-in ${compact ? "origin-top-right scale-75" : ""}`}>
      <div className={`flex items-end ${small ? "gap-1.5" : "gap-3"}`}>
        <span className="date-num" style={small ? { fontSize: "2.25rem" } : undefined}>{day.date}</span>
        <span
          className={`date-weekday ${weekdayColor}`}
          style={small ? { fontSize: "0.75rem", padding: "0.05rem 0.35rem" } : undefined}
        >
          {day.weekday}
        </span>
      </div>
      {/* Time of day strip */}
      <div
        className="strip mt-2"
        style={small ? { fontSize: "0.7rem", marginTop: "0.3rem", padding: "0.15rem 0.8rem 0.15rem 0.45rem" } : undefined}
      >
        {day.period}
      </div>
    </div>
  );
}
