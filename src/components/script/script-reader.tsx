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

function lineClass(kind: ScriptLine["kind"]) {
  switch (kind) {
    case "character":
      return "font-medium tracking-wide uppercase text-[13px] pt-4";
    case "dialogue":
      return "pl-[3.25rem] text-[13px] leading-relaxed max-w-[28rem]";
    case "parenthetical":
      return "pl-[3.75rem] text-[12px] italic text-muted-foreground";
    case "transition":
      return "font-medium uppercase text-right text-[12px] tracking-widest text-muted-foreground pt-6";
    default:
      return "text-[13px] leading-relaxed text-foreground/90 pt-2";
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
        {structureOnly ? (
          <p className="text-[12px] text-muted-foreground">
            {scene.lines.length} lines · {scene.characterIds.length} presences
          </p>
        ) : (
          <div className="space-y-0 font-[family-name:var(--font-serif-body)]">
            {scene.lines.map((ln, i) => {
              const n = lineNum++;
              return (
                <div
                  key={i}
                  className="grid grid-cols-[2rem_1fr] gap-x-2 gap-y-0 sm:grid-cols-[2.5rem_1fr]"
            >
                  <span className="select-none pt-2 text-right font-[family-name:var(--font-geist-mono)] text-[10px] text-muted-foreground/70">
                    {n}
                  </span>
                  <p className={lineClass(ln.kind)}>{ln.text}</p>
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
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Feature screenplay · reader
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[0.08em] text-foreground sm:text-5xl">
            CAISLEÁN DUBH
          </h1>
          <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
            Archival presentation with structural markers. Line numbers are continuous for
            navigation reference.
          </p>
        </header>
        {elements}
      </article>
    </div>
  );
}
