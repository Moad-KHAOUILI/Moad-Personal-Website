// About Me (/about)

import type { Metadata } from "next";
import { AboutRoute } from "@/components/ScreenRoutes";

export const metadata: Metadata = {
  title: "About Me",
  description: "Who Moad Khaouili is: background, interests, goals and languages.",
};

export default function Page() {
  return <AboutRoute />;
}
