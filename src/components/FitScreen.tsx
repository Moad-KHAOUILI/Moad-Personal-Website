"use client";

// ---------------------------------------------------------------------------
// Shrinks a screen's content (with CSS zoom, so the layout reflows) until it
// fits the window, so no screen needs scrolling with a mouse. Never grows past `max`.
// On touch screens it stops at a still-readable size (or uses the page's fixed
// `touchZoom`) and the screen scrolls instead.
// With `portraitScale`, upright phones instead lay the content out wider and
// shrink it with a transform (like the browser's own page zoom), which iPhones
// apply reliably, unlike CSS zoom.
// It goes inside .screen-pad, whose padding keeps room for the back arrow and
// the key prompts.
// ---------------------------------------------------------------------------

import { useLayoutEffect, useRef } from "react";
import { fitZoom, isTouch, refitOnChange, TOUCH_MIN_ZOOM } from "@/lib/fitZoom";
import { usePortraitPhone } from "@/lib/useTouch";

type Props = {
  children: React.ReactNode;
  max?: number;
  touchZoom?: number; // on touch screens: this fixed size instead of fitting (taller content scrolls)
  portraitScale?: number; // on upright phones: laid out 1/scale times wider, then shrunk to this
};

export default function FitScreen({ children, max = 1, touchZoom, portraitScale }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const portraitPhone = usePortraitPhone(); // (re-runs the effect when the phone is turned)

  useLayoutEffect(() => {
    const box = outer.current;
    const el = ref.current;
    if (!box || !el) return;

    // Start clean (the phone may just have been turned)
    el.style.removeProperty("width");
    el.style.removeProperty("transform");
    el.style.removeProperty("zoom");
    box.style.removeProperty("height");

    if (portraitScale && portraitPhone) {
      // Laid out wider, shrunk back to the screen width from the top-left corner. A transform
      // doesn't change the space the content takes, so the wrapper is given its shrunk height
      el.style.width = `${100 / portraitScale}%`;
      el.style.transform = `scale(${portraitScale})`;
      el.style.transformOrigin = "0 0";
      el.style.setProperty("--fit-zoom", "1");
      const size = () => (box.style.height = `${el.getBoundingClientRect().height}px`);
      size();
      const observer = new ResizeObserver(size);
      observer.observe(el);
      return () => observer.disconnect();
    }

    if (touchZoom && isTouch()) {
      el.style.zoom = String(touchZoom);
      el.style.setProperty("--fit-zoom", String(touchZoom));
      return;
    }

    const fit = () => {
      // The room left inside the screen once the padding is taken off
      const pad = getComputedStyle(box.parentElement!);
      const area = el.closest(".no-scrollbar")?.clientHeight ?? window.innerHeight;
      const available = area - parseFloat(pad.paddingTop) - parseFloat(pad.paddingBottom);
      const zoom = fitZoom(el, el, available, max, isTouch() ? Math.min(max, TOUCH_MIN_ZOOM) : 0.3);
      // Exposed to CSS, for things that should keep their size whatever the zoom (the sideways title on landscape phones)
      el.style.setProperty("--fit-zoom", String(zoom));
    };

    return refitOnChange(el, fit);
  }, [max, touchZoom, portraitScale, portraitPhone]);

  return (
    <div ref={outer}>
      <div ref={ref}>{children}</div>
    </div>
  );
}
