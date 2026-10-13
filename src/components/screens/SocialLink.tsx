"use client";

// ---------------------------------------------------------------------------
// CONTACT ME screen. Each social is a card with its logo inside a spinning
// ring, plus its name and handle. Enter opens it (the email is copied instead).
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import FitScreen from "@/components/FitScreen";
import Prompts from "@/components/Prompts";
import ScreenTitle from "@/components/ScreenTitle";
import SocialIcon from "@/components/SocialIcon";
import { socials } from "@/lib/data";
import { useListNav } from "@/lib/useListNav";

const isMail = (url: string) => url.startsWith("mailto:");

export default function SocialLink({ active, onBack }: { active: boolean; onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Email gets copied to the clipboard (with a short "Copied!" on the card); other links open in a new tab
  const open = (url: string) => {
    if (!isMail(url)) return void window.open(url, "_blank");
    navigator.clipboard.writeText(url.slice("mailto:".length));
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1500);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const { sel, hover } = useListNav({ count: socials.length, active, onBack, onConfirm: (i) => open(socials[i].url) });

  return (
    <div className="screen-pad">
      <FitScreen>
        <ScreenTitle title="Contact Me" subtitle="Start a new Social Link" />
        <p className="mt-5 max-w-xl text-lg text-ice/80">
          Every bond makes us stronger. Reach out on any of these and the link begins.
        </p>

        <div className="tarot-list mt-8 flex flex-wrap gap-8">
          {socials.map((s, i) => (
            <button
              key={s.name}
              onMouseEnter={() => hover(i)}
              onClick={() => open(s.url)}
              className={`tarot ${sel === i ? "is-sel" : ""}`}
              style={{ animationDelay: `${0.08 * i + 0.15}s` }}
            >
              {/* Emblem: the platform's logo inside a slowly spinning dashed ring */}
              <span className="tarot-emblem relative flex items-center justify-center">
                <span className="tarot-ring absolute inset-0" />
                <SocialIcon icon={s.icon} className="h-1/2 w-1/2" />
              </span>

              <span className="flex w-full flex-col items-center gap-1">
                <span className="font-display text-3xl font-black uppercase italic leading-none">{s.name}</span>
                {copied && isMail(s.url) ? (
                  <span className="text-xs font-bold uppercase text-cyan">Copied!</span>
                ) : (
                  <span className="w-full truncate text-xs text-ice/70">{s.handle}</span>
                )}
              </span>
            </button>
          ))}
        </div>
      </FitScreen>

      <Prompts confirmLabel={isMail(socials[sel].url) ? "Copy" : "Visit"} onBack={onBack} />
    </div>
  );
}
