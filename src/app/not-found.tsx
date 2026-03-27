import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { LeftNav } from "@/components/layout/left-nav";
import { RightGuidancePanel } from "@/components/layout/right-guidance-panel";

export default function NotFound() {
  return (
    <AppShell left={<LeftNav />} right={<RightGuidancePanel routeKey="about" />}>
      <div className="flex min-h-0 flex-1 flex-col items-start justify-center px-10 py-20">
        <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-[0.06em]">
          This passage does not exist.
        </h1>
        <Link
          href="/about"
          className="mt-8 border-b border-border pb-0.5 text-[13px] text-foreground/90 transition-colors hover:text-foreground"
        >
          Return to About
        </Link>
      </div>
    </AppShell>
  );
}
