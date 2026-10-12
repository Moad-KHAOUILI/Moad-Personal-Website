// ---------------------------------------------------------------------------
// The animated "deep water" background behind every screen, built from
// layered CSS (see the Background section in globals.css):
//   - a deep blue radial gradient
//   - big blurred light blobs drifting slowly
//   - slanted light rays sliding sideways
//   - two rippling shimmer layers moving against each other (water caustics)
//   - a faint diagonal light band and a dark vignette around the edges
// During the Dark Hour the whole thing is hue-shifted to sickly green.
// ---------------------------------------------------------------------------

export default function Background() {
  return (
    <div className="bg-root" aria-hidden>
      <div className="bg-blob left-[55%] top-[-10%] h-[60vh] w-[60vh] bg-[#2d7bff]" />
      <div className="bg-blob left-[-10%] top-[40%] h-[70vh] w-[70vh] bg-[#0b3fd1] [animation-delay:-6s]" />
      <div className="bg-blob left-[30%] top-[60%] h-[45vh] w-[45vh] bg-[#4fd8ff] opacity-30 [animation-delay:-12s]" />
      <div className="bg-rays" />
      <div className="bg-shimmer" />
      <div className="bg-shimmer bg-shimmer-2" />
      <div className="bg-band" />
      <div className="bg-vignette" />
    </div>
  );
}
