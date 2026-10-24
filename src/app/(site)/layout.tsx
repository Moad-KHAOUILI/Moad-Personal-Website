// ---------------------------------------------------------------------------
// Layout for every page of the site: the shell (background, calendar, back
// arrow, wipe transition) stays on screen while the page inside changes.
// The 404 page sits outside this group and draws its own background.
// ---------------------------------------------------------------------------

import Shell from "@/components/Shell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
