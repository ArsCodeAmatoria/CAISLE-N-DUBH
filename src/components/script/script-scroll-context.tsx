"use client";

import * as React from "react";

export interface ScriptScrollState {
  pageApprox: number;
  beatLabel: string | null;
  actLabel: string | null;
  sceneSlug: string | null;
  activeAnchor: string | null;
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
