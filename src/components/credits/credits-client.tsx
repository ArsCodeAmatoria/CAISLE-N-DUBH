"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";
import {
  CREDITS_AUDIO_SRC,
  CREDITS_FLAG_ALT,
  CREDITS_FLAG_SRC,
  CREDITS_SONG_TITLE_EN,
  CREDITS_SONG_TITLE_GA,
  getCreditChunks,
  type CreditChunk,
} from "@/lib/credits-data";
import { IRISH_TRICOLOUR } from "@/lib/irish-tricolour";

/** Irish tricolour — only these hues + black/white for contrast on dark UI. */
const IE = {
  ...IRISH_TRICOLOUR,
  greenGlow: "rgba(22, 155, 98, 0.35)",
  orangeGlow: "rgba(255, 136, 62, 0.3)",
} as const;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function chunkPhaseOpacity(u: number) {
  if (u <= 0.1) return u / 0.1;
  if (u >= 0.9) return (1 - u) / 0.1;
  return 1;
}

function ChunkStage({
  chunk,
  phaseU,
}: {
  chunk: CreditChunk;
  phaseU: number;
}) {
  const o = chunkPhaseOpacity(phaseU);
  const scale = 0.97 + 0.03 * o;

  return (
    <div
      className="flex w-full max-w-lg flex-col items-center px-6 text-center transition-[filter] duration-150"
      style={{
        opacity: o,
        transform: `scale(${scale})`,
      }}
    >
      {chunk.kind === "title" ? (
        <>
          <p
            className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.42em]"
            style={{ color: `${IE.green}bb` }}
          >
            Scéal scáileán · Screen story
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.75rem,6vw,3.25rem)] font-medium tracking-[0.2em] text-white">
            CAISLEÁN DUBH
          </h1>
          <div
            className="mx-auto mt-8 h-0.5 w-28 max-w-[70%] rounded-full"
            style={{
              background: `linear-gradient(90deg, ${IE.green}, ${IE.white} 50%, ${IE.orange})`,
            }}
          />
          <p className="mt-6 text-[13px] tracking-wide text-white/60">
            Screenplay by Leigh Akin
          </p>
        </>
      ) : (
        <>
          {chunk.kicker && (
            <p
              className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.32em]"
              style={{ color: `${IE.orange}cc` }}
            >
              {chunk.kicker}
            </p>
          )}
          {chunk.heading && (
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-[0.12em] text-white md:text-3xl">
              {chunk.heading}
            </h2>
          )}
          <ul className="mt-10 w-full max-w-md space-y-6">
            {chunk.lines.map((line, i) => (
              <li key={`${chunk.id}-line-${i}`}>
                <p className="font-[family-name:var(--font-display)] text-lg tracking-[0.08em] text-white md:text-xl">
                  {line.primary}
                </p>
                {line.secondary && (
                  <p className="mt-1.5 text-[13px] leading-snug text-white/55">
                    {line.secondary}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function CreditsClient() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const chunks = React.useMemo(() => getCreditChunks(), []);
  const n = chunks.length;

  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduceMotion(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  const onTimeUpdate = React.useCallback(() => {
    const a = audioRef.current;
    if (!a?.duration) return;
    setProgress(Math.min(1, a.currentTime / a.duration));
  }, []);

  const onLoadedMeta = React.useCallback(() => {
    const a = audioRef.current;
    if (a?.duration) setDuration(a.duration);
  }, []);

  const onEnded = React.useCallback(() => {
    setPlaying(false);
    setEnded(true);
    setProgress(1);
  }, []);

  const togglePlay = React.useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    setEnded(false);
    try {
      await a.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [playing]);

  const restart = React.useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    setProgress(0);
    setEnded(false);
    try {
      await a.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  const chunkIndex = React.useMemo(() => {
    if (n === 0) return 0;
    if (progress >= 1) return n - 1;
    return Math.min(n - 1, Math.max(0, Math.floor(progress * n)));
  }, [n, progress]);

  const phaseU = React.useMemo(() => {
    if (n <= 1) return 1;
    const raw = progress * n;
    return Math.min(1, Math.max(0, raw - chunkIndex));
  }, [n, progress, chunkIndex]);

  const current = chunks[chunkIndex];
  const elapsedDisplay = progress * duration;

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-black text-white">
      <audio
        ref={audioRef}
        src={CREDITS_AUDIO_SRC}
        preload="auto"
        onLoadedMetadata={onLoadedMeta}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Ambient: Irish green and orange only (very low-opacity wash on black). */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 75% 60% at 30% 35%, ${IE.green}18, transparent 55%), radial-gradient(ellipse 60% 50% at 75% 70%, ${IE.orange}12, transparent 50%), #000000`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.78)_100%)]"
        aria-hidden
      />

      <div
        className="relative z-[1] min-h-0 flex-1 overflow-hidden"
        role="region"
        aria-label="End credits"
      >
        {reduceMotion ? (
          <div className="h-full overflow-y-auto px-6 pb-44 pt-14">
            <div className="mx-auto flex max-w-lg flex-col gap-16">
              {chunks.map((c) => (
                <div
                  key={c.id}
                  className="grid min-h-[min(80dvh,36rem)] place-items-center py-8"
                >
                  <ChunkStage chunk={c} phaseU={1} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          current && (
            <div
              key={current.id}
              className="grid h-full min-h-0 w-full place-items-center overflow-y-auto overflow-x-hidden px-6 py-6"
            >
              <ChunkStage chunk={current} phaseU={phaseU} />
            </div>
          )
        )}
      </div>

      <div className="relative z-[2] mx-3 mb-3 mt-auto rounded-2xl border border-white/15 bg-black/70 p-4 shadow-[0_-12px_48px_rgba(0,0,0,0.55)] backdrop-blur-md md:mx-6 md:p-5">
        <div
          className="absolute inset-x-10 top-0 h-px rounded-full opacity-90"
          style={{
            background: `linear-gradient(90deg, transparent, ${IE.green}99, ${IE.white}, ${IE.orange}99, transparent)`,
          }}
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-white/25 shadow-md ring-2 ring-black/40">
              <Image
                src={CREDITS_FLAG_SRC}
                alt={CREDITS_FLAG_ALT}
                width={48}
                height={48}
                className="size-12 object-cover"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-[family-name:var(--font-display)] text-[15px] tracking-wide text-white">
                {CREDITS_SONG_TITLE_GA}
              </p>
              <p className="truncate text-[12px] text-white/55">
                {CREDITS_SONG_TITLE_EN} · Song written by Leigh Akin
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 md:max-w-md md:flex-1">
            <div
              className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/12 ring-1 ring-white/15"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress * 100}%`,
                  background: `linear-gradient(90deg, ${IE.green}, ${IE.white} 55%, ${IE.orange})`,
                  boxShadow: `0 0 14px ${IE.greenGlow}`,
                }}
              />
            </div>
            {!reduceMotion && n > 0 && (
              <div className="flex justify-between gap-px px-0.5" aria-hidden>
                {chunks.map((_, i) => {
                  const active = i === chunkIndex;
                  return (
                    <span
                      key={`seg-${i}`}
                      className="mt-1.5 h-1 flex-1 rounded-full first:rounded-l-full last:rounded-r-full"
                      style={{
                        opacity: active ? 1 : 0.35,
                        backgroundColor: active ? IE.green : "rgba(255,255,255,0.14)",
                        boxShadow: active ? `0 0 10px ${IE.greenGlow}` : undefined,
                      }}
                    />
                  );
                })}
              </div>
            )}
            <div className="flex items-center justify-between font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-white/50">
              <span>{formatTime(elapsedDisplay)}</span>
              <span className="text-white/45">
                Card {Math.min(n, chunkIndex + 1)} / {n || 1}
              </span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 md:justify-end">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="size-11 rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:bg-white/10 hover:text-white"
              onClick={restart}
              aria-label="Restart from beginning"
            >
              <RotateCcw className="size-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              className="size-14 rounded-full border-2 text-white shadow-lg hover:opacity-95"
              style={{
                backgroundColor: IE.green,
                borderColor: `${IE.orange}aa`,
                boxShadow: `0 8px 28px ${IE.greenGlow}`,
              }}
              onClick={togglePlay}
              aria-label={playing ? "Pause" : ended ? "Play again" : "Play credits"}
            >
              {playing ? (
                <Pause className="size-6" fill="currentColor" />
              ) : (
                <Play className="size-6 pl-0.5" fill="currentColor" />
              )}
            </Button>
          </div>
        </div>

        {reduceMotion && (
          <p className="mt-3 text-center text-[11px] text-white/50">
            Reduced motion: all credit cards are listed; use play for the song.
          </p>
        )}
      </div>
    </div>
  );
}
