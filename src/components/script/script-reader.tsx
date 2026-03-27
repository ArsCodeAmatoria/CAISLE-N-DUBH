"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { flattenScriptFlow } from "@/lib/script/flatten";
import type { ScriptScrollState } from "@/components/script/script-scroll-context";
import type { BeatDef, ScriptLine, ScriptScene, StructuralMarker } from "@/lib/types/site";
import { cn } from "@/lib/utils";
import { Link2, ListTree, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";

const beatMap = new Map(siteData.beats.map((b) => [b.id, b]));
const markerMap = new Map(siteData.structuralMarkers.map((m) => [m.id, m]));
const noteMap = new Map(siteData.pageAccomplishments.map((n) => [n.id, n]));
const sceneMap = new Map(siteData.scenes.map((s) => [s.id, s]));
const actMap = new Map(siteData.acts.map((a) => [a.id, a]));

export const flatNodes = flattenScriptFlow(siteData.scriptFlow, {
  beats: beatMap,
  markers: markerMap,
  notes: noteMap,
  scenes: sceneMap,
});

const initialMeta: ScriptScrollState = {
  pageApprox: 1,
  beatLabel: null,
  actLabel: "Act I",
  sceneSlug: null,
  activeAnchor: null,
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

function BeatBlock({ beat }: { beat: BeatDef }) {
  return (
    <section
      id={beat.anchor}
      data-script-section
      data-nav-kind="beat"
      data-beat-label={beat.saveTheCat}
      className="scroll-mt-28 border-t border-border pt-12"
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/70 pb-3">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[0.12em] text-foreground">
            {beat.saveTheCat}
          </h2>
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
}: {
  scene: ScriptScene;
  lineStart: number;
  structureOnly: boolean;
  beatLabel: string | null;
}) {
  const act = actMap.get(scene.actId);
  let lineNum = lineStart;
  return (
    <section
      id={scene.anchor}
      data-script-section
      data-nav-kind="scene"
      data-page={String(scene.page)}
      data-act={act?.shortLabel ?? ""}
      data-beat-label={beatLabel ?? ""}
      data-scene-slug={scene.slug}
      className="scroll-mt-28 pb-16 pt-8"
    >
      <div className="mx-auto max-w-2xl px-6">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border/60 pb-4">
          <div>
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] text-muted-foreground">
              Scene · p. {scene.page}
              {act ? ` · ${act.shortLabel}` : ""}
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
            {scene.lines.length} lines · {scene.characterIds.length} presences
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
        <span className="text-foreground/90">p. ~{meta.pageApprox}</span>
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

      const merged: ScriptScrollState = {
        pageApprox,
        beatLabel,
        actLabel,
        sceneSlug: kind === "scene" ? sceneSlug : null,
        activeAnchor: anchor,
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

  let runningLine = 1;
  let lastBeatLabel: string | null = null;
  const elements = flatNodes.map((node, idx) => {
    if (node.kind === "beat") {
      lastBeatLabel = node.beat.saveTheCat;
      return <BeatBlock key={`b-${node.beat.id}-${idx}`} beat={node.beat} />;
    }
    if (node.kind === "marker") {
      return <MarkerBlock key={`m-${node.marker.id}-${idx}`} marker={node.marker} />;
    }
    if (node.kind === "accomplishment") {
      return (
        <AccomplishmentBlock key={`n-${node.note.id}-${idx}`} note={node.note} />
      );
    }
    const start = runningLine;
    runningLine += node.scene.lines.length;
    return (
      <SceneBlock
        key={`s-${node.scene.id}-${idx}`}
        scene={node.scene}
        lineStart={start}
        structureOnly={structureOnly}
        beatLabel={lastBeatLabel}
      />
    );
  });

  return (
    <div
      ref={scrollRef}
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
        <header className="mx-auto max-w-2xl px-6 pb-16 pt-8">
          <div>
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Feature screenplay · reader
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[0.08em] text-foreground sm:text-5xl">
              CAISLEÁN DUBH
            </h1>
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
              Archival presentation with structural markers. Line numbers are continuous for
              navigation reference. Sluglines inside scenes (
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-foreground/70">
                INT.
              </span>
              /
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-foreground/70">
                EXT.
              </span>
              ) are styled like sluglines; everything else follows the line-type color key below.
            </p>
            <div
              className="mt-4 flex max-w-xl flex-wrap gap-2"
              aria-label="Script line type legend"
            >
              {SCRIPT_LEGEND.map((item) => (
                <ScriptLegendChip key={item.variant} variant={item.variant} />
              ))}
            </div>
            <p className="mt-4 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.1em] text-foreground/80">
              {siteData.about.writtenBy}
            </p>
          </div>
        </header>
        {elements}
      </article>
    </div>
  );
}
