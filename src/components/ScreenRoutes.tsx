"use client";

// ---------------------------------------------------------------------------
// Connects each screen to the shell: turns "open this" and "back" into page
// changes, and picks the item a screen starts on from the page you came from.
// The pages in src/app/(site) render these (the pages themselves stay server
// components, so they can set each page's title).
// ---------------------------------------------------------------------------

import About from "@/components/screens/About";
import MainMenu from "@/components/screens/MainMenu";
import NotFound from "@/components/screens/NotFound";
import OtherProjects from "@/components/screens/OtherProjects";
import ProjectDetail from "@/components/screens/ProjectDetail";
import Projects from "@/components/screens/Projects";
import SocialLink from "@/components/screens/SocialLink";
import Stats from "@/components/screens/Stats";
import { useShell } from "@/components/Shell";
import { projects } from "@/lib/data";

const projectPath = (i: number) => `/projects/${projects[i].slug}`;

export function MenuRoute() {
  const { go, active, from } = useShell();
  return <MainMenu active={active} from={from} onSelect={go} onOpenProject={(i) => go(projectPath(i))} />;
}

export function AboutRoute() {
  const { go, active } = useShell();
  return <About active={active} onBack={() => go("/")} />;
}

export function ProjectsRoute() {
  const { go, active, from } = useShell();
  // Coming back from a project lands on it, and from the other projects on their row
  const initial = from === "/projects/other" ? projects.length : Math.max(0, projects.findIndex((_, i) => from === projectPath(i)));
  return (
    <Projects
      active={active}
      initial={initial}
      onOpen={(i) => go(projectPath(i))}
      onOthers={() => go("/projects/other")}
      onBack={() => go("/")}
    />
  );
}

export function ProjectRoute({ index }: { index: number }) {
  const { go, active } = useShell();
  return <ProjectDetail project={projects[index]} active={active} onBack={() => go("/projects")} />;
}

export function OthersRoute() {
  const { go, active } = useShell();
  return <OtherProjects active={active} onBack={() => go("/projects")} />;
}

export function SkillsRoute() {
  const { go, active } = useShell();
  return <Stats active={active} onBack={() => go("/")} />;
}

// The 404 inside the shell (an unknown project's page), which already draws the background
export function NotFoundRoute() {
  const { go } = useShell();
  return <NotFound onHome={() => go("/")} />;
}

export function ContactRoute() {
  const { go, active } = useShell();
  return <SocialLink active={active} onBack={() => go("/")} />;
}
