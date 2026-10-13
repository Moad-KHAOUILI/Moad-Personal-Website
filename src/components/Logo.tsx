// ---------------------------------------------------------------------------
// The "Slash Card" logo, in the site's own style: a bold italic MK on a white
// slanted slab, with a cyan slab offset behind it (like the portrait frame) and
// a cyan slash cutting between the letters (like the screen wipe).
//   <Logo />               short form: the MK mark
//   <Logo variant="long" /> the mark beside the full name (and the role, with `role`)
// The letters are drawn as shapes, not text, so the mark looks the same everywhere.
// Standalone copies live in /public/brand, and the favicon is src/app/icon.svg.
// ---------------------------------------------------------------------------

import { profile } from "@/lib/data";

// Geometry (viewBox 0 0 128 80). The letters are drawn upright and then slanted
// 12° like the italic headings; the slabs and slash use the same slant
export const SLAB_BACK = "21.5,9 127,9 112.5,77 7,77";
export const SLAB = "16.5,4 122,4 107.5,72 2,72";
export const LETTER_M = "20,64 20,16 31,16 38,33 45,16 56,16 56,64 47,64 47,37 40.5,51 35.5,51 29,37 29,64";
export const LETTER_K = "66,16 75,16 75,35 87,16 98,16 83,38 99,64 88,64 75,43 75,64 66,64";
export const SLASH = "72.5,2 77.5,2 59.5,78 54.5,78";
export const SLANT = "translate(14 0) skewX(-12)";

export function MKMark({ className = "", title = "MK" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 128 80" className={className} role="img" aria-label={title}>
      <polygon points={SLAB_BACK} fill="var(--color-cyan)" />
      <polygon points={SLAB} fill="#fff" />
      <g transform={SLANT} fill="var(--color-deep)">
        <polygon points={LETTER_M} />
        <polygon points={LETTER_K} />
      </g>
      <polygon points={SLASH} fill="var(--color-cyan)" />
    </svg>
  );
}

type Props = { variant?: "short" | "long"; role?: boolean; className?: string };

export default function Logo({ variant = "short", role = false, className = "" }: Props) {
  if (variant === "short") return <MKMark className={className} title={`${profile.firstName} ${profile.lastName}`} />;

  // Long form: the mark, then the name in the heading type ("Khaouili" in cyan), with the role strip under it
  return (
    <div className={`logo-long ${className}`}>
      <MKMark className="logo-long-mark" title="" />
      <div className="flex flex-col items-start">
        <span className="logo-long-name">
          {profile.firstName} <span className="text-cyan">{profile.lastName}</span>
        </span>
        {role && <span className="strip logo-long-role">{profile.role}</span>}
      </div>
    </div>
  );
}
