import Link from "next/link";
import { siteData } from "@/data/site";

export function StructuralMap() {
  return (
    <div className="mt-24 border-t border-border pt-16">
      <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Structural spine
      </p>
      <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
        Each card links to the corresponding marker in the script reader so you can read or skim with the same spine in view.
      </p>
      <ol className="mt-10 flex flex-col gap-4 lg:flex-row lg:gap-0">
        {siteData.acts.map((act, i) => (
          <li
            key={act.id}
            className="relative flex-1 border border-border bg-card/15 px-4 py-4 lg:rounded-none first:lg:rounded-l-sm last:lg:rounded-r-sm lg:border-l-0 lg:first:border-l"
          >
            {i < siteData.acts.length - 1 && (
              <span
                className="pointer-events-none absolute -right-px top-1/2 z-10 hidden h-8 w-px -translate-y-1/2 bg-border lg:block"
                aria-hidden
              />
            )}
            <p className="font-[family-name:var(--font-display)] text-lg tracking-[0.08em] text-foreground">
              {act.label}
            </p>
            <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
              {act.description}
            </p>
            <Link
              href={`/script#${act.anchor}`}
              className="mt-3 inline-block font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-foreground/80 underline-offset-4 hover:underline"
            >
              Open in script
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
