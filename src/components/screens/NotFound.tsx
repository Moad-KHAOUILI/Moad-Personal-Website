"use client";

// ---------------------------------------------------------------------------
// The 404 screen's content, centered: a giant slanted "404" with a cyan strip,
// a short message and a button back to the main menu. Enter or Esc also goes
// back, playing the wipe transition first like the rest of the site.
// Inside the shell (an unknown project, /projects/<wrong>) the shell's go() is
// passed as onHome and plays the wipe; on its own (any other unknown URL) it
// plays its own.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sfx } from "@/lib/sfx";

const WIPE_SWAP = 280; // ms into the wipe when the page underneath changes (fully covered), as in Shell.tsx

export default function NotFound({ onHome }: { onHome?: () => void }) {
  const router = useRouter();
  const [wiping, setWiping] = useState(false);

  const home = () => {
    if (wiping) return;
    sfx.confirm();
    if (onHome) return onHome();
    setWiping(true);
    setTimeout(() => router.push("/"), WIPE_SWAP);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!["Enter", " ", "Escape", "Backspace"].includes(e.key)) return;
      e.preventDefault();
      home();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <>
      {/* Scrolls instead of clipping on very short screens (sideways phones).
          relative keeps it above the background, which is positioned too */}
      <div className="no-scrollbar relative h-full w-full overflow-y-auto">
        <div className="nf-screen flex min-h-full flex-col items-center justify-center text-center">
          <div className="nf-title">
            <div className="nf-tilt flex flex-col items-center">
              <span className="panel-label">Error</span>
              <h1 className="nf-code">404</h1>
              <div className="strip nf-strip">Page not found</div>
            </div>
          </div>

          <p className="nf-text mt-8 max-w-md text-base text-ice/80 sm:text-lg">
            There&apos;s nothing at this address. The link may be broken or the URL mistyped.
          </p>

          <div className="nf-text mt-8">
            <span className="cta-wrap">
              <button onClick={home} className="p3-btn cta">
                Return to menu
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* Control hint, bottom right like the other screens */}
      <div className="prompts fixed bottom-5 right-8 z-10 flex items-center gap-2">
        <span className="key">Esc</span>
        Main menu
      </div>

      {wiping && (
        <div className="pointer-events-none fixed inset-0 z-50" aria-hidden>
          <div className="wipe wipe-white" />
          <div className="wipe wipe-cyan" />
        </div>
      )}
    </>
  );
}
