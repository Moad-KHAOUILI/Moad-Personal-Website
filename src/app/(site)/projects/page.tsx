// Projects (/projects)

import type { Metadata } from "next";
import { ProjectsRoute } from "@/components/ScreenRoutes";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects built by Moad Khaouili.",
};

export default function Page() {
  return <ProjectsRoute />;
}
