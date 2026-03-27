import type { ReactNode } from "react";
import Image from "next/image";
import type { CharacterDetail as CharacterDetailType } from "@/lib/types/site";
import { CharacterBibleIcon } from "@/lib/character-icons";
import { cn } from "@/lib/utils";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border pt-10">
      <h2 className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h2>
      <div className="mt-4 text-[14px] leading-[1.75] text-foreground/88">{children}</div>
    </section>
  );
}

export function CharacterDetailView({ c }: { c: CharacterDetailType }) {
  return (
    <div className="mx-auto max-w-3xl px-8 py-16 lg:max-w-5xl lg:px-12 lg:py-20">
      <header className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start lg:gap-14">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden border border-border bg-secondary/30 lg:mx-0 lg:max-w-none lg:shrink-0">
          <Image
            src={c.portraitSrc}
            alt={c.portraitAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 320px"
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="min-w-0 lg:pt-2">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {c.role}
          </p>
          <p className="mt-2 flex items-center gap-2 text-[12px] text-foreground/90">
            <CharacterBibleIcon slug={c.slug} className="size-4 text-muted-foreground" />
            <span className="tracking-wide">{c.bibleTagline}</span>
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[0.06em] text-foreground sm:text-5xl">
            {c.name}
          </h1>
          <p className="mt-4 max-w-xl text-[13px] text-muted-foreground">{c.toneDescriptor}</p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Core flaw</dt>
              <dd className="mt-1">{c.coreFlaw}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Arc</dt>
              <dd className="mt-1">{c.arcDirection}</dd>
            </div>
          </dl>
          {c.systemTruth && (
            <dl className="mt-6 grid gap-4 border-t border-border/80 pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Response to truth
                </dt>
                <dd className="mt-1">{c.systemTruth.responseToTruth}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Outcome</dt>
                <dd className="mt-1">{c.systemTruth.outcome}</dd>
              </div>
            </dl>
          )}
        </div>
      </header>

      <div className="mt-12 space-y-2">
        {c.coreBibleFunction && (
          <Section title="Core function (bible)">
            <p>{c.coreBibleFunction}</p>
          </Section>
        )}
        {c.behaviorRules && c.behaviorRules.length > 0 && (
          <Section title="Behavior">
            <ul className="list-none space-y-2">
              {c.behaviorRules.map((rule, i) => (
                <li
                  key={i}
                  className={cn(
                    "relative pl-4 text-[13px] before:absolute before:left-0 before:top-2.5",
                    "before:h-1 before:w-1 before:rounded-full before:bg-muted-foreground",
                  )}
                >
                  {rule}
                </li>
              ))}
            </ul>
          </Section>
        )}
        <Section title="Overview">
          <p>{c.overview}</p>
        </Section>
        <Section title="Narrative function">
          <p>{c.narrativeFunction}</p>
        </Section>
        <Section title="Survival strategy">
          <p>{c.survivalStrategy}</p>
        </Section>
        <Section title="Arc">
          <p>{c.arc}</p>
        </Section>
        <Section title="Judgment">
          <p>{c.judgmentPattern}</p>
        </Section>
        {c.finalResolution && (
          <Section title="Final resolution">
            <p>{c.finalResolution}</p>
          </Section>
        )}
        {c.keyLine && (
          <Section title="Key line">
            <p className="font-[family-name:var(--font-display)] text-lg tracking-wide text-foreground">
              {c.keyLine}
            </p>
          </Section>
        )}
        {c.relationshipToProtagonist !== "N/A" && (
          <Section title="Relationship to Aoife">
            <p>{c.relationshipToProtagonist}</p>
          </Section>
        )}
        <Section title="Key scenes / beats">
          <ul className="list-none space-y-3">
            {c.keyScenes.map((s, i) => (
              <li
                key={i}
                className={cn(
                  "relative pl-5 text-[13px] before:absolute before:left-0 before:top-2.5",
                  "before:h-1 before:w-1 before:rounded-full before:bg-muted-foreground",
                )}
              >
                {s}
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Dialogue tone">
          <p>{c.dialogueTone}</p>
        </Section>
        <Section title="Visual presence">
          <p>{c.visualPresence}</p>
        </Section>
      </div>
    </div>
  );
}
