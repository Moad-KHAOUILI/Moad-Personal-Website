// ---------------------------------------------------------------------------
// The in-game calendar: today's real date, the time of day in Persona's
// wording and the real current moon phase (the moon matters a lot in Persona 3).
// ---------------------------------------------------------------------------

export type DayInfo = {
  date: string; // "OCT 13"
  weekday: string; // "TUE"
  period: string; // "After School", "Evening", ...
  moonPhase: number; // 0 = new moon, 0.5 = full moon, back to 1 = new moon
  moonName: string;
  darkHour: boolean; // between midnight and 1 AM
};

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MOON_NAMES = [
  "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
  "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent",
];

// The moon goes from new to new every ~29.53 days. Counting from a known new
// moon (6 Jan 2000, 18:14 UTC) tells us where we are in the cycle today.
const SYNODIC_MONTH = 29.530588853;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

function moonPhase(d: Date) {
  const days = (d.getTime() - KNOWN_NEW_MOON) / 86_400_000;
  return (((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH) / SYNODIC_MONTH;
}

// Time of day, using the names Persona 3 shows in its calendar
function period(hour: number) {
  if (hour < 1) return "Dark Hour";
  if (hour < 5) return "Late Night";
  if (hour < 8) return "Early Morning";
  if (hour < 12) return "Morning";
  if (hour < 13) return "Lunchtime";
  if (hour < 15) return "Afternoon";
  if (hour < 18) return "After School";
  return "Evening";
}

export function getDayInfo(d = new Date()): DayInfo {
  const phase = moonPhase(d);
  return {
    date: `${MONTHS[d.getMonth()]} ${d.getDate()}`,
    weekday: WEEKDAYS[d.getDay()],
    period: period(d.getHours()),
    moonPhase: phase,
    moonName: MOON_NAMES[Math.floor(phase * 8 + 0.5) % 8],
    darkHour: d.getHours() < 1,
  };
}
