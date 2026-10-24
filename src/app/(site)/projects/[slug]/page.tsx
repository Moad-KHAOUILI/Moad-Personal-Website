// One project's full file (/projects/<slug>). Every project's page is built
// ahead of time; an unknown slug shows the 404 page.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectRoute } from "@/components/ScreenRoutes";
import { projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  return <ProjectRoute index={index} />;
}
