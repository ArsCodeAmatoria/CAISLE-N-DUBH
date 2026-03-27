import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { LeftNav } from "@/components/layout/left-nav";
import { RightGuidancePanel } from "@/components/layout/right-guidance-panel";
import { CharacterCard } from "@/components/characters/character-card";
import { siteData } from "@/data/site";
import { protagonistPortrait } from "@/data/characters-bible";
import { ArrowUpRight, Table2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Characters",
};

export default function CharactersPage() {
  const protagonist = siteData.characters.find((c) => c.slug === "aoife-kelleher")!;

  return (
    <AppShell
      left={<LeftNav />}
      right={<RightGuidancePanel routeKey="characters" />}
    >
      <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth">
        <header className="border-b border-border">
          <div className="mx-auto grid max-w-6xl lg:grid-cols-2 lg:items-stretch">
            <div className="order-2 flex flex-col justify-end px-8 py-14 lg:order-1 lg:px-12 lg:py-20 lg:pr-10">
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Character bible
              </p>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[0.06em] text-foreground">
                Ensemble
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.65] text-foreground/88">
                Every guest pressure-tests a strategy Aoife might take—denial, control,
                suppression, forcing truth, watching, or surrender. Only choosing transforms.
              </p>
              <p className="mt-8 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Center:{" "}
                <Link
                  href="/characters/aoife-kelleher"
                  className="group inline-flex items-center gap-1 text-foreground/90 transition-colors hover:text-foreground"
                >
                  {protagonist.name}
                  <ArrowUpRight className="size-3 opacity-60 transition-opacity group-hover:opacity-100" />
                </Link>
                <span className="text-muted-foreground"> · {protagonist.bibleTagline}</span>
              </p>
            </div>
            <div className="relative order-1 min-h-[300px] w-full lg:order-2 lg:min-h-[min(560px,72vh)]">
              <Image
                src={protagonistPortrait.src}
                alt={protagonistPortrait.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[center_18%]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-[0.88] lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-background/95"
                aria-hidden
              />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-8 py-16 lg:px-12 lg:py-20">
          <section className="border-b border-border pb-16">
            <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-medium tracking-[0.08em] text-foreground">
              <Table2 className="size-5 text-muted-foreground" aria-hidden />
              {siteData.characterTruthMatrix.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
              {siteData.characterTruthMatrix.caption}
            </p>
            <div className="mt-8 overflow-x-auto border border-border">
              <table className="w-full min-w-[32rem] border-collapse text-left text-[12px]">
                <thead>
                  <tr className="border-b border-border bg-secondary/40 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Character</th>
                    <th className="px-4 py-3 font-medium">Response to truth</th>
                    <th className="px-4 py-3 font-medium">Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {siteData.characterTruthMatrix.rows.map((row) => (
                    <tr
                      key={row.character}
                      className="border-b border-border/80 last:border-b-0 [&_td]:align-top"
                    >
                      <td className="px-4 py-3 text-foreground/95">{row.character}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.responseToTruth}</td>
                      <td className="px-4 py-3 text-foreground/88">{row.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
