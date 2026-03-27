import type { ReactNode } from "react";
import { siteData } from "@/data/site";
import { StructuralMap } from "@/components/maps/structural-map";
import { cn } from "@/lib/utils";

function ThemeBlock({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-border pt-12", className)}>
      <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-4 text-[15px] leading-[1.75] text-foreground/90">{children}</div>
    </section>
  );
}

export function AboutPageContent() {
  const a = siteData.about;
  return (
    <div className="mx-auto max-w-3xl px-8 py-16 lg:px-12 lg:py-24">
      <header className="min-h-[52vh] border-b border-border pb-20">
        <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          {a.subtitle}
        </p>
        <h1 className="mt-10 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[0.06em] text-foreground">
          {a.title}
        </h1>
        <p className="mt-8 max-w-xl text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
          Psychological horror · identity trial
        </p>
      </header>

      <ThemeBlock label="Logline" className="mt-20">
        <p className="font-[family-name:var(--font-serif-body)] text-[17px] leading-[1.65] text-foreground">
          {a.logline}
        </p>
      </ThemeBlock>

      <ThemeBlock label="Overview" className="mt-16">
        <p>{a.pitch}</p>
      </ThemeBlock>

      <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-12">
        <ThemeBlock label="Theme">
          <p>{a.theme}</p>
        </ThemeBlock>
        <ThemeBlock label="Tone / genre">
          <p>{a.toneGenre}</p>
        </ThemeBlock>
      </div>

      <ThemeBlock label="Story engine" className="mt-16">
        <p>{a.storyEngine}</p>
      </ThemeBlock>

      <StructuralMap />
    </div>
  );
}
