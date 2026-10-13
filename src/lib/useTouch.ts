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
