// ---------------------------------------------------------------------------
// Menu sound effects, generated with the Web Audio API (no audio files).
// Short, soft triangle-wave blips in the spirit of the game's UI sounds.
// Sound is a bonus: if the browser can't play it, nothing happens and nothing
// breaks (a failing sound must never stop a key press or tap from working).
// ---------------------------------------------------------------------------

let ctx: AudioContext | null = null;

// Browsers block audio until the visitor has clicked, tapped or pressed a key.
// navigator.userActivation tells us directly where it exists; older Safari lacks it,
// so the first interaction is also tracked by hand
let interacted = false;
if (typeof window !== "undefined") {
  const mark = () => (interacted = true);
  for (const type of ["pointerdown", "keydown", "touchstart"]) window.addEventListener(type, mark, { once: true, capture: true });
}

function audio() {
  if (ctx) return ctx;
  // Older iOS only has the prefixed webkitAudioContext
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();
  return ctx;
}

// Play one tone. `at` delays it (in seconds) so sounds can be chained into little melodies.
function tone(freq: number, duration: number, at = 0, volume = 0.06) {
  if (!(navigator.userActivation?.hasBeenActive ?? interacted)) return;
  try {
    const ac = audio();
    if (!ac) return;
    if (ac.state === "suspended") void ac.resume(); // iOS starts audio suspended
    const start = ac.currentTime + at;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration); // quick fade out
    osc.connect(gain).connect(ac.destination);
    osc.start(start);
    osc.stop(start + duration);
  } catch {
    // No sound, no problem
  }
}

export const sfx = {
  move: () => tone(1250, 0.05, 0, 0.04), // cursor moved
  confirm: () => {
    tone(880, 0.08); // rising two-note "select"
    tone(1320, 0.14, 0.06);
  },
  back: () => {
    tone(700, 0.07); // falling two-note "cancel"
    tone(440, 0.12, 0.06);
  },
};
