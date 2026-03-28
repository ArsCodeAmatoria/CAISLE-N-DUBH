"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { flatScriptNodes } from "@/lib/script/flat-script-nodes";
import {
  SCRIPT_LINES_PER_PAGE,
  computeBeatPageStats,
  computeBeatStartLineMap,
  lineNumberToPage,
  type BeatPageStats,
} from "@/lib/script/script-pagination";
import type { ScriptScrollState } from "@/components/script/script-scroll-context";
import type {
  BeatDef,
  SceneStoryWeight,
  ScriptLine,
  ScriptScene,
  StructuralMarker,
} from "@/lib/types/site";
import { cn } from "@/lib/utils";
import { Link2, ListTree, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IRISH_TRICOLOUR } from "@/lib/irish-tricolour";
const actMap = new Map(siteData.acts.map((a) => [a.id, a]));

const writerName = siteData.about.writtenBy.replace(/^Written by\s+/i, "").trim();
const scriptHeroWriterCredit = `Scríbhinn ag ${writerName} · Screenplay by ${writerName}`;

/** Tricolour + glow — matches credits hero treatment */
const IE = {
  ...IRISH_TRICOLOUR,
  greenGlow: "rgba(22, 155, 98, 0.35)",
} as const;

export const flatNodes = flatScriptNodes;

const beatsByIdForPagination = new Map(siteData.beats.map((b) => [b.id, b]));
const beatPaginationPack = computeBeatPageStats(flatScriptNodes, beatsByIdForPagination);
const beatStartLineById = computeBeatStartLineMap(flatScriptNodes);

const initialMeta: ScriptScrollState = {
  pageApprox: 1,
  beatLabel: null,
  actLabel: "Act I",
  sceneSlug: null,
  activeAnchor: null,
  sceneWeight: null,
  beatPageActual: null,
  beatPageTarget: null,
  beatPageDelta: null,
  totalScriptPages: Math.max(1, beatPaginationPack.totalPagesRounded),
};

function formatBeatDelta(delta: number): string {
  if (delta === 0) return "±0";
  return delta > 0 ? `+${delta}` : `−${Math.abs(delta)}`;
}

const sceneWeightLabel: Record<SceneStoryWeight, string> = {
  greater: "Greater on the board",
  lesser: "Lesser on the board",
};

const sceneWeightHint: Record<SceneStoryWeight, string> = {
  greater:
    "Save the Cat: spine turn, setpiece, or beat obligation — the scene must land for the story to read.",
  lesser:
    "Save the Cat: connective tissue, B-story, or texture — supports the beat without carrying the whole turn alone.",
};

function MarkerBlock({ marker }: { marker: StructuralMarker }) {
  const isMid = marker.kind === "midpoint";
  return (
    <section
      id={marker.anchor}
      data-script-section
      data-nav-kind="marker"
      className={cn(
        "scroll-mt-28 border-y border-border py-10",
        isMid && "border-white/20 bg-white/[0.03]",
      )}
    >
      <div className="mx-auto max-w-2xl px-6">
        <p
          className={cn(
            "font-[family-name:var(--font-display)] text-2xl font-medium tracking-[0.14em]",
            isMid && "text-foreground",
          )}
        >
          {marker.title}
        </p>
        {marker.pageLabel && (
          <p className="mt-2 font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground">
            {marker.pageLabel}
          </p>
        )}
        {marker.body && (
          <p className="mt-4 text-[13px] leading-relaxed text-foreground/85">{marker.body}</p>
        )}
      </div>
    </section>
  );
}

