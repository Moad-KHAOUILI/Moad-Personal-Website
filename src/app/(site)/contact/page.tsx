// Contact Me (/contact)

import type { Metadata } from "next";
import { ContactRoute } from "@/components/ScreenRoutes";

export const metadata: Metadata = {
  title: "Contact Me",
  description: "How to reach Moad Khaouili.",
};

export default function Page() {
  return <ContactRoute />;
}
