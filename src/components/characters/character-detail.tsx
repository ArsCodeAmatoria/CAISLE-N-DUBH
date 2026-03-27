import type { ReactNode } from "react";
import type { CharacterDetail as CharacterDetailType } from "@/lib/types/site";
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
    <div className="mx-auto max-w-3xl px-8 py-16 lg:px-12 lg:py-20">
      <header className="border-b border-border pb-12">
        <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {c.role}
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
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Arc direction</dt>
            <dd className="mt-1">{c.arcDirection}</dd>
          </div>
        </dl>
      </header>

      <div className="mt-12 space-y-2">
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
        <Section title="Judgment pattern">
          <p>{c.judgmentPattern}</p>
        </Section>
        {c.relationshipToProtagonist !== "N/A" && (
          <Section title="Relationship to protagonist">
            <p>{c.relationshipToProtagonist}</p>
          </Section>
        )}
        <Section title="Key scenes">
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
