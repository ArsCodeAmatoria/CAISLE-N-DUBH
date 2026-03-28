import type { ReactNode } from "react";
import type { CharacterDetail as CharacterDetailType } from "@/lib/types/site";
import { CharacterPortraitMedia } from "@/components/characters/character-portrait-media";
import { PronunciationHint } from "@/components/ui/pronunciation";
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

function HeaderStatCard({
  label,
  hint,
  children,
  accent,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  accent?: "green" | "orange" | "neutral";
}) {
  const accentClass =
    accent === "green"
      ? "border-l-[var(--ie-green)]"
      : accent === "orange"
        ? "border-l-[var(--ie-orange)]"
        : "border-l-muted-foreground/35";
  return (
    <div
      className={cn(
        "rounded-md border border-border/80 bg-secondary/35 px-4 py-4 border-l-2",
        accentClass,
      )}
    >
      <p className="font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      {hint ? <p className="mt-1 text-[10px] leading-snug text-muted-foreground/85">{hint}</p> : null}
      <p className="mt-2.5 text-[13px] leading-[1.65] text-foreground/90">{children}</p>
    </div>
  );
}

export function CharacterDetailView({ c }: { c: CharacterDetailType }) {
  return (
    <div className="w-full">
      <div className="mx-auto grid max-w-6xl gap-0 border-b border-border lg:grid-cols-[1fr_minmax(0,42%)] lg:items-stretch">
        <header className="flex min-h-[48vh] flex-col justify-end px-8 pb-16 pt-16 lg:min-h-[min(70vh,52rem)] lg:px-12 lg:pb-24 lg:pt-24">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Character bible
          </p>
          <h1 className="mt-10 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[0.06em] text-foreground">
            {c.name}
          </h1>
          {c.namePronunciation ? (
            <PronunciationHint className="mt-4 max-w-2xl" label="Approx. pronunciation ·">
              {c.namePronunciation}
            </PronunciationHint>
          ) : null}
          <p className="mt-8 max-w-xl text-[12px] uppercase tracking-[0.18em] text-muted-foreground lg:text-[13px] lg:tracking-[0.2em]">
            {c.role} · {c.bibleTagline}
          </p>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-foreground/90">{c.toneDescriptor}</p>
          <div className="mt-6 max-w-2xl border-l-2 border-l-[color-mix(in_srgb,var(--ie-orange)_55%,transparent)] pl-4">
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Voice · Irish accent
            </p>
            <p className="mt-2 text-[13px] leading-[1.65] text-foreground/88">{c.voiceAccent}</p>
          </div>
        </header>
        <div className="relative min-h-[220px] border-t border-border lg:min-h-0 lg:border-l lg:border-t-0">
          <CharacterPortraitMedia
            character={c}
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-[center_20%]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 lg:bg-gradient-to-l"
            aria-hidden
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-8 py-16 lg:max-w-5xl lg:px-12 lg:py-24">
        <div className="grid gap-4 sm:grid-cols-2">
          <HeaderStatCard label="Core flaw">{c.coreFlaw}</HeaderStatCard>
          <HeaderStatCard label="Arc">{c.arcDirection}</HeaderStatCard>
          <HeaderStatCard
            label="Want · object of desire"
            hint="Conscious scene goal; pursued object—often strategy or false goal."
            accent="green"
          >
            {c.consciousWant}
          </HeaderStatCard>
          {c.unconsciousNeed ? (
            <HeaderStatCard
              label="Need · interior truth"
              hint="Value shift under pressure; what would complete them."
              accent="orange"
            >
              {c.unconsciousNeed}
            </HeaderStatCard>
          ) : null}
          {c.systemTruth ? (
            <>
              <HeaderStatCard label="Response to truth">{c.systemTruth.responseToTruth}</HeaderStatCard>
              <HeaderStatCard label="Outcome">{c.systemTruth.outcome}</HeaderStatCard>
            </>
          ) : null}
        </div>

        <div className="mt-14 space-y-2">
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
    </div>
  );
}
