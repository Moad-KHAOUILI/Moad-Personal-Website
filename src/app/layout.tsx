// ---------------------------------------------------------------------------
// Root layout: loads the fonts and sets page metadata.
// Each font is a CSS variable that globals.css maps to Tailwind classes
// (font-display, font-sans).
// ---------------------------------------------------------------------------

import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

// Headings and menus: heavy, condensed and italic, close to Persona's UI lettering
const display = Barlow_Condensed({
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display-src",
});

// Body text
const sans = Barlow({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-sans-src" });

export const metadata: Metadata = {
  title: "Moad Khaouili",
  description: "Personal website and projects of Moad Khaouili.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
