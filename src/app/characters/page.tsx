import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { LeftNav } from "@/components/layout/left-nav";
import { RightGuidancePanel } from "@/components/layout/right-guidance-panel";
import { CharacterCard } from "@/components/characters/character-card";
import { siteData } from "@/data/site";

export const metadata: Metadata = {
  title: "Characters",
};

export default function CharactersPage() {
  return (
    <AppShell
      left={<LeftNav />}
      right={<RightGuidancePanel routeKey="characters" />}
    >
      <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth">
        <div className="mx-auto max-w-5xl px-8 py-16 lg:px-12 lg:py-20">
          <header className="max-w-2xl border-b border-border pb-12">
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Ensemble
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[0.06em] text-foreground sm:text-5xl">
              Characters
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
              Each figure pressure-tests a strategy the protagonist could choose—from avoidance
              to control to surrender.
            </p>
          </header>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {siteData.characters.map((c) => (
              <li key={c.id}>
                <CharacterCard c={c} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
