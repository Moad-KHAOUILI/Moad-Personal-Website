"use client";

// ---------------------------------------------------------------------------
// The whole site is one page that switches between "screens" like a game menu:
//   menu -> about / projects / social / stats -> back to menu
//   projects -> project (one project's full file) -> back to projects
//   projects -> others (the smaller projects) -> back to projects
// Switching plays a slanted wipe transition: the new screen swaps in while
// the wipe covers everything. This file also owns the calendar (date and time
// of day) shown in the top-left corner.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import Background from "@/components/Background";
import DateDisplay from "@/components/DateDisplay";
import NameMarquee from "@/components/NameMarquee";
import About from "@/components/screens/About";
import MainMenu from "@/components/screens/MainMenu";
import OtherProjects from "@/components/screens/OtherProjects";
import ProjectDetail from "@/components/screens/ProjectDetail";
import Projects from "@/components/screens/Projects";
import SocialLink from "@/components/screens/SocialLink";
import Stats from "@/components/screens/Stats";
import { getDayInfo, type DayInfo } from "@/lib/calendar";
import { sfx } from "@/lib/sfx";
import { projects } from "@/lib/data";

export type Screen = "menu" | "about" | "projects" | "project" | "others" | "social" | "stats";

const WIPE_SWAP = 280; // ms into the wipe when the screen underneath changes (fully covered)
const WIPE_END = 650; // ms when the wipe has finished

export default function Home() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [menuIndex, setMenuIndex] = useState(0); // last selected main menu item
  const [projectIndex, setProjectIndex] = useState(0); // project opened from the Projects list
  const [wiping, setWiping] = useState(false);
  const [day, setDay] = useState<DayInfo | null>(null);

  // Read the visitor's clock after loading, and refresh it every minute
  useEffect(() => {
    const update = () => setDay(getDayInfo());
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="fixed inset-0 overflow-hidden">
      <Background />
      {/* Your name as giant scrolling text, behind every screen. It lives
          outside the screens so it keeps scrolling smoothly through transitions. */}
      <NameMarquee />

      {/* Calendar: big in the top left on the main menu, smaller in the top right on inner screens */}
      <div className={`absolute z-10 ${screen === "menu" ? "left-[5vw] top-[5vh]" : "calendar-inner right-8 top-6"}`}>
        <DateDisplay day={day} compact={screen !== "menu"} />
      </div>

      {/* Back arrow, top left on inner screens: a project file and the other projects go back to the list, everything else to the menu */}
      {screen !== "menu" && (
        <button
          onClick={() => {
            if (wiping) return;
            sfx.back();
            if (screen === "project" || screen === "others") go("projects");
            else back();
          }}
          className="back-arrow"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
      )}

      {/* The current screen. key={screen} remounts it so its entrance animations play */}
      <div key={screen} className="no-scrollbar relative h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain">
        {screen === "menu" && (
          <MainMenu
            active={active}
            initial={menuIndex}
            onSelect={(to, i) => {
              setMenuIndex(i);
              go(to);
            }}
            onOpenProject={(i) => {
              setMenuIndex(1); // coming back lands on "Projects"
              setProjectIndex(i);
              go("project");
            }}
          />
        )}
        {screen === "about" && <About active={active} onBack={back} />}
        {screen === "projects" && (
          <Projects
            active={active}
            initial={projectIndex}
            onOpen={(i) => {
              setProjectIndex(i);
              go("project");
            }}
            onOthers={() => {
              setProjectIndex(projects.length); // come back with the "Other projects" row selected
              go("others");
            }}
            onBack={back}
          />
        )}
        {screen === "project" && <ProjectDetail project={projects[projectIndex]} active={active} onBack={() => go("projects")} />}
        {screen === "others" && <OtherProjects active={active} onBack={() => go("projects")} />}
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
