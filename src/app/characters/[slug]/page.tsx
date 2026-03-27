import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { LeftNav } from "@/components/layout/left-nav";
import { RightGuidancePanel } from "@/components/layout/right-guidance-panel";
import { CharacterDetailView } from "@/components/characters/character-detail";
import { siteData } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return siteData.characters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = siteData.characters.find((x) => x.slug === slug);
  if (!c) return { title: "Character" };
  return { title: c.name };
}

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params;
  const c = siteData.characters.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <AppShell
      left={<LeftNav />}
      right={<RightGuidancePanel routeKey={`character:${c.slug}`} />}
    >
      <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth">
        <CharacterDetailView c={c} />
      </div>
    </AppShell>
  );
}
