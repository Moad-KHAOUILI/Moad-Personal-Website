// Other Projects (/projects/other)

import type { Metadata } from "next";
import { OthersRoute } from "@/components/ScreenRoutes";

export const metadata: Metadata = {
  title: "Other Projects",
  description: "Smaller projects by Moad Khaouili.",
};

export default function Page() {
  return <OthersRoute />;
}
