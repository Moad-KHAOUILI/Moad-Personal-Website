// ---------------------------------------------------------------------------
// The in-game calendar: today's real date and the time of day in Persona's
// wording.
// ---------------------------------------------------------------------------

export type DayInfo = {
  date: string; // "OCT 13"
  weekday: string; // "TUE"
  period: string; // "After School", "Evening", ...
};

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Time of day, using the names Persona 3 shows in its calendar
function period(hour: number) {
  if (hour < 5) return "Late Night";
  if (hour < 8) return "Early Morning";
  if (hour < 12) return "Morning";
  if (hour < 13) return "Lunchtime";
  if (hour < 15) return "Afternoon";
  if (hour < 18) return "After School";
  return "Evening";
}

export function getDayInfo(d = new Date()): DayInfo {
  return {
    date: `${MONTHS[d.getMonth()]} ${d.getDate()}`,
    weekday: WEEKDAYS[d.getDay()],
    period: period(d.getHours()),
  };
}
