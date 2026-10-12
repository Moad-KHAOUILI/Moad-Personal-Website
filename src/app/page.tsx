"use client";

// ---------------------------------------------------------------------------
// The whole site is one page that switches between "screens" like a game menu:
//   menu -> projects / social / stats -> back to menu
// Switching plays a slanted wipe transition: the new screen swaps in while
// the wipe covers everything. This file also owns the calendar (date, moon,
// Dark Hour) shown in the top-left corner.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import Background from "@/components/Background";
import DateDisplay from "@/components/DateDisplay";
import NameMarquee from "@/components/NameMarquee";
import MainMenu from "@/components/screens/MainMenu";
import Projects from "@/components/screens/Projects";
import SocialLink from "@/components/screens/SocialLink";
import Stats from "@/components/screens/Stats";
import { getDayInfo, type DayInfo } from "@/lib/calendar";

export type Screen = "menu" | "projects" | "social" | "stats";

const WIPE_SWAP = 280; // ms into the wipe when the screen underneath changes (fully covered)
const WIPE_END = 650; // ms when the wipe has finished

export default function Home() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [menuIndex, setMenuIndex] = useState(0); // last selected main menu item
  const [wiping, setWiping] = useState(false);
  const [day, setDay] = useState<DayInfo | null>(null);
  const [darkOverride, setDarkOverride] = useState<boolean | null>(null); // set by clicking the moon

  // Read the visitor's clock after loading, and refresh it every minute
  useEffect(() => {
    const update = () => setDay(getDayInfo());
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  // The Dark Hour is on automatically between midnight and 1 AM, unless toggled by the moon
  const darkHour = darkOverride ?? day?.darkHour ?? false;

  // Change screen behind the wipe transition
  const go = (to: Screen) => {
    if (wiping) return;
    setWiping(true);
    setTimeout(() => setScreen(to), WIPE_SWAP);
    setTimeout(() => setWiping(false), WIPE_END);
  };
  const back = () => go("menu");
  const active = !wiping; // screens ignore input during a transition

  return (
    <div className={`fixed inset-0 overflow-hidden ${darkHour ? "dark-hour" : ""}`}>
      <Background />
      {/* Your name as giant scrolling text, behind every screen. It lives
          outside the screens so it keeps scrolling smoothly through transitions. */}
      <NameMarquee />

      {/* Calendar: big in the top left on the main menu, smaller in the top right on inner screens */}
      <div className={`absolute z-10 ${screen === "menu" ? "left-[5vw] top-[5vh]" : "right-8 top-6"}`}>
        <DateDisplay day={day} darkHour={darkHour} onMoonClick={() => setDarkOverride(!darkHour)} compact={screen !== "menu"} />
      </div>

      {/* The current screen. key={screen} remounts it so its entrance animations play */}
      <div key={screen} className="no-scrollbar relative h-full w-full overflow-y-auto">
        {screen === "menu" && (
          <MainMenu
            active={active}
            initial={menuIndex}
            onSelect={(to, i) => {
              setMenuIndex(i);
              go(to);
            }}
          />
        )}
        {screen === "projects" && <Projects active={active} onBack={back} />}
        {screen === "social" && <SocialLink active={active} onBack={back} />}
        {screen === "stats" && <Stats active={active} onBack={back} />}
      </div>

      {/* Transition: a white slash followed by a cyan one sweeping across the screen */}
      {wiping && (
        <div className="pointer-events-none fixed inset-0 z-50" aria-hidden>
          <div className="wipe wipe-white" />
          <div className="wipe wipe-cyan" />
        </div>
      )}
    </div>
  );
}
