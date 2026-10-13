"use client";

// ---------------------------------------------------------------------------
// True on touch screens (phones, tablets): no hover, a finger for a pointer.
// Used for the phone-only layouts (like the Projects list's drop-down quick views).
// False while the page is being rendered on the server.
// ---------------------------------------------------------------------------

import { useSyncExternalStore } from "react";

const QUERY = "(hover: none) and (pointer: coarse)";

export function useTouch() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

// True on a touch screen held upright, where the whole page is laid out wider and
// scaled down by the phone (see PhoneViewport), so nothing needs scaling itself
const PORTRAIT_QUERY = `${QUERY} and (orientation: portrait)`;

export function usePortraitPhone() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(PORTRAIT_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(PORTRAIT_QUERY).matches,
    () => false,
  );
}
