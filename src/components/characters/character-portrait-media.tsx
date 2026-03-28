import Image from "next/image";
import type { CharacterSummary } from "@/lib/types/site";
import { cn } from "@/lib/utils";

type Props = {
  character: CharacterSummary;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Portrait still (Next Image) or looping muted video when `portraitVideoSrc` is set.
 */
export function CharacterPortraitMedia({ character, sizes, priority, className }: Props) {
  if (character.portraitVideoSrc) {
    return (
      <video
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        autoPlay
        muted
        loop
        playsInline
        poster={character.portraitSrc}
        aria-label={character.portraitAlt}
      >
        <source src={character.portraitVideoSrc} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={character.portraitSrc}
      alt={character.portraitAlt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
