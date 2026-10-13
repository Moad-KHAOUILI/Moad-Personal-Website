// ---------------------------------------------------------------------------
// Button prompts in the bottom-right corner, like a game's control hints.
// The "Back" prompt is clickable for mouse users.
// ---------------------------------------------------------------------------

type Props = {
  confirmLabel?: string; // what Enter does on this screen (hidden if not given)
  onBack?: () => void; // shows the Back prompt when given
  side?: "left" | "right"; // which bottom corner (default: right)
};

// Key icons drawn as SVG, so they fill the circle (the ↑↓ and ⏎ characters render small and thin)
function KeyIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
const UP_DOWN = "M8 19V5M4 9l4-4 4 4M16 5v14M12 15l4 4 4-4";
const ENTER = "M19 5v6a3 3 0 0 1-3 3H6M10 10l-4 4 4 4";

export default function Prompts({ confirmLabel, onBack, side = "right" }: Props) {
  return (
    <div className={`prompts fixed bottom-5 z-10 flex items-center gap-6 ${side === "left" ? "prompts-left left-8" : "right-8"}`}>
      <span className="flex items-center gap-2">
        <span className="key" aria-label="Up/Down">
          <KeyIcon d={UP_DOWN} />
        </span>
        Select
      </span>
      {confirmLabel && (
        <span className="flex items-center gap-2">
          <span className="key" aria-label="Enter">
            <KeyIcon d={ENTER} />
          </span>
          {confirmLabel}
        </span>
      )}
      {onBack && (
        <button onClick={onBack} className="flex cursor-pointer items-center gap-2 hover:text-cyan">
          <span className="key">Esc</span>
          Back
        </button>
      )}
    </div>
  );
}
