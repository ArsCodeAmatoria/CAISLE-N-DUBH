import Link from "next/link";
import Image from "next/image";
import type { CharacterSummary } from "@/lib/types/site";
import { CharacterBibleIcon } from "@/lib/character-icons";
import { cn } from "@/lib/utils";

export function CharacterCard({ c }: { c: CharacterSummary }) {
  return (
    <Link
      href={`/characters/${c.slug}`}
      className={cn(
        "group block overflow-hidden border border-border bg-card/20 transition-colors duration-300",
        "hover:border-foreground/25 hover:bg-secondary/30",
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-border bg-secondary/30">
        <Image
          src={c.portraitSrc}
          alt={c.portraitAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-top opacity-[0.92] transition-[opacity,transform] duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {c.role}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[11px] tracking-wide text-foreground/85">
              <CharacterBibleIcon
                slug={c.slug}
                className="size-3.5 shrink-0 text-muted-foreground"
              />
              <span>{c.bibleTagline}</span>
            </p>
          </div>
        </div>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[0.06em] text-foreground transition-opacity group-hover:opacity-90">
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
      </div>
    </Link>
  );
}
