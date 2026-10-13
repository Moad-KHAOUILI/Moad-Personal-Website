// ---------------------------------------------------------------------------
// Root layout: loads the fonts and sets page metadata.
// Each font is a CSS variable that globals.css maps to Tailwind classes
// (font-display, font-sans, font-dialogue).
// ---------------------------------------------------------------------------

import type { Metadata } from "next";
import { Barlow_Condensed, Chakra_Petch, Space_Grotesk } from "next/font/google";
import PhoneViewport from "@/components/PhoneViewport";
import "./globals.css";

// Headings and menus: heavy, condensed and italic, close to Persona's UI lettering
const display = Barlow_Condensed({
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display-src",
});

// Body text: a slightly techy grotesk that stays readable at paragraph length
const sans = Space_Grotesk({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-sans-src" });

// About Me dialogue: angular and a little sci-fi, like a game's text box
const dialogue = Chakra_Petch({ weight: ["500", "600"], subsets: ["latin"], variable: "--font-dialogue-src" });

export const metadata: Metadata = {
  title: "Moad Khaouili",
  description: "Personal website and projects of Moad Khaouili.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${dialogue.variable}`}>
      <body>
        <PhoneViewport />
        {children}
      </body>
    </html>
  );
}
