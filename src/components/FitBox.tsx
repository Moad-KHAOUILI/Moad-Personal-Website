"use client";

// ---------------------------------------------------------------------------
// Like FitScreen, but for a box: fills its parent's height and, if its content
// is taller than that, shrinks it (CSS zoom, so the layout reflows) until it
// fits. Used for the project file's sections, so they never scroll on phones.
// With `stretch`, content that already fits is stretched to the full height,
// so layouts like the media viewer fill the box.
// ---------------------------------------------------------------------------

import { useLayoutEffect, useRef } from "react";
import { fitZoom, refitOnChange } from "@/lib/fitZoom";

const MIN_ZOOM = 0.5; // below this it stops shrinking (the parent can still scroll as a last resort)

export default function FitBox({ children, stretch }: { children: React.ReactNode; stretch?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const content = el.firstElementChild as HTMLElement;
    return refitOnChange(el, () => fitZoom(el, content, el.parentElement!.clientHeight, 1, MIN_ZOOM), content);
  }, []);

  // The inner grid is at least the box's height and grows with the content, so the overflow can
  // be measured. With `stretch`, it also stretches its (single) child to the box's full height
  return (
    <div ref={ref} className="h-full">
      <div className={`grid min-h-full grid-cols-[minmax(0,1fr)] ${stretch ? "" : "content-start"}`}>{children}</div>
    </div>
  );
}