function BeatBlock({
  beat,
  stats,
}: {
  beat: BeatDef;
  stats: BeatPageStats | undefined;
}) {
  const startPage = lineNumberToPage(beatStartLineById.get(beat.id) ?? 1);
  return (
    <section
      id={beat.anchor}
      data-script-section
      data-nav-kind="beat"
      data-beat-label={beat.saveTheCat}
      data-page={String(startPage)}
      data-beat-id={beat.id}
      data-beat-page-actual={stats !== undefined ? String(stats.pagesRounded) : ""}
      data-beat-page-target={String(beat.targetPages)}
      data-beat-page-delta={stats !== undefined ? String(stats.delta) : ""}
      className="scroll-mt-28 border-t border-border pt-12"
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/70 pb-3">
          <div className="min-w-0 flex-1">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[0.12em] text-foreground">
              {beat.saveTheCat}
            </h2>
            {stats !== undefined && (
              <p
                className="mt-2 font-[family-name:var(--font-geist-mono)] text-[10px] leading-relaxed text-muted-foreground"
                title={`${SCRIPT_LINES_PER_PAGE} script lines ≈ one industry page; beat actual is rounded from line count.`}
              >
                <span className="text-foreground/85">{stats.pagesRounded} p</span> actual ·{" "}
                <span className="text-foreground/85">{stats.targetPages} p</span> target ·{" "}
                <span
                  className={cn(
                    stats.delta === 0
                      ? "text-muted-foreground"
                      : stats.delta > 0
                        ? "text-amber-700 dark:text-amber-500/90"
                        : "text-sky-700 dark:text-sky-400/90",
                  )}
                >
                  {formatBeatDelta(stats.delta)}
                </span>
              </p>
            )}
          </div>
          <CopyAnchor id={beat.anchor} />
        </div>
      </div>
    </section>
  );
}

function AccomplishmentBlock({
  note,
}: {
  note: { anchor: string; range: string; note: string };
}) {
  return (
    <section
      id={note.anchor}
      data-script-section
      data-nav-kind="accomplishment"
      className="scroll-mt-28 py-6"
    >
      <div className="mx-auto max-w-2xl px-6">
        <aside className="border border-border/90 bg-secondary/25 px-4 py-3">
          <p className="font-[family-name:var(--font-geist-mono)] text-[11px] text-muted-foreground">
            {note.range}
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-foreground/90">{note.note}</p>
        </aside>
      </div>
    </section>
  );
}

type ScriptLineVariant =
  | "scene-heading"
  | "action"
  | "character"
  | "dialogue"
  | "parenthetical"
  | "transition";

function resolveScriptLineVariant(ln: ScriptLine): ScriptLineVariant {
  if (ln.kind === "transition") return "transition";
  if (ln.kind === "character") return "character";
  if (ln.kind === "dialogue") return "dialogue";
  if (ln.kind === "parenthetical") return "parenthetical";
  const t = ln.text.trim();
  if (/^(INT\.|EXT\.|INT\/?\s*\/\s*EXT\.|I\/E\.|EST\.)/i.test(t)) {
    return "scene-heading";
  }
  if (/^CUT TO:?$/i.test(t)) return "transition";
  return "action";
}

const SCRIPT_LEGEND: { variant: ScriptLineVariant; label: string }[] = [
  { variant: "scene-heading", label: "Slugline" },
  { variant: "action", label: "Action" },
  { variant: "character", label: "Name" },
  { variant: "dialogue", label: "Speech" },
  { variant: "parenthetical", label: "Wrylie" },
  { variant: "transition", label: "Transition" },
];

function ScriptLegendChip({ variant }: { variant: ScriptLineVariant }) {
  const bar = {
    "scene-heading": "bg-[var(--script-scene-accent)]",
    action: "bg-[var(--script-action-rule)]",
    character: "bg-[var(--script-character-accent)]",
    dialogue: "bg-[var(--script-dialogue-rule)]",
    parenthetical: "bg-[var(--script-parenthetical)]",
    transition: "bg-[var(--script-transition)]",
  }[variant];
  const label = SCRIPT_LEGEND.find((x) => x.variant === variant)?.label ?? variant;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-border/60 bg-secondary/20 px-2 py-0.5">
      <span className={cn("size-1.5 shrink-0 rounded-[1px]", bar)} aria-hidden />
      <span className="font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </span>
  );
}

