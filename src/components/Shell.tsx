"use client";

// ---------------------------------------------------------------------------
// The frame around every page, like a game menu where only the screen in the
// middle changes. Each screen has its own path:
//   /                      main menu
//   /about                 About Me
//   /projects              projects list
//   /projects/<slug>       one project's full file
//   /projects/other        the smaller projects
//   /skills                technical skills
//   /contact               contact me
// The shell lives in the layout, so it stays mounted between pages: the
// background and name marquee keep moving, and the calendar keeps its clock.
// Switching plays a slanted wipe transition: the new page swaps in while the
// wipe covers everything. The browser's back and forward buttons play it too.
// Pages get go() and active from useShell().
// ---------------------------------------------------------------------------

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Background from "@/components/Background";
import DateDisplay from "@/components/DateDisplay";
import NameMarquee from "@/components/NameMarquee";
import { getDayInfo, type DayInfo } from "@/lib/calendar";
import { projects } from "@/lib/data";
import { sfx } from "@/lib/sfx";

const WIPE_SWAP = 280; // ms into the wipe when the page underneath changes (fully covered)
const WIPE_END = 650; // ms when the wipe has finished

// Every page, loaded ahead of time so switching is instant
const PATHS = ["/", "/about", "/projects", "/projects/other", "/skills", "/contact", ...projects.map((p) => `/projects/${p.slug}`)];

type ShellState = {
  go: (to: string) => void; // change page behind the wipe
  active: boolean; // false during a transition (screens ignore input)
  from: string | null; // the page we came from, so screens can land on the item you left from
};

const ShellContext = createContext<ShellState | null>(null);

export function useShell() {
  const shell = useContext(ShellContext);
  if (!shell) throw new Error("useShell must be used inside <Shell>");
  return shell;
}

// Where the back arrow goes: a project file and the other projects go back to the list, everything else to the menu
const parentOf = (path: string) => (path.startsWith("/projects/") ? "/projects" : "/");

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [path, setPath] = useState(pathname); // the page on screen
  const [from, setFrom] = useState<string | null>(null);
  const [navigating, setNavigating] = useState(false); // a go() is under way
  const [wiping, setWiping] = useState(false);
  const [day, setDay] = useState<DayInfo | null>(null);

  // The address changed. Through go() the wipe is already covering the swap;
  // through the browser's back or forward buttons, play it now
  if (pathname !== path) {
    setFrom(path);
    setPath(pathname);
    setNavigating(false);
    if (!navigating) setWiping(true);
  }

  // Read the visitor's clock after loading, and refresh it every minute
  useEffect(() => {
    const update = () => setDay(getDayInfo());
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    for (const p of PATHS) router.prefetch(p);
  }, [router]);

  useEffect(() => {
    if (!wiping) return;
    const timer = setTimeout(() => setWiping(false), WIPE_END);
    return () => clearTimeout(timer);
  }, [wiping]);

  const go = (to: string) => {
    if (wiping || navigating || to === path) return;
    setNavigating(true);
    setWiping(true);
    setTimeout(() => router.push(to), WIPE_SWAP);
  };

  const menu = path === "/";

  return (
    <ShellContext value={{ go, active: !wiping, from }}>
      <div className="fixed inset-0 overflow-hidden">
        <Background />
        {/* Your name as giant scrolling text, behind every screen. It lives
            outside the screens so it keeps scrolling smoothly through transitions. */}
        <NameMarquee />

        {/* Calendar: big in the top left on the main menu, smaller in the top right on inner screens */}
        <div className={`absolute z-10 ${menu ? "left-[5vw] top-[5vh]" : "calendar-inner right-8 top-6"}`}>
          <DateDisplay day={day} compact={!menu} />
        </div>

        {/* Back arrow, top left on inner screens */}
        {!menu && (
          <button
            onClick={() => {
              if (wiping) return;
              sfx.back();
              go(parentOf(path));
            }}
            className="back-arrow"
            aria-label="Back"
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
        )}

        {/* The current page. key={path} remounts it so its entrance animations play */}
        <div key={path} className="no-scrollbar relative h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain">
          {children}
        </div>

        {/* Transition: a white slash followed by a cyan one sweeping across the screen */}
        {wiping && (
          <div className="pointer-events-none fixed inset-0 z-50" aria-hidden>
            <div className="wipe wipe-white" />
            <div className="wipe wipe-cyan" />
          </div>
        )}
      </div>
    </ShellContext>
  );
}
