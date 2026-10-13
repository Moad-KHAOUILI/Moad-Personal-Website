// ---------------------------------------------------------------------------
// Shared by FitScreen and FitBox: find the largest CSS zoom (up to `max`) at
// which some content fits a given height, and refit when things change.
//
// Measurements use getBoundingClientRect (the size as drawn on screen), which
// every browser reports the same way under zoom. (offsetHeight and friends
// differ: Chrome gives unzoomed pixels, Safari doesn't, which made the zoom
// flip back and forth on iPhones.)
// ---------------------------------------------------------------------------

const TOLERANCE = 0.01; // zoom changes smaller than this are ignored, so refits settle instead of flickering

// `el` gets the zoom; `content` is what's measured (el itself, or a wrapper inside it)
export function fitZoom(el: HTMLElement, content: HTMLElement, available: number, max: number, min: number) {
  const prev = el.style.zoom ? Number(el.style.zoom) : null;
  const fits = (z: number) => {
    el.style.zoom = String(z);
    return content.getBoundingClientRect().height <= available + 0.5;
  };

  let zoom = max;
  if (!fits(max)) {
    // Narrow it down: lo always fits (or is the minimum), hi never does
    let lo = min;
    let hi = max;
    for (let i = 0; i < 9; i++) {
      const mid = (lo + hi) / 2;
      if (fits(mid)) lo = mid;
      else hi = mid;
    }
    zoom = lo;
  }

  // Keep the previous zoom if it's practically the same and still fits
  if (prev !== null && prev !== zoom && Math.abs(prev - zoom) < TOLERANCE && fits(prev)) zoom = prev;
  el.style.zoom = String(zoom);
  return zoom;
}

// Run `fit` now, and again (once per frame at most) when the window or the content changes size
export function refitOnChange(el: HTMLElement, fit: () => void, watch: Element = el) {
  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fit);
  };
  fit();
  const observer = new ResizeObserver(schedule);
  observer.observe(watch);
  window.addEventListener("resize", schedule);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("resize", schedule);
  };
}
