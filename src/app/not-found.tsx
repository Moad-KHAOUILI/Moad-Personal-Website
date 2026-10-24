// ---------------------------------------------------------------------------
// 404 page, shown for any URL the site doesn't have. Same water background
// and name marquee as the main site, with a giant slanted "404" and a button
// (or Enter / Esc) back to the main menu.
// ---------------------------------------------------------------------------

import type { Metadata } from "next";
import Background from "@/components/Background";
import NameMarquee from "@/components/NameMarquee";
import NotFound from "@/components/screens/NotFound";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFoundPage() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <Background />
      <NameMarquee />
      <NotFound />
    </div>
  );
}
