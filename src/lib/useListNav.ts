"use client";

// ---------------------------------------------------------------------------
// Shared menu navigation for every screen:
//   ↑ / ← / W / A      previous item
//   ↓ / → / S / D      next item
//   Enter / Space      confirm
//   Esc / Backspace    back
// Hovering an item with the mouse selects it too. Plays the menu sounds.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { sfx } from "./sfx";

type Options = {
  count: number; // number of items
  active: boolean; // false while a screen transition is playing (input ignored)
  initial?: number; // item selected when the screen opens
  onConfirm?: (index: number) => void;
  onBack?: () => void;
};

export function useListNav({ count, active, initial = 0, onConfirm, onBack }: Options) {
  const [sel, setSel] = useState(initial);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (["ArrowUp", "ArrowLeft", "w", "a"].includes(k)) {
        setSel((sel - 1 + count) % count);
        sfx.move();
      } else if (["ArrowDown", "ArrowRight", "s", "d"].includes(k)) {
        setSel((sel + 1) % count);
        sfx.move();
      } else if ((k === "Enter" || k === " ") && onConfirm) {
        sfx.confirm();
        onConfirm(sel);
      } else if ((k === "Escape" || k === "Backspace") && onBack) {
        sfx.back();
        onBack();
      } else {
        return;
      }
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sel, count, active, onConfirm, onBack]);

  // Mouse hover: select the item (with the cursor sound) if it isn't already
  const hover = (i: number) => {
    if (i === sel) return;
    setSel(i);
    sfx.move();
  };

  return { sel, hover };
}
