import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Approximate Irish / Irish-context pronunciation for readers — stressed syllables in CAPS. */
export function PronunciationHint({
  children,
  className,
  label = "Approx.",
}: {
  children: ReactNode;
  className?: string;
  /** Short lead, e.g. "Approx." or "Irish title" */
  label?: string;
}) {
  return (
    <p
      className={cn(
        "font-[family-name:var(--font-geist-mono)] text-[11px] leading-relaxed tracking-[0.06em] text-muted-foreground",
        className,
      )}
    >
      <span className="text-muted-foreground/75">{label}</span>{" "}
      <span className="text-foreground/80">{children}</span>
    </p>
  );
}
