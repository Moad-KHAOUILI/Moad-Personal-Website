// ---------------------------------------------------------------------------
// Menu sound effects, generated with the Web Audio API (no audio files).
// Short, soft triangle-wave blips in the spirit of the game's UI sounds.
// ---------------------------------------------------------------------------

let ctx: AudioContext | null = null;

// Play one tone. `at` delays it (in seconds) so sounds can be chained into little melodies.
function tone(freq: number, duration: number, at = 0, volume = 0.06) {
  // Browsers block audio until the visitor has clicked or pressed a key
  if (!navigator.userActivation?.hasBeenActive) return;
  ctx ??= new AudioContext();
  const start = ctx.currentTime + at;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration); // quick fade out
  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration);
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
