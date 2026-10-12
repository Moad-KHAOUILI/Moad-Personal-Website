// ---------------------------------------------------------------------------
// Button prompts in the bottom-right corner, like a game's control hints.
// The "Back" prompt is clickable for mouse users.
// ---------------------------------------------------------------------------

type Props = {
  confirmLabel?: string; // what Enter does on this screen (hidden if not given)
  onBack?: () => void; // shows the Back prompt when given
  side?: "left" | "right"; // which bottom corner (default: right)
};

export default function Prompts({ confirmLabel, onBack, side = "right" }: Props) {
  return (
    <div className={`prompts fixed bottom-5 z-10 flex items-center gap-6 ${side === "left" ? "prompts-left left-8" : "right-8"}`}>
      <span className="flex items-center gap-2">
        <span className="key">↑↓</span>
        Select
      </span>
      {confirmLabel && (
        <span className="flex items-center gap-2">
          <span className="key">⏎</span>
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
