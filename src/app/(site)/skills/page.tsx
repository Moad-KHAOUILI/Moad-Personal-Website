// Technical Skills (/skills)

import type { Metadata } from "next";
import { SkillsRoute } from "@/components/ScreenRoutes";

export const metadata: Metadata = {
  title: "Technical Skills",
  description: "The technologies and tools Moad Khaouili works with.",
};

export default function Page() {
  return <SkillsRoute />;
}
