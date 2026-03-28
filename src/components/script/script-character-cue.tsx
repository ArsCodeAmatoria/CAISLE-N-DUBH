"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { CharacterDetail } from "@/lib/types/site";
import { CharacterPortraitMedia } from "@/components/characters/character-portrait-media";
import { CharacterBibleIcon } from "@/lib/character-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HOVER_LEAVE_MS = 160;
/** Match `w-80` (320px) for placement math */
const CARD_W = 320;

function placeNearAnchor(
  anchor: DOMRect,
): { top: number; left: number } {
  const margin = 10;
  let left = anchor.left;
  if (left + CARD_W > window.innerWidth - margin) {
    left = window.innerWidth - CARD_W - margin;
  }
  if (left < margin) left = margin;

  const estH = 400;
  let top = anchor.bottom + 6;
  if (top + estH > window.innerHeight - margin) {
    top = anchor.top - estH - 6;
  }
  if (top < margin) top = margin;
  return { top, left };
}

export function ScriptCharacterCue({
  cueText,
  character,
  instanceKey,
}: {
  cueText: string;
  character: CharacterDetail | null;
  /** Stable unique key for aria / portal node (e.g. scene id + line index). */
  instanceKey: string;
}) {
  const wrapRef = React.useRef<HTMLSpanElement>(null);
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });
  const closeT = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearClose = React.useCallback(() => {
    if (closeT.current) {
      clearTimeout(closeT.current);
      closeT.current = null;
    }
  }, []);

  const updatePos = React.useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    setPos(placeNearAnchor(el.getBoundingClientRect()));
  }, []);

  const show = React.useCallback(() => {
    clearClose();
    updatePos();
    setOpen(true);
  }, [clearClose, updatePos]);

  const scheduleHide = React.useCallback(() => {
    clearClose();
    closeT.current = setTimeout(() => setOpen(false), HOVER_LEAVE_MS);
  }, [clearClose]);

  React.useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => updatePos();
    const root = document.querySelector("[data-script-scroll-root]");
    root?.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root?.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, updatePos]);

  if (!character) {
    return <>{cueText}</>;
  }

  const tooltipId = `script-char-hover-${instanceKey.replace(/[^a-zA-Z0-9_-]/g, "_")}`;

  const card =
    open && typeof document !== "undefined"
      ? createPortal(
          <Card
            id={tooltipId}
            role="tooltip"
            size="sm"
            className={cn(
              "fixed z-[500] w-80 max-w-[min(20rem,calc(100vw-1.25rem))] gap-0 border border-border/90 py-0 shadow-xl outline-none",
              "bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/90",
            )}
            style={{ top: pos.top, left: pos.left }}
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
          >
            <div className="relative aspect-[5/3] w-full bg-muted">
              <CharacterPortraitMedia
                character={character}
                sizes="320px"
                className={cn(
                  "object-cover",
                  character.id === "aoife" || character.id === "aoife-double"
                    ? "object-[center_48%]"
                    : "object-[center_18%]",
                )}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80"
                aria-hidden
              />
            </div>
            <CardHeader className="gap-1.5 border-b border-border/60 px-4 pb-3 pt-3">
              <CardDescription className="font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                {character.role}
              </CardDescription>
              <CardTitle className="flex items-start gap-2 font-[family-name:var(--font-display)] text-[15px] font-medium leading-snug tracking-[0.05em]">
                <CharacterBibleIcon
                  slug={character.slug}
                  className="mt-0.5 size-4 shrink-0 text-[color:var(--script-character-accent)]"
                />
                <span className="min-w-0 text-balance">{character.name}</span>
              </CardTitle>
              <CardDescription className="text-[11px] leading-snug text-muted-foreground">
                {character.bibleTagline}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-3 pt-0">
              <p className="line-clamp-4 text-[11px] leading-relaxed text-foreground/80">{character.toneDescriptor}</p>
            </CardContent>
            <CardFooter className="border-t border-border/60 bg-muted/40 px-4 py-3">
              <Link
                href={`/characters/${character.slug}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full justify-center text-[10px] uppercase tracking-[0.14em] no-underline",
                )}
                onClick={() => setOpen(false)}
              >
                Character bible
              </Link>
            </CardFooter>
          </Card>,
          document.body,
        )
      : null;

  return (
    <>
      <span
        ref={wrapRef}
        className="cursor-help border-b border-dotted border-[color-mix(in_srgb,var(--script-character-accent)_45%,transparent)]"
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
        onFocus={show}
        onBlur={scheduleHide}
        tabIndex={0}
        aria-describedby={open ? tooltipId : undefined}
      >
        {cueText}
      </span>
      {card}
    </>
  );
}
