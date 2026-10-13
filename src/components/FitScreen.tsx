"use client";

// ---------------------------------------------------------------------------
// Shrinks a screen's content (with CSS zoom, so the layout reflows) until it
// fits the window, so no screen ever needs scrolling. Never grows past `max`.
// It goes inside .screen-pad, whose padding keeps room for the back arrow and
// the key prompts.
// ---------------------------------------------------------------------------

import { useLayoutEffect, useRef } from "react";
import { fitZoom, refitOnChange } from "@/lib/fitZoom";

export default function FitScreen({ children, max = 1 }: { children: React.ReactNode; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      // The room left inside the screen once the padding is taken off
      const pad = getComputedStyle(el.parentElement!);
      const area = el.closest(".no-scrollbar")?.clientHeight ?? window.innerHeight;
      const available = area - parseFloat(pad.paddingTop) - parseFloat(pad.paddingBottom);
      const zoom = fitZoom(el, el, available, max, 0.3);
      // Exposed to CSS, for things that should keep their size whatever the zoom (the sideways title on landscape phones)
      el.style.setProperty("--fit-zoom", String(zoom));
    };

    return refitOnChange(el, fit);
  }, [max]);

  return <div ref={ref}>{children}</div>;
}