function scriptLinePresentation(v: ScriptLineVariant): { wrap: string; text: string } {
  switch (v) {
    case "scene-heading":
      return {
        wrap: "border-l-2 border-[var(--script-scene-accent)] bg-[color-mix(in_srgb,var(--script-scene-accent)_10%,transparent)] pl-3",
        text: "font-[family-name:var(--font-geist-mono)] text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-[var(--script-scene-accent)]",
      };
    case "action":
      return {
        wrap: "border-l border-[var(--script-action-rule)] py-0.5 pl-3",
        text: "text-[13px] leading-relaxed text-foreground/88",
      };
    case "character":
      return {
        wrap: "border-l-2 border-[var(--script-character-accent)] bg-[color-mix(in_srgb,var(--script-character-accent)_12%,transparent)] pl-3 py-2",
        text: "font-[family-name:var(--font-geist-mono)] text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--script-character-accent)]",
      };
    case "dialogue":
      return {
        wrap: "border-l-2 border-[var(--script-dialogue-rule)] pl-4",
        text: "max-w-[34rem] text-[14px] leading-[1.72] text-[color:var(--script-dialogue-accent)]",
      };
    case "parenthetical":
      return {
        wrap: "border-l border-[var(--script-parenthetical)] pl-5",
        text: "text-[12px] italic leading-relaxed text-[color:var(--script-parenthetical)]",
      };
    case "transition":
      return {
        wrap: "border-l-2 border-[var(--script-transition)] bg-[color-mix(in_srgb,var(--script-transition)_14%,transparent)] pl-3 pt-5",
        text: "text-right font-[family-name:var(--font-geist-mono)] text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--script-transition)]",
      };
  }
}

