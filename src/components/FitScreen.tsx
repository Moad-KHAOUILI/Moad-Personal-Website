"use client";

// ---------------------------------------------------------------------------
// Shrinks a screen's content (with CSS zoom, so the layout reflows) until it
// fits the window, so no screen needs scrolling with a mouse. Never grows past `max`.
// On landscape touch screens it stops at a still-readable size (or uses the page's
// fixed `touchZoom`) and the screen scrolls instead. Upright phones scale the whole
// page themselves (see PhoneViewport), so there it leaves the content as it is.
// It goes inside .screen-pad, whose padding keeps room for the back arrow and
// the key prompts.
// ---------------------------------------------------------------------------

import { useLayoutEffect, useRef } from "react";
import { fitZoom, isTouch, refitOnChange, TOUCH_MIN_ZOOM } from "@/lib/fitZoom";
import { usePortraitPhone } from "@/lib/useTouch";

type Props = {
  children: React.ReactNode;
  max?: number;
  touchZoom?: number; // on landscape touch screens: this fixed size instead of fitting (taller content scrolls)
};

export default function FitScreen({ children, max = 1, touchZoom }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const portraitPhone = usePortraitPhone(); // (re-runs the effect when the phone is turned)

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fixed = portraitPhone ? 1 : touchZoom && isTouch() ? touchZoom : null;
    if (fixed !== null) {
      el.style.zoom = String(fixed);
      el.style.setProperty("--fit-zoom", String(fixed));
      return;
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
  }, [max, touchZoom, portraitPhone]);

  return <div ref={ref}>{children}</div>;
}
