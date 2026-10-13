"use client";

// ---------------------------------------------------------------------------
// Shrinks a screen's content (with CSS zoom, so the layout reflows) until it
// fits the window, so no screen needs scrolling with a mouse. Never grows past `max`.
// On touch screens it stops at a still-readable size (or uses the page's fixed
// `touchZoom`) and the screen scrolls instead.
// It goes inside .screen-pad, whose padding keeps room for the back arrow and
// the key prompts.
// ---------------------------------------------------------------------------

import { useLayoutEffect, useRef } from "react";
import { fitZoom, isTouch, refitOnChange, TOUCH_MIN_ZOOM } from "@/lib/fitZoom";

type Props = {
  children: React.ReactNode;
  max?: number;
  // On touch screens: this fixed size instead of fitting (taller content scrolls).
  // A number, or a size per orientation
  touchZoom?: number | { portrait: number; landscape: number };
};

export default function FitScreen({ children, max = 1, touchZoom }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const portraitZoom = typeof touchZoom === "object" ? touchZoom.portrait : touchZoom;
  const landscapeZoom = typeof touchZoom === "object" ? touchZoom.landscape : touchZoom;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (portraitZoom && landscapeZoom && isTouch()) {
      // Reapplied when the phone is turned
      const apply = () => {
        const z = String(matchMedia("(orientation: portrait)").matches ? portraitZoom : landscapeZoom);
        el.style.zoom = z;
        el.style.setProperty("--fit-zoom", z);
      };
      apply();
      window.addEventListener("resize", apply);
      return () => window.removeEventListener("resize", apply);
    }

    const fit = () => {
      // The room left inside the screen once the padding is taken off
      const pad = getComputedStyle(el.parentElement!);
      const area = el.closest(".no-scrollbar")?.clientHeight ?? window.innerHeight;
      const available = area - parseFloat(pad.paddingTop) - parseFloat(pad.paddingBottom);
      const zoom = fitZoom(el, el, available, max, isTouch() ? Math.min(max, TOUCH_MIN_ZOOM) : 0.3);
      // Exposed to CSS, for things that should keep their size whatever the zoom (the sideways title on landscape phones)
      el.style.setProperty("--fit-zoom", String(zoom));
    };

    return refitOnChange(el, fit);
  }, [max, portraitZoom, landscapeZoom]);

  return <div ref={ref}>{children}</div>;
}