function SceneBlock({
  scene,
  lineStart,
  structureOnly,
  beatLabel,
  beatStats,
}: {
  scene: ScriptScene;
  lineStart: number;
  structureOnly: boolean;
  beatLabel: string | null;
  beatStats: BeatPageStats | undefined;
}) {
  const act = actMap.get(scene.actId);
  const pageStart = lineNumberToPage(lineStart);
  const beatTarget =
    beatStats?.targetPages ?? beatsByIdForPagination.get(scene.beatId)?.targetPages ?? 0;
  let lineNum = lineStart;
  return (
    <section
      id={scene.anchor}
      data-script-section
      data-nav-kind="scene"
      data-page={String(pageStart)}
      data-act={act?.shortLabel ?? ""}
      data-beat-label={beatLabel ?? ""}
      data-beat-id={scene.beatId}
      data-beat-page-actual={beatStats !== undefined ? String(beatStats.pagesRounded) : ""}
      data-beat-page-target={String(beatTarget)}
      data-beat-page-delta={beatStats !== undefined ? String(beatStats.delta) : ""}
      data-scene-slug={scene.slug}
      data-scene-weight={scene.sceneWeight}
      className="scroll-mt-28 pb-16 pt-8"
    >
      <div className="mx-auto max-w-2xl px-6">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border/60 pb-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p
                className="font-[family-name:var(--font-geist-mono)] text-[10px] text-muted-foreground"
                title={`Line ${lineStart} → page by ${SCRIPT_LINES_PER_PAGE} lines/page. Draft “p.” in notes may differ.`}
              >
                Scene · p. {pageStart}
                {act ? ` · ${act.shortLabel}` : ""}
              </p>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center rounded-sm border px-1.5 py-0.5 font-[family-name:var(--font-geist-mono)] text-[9px] font-medium uppercase tracking-[0.14em]",
                  scene.sceneWeight === "greater"
                    ? "border-[color-mix(in_srgb,var(--script-scene-accent)_55%,transparent)] bg-[color-mix(in_srgb,var(--script-scene-accent)_12%,transparent)] text-[color:var(--script-scene-accent)]"
                    : "border-border/70 bg-secondary/40 text-muted-foreground",
                )}
                title={sceneWeightHint[scene.sceneWeight]}
              >
                {scene.sceneWeight === "greater" ? "Greater" : "Lesser"}
              </span>
            </div>
            <p className="mt-1 font-[family-name:var(--font-geist-mono)] text-[9px] tracking-wide text-muted-foreground/85">
              {sceneWeightLabel[scene.sceneWeight]}
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-geist-mono)] text-[12px] font-medium uppercase tracking-[0.08em] text-foreground">
              {scene.heading}
            </h3>
          </div>
          <CopyAnchor id={scene.anchor} />
        </header>
        {scene.structNote && !structureOnly && (
          <p className="mb-5 border-l border-border pl-3 text-[11px] italic leading-relaxed text-muted-foreground">
            {scene.structNote}
          </p>
        )}
        {scene.themeNote && !structureOnly && (
          <p className="mb-4 border-l border-border pl-3 text-[11px] leading-relaxed text-muted-foreground/90">
            <span className="font-medium not-italic text-muted-foreground">
              Value shift.
            </span>{" "}
            {scene.themeNote}
          </p>
        )}
        {structureOnly ? (
          <p className="text-[12px] text-muted-foreground">
            {scene.lines.length} lines (~{Math.max(0.1, scene.lines.length / SCRIPT_LINES_PER_PAGE).toFixed(1)} p) ·{" "}
            {scene.characterIds.length} presences ·{" "}
            <span className="text-foreground/80">
              {scene.sceneWeight === "greater" ? "Greater" : "Lesser"} on the board
            </span>
          </p>
        ) : (
          <div className="font-[family-name:var(--font-serif-body)]">
            {scene.lines.map((ln, i) => {
              const n = lineNum++;
              const variant = resolveScriptLineVariant(ln);
              const { wrap, text } = scriptLinePresentation(variant);
              const prevVariant =
                i > 0 ? resolveScriptLineVariant(scene.lines[i - 1]!) : null;
              const sectionBreakBefore =
                i > 0 &&
                (variant === "character" ||
                  variant === "transition" ||
                  variant === "scene-heading" ||
                  (variant === "action" &&
                    prevVariant === "dialogue"));
              const numPad =
                variant === "character"
                  ? "pt-2.5"
                  : variant === "dialogue"
                    ? "pt-1.5"
                    : variant === "parenthetical"
                      ? "pt-1"
                      : variant === "transition"
                        ? "pt-5"
                        : variant === "scene-heading"
                          ? "pt-2"
                          : "pt-1";
              return (
                <div
                  key={i}
                  className={cn(
                    "grid grid-cols-[2rem_1fr] items-start gap-x-2 sm:grid-cols-[2.5rem_1fr]",
                    sectionBreakBefore && "mt-4 sm:mt-5",
                  )}
                >
                  <span
                    className={cn(
                      "select-none text-right font-[family-name:var(--font-geist-mono)] text-[10px] text-muted-foreground/65",
                      numPad,
                    )}
                  >
                    {n}
                  </span>
                  <div
                    className={cn("min-w-0 rounded-r-sm", wrap)}
                    data-script-variant={variant}
                  >
                    <p className={cn(text)}>{ln.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function CopyAnchor({ id }: { id: string }) {
  const [done, setDone] = React.useState(false);
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-7 gap-1 px-2 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
      onClick={() => {
        const url = `${window.location.origin}/script#${id}`;
        void navigator.clipboard.writeText(url);
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
      }}
    >
      <Link2 className="size-3" />
      {done ? "Copied" : "Anchor"}
    </Button>
  );
}

function StickyMetaBar({ meta }: { meta: ScriptScrollState }) {
  return (
    <div className="sticky top-0 z-20 border-b border-border/80 bg-background/90 py-3 backdrop-blur-md transition-[background] duration-300">
      <div className="mx-auto flex max-w-2xl flex-wrap items-center gap-x-4 gap-y-1 px-6 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span
          className="text-foreground/90"
          title={`${SCRIPT_LINES_PER_PAGE} lines per page · draft notes may use different “p.”`}
        >
          p. {meta.pageApprox}
          <span className="text-muted-foreground/90"> / {meta.totalScriptPages}</span>
        </span>
        {meta.beatPageDelta !== null && (
          <>
            <span aria-hidden className="text-border">
              |
            </span>
            <span
              className={cn(
                "normal-case tracking-normal",
                meta.beatPageDelta === 0
                  ? "text-[11px] text-muted-foreground"
                  : meta.beatPageDelta > 0
                    ? "text-[11px] text-amber-700 dark:text-amber-500/90"
                    : "text-[11px] text-sky-700 dark:text-sky-400/90",
              )}
              title="Beat actual pages vs target (this section). + over weight, − under."
            >
              Beat {formatBeatDelta(meta.beatPageDelta)}
              {meta.beatPageActual !== null && meta.beatPageTarget !== null && (
                <span className="text-muted-foreground">
                  {" "}
                  ({meta.beatPageActual}/{meta.beatPageTarget} p)
                </span>
              )}
            </span>
          </>
        )}
        {meta.actLabel && (
          <>
            <span aria-hidden className="text-border">
              |
            </span>
            <span>{meta.actLabel}</span>
          </>
        )}
        {meta.beatLabel && (
          <>
            <span aria-hidden className="text-border">
              |
            </span>
            <span className="max-w-[14rem] truncate normal-case tracking-normal text-[11px] text-foreground/85">
              {meta.beatLabel}
            </span>
          </>
        )}
        {meta.sceneWeight && (
          <>
            <span aria-hidden className="text-border">
              |
            </span>
            <span
              className={cn(
                "normal-case tracking-normal",
                meta.sceneWeight === "greater"
                  ? "text-[11px] text-[color:var(--script-scene-accent)]"
                  : "text-[11px] text-muted-foreground",
              )}
            >
              {meta.sceneWeight === "greater" ? "Greater scene" : "Lesser scene"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

interface ScriptReaderProps {
  onMeta: (m: ScriptScrollState) => void;
}

export function ScriptReader({ onMeta }: ScriptReaderProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const metaRef = React.useRef<ScriptScrollState>(initialMeta);
  const [meta, setMeta] = React.useState<ScriptScrollState>(initialMeta);
  const [structureOnly, setStructureOnly] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const updateMetaFromEl = React.useCallback(
    (el: Element) => {
      const prev = metaRef.current;
      const kind = el.getAttribute("data-nav-kind");
      const pageAttr = el.getAttribute("data-page");
      const actAttr = el.getAttribute("data-act");
      const beatAttr = el.getAttribute("data-beat-label");
      const sceneSlug = el.getAttribute("data-scene-slug");
      const anchor = el.id || null;

      let pageApprox = prev.pageApprox;
      if (pageAttr) {
        const n = parseInt(pageAttr, 10);
        if (Number.isFinite(n)) pageApprox = n;
      } else if (kind === "marker") {
        const body = (el as HTMLElement).innerText;
        const p = body.match(/p\.\s*[~]?(\d+)/i);
        if (p) {
          const n = parseInt(p[1], 10);
          if (Number.isFinite(n)) pageApprox = n;
        }
      }

      let beatPageActual = prev.beatPageActual;
      let beatPageTarget = prev.beatPageTarget;
      let beatPageDelta = prev.beatPageDelta;
      if (kind === "scene" || kind === "beat") {
        const a = el.getAttribute("data-beat-page-actual");
        const t = el.getAttribute("data-beat-page-target");
        const d = el.getAttribute("data-beat-page-delta");
        if (a !== null && a !== "") {
          const n = parseInt(a, 10);
          beatPageActual = Number.isFinite(n) ? n : null;
        } else beatPageActual = null;
        if (t !== null && t !== "") {
          const n = parseInt(t, 10);
          beatPageTarget = Number.isFinite(n) ? n : null;
        } else beatPageTarget = null;
        if (d !== null && d !== "") {
          const n = parseInt(d, 10);
          beatPageDelta = Number.isFinite(n) ? n : null;
        } else beatPageDelta = null;
      }

      let actLabel = actAttr || prev.actLabel;
      let beatLabel = beatAttr || prev.beatLabel;
      if (kind === "beat") {
        beatLabel = el.getAttribute("data-beat-label");
      }
      if (kind === "marker") {
        const title = el.querySelector("p")?.textContent?.trim() ?? "";
        if (title.startsWith("ACT")) {
          actLabel = title
            .replace(/^ACT\s+/i, "Act ")
            .replace(/\s+—\s+.*$/, "")
            .trim();
        } else if (title === "MIDPOINT") {
          actLabel = "Midpoint";
        }
      }

      if (kind === "accomplishment" || kind === "marker") {
        if (!beatAttr) beatLabel = prev.beatLabel;
        if (!actAttr && kind === "accomplishment") actLabel = prev.actLabel;
      }

      let sceneWeight: SceneStoryWeight | null = null;
      if (kind === "scene") {
        const w = el.getAttribute("data-scene-weight");
        if (w === "greater" || w === "lesser") sceneWeight = w;
      }

      const merged: ScriptScrollState = {
        pageApprox,
        beatLabel,
        actLabel,
        sceneSlug: kind === "scene" ? sceneSlug : null,
        activeAnchor: anchor,
        sceneWeight,
        beatPageActual,
        beatPageTarget,
        beatPageDelta,
        totalScriptPages: beatPaginationPack.totalPagesRounded,
      };

      metaRef.current = merged;
      setMeta(merged);
      onMeta(merged);
    },
    [onMeta],
  );

  React.useEffect(() => {
    metaRef.current = initialMeta;
    setMeta(initialMeta);
    onMeta(initialMeta);
  }, [onMeta]);

  React.useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const sections = () => [...root.querySelectorAll("[data-script-section]")];

    const pickActive = () => {
      const scrollTop = root.scrollTop;
      const line = scrollTop + root.clientHeight * 0.22;
      let best: Element | null = null;
      for (const el of sections()) {
        const top =
          el.getBoundingClientRect().top -
          root.getBoundingClientRect().top +
          root.scrollTop;
        if (top <= line + 2) best = el;
      }
      if (!best && sections().length) best = sections()[0];
      if (best) updateMetaFromEl(best);
    };

    const onScroll = () => {
      const p = root.scrollTop / Math.max(1, root.scrollHeight - root.clientHeight);
      setProgress(Math.min(1, Math.max(0, p)));
      pickActive();
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(root);
    onScroll();

    return () => {
      root.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [structureOnly, updateMetaFromEl]);

  React.useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const elements = flatNodes.reduce<{
    list: React.ReactNode[];
    runningLine: number;
    lastBeatLabel: string | null;
  }>(
    (acc, node, idx) => {
      if (node.kind === "beat") {
        return {
          list: [
            ...acc.list,
            <BeatBlock
              key={`b-${node.beat.id}-${idx}`}
              beat={node.beat}
              stats={beatPaginationPack.byBeatId.get(node.beat.id)}
            />,
          ],
          runningLine: acc.runningLine,
          lastBeatLabel: node.beat.saveTheCat,
        };
      }
      if (node.kind === "marker") {
        return {
          ...acc,
          list: [...acc.list, <MarkerBlock key={`m-${node.marker.id}-${idx}`} marker={node.marker} />],
        };
      }
      if (node.kind === "accomplishment") {
        return {
          ...acc,
          list: [
            ...acc.list,
            <AccomplishmentBlock key={`n-${node.note.id}-${idx}`} note={node.note} />,
          ],
        };
      }
      const start = acc.runningLine;
      return {
        list: [
          ...acc.list,
          <SceneBlock
            key={`s-${node.scene.id}-${idx}`}
            scene={node.scene}
            lineStart={start}
            structureOnly={structureOnly}
            beatLabel={acc.lastBeatLabel}
            beatStats={beatPaginationPack.byBeatId.get(node.scene.beatId)}
          />,
        ],
        runningLine: acc.runningLine + node.scene.lines.length,
        lastBeatLabel: acc.lastBeatLabel,
      };
    },
    { list: [], runningLine: 1, lastBeatLabel: null },
  ).list;

  return (
    <div
      ref={scrollRef}
      data-script-scroll-root
      className="min-h-0 flex-1 overflow-y-auto scroll-smooth outline-none focus-visible:ring-1 focus-visible:ring-ring"
      tabIndex={0}
    >
      <div className="pointer-events-none sticky top-0 z-30 h-0 w-full" aria-hidden>
        <div className="h-px w-full bg-border/50">
          <div
            className="h-px bg-foreground/25 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
      <StickyMetaBar meta={meta} />
      <div className="sticky top-[2.75rem] z-10 flex flex-wrap items-center justify-end gap-2 border-b border-border/40 bg-background/80 px-6 py-2 backdrop-blur-sm">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 border-border/80 text-[10px] uppercase tracking-wider"
          onClick={() => setStructureOnly((v) => !v)}
        >
          {structureOnly ? (
            <>
              <ScrollText className="mr-1.5 size-3.5" />
              Full script
            </>
          ) : (
            <>
              <ListTree className="mr-1.5 size-3.5" />
              Structure view
            </>
          )}
        </Button>
      </div>
      <article className="pb-32 pt-4">
        <header className="mx-auto max-w-2xl px-6 pb-16 pt-6">
          <div className="relative overflow-hidden text-white" style={{ background: "#000000" }}>
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background: `radial-gradient(ellipse 75% 60% at 30% 35%, ${IE.green}18, transparent 55%), radial-gradient(ellipse 60% 50% at 75% 70%, ${IE.orange}12, transparent 50%), #000000`,
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.72)_100%)]"
              aria-hidden
            />
            <div
              className="absolute inset-x-8 top-0 z-[1] h-px rounded-full opacity-90 sm:inset-x-12"
              style={{
                background: `linear-gradient(90deg, transparent, ${IE.green}99, ${IE.white}, ${IE.orange}99, transparent)`,
              }}
              aria-hidden
            />
            <div className="relative z-[2] flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
              <p
                className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.42em]"
                style={{ color: `${IE.green}bb` }}
              >
                Scéal scáileán · Screen story
              </p>
              <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.75rem,6vw,3.25rem)] font-medium tracking-[0.2em] text-white">
                CAISLEÁN DUBH
              </h1>
              <p className="mt-4 font-[family-name:var(--font-display)] text-[15px] font-normal tracking-[0.14em] text-white/65 md:text-base">
                Caisleán Dubh · The Black Castle
              </p>
              <div
                className="mx-auto mt-8 h-0.5 w-28 max-w-[70%] rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${IE.green}, ${IE.white} 50%, ${IE.orange})`,
                  boxShadow: `0 0 20px ${IE.greenGlow}`,
                }}
              />
              <p className="mt-8 font-[family-name:var(--font-geist-mono)] text-[12px] tracking-wide text-white/50">
                {scriptHeroWriterCredit}
              </p>
            </div>
          </div>
          <div className="mt-8 border-l border-border/80 pl-4">
            <p className="max-w-xl text-[12px] leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground/90">How to read.</span> Sluglines
              inside scenes (
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-foreground/75">
                INT.
              </span>
              /
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-foreground/75">
                EXT.
              </span>
              ) match standard screenplay format; colors below follow element type.
            </p>
            <div
              className="mt-4 flex max-w-xl flex-wrap gap-2"
              aria-label="Script line type legend"
            >
              {SCRIPT_LEGEND.map((item) => (
                <ScriptLegendChip key={item.variant} variant={item.variant} />
              ))}
            </div>
          </div>
        </header>
        {elements}
      </article>
    </div>
  );
}
