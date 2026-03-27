import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppShellProps {
  left: ReactNode;
  children: ReactNode;
  right: ReactNode;
  className?: string;
}

export function AppShell({ left, children, right, className }: AppShellProps) {
  return (
    <div
      className={cn(
        "flex h-dvh max-h-dvh flex-col overflow-hidden bg-background text-foreground lg:flex-row",
        className,
      )}
    >
      <a
        href="#main-content"
        className="focus:bg-secondary focus:text-foreground sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-sm focus:border focus:px-3 focus:py-2"
      >
        Skip to main content
      </a>
      <div className="flex max-h-[38vh] min-h-0 shrink-0 flex-col border-b border-border lg:flex h-auto lg:h-full lg:max-h-none lg:w-[15.5rem] lg:border-b-0 lg:border-r">
        {left}
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row">
        <div
          id="main-content"
          tabIndex={-1}
          className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {children}
        </div>
        <aside
          aria-label="Guidance and structure notes"
          className="max-h-[32vh] min-h-0 shrink-0 overflow-y-auto scroll-smooth border-t border-border lg:max-h-none lg:w-[min(22rem,32vw)] lg:border-t-0 lg:border-l"
        >
          {right}
        </aside>
      </div>
    </div>
  );
}
