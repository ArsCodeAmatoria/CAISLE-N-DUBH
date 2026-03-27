import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/data/site";
import { StructuralMap } from "@/components/maps/structural-map";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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

function AtlasLink({
  href,
  label,
  hint,
}: {
  href: string;
  label: string;
  hint: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col border border-border bg-card/20 px-4 py-4 transition-colors hover:bg-card/35"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-[family-name:var(--font-display)] text-sm font-medium tracking-[0.1em] text-foreground">
          {label}
        </span>
        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
      </span>
      <span className="mt-2 font-[family-name:var(--font-geist-mono)] text-[10px] leading-snug text-muted-foreground">
        {hint}
      </span>
    </Link>
  );
}

export function AboutPageContent() {
  const a = siteData.about;
  return (
    <div className="w-full">
      <div className="mx-auto grid max-w-6xl gap-0 border-b border-border lg:grid-cols-[1fr_minmax(0,42%)] lg:items-stretch">
        <header className="flex min-h-[48vh] flex-col justify-end px-8 pb-16 pt-16 lg:min-h-[min(70vh,52rem)] lg:px-12 lg:pb-24 lg:pt-24">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            {a.subtitle}
          </p>
          <h1 className="mt-10 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[0.06em] text-foreground">
            {a.title}
          </h1>
          <p className="mt-8 max-w-xl text-[12px] uppercase tracking-[0.18em] text-muted-foreground lg:text-[13px] lg:tracking-[0.2em]">
            {a.heroTagline}
          </p>
          <p className="mt-6 font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.12em] text-foreground/85">
            {a.writtenBy}
          </p>
        </header>
        <div className="relative min-h-[220px] border-t border-border lg:min-h-0 lg:border-l lg:border-t-0">
          <Image
            src={a.heroImageSrc}
            alt={a.heroImageAlt}
            fill
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

      <div className="mx-auto max-w-3xl px-8 py-16 lg:px-12 lg:py-24">
        <ThemeBlock label="Logline" className="mt-0 border-t-0 pt-0">
          <p className="font-[family-name:var(--font-serif-body)] text-[17px] leading-[1.65] text-foreground lg:text-[18px]">
            {a.logline}
          </p>
        </ThemeBlock>

        <section className="mt-16 border border-border/90 bg-secondary/15 px-5 py-6 lg:px-6 lg:py-7">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            This site
          </p>
          <p className="mt-4 text-[14px] leading-[1.75] text-foreground/88 lg:text-[15px]">
            {a.readerAbout}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <AtlasLink
              href="/script"
              label="Script"
              hint="Reader, beats, scene anchors"
            />
            <AtlasLink
              href="/characters"
              label="Characters"
              hint="Truth matrix, bible entries, portraits"
            />
            <AtlasLink
              href="/credits"
              label="Credits"
              hint="Film-style acknowledgments"
            />
          </div>
        </section>

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
    </div>
  );
}
