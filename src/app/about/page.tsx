import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { LeftNav } from "@/components/layout/left-nav";
import { RightGuidancePanel } from "@/components/layout/right-guidance-panel";
import { AboutPageContent } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <AppShell
      left={<LeftNav />}
      right={<RightGuidancePanel routeKey="about" />}
    >
      <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth">
        <AboutPageContent />
      </div>
    </AppShell>
  );
}
