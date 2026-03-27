"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { LeftNav } from "@/components/layout/left-nav";
import { RightGuidancePanel } from "@/components/layout/right-guidance-panel";
import { ScriptReader } from "@/components/script/script-reader";
import {
  ScriptScrollProvider,
  type ScriptScrollState,
} from "@/components/script/script-scroll-context";

const emptyScroll: ScriptScrollState = {
  pageApprox: 1,
  beatLabel: null,
  actLabel: "Act I",
  sceneSlug: null,
  activeAnchor: null,
};

export function ScriptPageClient() {
  const [scrollState, setScrollState] = React.useState<ScriptScrollState>(emptyScroll);

  return (
    <ScriptScrollProvider value={scrollState}>
      <AppShell
        left={<LeftNav />}
        right={<RightGuidancePanel routeKey="script" />}
      >
        <ScriptReader onMeta={setScrollState} />
      </AppShell>
    </ScriptScrollProvider>
  );
}
