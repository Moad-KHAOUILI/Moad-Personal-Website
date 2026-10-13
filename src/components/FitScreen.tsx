"use client";

// ---------------------------------------------------------------------------
// Shrinks a screen's content (with CSS zoom, so the layout reflows) until it
// fits the window, so no screen ever needs scrolling. Never grows past `max`.
// It goes inside .screen-pad, whose bottom padding keeps room for the key prompts.
// ---------------------------------------------------------------------------

import { useLayoutEffect, useRef } from "react";

export default function FitScreen({ children, max = 1 }: { children: React.ReactNode; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const bottom = parseFloat(getComputedStyle(el.parentElement!).paddingBottom);
      const available = window.innerHeight - el.getBoundingClientRect().top - bottom;
      // offsetHeight is in the element's own (unzoomed) pixels, and zooming out widens
      // the content, which shortens it. A few rounds settle on the right zoom.
      const apply = (z: number) => {
        el.style.zoom = String(z);
        return z * el.offsetHeight;
      };
      let zoom = max;
      for (let i = 0; i < 4; i++) {
        const next = Math.min(max, available / (apply(zoom) / zoom));
        if (Math.abs(next - zoom) < 0.002) break;
        zoom = next;
      }
      // Then step down until it really fits, so it's never a few pixels too tall
      while (apply(zoom) > available && zoom > 0.3) zoom -= 0.005;
      // Exposed to CSS, for things that should keep their size whatever the zoom (the sideways title on landscape phones)
      el.style.setProperty("--fit-zoom", String(zoom));
    };

    fit();
    // Refit when the window changes, and when the content does (tab switches, fonts loading)
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [max]);

  return <div ref={ref}>{children}</div>;
}
