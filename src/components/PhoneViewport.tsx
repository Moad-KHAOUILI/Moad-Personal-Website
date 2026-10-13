"use client";

// ---------------------------------------------------------------------------
// Portrait phones: the page is laid out 800px wide and the phone scales the whole
// thing down to fit its screen (about 50% on most phones), like Safari's own page
// zoom. This shrinks every screen evenly and works in every phone browser, unlike
// CSS zoom (which iPhones didn't apply reliably). Turning the phone to landscape
// goes back to the normal width.
// ---------------------------------------------------------------------------

import { useEffect } from "react";

const PORTRAIT_WIDTH = 800;
const NORMAL = "width=device-width, initial-scale=1";

export default function PhoneViewport() {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!meta) return;
    const touch = matchMedia("(hover: none) and (pointer: coarse)");
    // (an 800px-wide portrait page is still taller than wide, so this stays right after the switch)
    const portrait = matchMedia("(orientation: portrait)");

    const apply = () => {
      const content = touch.matches && portrait.matches ? `width=${PORTRAIT_WIDTH}` : NORMAL;
      if (meta.content !== content) meta.content = content;
    };
    apply();
    window.addEventListener("orientationchange", apply);
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("orientationchange", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  return null;
}
