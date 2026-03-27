import { siteData } from "@/data/site";
import { flattenScriptFlow, type FlatScriptNode } from "@/lib/script/flatten";
import type { ScriptScene } from "@/lib/types/site";

const scriptMaps = {
  beats: new Map(siteData.beats.map((b) => [b.id, b])),
  markers: new Map(siteData.structuralMarkers.map((m) => [m.id, m])),
  notes: new Map(siteData.pageAccomplishments.map((n) => [n.id, n])),
  scenes: new Map(siteData.scenes.map((s) => [s.id, s])),
} as const;

/** Ordered flattened script (beats, markers, accomplishments, scenes) — single source for reader + nav. */
export const flatScriptNodes: FlatScriptNode[] = flattenScriptFlow(
  siteData.scriptFlow,
  scriptMaps,
);

/** Scenes in screenplay order (matches reader), for TOC / sidebar. */
export const scriptScenesOrdered: ScriptScene[] = flatScriptNodes.flatMap((n) =>
  n.kind === "scene" ? [n.scene] : [],
);
