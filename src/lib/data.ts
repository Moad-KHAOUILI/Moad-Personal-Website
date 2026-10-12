// ---------------------------------------------------------------------------
// Site content. This is the ONLY file you need to edit to change the text,
// projects, socials and stats shown on the website.
// ---------------------------------------------------------------------------

export const profile = {
  firstName: "Moad",
  lastName: "Khaouili",
  role: "Developer", // e.g. "Full-stack developer", "CS student"
  about:
    "Write a few sentences about yourself here: what you do, what you're into, what you're looking for. Replace this placeholder with your real bio.",
};

// PROJECTS screen. `year` and `tags` show in the details panel.
export const projects = [
  { name: "Project One", year: "2026", desc: "A short description of project one: what it does and why it's cool.", tags: ["Next.js", "TypeScript"], url: "#" },
  { name: "Project Two", year: "2025", desc: "A short description of project two.", tags: ["React"], url: "#" },
  { name: "Project Three", year: "2025", desc: "A short description of project three.", tags: ["Python"], url: "#" },
  { name: "Project Four", year: "2024", desc: "A short description of project four.", tags: ["Node.js"], url: "#" },
];

// SOCIAL LINK screen. Each social is drawn as a tarot card.
//   numeral / arcana: the card's tarot number and name (Persona's Social Links are tied to the Major Arcana)
//   glyph: the short symbol in the middle of the card
export const socials = [
  { name: "GitHub", handle: "@your-handle", glyph: "GH", numeral: "I", arcana: "The Magician", url: "https://github.com/" },
  { name: "LinkedIn", handle: "/in/your-handle", glyph: "in", numeral: "IV", arcana: "The Emperor", url: "https://linkedin.com/" },
  { name: "Email", handle: "mouad.khaouili69@gmail.com", glyph: "@", numeral: "VI", arcana: "The Lovers", url: "mailto:mouad.khaouili69@gmail.com" },
];

// STATS screen, styled like Persona's social stats.
//   level: 1 to 6 (6 is max)
//   rank: the title shown for that level
export const stats = [
  { name: "Frontend", level: 5, rank: "Virtuoso" },
  { name: "Backend", level: 4, rank: "Seasoned" },
  { name: "Design", level: 3, rank: "Stylish" },
  { name: "Problem Solving", level: 5, rank: "Genius" },
  { name: "Coffee Intake", level: 6, rank: "Unstoppable" },
];
