import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { LeftNav } from "@/components/layout/left-nav";
import { RightGuidancePanel } from "@/components/layout/right-guidance-panel";
import { CreditsClient } from "@/components/credits/credits-client";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Rolling credits for CAISLEÁN DUBH with Taobh Thiar den Doras, written by Leigh Akin.",
};

export default function CreditsPage() {
  return (
    <AppShell
      left={<LeftNav />}
      right={<RightGuidancePanel routeKey="credits" />}
    >
      <CreditsClient />
    </AppShell>
  );
}
