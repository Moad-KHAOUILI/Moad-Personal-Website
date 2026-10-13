"use client";

// ---------------------------------------------------------------------------
// ABOUT ME screen, played like a Persona dialogue scene. The left side is an
// intro card (name, a slammed-on motto, and a tracker of the chapters read so
// far). On the right, the selected
// chapter tab types itself out in the dialogue box. Enter skips the typing, or
// moves on to the next chapter once it's done.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import FitScreen from "@/components/FitScreen";
import Motto from "@/components/Motto";
import Prompts from "@/components/Prompts";
import ScreenTitle from "@/components/ScreenTitle";
import { about, profile } from "@/lib/data";
import { useListNav } from "@/lib/useListNav";

const TYPE_SPEED = 10; // ms per tick
const CHARS_PER_TICK = 3;
const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function About({ active, onBack }: { active: boolean; onBack: () => void }) {
  const chapters = about.chapters;
  // Typed progress, tagged with the chapter it belongs to so switching chapter restarts it
  const [typed, setTyped] = useState({ chapter: 0, chars: 0 });

  const advance = () => {
    if (!done) setTyped({ chapter: sel, chars: text.length }); // skip to the end
    else setSel((sel + 1) % chapters.length);
  };
  const { sel, setSel, hover } = useListNav({ count: chapters.length, active, onBack, onConfirm: advance });

  const text = chapters[sel].text;
  const chars = typed.chapter === sel ? typed.chars : 0;
  const done = chars >= text.length;

  // Chapters fully read at least once, lit up in the story tracker on the intro card
  const [read, setRead] = useState<number[]>([]);
  if (done && !read.includes(sel)) setRead([...read, sel]);

  // Typewriter: one more character every tick until the chapter is fully shown
  useEffect(() => {
    if (done) return;
    const timer = setInterval(
      () => setTyped((t) => (t.chapter === sel ? { chapter: sel, chars: t.chars + CHARS_PER_TICK } : { chapter: sel, chars: CHARS_PER_TICK })),
      TYPE_SPEED,
    );
    return () => clearInterval(timer);
  }, [sel, done]);

  return (
    <div className="screen-pad">
      {/* Everything except the key prompts: at most 85%, smaller if needed to fit the window */}
      <FitScreen max={0.85}>
        <ScreenTitle title="About Me" subtitle="The story so far" />

        <div className="mt-6 grid gap-8 wide:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] wide:gap-12">
          {/* Intro card: name, photo, motto, languages and story progress */}
          <div className="panel intro-card p-8">
            {/* Two columns: name and motto on the left, photo and languages stacked on the right */}
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 gap-y-8">
              <div className="intro-head flex flex-col">
                <span className="panel-label">Who I Am</span>
                <h2 className="mt-2 font-display text-5xl font-black uppercase italic leading-none md:text-6xl">
                  {profile.firstName} <span className="text-cyan">{profile.lastName}</span>
                </h2>
                <div className="strip mt-4 self-start">{profile.role}</div>
                <span className="panel-label mt-4">Based in {profile.location}</span>
              </div>

              {/* Portrait: slanted photo on stacked slabs; the back slab turns white once the story is complete */}
              <div className={`portrait ${read.length === chapters.length ? "is-complete" : ""}`}>
                <div className="portrait-frame">
                  <img src={profile.photo} alt={`${profile.firstName} ${profile.lastName}`} />
                </div>
              </div>

              {/* Under the name: the motto, with the story tracker pinned to the bottom of the column */}
              <div className="flex flex-col justify-between gap-6 self-stretch">
                <Motto />

                {/* Story tracker: one marker per chapter, lit once it has been read */}
                <div>
                  <span className="panel-label">
                    {read.length === chapters.length ? "Story complete" : `Story progress · ${read.length} / ${chapters.length}`}
                  </span>
                  <div className="mt-3 flex gap-2">
                    {chapters.map((c, i) => (
                      <button
                        key={c.title}
                        onMouseEnter={() => hover(i)}
                        onClick={() => setSel(i)}
                        aria-label={`Chapter ${i + 1}: ${c.title}`}
                        className={`story-pip ${read.includes(i) ? "is-read" : ""} ${sel === i ? "is-sel" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages: slanted cards with a six-step meter, one step per CEFR level (A1 to C2), full for native */}
              <div className="w-56">
                <span className="panel-label">Languages</span>
                <ul className="mt-3 flex flex-col gap-2">
                  {about.languages.map((l, i) => {
                    const steps = l.level === "Native" ? CEFR.length : CEFR.indexOf(l.level) + 1;
                    return (
                      <li key={l.name} className="lang" style={{ animationDelay: `${0.08 * i + 0.5}s` }}>
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="lang-name">{l.name}</span>
                          <span className={`lang-level ${l.level === "Native" ? "is-native" : ""}`}>
                            {l.level}
                            {l.note && ` · ${l.note}`}
                          </span>
                        </span>
                        <span className="mt-1.5 flex gap-1" aria-hidden>
                          {CEFR.map((c, j) => (
                            <span key={c} className={`lang-step ${j < steps ? "on" : ""}`} />
                          ))}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {/* Chapters: a horizontal row of slanted tabs above the dialogue, each with a big number popping out */}
            <nav className="mb-6 flex flex-wrap gap-x-6 gap-y-4 pl-4 pt-3">
              {chapters.map((c, i) => (
                <button
                  key={c.title}
                  onMouseEnter={() => hover(i)}
                  onClick={() => setSel(i)}
                  className={`tab tab-pop ${sel === i ? "is-sel" : ""}`}
                  style={{ animationDelay: `${0.06 * i + 0.15}s` }}
                >
                  <span className="tab-index">{i + 1}</span>
                  {c.title}
                </button>
              ))}
            </nav>

            {/* Dialogue box: speaker nameplate, typed text, and a bobbing arrow once the line is finished.
                Grows to line up with the bottom of the intro card */}
            <div className="dialogue-name self-start">{profile.firstName}</div>
            <button onClick={advance} className="dialogue flex-1">
              <span className="panel-label">
                Chapter {sel + 1} / {chapters.length} · {chapters[sel].title}
              </span>
              {/* Screen readers get the whole line at once instead of the typing */}
              <p className="sr-only">{text}</p>
              {/* Every chapter is laid out invisibly in the same cell, so the box is always as
                  tall as the longest one and doesn't grow while typing or switching */}
              <p aria-hidden className="mt-5 grid font-dialogue text-[1.7rem] font-medium leading-normal md:text-[2.2rem]">
                {chapters.map((c) => (
                  <span key={c.title} className="invisible [grid-area:1/1]">
                    {c.text}
                  </span>
                ))}
                <span className="[grid-area:1/1]">
                  {text.slice(0, chars)}
                  {!done && <span className="dialogue-caret" />}
                </span>
              </p>
              {done && <span className="dialogue-next" aria-hidden>▼</span>}
            </button>
          </div>
        </div>
      </FitScreen>

      <Prompts confirmLabel={done ? "Next" : "Skip"} onBack={onBack} />
    </div>
  );
}
