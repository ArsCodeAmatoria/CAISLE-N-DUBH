"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  BookOpen,
  Clapperboard,
  Disc3,
  FileText,
  Users,
  ChevronRight,
} from "lucide-react";
import { siteData } from "@/data/site";
import { scriptScenesOrdered } from "@/lib/script/flat-script-nodes";
import type { SceneStoryWeight } from "@/lib/types/site";
import { cn } from "@/lib/utils";
import { useScriptScrollOptional } from "@/components/script/script-scroll-context";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navPrimary = [
  { href: "/about", label: "About", icon: BookOpen },
  { href: "/script", label: "Script", icon: FileText },
  { href: "/characters", label: "Characters", icon: Users },
  { href: "/credits", label: "Credits", icon: Disc3 },
] as const;

function useHash() {
  const [hash, setHash] = React.useState("");
  React.useEffect(() => {
    const read = () => setHash(window.location.hash.slice(1));
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  return hash;
}

function NavLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const pathname = usePathname();
  const active =
    href === "/characters"
      ? pathname === "/characters" || pathname.startsWith("/characters/")
      : pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-sm border border-transparent px-2 py-1.5 text-[13px] tracking-wide transition-colors duration-200",
        active
          ? "border-border bg-secondary/80 text-foreground"
          : "text-muted-foreground hover:border-border hover:bg-secondary/40 hover:text-foreground",
      )}
    >
      <Icon className="size-3.5 shrink-0 opacity-70" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}

function AnchorLink({
  href,
  label,
  indent,
  sceneWeight,
}: {
  href: string;
  label: string;
  indent?: boolean;
  /** Save the Cat–style scene load; adjusts emphasis in scene TOC only. */
  sceneWeight?: SceneStoryWeight;
}) {
  const pathname = usePathname();
  const hash = useHash();
  const scroll = useScriptScrollOptional();
  const isScript = pathname === "/script";
  const id = href.split("#")[1] ?? "";
  const active =
    isScript &&
    (scroll?.activeAnchor === id || (!scroll?.activeAnchor && hash === id));
  return (
    <a
      href={href}
      title={
        sceneWeight
          ? `${label} · ${sceneWeight === "greater" ? "Greater" : "Lesser"} on the board (Save the Cat)`
          : undefined
      }
      className={cn(
        "block truncate rounded-sm px-2 py-1 text-[12px] transition-colors duration-200",
        indent && "pl-4",
        sceneWeight === "lesser" && "opacity-[0.88]",
        active
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
      )}
    >
      {sceneWeight === "greater" && (
        <span
          className="mr-1.5 font-[family-name:var(--font-geist-mono)] text-[9px] text-[color:var(--script-scene-accent)]"
          aria-hidden
        >
          ●
        </span>
      )}
      {sceneWeight === "lesser" && (
        <span
          className="mr-1.5 font-[family-name:var(--font-geist-mono)] text-[10px] text-muted-foreground/60"
          aria-hidden
        >
          ○
        </span>
      )}
      {label}
    </a>
  );
}

export function LeftNav() {
  const pathname = usePathname();
  const scroll = useScriptScrollOptional();
  const onScript = pathname === "/script";

  return (
    <nav
      className="flex h-full flex-col gap-1 overflow-y-auto p-4 font-[family-name:var(--font-serif-body)]"
      aria-label="Primary"
    >
      <div className="mb-4 border-b border-border pb-4">
        <Link
          href="/about"
          className="block font-[family-name:var(--font-display)] text-xl font-semibold tracking-[0.12em] text-foreground transition-opacity hover:opacity-80"
        >
          CAISLEÁN
          <span className="block text-[11px] font-normal tracking-[0.28em] text-muted-foreground">
            DUBH
          </span>
        </Link>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          Screenplay atlas
        </p>
        <p className="mt-2 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.08em] text-muted-foreground">
          {siteData.about.writtenBy}
        </p>
      </div>

      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Contents
      </p>
      <div className="flex flex-col gap-0.5">
        {navPrimary.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </div>

      <Collapsible defaultOpen className="mt-5 border-t border-border pt-4">
        <CollapsibleTrigger className="flex w-full items-center gap-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground outline-none transition-colors hover:text-foreground [&[data-state=open]_svg]:rotate-90">
          <ChevronRight className="size-3 transition-transform" />
          <Clapperboard className="size-3" aria-hidden />
          <span>Structure</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-3 data-[state=closed]:animate-out">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground/80">
              Acts
            </p>
            <div className="space-y-0.5">
              {siteData.acts.map((a) => (
                <AnchorLink
                  key={a.id}
                  href={`/script#${a.anchor}`}
                  label={a.shortLabel}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground/80">
              Beats
            </p>
            <div className="max-h-[28vh] space-y-0.5 overflow-y-auto pr-1 lg:max-h-[40vh]">
              {siteData.beats.map((b) => (
                <AnchorLink
                  key={b.id}
                  href={`/script#${b.anchor}`}
                  label={b.saveTheCat}
                  indent
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground/80">
              Scenes
            </p>
            <div className="max-h-[22vh] space-y-0.5 overflow-y-auto pr-1 lg:max-h-[36vh]">
              {scriptScenesOrdered.map((s) => (
                <AnchorLink
                  key={s.id}
                  href={`/script#${s.anchor}`}
                  label={s.navLabel}
                  indent
                  sceneWeight={s.sceneWeight}
                />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen className="mt-2 border-t border-border pt-4">
        <CollapsibleTrigger className="flex w-full items-center gap-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground outline-none transition-colors hover:text-foreground [&[data-state=open]_svg]:rotate-90">
          <ChevronRight className="size-3 transition-transform" />
          <span>Characters</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-0.5">
          {siteData.characters.map((c) => (
            <Link
              key={c.id}
              href={`/characters/${c.slug}`}
              className={cn(
                "block truncate rounded-sm px-2 py-1 text-[12px] transition-colors duration-200",
                pathname === `/characters/${c.slug}`
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
            >
              {c.name}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {onScript && scroll && (
        <div className="mt-auto border-t border-border pt-4 text-[11px] text-muted-foreground">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
            Reader position
          </p>
          <p className="mt-1 font-[family-name:var(--font-geist-mono)] text-[11px] text-foreground/90">
            p. ~{scroll.pageApprox}
          </p>
          {scroll.actLabel && (
            <p className="mt-0.5 text-foreground/80">{scroll.actLabel}</p>
          )}
          {scroll.beatLabel && (
            <p className="text-[11px] leading-snug">{scroll.beatLabel}</p>
          )}
          {scroll.sceneWeight && (
            <p
              className={cn(
                "mt-1 text-[10px] uppercase tracking-wider",
                scroll.sceneWeight === "greater"
                  ? "text-[color:var(--script-scene-accent)]"
                  : "text-muted-foreground",
              )}
            >
              {scroll.sceneWeight === "greater" ? "Greater scene" : "Lesser scene"}
            </p>
          )}
        </div>
      )}
    </nav>
  );
}
