"use client";

import * as React from "react";
import type { SceneStoryWeight } from "@/lib/types/site";

export interface ScriptScrollState {
  /** Current screenplay page from line count ÷ 55 (see script reader). */
  pageApprox: number;
  beatLabel: string | null;
  actLabel: string | null;
  sceneSlug: string | null;
  activeAnchor: string | null;
  /** Save the Cat–style scene load; null when not on a scene block. */
  sceneWeight: SceneStoryWeight | null;
  /** Rounded pages in the **active beat** (all scenes in that beat). */
  beatPageActual: number | null;
  /** Editorial target pages for that beat (~110 feature model). */
  beatPageTarget: number | null;
  /** Actual minus target (positive = over). */
  beatPageDelta: number | null;
  /** Total script pages (all scenes, line-based). */
  totalScriptPages: number;
}

const ScriptScrollContext = React.createContext<ScriptScrollState | null>(null);

export function ScriptScrollProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ScriptScrollState;
}) {
  return (
    <ScriptScrollContext.Provider value={value}>
      {children}
    </ScriptScrollContext.Provider>
  );
}

export function useScriptScrollOptional() {
  return React.useContext(ScriptScrollContext);
}
