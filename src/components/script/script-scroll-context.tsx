"use client";

import * as React from "react";
import type { SceneStoryWeight } from "@/lib/types/site";

export interface ScriptScrollState {
  pageApprox: number;
  beatLabel: string | null;
  actLabel: string | null;
  sceneSlug: string | null;
  activeAnchor: string | null;
  /** Save the Cat–style scene load; null when not on a scene block. */
  sceneWeight: SceneStoryWeight | null;
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
