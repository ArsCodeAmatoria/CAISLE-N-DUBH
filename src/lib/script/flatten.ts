import type { BeatDef, PageRangeNote, ScriptFlowEntry, ScriptScene, StructuralMarker } from "@/lib/types/site";

export type FlatScriptNode =
  | { kind: "marker"; marker: StructuralMarker }
  | { kind: "beat"; beat: BeatDef }
  | { kind: "accomplishment"; note: PageRangeNote }
  | { kind: "scene"; scene: ScriptScene };

export function flattenScriptFlow(
  flow: ScriptFlowEntry[],
  maps: {
    beats: Map<string, BeatDef>;
    markers: Map<string, StructuralMarker>;
    notes: Map<string, PageRangeNote>;
    scenes: Map<string, ScriptScene>;
  },
): FlatScriptNode[] {
  const out: FlatScriptNode[] = [];
  for (const e of flow) {
    if (e.kind === "beat") {
      const beat = maps.beats.get(e.beatId);
      if (beat) out.push({ kind: "beat", beat });
    } else if (e.kind === "marker") {
      const marker = maps.markers.get(e.markerId);
      if (marker) out.push({ kind: "marker", marker });
    } else if (e.kind === "accomplishment") {
      const note = maps.notes.get(e.noteId);
      if (note) out.push({ kind: "accomplishment", note });
    } else {
      const scene = maps.scenes.get(e.sceneId);
      if (scene) out.push({ kind: "scene", scene });
    }
  }
  return out;
}
