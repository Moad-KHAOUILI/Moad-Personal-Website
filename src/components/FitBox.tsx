"use client";

// ---------------------------------------------------------------------------
// Like FitScreen, but for a box: fills its parent's height and, if its content
// is taller than that, shrinks it (CSS zoom, so the layout reflows) until it
// fits. Used for the project file's sections, so they never scroll on phones.
// With `stretch`, content that already fits is stretched to the full height,
// so layouts like the media viewer fill the box.
// ---------------------------------------------------------------------------

import { useLayoutEffect, useRef } from "react";

const MIN_ZOOM = 0.5; // below this it stops shrinking (the parent can still scroll as a last resort)

export default function FitBox({ children, stretch }: { children: React.ReactNode; stretch?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      // scrollHeight and clientHeight are both in the box's own (zoomed) pixels, and a smaller
      // zoom gives the content more of them, so a few rounds settle on the right size
      let zoom = 1;
      el.style.zoom = "1";
      for (let i = 0; i < 6 && el.scrollHeight > el.clientHeight + 1 && zoom > MIN_ZOOM; i++) {
        zoom = Math.max(MIN_ZOOM, zoom * (el.clientHeight / el.scrollHeight) * 0.99);
        el.style.zoom = String(zoom);
      }
    };

    fit();
    // Refit when the window changes, and when the content does (switching screenshots, fonts loading)
    const observer = new ResizeObserver(fit);
    observer.observe(el.firstElementChild!);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  // The inner grid is at least the box's height and grows with the content, so the overflow can
  // be measured. With `stretch`, it also stretches its (single) child to the box's full height
  return (
    <div ref={ref} className="h-full">
      <div className={`grid min-h-full grid-cols-[minmax(0,1fr)] ${stretch ? "" : "content-start"}`}>{children}</div>
    </div>
  );
}
