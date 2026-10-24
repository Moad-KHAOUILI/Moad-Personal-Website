// 404 for a wrong path inside the site (e.g. /projects/<unknown>): shown inside
// the shell, which already draws the background. Any other unknown URL gets
// src/app/not-found.tsx instead.

import type { Metadata } from "next";
import { NotFoundRoute } from "@/components/ScreenRoutes";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFoundPage() {
  return <NotFoundRoute />;
}
