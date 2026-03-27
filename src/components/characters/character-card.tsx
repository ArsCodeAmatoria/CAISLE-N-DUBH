import Link from "next/link";
import type { CharacterSummary } from "@/lib/types/site";
import { cn } from "@/lib/utils";

export function CharacterCard({ c }: { c: CharacterSummary }) {
  return (
    <Link
      href={`/characters/${c.slug}`}
      className={cn(
        "group block border border-border bg-card/20 p-6 transition-colors duration-300",
        "hover:border-foreground/25 hover:bg-secondary/30",
      )}
    >
      <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {c.role}
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[0.06em] text-foreground transition-opacity group-hover:opacity-90">
        {c.name}
      </h2>
      <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">{c.toneDescriptor}</p>
      <dl className="mt-5 space-y-3 border-t border-border/80 pt-5 text-[12px] leading-snug">
        <div>
          <dt className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-muted-foreground">
            Core flaw
          </dt>
          <dd className="mt-1 text-foreground/88">{c.coreFlaw}</dd>
        </div>
        <div>
          <dt className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-muted-foreground">
            Arc
          </dt>
          <dd className="mt-1 text-foreground/88">{c.arcDirection}</dd>
        </div>
      </dl>
    </Link>
  );
}
