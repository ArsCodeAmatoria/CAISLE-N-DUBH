"use client";

import { getGuidance } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

interface RightGuidancePanelProps {
  routeKey: string;
  className?: string;
}

export function RightGuidancePanel({ routeKey, className }: RightGuidancePanelProps) {
  const panel = getGuidance(routeKey);
  if (!panel) {
    return (
      <div className={cn("p-5 text-[13px] text-muted-foreground", className)}>
        <p>Guidance for this section will appear here.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-5 font-[family-name:var(--font-serif-body)] text-[13px] leading-relaxed text-muted-foreground",
        className,
      )}
    >
      {panel.intro && (
        <p className="mb-6 border-b border-border pb-5 text-[12px] leading-relaxed text-foreground/85">
          {panel.intro}
        </p>
      )}
      <div className="space-y-2">
        {panel.groups.map((g) => (
          <Collapsible
            key={g.id}
            defaultOpen
            className="rounded-sm border border-border/80 bg-card/30"
          >
            <CollapsibleTrigger className="flex w-full items-center gap-1 px-3 py-2.5 text-left text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/90 outline-none transition-colors hover:bg-secondary/50 [&[data-state=open]_svg]:rotate-90">
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground transition-transform" />
              {g.title}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="space-y-2 border-t border-border/60 px-3 py-3">
                {g.items.map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-3 text-[12px] leading-snug before:absolute before:left-0 before:top-2 before:h-px before:w-1.5 before:bg-muted-foreground/50"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
