import type { BeatDef, ScriptScene } from "@/lib/types/site";
import type { FlatScriptNode } from "@/lib/script/flatten";

/**
 * Spec-script convention: ~55 vertical lines ≈ one printed page (Courier 12pt).
 * Each JSON script row counts as one line toward this budget.
 */
export const SCRIPT_LINES_PER_PAGE = 55;

/** 1-based script line number → first screenplay page that line falls on. */
export function lineNumberToPage(lineNum: number): number {
  if (lineNum < 1) return 1;
  return Math.ceil(lineNum / SCRIPT_LINES_PER_PAGE);
}

export interface BeatPageStats {
  beatId: string;
  saveTheCat: string;
  /** Lines attributed to this beat (script order). */
  lineCount: number;
  /** Rounded page count from lines (nearest page). */
  pagesRounded: number;
  targetPages: number;
  /** Positive = over target, negative = under. */
  delta: number;
}

export function computeBeatPageStats(
  flatNodes: FlatScriptNode[],
  beatsById: Map<string, BeatDef>,
): {
  byBeatId: Map<string, BeatPageStats>;
  totalLines: number;
  totalPagesRounded: number;
} {
  const lineCountByBeat = new Map<string, number>();
  let currentBeatId: string | null = null;

  for (const node of flatNodes) {
    if (node.kind === "beat") {
      currentBeatId = node.beat.id;
      if (!lineCountByBeat.has(currentBeatId)) lineCountByBeat.set(currentBeatId, 0);
      continue;
    }
    if (node.kind !== "scene" || !currentBeatId) continue;
    const n = lineCountByBeat.get(currentBeatId) ?? 0;
    lineCountByBeat.set(currentBeatId, n + node.scene.lines.length);
  }

  let totalLines = 0;
  const byBeatId = new Map<string, BeatPageStats>();
  for (const [beatId, lineCount] of lineCountByBeat) {
    totalLines += lineCount;
    const beat = beatsById.get(beatId);
    const targetPages = beat?.targetPages ?? 0;
    const pagesRounded =
      lineCount === 0 ? 0 : Math.max(1, Math.round(lineCount / SCRIPT_LINES_PER_PAGE));
    const delta = pagesRounded - targetPages;
    byBeatId.set(beatId, {
      beatId,
      saveTheCat: beat?.saveTheCat ?? beatId,
      lineCount,
      pagesRounded,
      targetPages,
      delta,
    });
  }

  const totalPagesRounded =
    totalLines === 0 ? 0 : Math.max(1, Math.round(totalLines / SCRIPT_LINES_PER_PAGE));

  return { byBeatId, totalLines, totalPagesRounded };
}

/** First script line index for each scene in reader order (1-based). */
export function computeSceneLineStarts(flatNodes: FlatScriptNode[]): Map<string, number> {
  const map = new Map<string, number>();
  let line = 1;
  for (const node of flatNodes) {
    if (node.kind !== "scene") continue;
    map.set(node.scene.id, line);
    line += node.scene.lines.length;
  }
  return map;
}

export function sceneStartPage(scene: ScriptScene, lineStarts: Map<string, number>): number {
  const start = lineStarts.get(scene.id) ?? 1;
  return lineNumberToPage(start);
}

/** 1-based script line where each beat’s first scene begins (reader order). */
export function computeBeatStartLineMap(flatNodes: FlatScriptNode[]): Map<string, number> {
  const map = new Map<string, number>();
  let currentBeatId: string | null = null;
  let line = 1;
  for (const node of flatNodes) {
    if (node.kind === "beat") {
      currentBeatId = node.beat.id;
      continue;
    }
    if (node.kind === "scene") {
      if (currentBeatId && !map.has(currentBeatId)) map.set(currentBeatId, line);
      line += node.scene.lines.length;
    }
  }
  return map;
}
